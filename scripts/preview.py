"""Serve the working tree directly; render only the site's small Jekyll placeholders."""

import argparse
import errno
import io
import re
from datetime import date
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def render_index(root=ROOT):
    html = (root / 'index.html').read_text(encoding='utf-8')
    config = (root / '_config.yml').read_text(encoding='utf-8')
    match = re.search(r'^band_theme:\s*(\w+)', config, re.MULTILINE)
    theme = match.group(1) if match else 'electric'
    if theme not in ('electric', 'acoustic'):
        raise ValueError('band_theme in _config.yml must be electric or acoustic')
    html = re.sub(r'\A---\r?\n.*?---\r?\n', '', html, count=1, flags=re.DOTALL)
    html = html.replace("{{ site.band_theme | default: 'electric' }}", theme)
    html = html.replace('{{ site.time | date: "%Y-%m-%d" }}', date.today().isoformat())
    return html.encode('utf-8')


class PreviewHandler(SimpleHTTPRequestHandler):
    extensions_map = dict(SimpleHTTPRequestHandler.extensions_map, **{
        '.css': 'text/css; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
    })

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def send_head(self):
        # Normal file serving handles query strings, MIME types and downloads.
        # Only index.html needs Jekyll's front matter and two placeholders handled.
        target = Path(self.translate_path(self.path))
        if target.is_dir():
            target = target / 'index.html'
        if target.resolve() == (ROOT / 'index.html').resolve():
            try:
                body = render_index()
            except (OSError, ValueError) as error:
                self.send_error(500, str(error))
                return None
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            return io.BytesIO(body)
        return super().send_head()


def bind_preview(handler, start_port):
    # Windows can reserve a whole range: 10013 is not the same as "in use".
    # After nearby ports, let the OS select an available port atomically.
    ports = list(range(start_port, min(start_port + 11, 65536))) + [0]
    for port in ports:
        try:
            return ThreadingHTTPServer(('127.0.0.1', port), handler)
        except OSError as error:
            retryable = error.errno in (errno.EADDRINUSE, errno.EACCES, errno.EPERM)
            retryable = retryable or getattr(error, 'winerror', None) in (10048, 10013)
            if not retryable or port == 0:
                raise


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8080)
    parser.add_argument('--theme', choices=('electric', 'acoustic'), default='acoustic')
    args = parser.parse_args()
    if not 1 <= args.port <= 65535:
        parser.error('port must be between 1 and 65535')
    handler = partial(PreviewHandler, directory=str(ROOT))
    try:
        server = bind_preview(handler, args.port)
    except OSError as error:
        parser.exit(1, 'Cannot start local preview: {}\n'.format(error))
    port = server.server_address[1]
    if port != args.port:
        print('Port {} unavailable; using {}.'.format(args.port, port))
    url = 'http://127.0.0.1:{}'.format(port)
    print('\nPreview:  {}/?theme={}'.format(url, args.theme))
    print('Acoustic: {}/?theme=acoustic'.format(url))
    print('Electric: {}/?theme=electric'.format(url))
    print('Serving sources directly. Save changes and refresh the browser (Ctrl+F5).')
    print('Stop: Ctrl+C. No build or Node.js required.\n')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()

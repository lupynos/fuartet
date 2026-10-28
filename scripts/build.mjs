import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const config = await readFile(path.join(root, '_config.yml'), 'utf8');
const theme = process.env.BAND_THEME ?? config.match(/^band_theme:\s*(\w+)/m)?.[1] ?? 'electric';
if (!['electric', 'acoustic'].includes(theme)) throw new Error('BAND_THEME must be electric or acoustic');
const output = path.join(root, 'dist');
await mkdir(output, { recursive: true });
let html = await readFile(path.join(root, 'index.html'), 'utf8');
html = html.replace(/^---\r?\n[\s\S]*?---\r?\n/, '')
  .replace("{{ site.band_theme | default: 'electric' }}", theme)
  .replace('{{ site.time | date: "%Y-%m-%d" }}', new Date().toISOString().slice(0, 10));
await writeFile(path.join(output, 'index.html'), html);
await cp(path.join(root, 'files'), path.join(output, 'files'), { recursive: true });
for (const file of ['CNAME', 'legacy-v2.html', 'test.html']) {
  await cp(path.join(root, file), path.join(output, file));
}
// This output is already rendered; GitHub Pages must not render it a second time.
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`Built dist/ with ${theme} as default. Both theme links remain available.`);

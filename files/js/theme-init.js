// Run before CSS so a direct theme link paints in the requested colours.
(() => {
  const root = document.documentElement;
  const requested = new URLSearchParams(location.search).get('theme');
  const configured = root.dataset.theme;
  const valid = value => value === 'electric' || value === 'acoustic';
  root.dataset.defaultTheme = valid(configured) ? configured : 'electric';
  root.dataset.theme = valid(requested) ? requested : root.dataset.defaultTheme;
  document.querySelectorAll('[data-theme-icon]').forEach(icon => {
    icon.href = `files/pic/favicon-${root.dataset.theme}.${icon.dataset.themeIcon}`;
  });
})();

(() => {
  const root = document.documentElement;
  const links = document.querySelectorAll('[data-theme-link]');
  const originalTitle = document.title;
  const description = document.querySelector('meta[name="description"]');
  const originalDescription = description.content;

  function update() {
    const requested = new URLSearchParams(location.search).get('theme');
    const theme = ['electric', 'acoustic'].includes(requested) ? requested : root.dataset.defaultTheme;
    root.dataset.theme = theme;
    const acoustic = theme === 'acoustic';
    document.title = acoustic ? 'fuARTet — acoustic sessions' : originalTitle;
    description.content = acoustic
      ? 'fuARTet v akustické podobě. Akustická kytara a basa, piano, hammond a bicí. Vlastní instrumentální hudba a prostor pro improvizaci.'
      : originalDescription;
    links.forEach(link => {
      const url = new URL(location.href);
      url.searchParams.set('theme', link.dataset.themeLink);
      link.href = url.pathname + url.search + url.hash;
      if (link.dataset.themeLink === theme) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  links.forEach(link => link.addEventListener('click', event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = new URL(location.href);
    url.searchParams.set('theme', link.dataset.themeLink);
    history.pushState(null, '', url);
    update();
  }));
  addEventListener('popstate', update);
  addEventListener('hashchange', update);
  update();
})();

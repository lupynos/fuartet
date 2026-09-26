(() => {
  const intro = document.getElementById('intro');
  const toggle = document.getElementById('banner-toggle');
  if (!intro || !toggle) return;

  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const compact = intro.classList.toggle('intro-compact');
    toggle.setAttribute('aria-pressed', String(!compact));
    toggle.title = compact ? 'Zvětšit banner' : 'Zmenšit banner';
  });
})();

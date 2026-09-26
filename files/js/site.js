(() => {
  document.querySelectorAll('[data-video]').forEach(shell => {
    const link = shell.querySelector('.video-launch');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube.com/embed/' + shell.dataset.video + '?autoplay=1';
      frame.title = link.getAttribute('aria-label');
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      shell.replaceChildren(frame);
      frame.focus();
    });
  });
  const load = document.querySelector('.album-load');
  load.hidden = false;
  load.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = 'https://open.spotify.com/embed/album/2X8KhSwfEQDRBAhESR7jT7?theme=0';
    frame.title = 'Album fuARTet na Spotify';
    frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    document.getElementById('album-player').append(frame);
    load.hidden = true;
    frame.focus();
  }, {once:true});
})();

// A silent tap-tempo surprise; mouse, touch and keyboard all use native click.
(() => {
  const panel = document.querySelector('.rhythm');
  if (!panel) return;
  const tap = panel.querySelector('button');
  const result = panel.querySelector('.rhythm-result');
  let beats = [], flash;
  panel.hidden = false;
  tap.addEventListener('click', () => {
    const now = performance.now();
    if (beats.length && now - beats[beats.length - 1] < 180) return;
    if (beats.length && now - beats[beats.length - 1] > 2500) beats = [];
    beats.push(now);
    beats = beats.slice(-8);
    tap.classList.add('is-beat');
    clearTimeout(flash);
    flash = setTimeout(() => tap.classList.remove('is-beat'), 120);
    if (beats.length < 4) {
      result.textContent = 'Ještě ' + (4 - beats.length) + '…';
      return;
    }
    const bpm = Math.round(60000 * (beats.length - 1) / (beats[beats.length - 1] - beats[0]));
    result.textContent = 'Tvůj rytmus: ' + bpm + ' BPM. Pátý člen kapely?';
  });
})();

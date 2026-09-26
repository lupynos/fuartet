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

(function(window) {
  'use strict';
  //Load Protection
  if (window.LoopOgvLoaded) return;
  window.LoopOgvLoaded = true;

  // Options Initialization
  if (typeof window.LoopOgvOpts !== 'object')
    window.LoopOgvOpts = {};
  const opts = {
    mode:'hover',
  };
  Object.assign(opts,window.LoopOgvOpts);

  const searchClass = 'loopOgv';
  function init() {
    const HTML = mw.html;
    const all = document.getElementsByClassName(searchClass);
    const cantPlayOgv = document.createElement('video').canPlayType('video/ogg') === '';
    if (cantPlayOgv || opts.mode === 'off') return;
    while (0 < all.length) {
      // Ingest Values
      const focus = all.item(0);
      const video = focus.querySelector('.video a');
      const rawSize = focus.querySelector('.video')
        .dataset.size.toLowerCase();

      // Size Logic https://www.mediawiki.org/wiki/Help:Images#Syntax
      const parseArray = /(\d*x)?(\d+)px/.exec(rawSize);
      const first = parseArray[0];
      const second = parseArray[1];
      const secondIsWidth = !first.includes('x');
      const width = secondIsWidth
        ? second
        : first.replace(/\D/g,'') || null;
      const height = secondIsWidth
        ? null
        : second;

      // *************
      // DISPLAY LOGIC
      // *************
      focus.classList.remove(searchClass);

      // Video Body
      const vid_b = document.createElement('video');
      if (width)
        vid_b.width = width;
      if (height)
        vid_b.height = height;
      // if (opts.mode === 'autoplay')
        vid_b.autoplay = true;
      vid_b.loop = true;
      vid_b.muted = true;

      // Source Body (for Video)
      const source = document.createElement('source');
      source.src = video.href;
      source.type = 'video/ogg';
      vid_b.appendChild(source);

      // Replace Magic
      vid_b.addEventListener('loadeddata',function(){
        const container = focus.querySelector('a.image');
        container.href = video.href;
        container.appendChild(vid_b);
        const icon = focus.querySelector('figure figcaption a.info-icon');
        if (icon)
          icon.href = '/wiki/' + video.innerText;
        switch(opts.mode){
          case'autoplay_hide':
          case'autoplay':
            container.querySelector('img').style.display = 'none';
            break;
          case'hover':
            vid_b.style.display = 'none';
            container.addEventListener("mouseover", function(){
              container.querySelector('img').style.display = 'none';
              vid_b.style.display = 'block';
            });
            container.addEventListener("mouseout", function(){
              container.querySelector('img').style.display = 'block';
              vid_b.style.display = 'none';
            });
        }
      },{
        'once':true
      });
    }
  }
  mw.hook('wikipage.content').add(init);
})(window);
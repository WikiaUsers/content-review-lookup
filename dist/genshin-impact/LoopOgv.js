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
    const vid_master = document.createElement('video');

    // Test if this code should run
    const cantPlayOgv = vid_master.canPlayType('video/ogg') === '';
    if (cantPlayOgv || opts.mode === 'off') return;

    // Prep master components for cloneNode (more optimal than createElement)
    // if (opts.mode === 'autoplay')
      vid_master.autoplay = true;
    vid_master.loop = true;
    vid_master.muted = true;
    const source_master = document.createElement('source');
    source_master.type = 'video/ogg';

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
      const vid_body = vid_master.cloneNode();
      if (width)
        vid_body.width = width;
      if (height)
        vid_body.height = height;

      // Source Body (for Video)
      const source = source_master.cloneNode();
      source.src = video.href;
      
      vid_body.appendChild(source);

      // Replace Magic
      vid_body.addEventListener('loadeddata',function(){
        const container = focus.querySelector('a.image');
        container.href = video.href;
        container.appendChild(vid_body);
        const icon = focus.querySelector('figure figcaption a.info-icon');
        if (icon)
          icon.href = '/wiki/' + video.innerText;
        switch(opts.mode){
          case'autoplay_hide':
          case'autoplay':
            container.querySelector('img').style.display = 'none';
            break;
          case'hover':
            vid_body.style.display = 'none';
            container.addEventListener("mouseover", function(){
              container.querySelector('img').style.display = 'none';
              vid_body.style.display = 'block';
            });
            container.addEventListener("mouseout", function(){
              container.querySelector('img').style.display = 'block';
              vid_body.style.display = 'none';
            });
        }
      },{
        'once':true
      });
    }
  }
  mw.hook('wikipage.content').add(init);
})(window);
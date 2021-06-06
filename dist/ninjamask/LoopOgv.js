LoopOgvLoaded2 = true;

(function(window) {
  'use strict';
  //Load Protection
  if (window.LoopOgvLoaded) return;
  window.LoopOgvLoaded = true;

  const searchClass = 'loopOgv';
  function init() {
    const HTML = mw.html;
    const all = document.getElementsByClassName(searchClass);
    const canPlayOgv = document.createElement('video').canPlayType('video/ogg') !== '';
    if (canPlayOgv)
      while (0 < all.length) {
        // Ingest Values
        const focus = all.item(0);
        const video = focus.querySelector('.video a').href;
        const rawSize = focus.querySelector('.video').dataset.size;

        // Size Logic https://www.mediawiki.org/wiki/Help:Images#Syntax
        const parseArray = /(\d*x)?(\d+)px/.exec(rawSize.toLowerCase());
        const first = parseArray[0];
        const second = parseArray[1];
        const secondIsWidth = !first.includes('x');
        const firstStrip = first.replace(/\D/g,'');
        const width = secondIsWidth ? second : firstStrip || null;
        const height = secondIsWidth ? null : second;

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
        vid_b.autoplay = true;
        vid_b.loop = true;
        vid_b.muted = true;

        // Source Body (for Video)
        const source = document.createElement('source');
        source.src = video;
        source.type = 'video/ogg';
        vid_b.appendChild(source);

        // Replace Magic
        vid_b.addEventListener('loadeddata',function(){
          const fig = focus.querySelector('figure');
          fig.replaceChild(vid_b,fig.querySelector('a.image'));
        },{
          'once':true
        });
      }
  }
  mw.hook('wikipage.content').add(init);
})(window);
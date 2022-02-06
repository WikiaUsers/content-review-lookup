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
          container.querySelector('img').style.display = 'none';
          container.appendChild(vid_b);
          const icon = focus.querySelector('figure figcaption a.info-icon');
          if (icon)
            icon.href = '/wiki/' + video.innerText;
        },{
          'once':true
        });
      }
  }
  mw.hook('wikipage.content').add(init);
})(window);
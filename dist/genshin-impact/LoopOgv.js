(function(window) {
  'use strict';
  //Load Protection
  if (window.LoopOgvLoaded) return;
  window.LoopOgvLoaded = true;

  function init() {
    const HTML = mw.html;
    const all = document.getElementsByClassName('loopOgv');
    const canPlayOgv = document.createElement( "video" ).canPlayType('video/ogg') !== '';
    for (var i = 0; i < all.length; i++) {
      // Ingest Values
      const focus = all.item(i);
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

	  // Display Logic (Replace Parent)
      if (canPlayOgv)
        focus.outerHTML = HTML.element('video',{
            width:width,
            height:height,
            autoplay:true,
            loop:true,
            muted:true,
          },new HTML.Raw(
          	HTML.element('source',{
            	src:video,
            	type:'video/ogg'
          	})
          ));
    }
  }
  mw.hook('wikipage.content').add(init);
})(window);
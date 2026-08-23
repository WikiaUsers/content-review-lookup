/* iframe */
mw.hook('wikipage.content').add(function($content) {
    $content.find('.skin-3d').each(function() {
        var $el = $(this);
        
        var skinName = $el.text().trim();
        
        if (!skinName) return;
        
        $el.empty();
        
        var $iframe = $('<iframe>').attr({
            src: 'https://kurojs.github.io/McView3D/embed.html?skin=' + encodeURIComponent(skinName) + '&width=270&height=360&animation=idle',
            width: '270px',
            height: '360px',
            frameborder: '0',
            style: 'border: 0; width: 270px; height: 360px; background: transparent;'
        });
        
        $el.append($iframe);
    });
});

/* sticky tabs */
let stickyElm = document.querySelector('.tabs-sticky');
let observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1], rootMargin: "-47px 0px 0px 0px"}
);
observer.observe(stickyElm);
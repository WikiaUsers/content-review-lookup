function initAutoSliders() {
  document.querySelectorAll('.cs-slider').forEach(function(slider) {
    if (slider.dataset.csInit) return;

    var track = slider.querySelector('.cs-slider-track');
    var slides = slider.querySelectorAll('.cs-slide');
    var dotsWrap = slider.querySelector('.cs-dots');
    if (!track || slides.length === 0) return;

    slider.dataset.csInit = '1';

    if (slides.length <= 1) return;

    slides.forEach(function(_, i) {
      var dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dotsWrap.appendChild(dot);
    });

    var index = 0;

    setInterval(function() {
      index = (index + 1) % slides.length;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      Array.from(dotsWrap.children).forEach(function(d, i) {
        d.classList.toggle('active', i === index);
      });
    }, 4000);
  });
}

window.addEventListener('load', initAutoSliders);
document.addEventListener('DOMContentLoaded', initAutoSliders);
new MutationObserver(initAutoSliders).observe(document.body, { childList: true, subtree: true });


// --------------------------------------------------------------------------------------------
// Box adjustement

(function(){
  function updateScrollRibbons(){
    document.querySelectorAll('.story-text-scroll').forEach(function(box){
      var ribbon = box.nextElementSibling;
      if (!ribbon || !ribbon.classList.contains('scroll-ribbon')) return;
      var hasMore = box.scrollHeight - box.scrollTop - box.clientHeight > 4;
      ribbon.classList.toggle('visible', hasMore);
    });
  }
  document.addEventListener('scroll', function(e){
    if (e.target.classList && e.target.classList.contains('story-text-scroll')) updateScrollRibbons();
  }, true);
  window.addEventListener('load', updateScrollRibbons);
  document.addEventListener('DOMContentLoaded', updateScrollRibbons);
  window.addEventListener('resize', updateScrollRibbons);
  new MutationObserver(updateScrollRibbons).observe(document.body, { childList:true, subtree:true });
})();
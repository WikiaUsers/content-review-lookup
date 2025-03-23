/* Any JavaScript here will be loaded for all users on every page load. */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.noimage = 'https://static.wikia.nocookie.net/medalisttest/images/6/60/No_Image_Available.png/revision/latest';
window.pPreview.delay = 20;
window.pPreview.RegExp.iclasses = ['info-icon', 'image'];
window.pPreview.RegExp.iparents = ['.mw-changeslist', '.custom-tabs', '.portal'];
window.pPreview.RegExp.noinclude = ['.pull-quote', '.mbox', '.custom-tabs', '.references', '.reference', '.mw-ext-cite-error'];

/* add class to custom tabs when sticky */
let stickyElm = document.querySelector('.custom-tabs')
let observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1], rootMargin: "-47px 0px 0px 0px"}
);
observer.observe(stickyElm)
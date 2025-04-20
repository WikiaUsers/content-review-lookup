/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.noimage = 'https://static.wikia.nocookie.net/zenless-zone-zero/images/e/e3/No_Image.png/revision/latest';
window.pPreview.delay = 20;
window.pPreview.RegExp.iclasses = ['info-icon', 'image'];
window.pPreview.RegExp.iparents = ['.mw-changeslist', '.custom-tabs', '.portal'];
window.pPreview.RegExp.noinclude = ['.pull-quote', '.mbox', '.custom-tabs', '.references', '.reference', '.mw-ext-cite-error'];

/* UX band-aid: stop fandom sliders from sliding when user hovers */
document.querySelectorAll('.fandom-slider').forEach((el) => {
    mw.util.addCSS('.forced-caption {display: block !important; opacity: 1 !important;} .fandom-slider__nav__caption:has(>.forced-caption) > :not(.forced-caption) {display: none !important; opacity: 0 !important;}');
    let c = null,
        slider = $(el),
        stopSlider = () => {
            let thumb = slider.find('.fandom-slider__nav__thumbs .current-thumb').get(0),
                capt = slider.find('.fandom-slider__nav__caption > div');
            capt.filter('[style*="display: block"]').addClass('forced-caption');
            thumb.click();
            c = setInterval(() => {
                thumb.click();
            }, 250);
            slider.find('.fandom-slider__list, .fandom-slider__nav__thumbs > div').css('transition-delay', '7000s'); // auto-slide duration
        },
        startSlider = () => {
            if (c !== null) {
                slider.find('.fandom-slider__list, .fandom-slider__nav__thumbs > div').css('transition-delay', '0s');
                slider.find('.forced-caption').removeClass('forced-caption');
                clearInterval(c);
                c = null;
            }
        };
    el.addEventListener('mouseenter', stopSlider);
    el.addEventListener('mouseleave', startSlider);
    el.addEventListener('mousedown', () => {
        startSlider();
        setTimeout(stopSlider, 500);
    });
});

/* add class to custom tabs when sticky */
let stickyElm = document.querySelector('.custom-tabs')
let observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1], rootMargin: "-47px 0px 0px 0px"}
);
observer.observe(stickyElm)

/* Modifying redirect button from WikiEditor's source mode to automatically include the category */
$('#wpTextbox1').on('wikiEditor-toolbar-buildSection-advanced', function(event, section) {
    // The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
    section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
    section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Category:Redirect Pages]]';
});
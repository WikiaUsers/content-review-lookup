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
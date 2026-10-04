document.querySelectorAll('.mw-carousel').forEach(function (carousel) {
    var slides = carousel.querySelector('.mw-carousel-slides');
    var firstItem = slides && slides.querySelector('.mw-carousel-item');
    var firstImage = firstItem && firstItem.querySelector('img');

    if (!slides || !firstItem || !firstImage) { return; }

    function updateCarouselWidth() {
        var width = firstImage.getBoundingClientRect().width;

        if (width > 0) {
            slides.style.width = width + 'px';
            firstItem.style.flexBasis = width + 'px';
        }
    }

    if (firstImage.complete) {
        updateCarouselWidth();
    } else {
        firstImage.addEventListener('load', updateCarouselWidth);
    }

    window.addEventListener('resize', updateCarouselWidth);
});
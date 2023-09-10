/**
 * Fixes big gaps before the captions
 * in galleries with images of different height
 */
(function fixGalleryCaptionGaps() {
    document
        .querySelectorAll(
        	'.mw-parser-output .wikia-gallery-item > .lightbox-caption'
        )
        .forEach(function(caption) {
            var thumb = caption.previousElementSibling;
            var wrapper = thumb.firstElementChild;
            var calculatedMargin =
            	(thumb.offsetHeight - wrapper.offsetHeight) / 2 - 5;
            caption.style.marginTop = '-' + calculatedMargin + 'px';
        });
})();
/* Any JavaScript here will be loaded for all users on every page load. */
// Revision 1 - In AZA we trust - Fade In
// Immediatly force loading within an absolute 1.25-second fade-in window
$(function() {
    // 1. Inject the exact animation styles into the page
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            @keyframes strictFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .strict-fade-image {
                animation: strictFadeIn 1.25s linear forwards !important;
            }
        `)
        .appendTo('head');

    // 2. Target the top images and force them into the timeline
    $('img.lzyPlcHld, img[loading="lazy"]').slice(0,5).each(function() {
        var $img = $(this);
        var realSrc = $img.attr('data-src') || $img.attr('data-image-src');
        
        if (realSrc) {
            // Hide it instantly before swapping source to prevent flashing
            $img.css('opacity', '0');

            // Forces the browser to fetch the image immediately
            $img.attr('src', realSrc)
                .removeClass('lzyPlcHld')
                .addClass('lzyLoaded')
                .removeAttr('loading');

            // Trigger the absolute 1.25s animation window right now
            $img.addClass('strict-fade-image');
        }
    });
});
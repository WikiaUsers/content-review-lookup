/**
 * TimedSlider
 * https://dev.wikia.com/wiki/TimedSlider
 *
 * Creates a basic slider that automatically shifts between slides
 * based on a user-specified timer (default once every 2 seconds)
 */
 /*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:false, undef:true, unused:true, curly:true, browser:true, jquery:true */
jQuery(function ($) {
    window.importArticle({
        type: 'style',
        article: 'MediaWiki:TimedSlider.css'
    });

    // tsanimate event
    function tsanimate() {
        var $container = $(this),
            $slides = $container.children(),
            $curr = $slides.filter('.ts-active'),
            $next = $curr.next();
        
        if ($next.length === 0) {
            $next = $slides.first();
        }

        $curr.removeClass('ts-active');
        $next.addClass('ts-active');
    }

    // initialize all timed sliders
    $('.ts-container').each(function () {
        var $container = $(this),
            $slides = $container.children(),
            delayms;

        // if there is more than 1 slide, finish initializing data and
        // turn on the tsanimate event for this slider
        if ($slides.length > 1) {
            delayms = $container.attr('data-delay-ms');
            if (typeof delayms === "string" || typeof delayms === "number") {
                delayms = delayms || 0;
                if (delayms < 100) {
                    delayms = 100;
                }
            } else {
                delayms = 2000;
            }
            $container.data('delayms', delayms);

            $container.on('tsanimate', tsanimate);

            $container.trigger('tsanimate');

            window.setInterval(function () {
                $container.trigger('tsanimate');
            }, delayms);
        }
    });
});
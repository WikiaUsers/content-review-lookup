/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/**
 * TimedSlider
 * https://dev.wikia.com/wiki/TimedSlider
 *
 * Creates a basic slider that automatically shifts between slides
 * based on a user-specified timer (default once every 2 seconds)
 */
 /*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:false, undef:true, unused:true, curly:true, browser:true, jquery:true */
jQuery(function ($) {
    // tsanimate event
    function tsanimate( cont, prev) {
    		var $container = cont,
            $slides = $container.children('.tsv-slide'),
            $curr = $slides.filter('.tsv-active'),
            $next = prev ? $curr.prev('.tsv-slide') : $curr.next('.tsv-slide'),
            timeout = $container.data('timeout'),
        		delayms = $container.data('delayms');
        window.clearTimeout(timeout);
        if ($next.length === 0) {
            $next = prev ? $slides.last() : $slides.first();
        }
        
        $curr.removeClass('tsv-active');
        $next.addClass('tsv-active');
        timeout = window.setTimeout(function (){
            $container.trigger('tsanimate');
        }, delayms);
        $container.data('timeout', timeout);
    }
    function next() {
    		tsanimate( $(this));
    }
    function nextSlide() {
    		tsanimate( $(this).parents('.tsv-container'));
    }
    function previousSlide() {
    		tsanimate( $(this).parents('.tsv-container'), true);
    }

    // initialize all timed sliders
    $('.tsv-container').each(function () {
        var $container = $(this),
            $slides = $container.children('.tsv-slide'),
            delayms,
            $nextB = $('.tsv-container .tsv-next'),
            $prevB = $('.tsv-container .tsv-previous'),
            timeout;
		
		if( $nextB) { $nextB.click( nextSlide);}
		if( $prevB) { $prevB.click( previousSlide);}
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
            $container.on('tsanimate', next);
            
            timeout = window.setTimeout(function () {
                $container.trigger('tsanimate');
            }, delayms);
            $container.data('timeout', timeout);
        }
    });
});
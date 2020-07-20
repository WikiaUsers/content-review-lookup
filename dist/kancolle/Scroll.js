(function(mw, $) {

    "use strict";
    
    $(document).ready(function() {

        console.log("Scroll v1.0.1");

        /**
         * Scroll event propagator.
         * 
         * E.g., an element can have a scroll (overflow:auto) and images, but scrolling it won't perform
         * lazy loading for images, since scroll event is not propagated.
         */

        $('.scrollable').each(function() {
            $(this).scroll(function() {
                window.dispatchEvent(new CustomEvent('scroll'));
            });
        });

        /**
         * Template:Map scroll on click support.
         */

        function updateContent() {
            $(".map-node a").off("click");
            $(".map-node a").click(function(e) {
                var href = $(this).attr("href");
                var $element = $(href);
                var $container = $element.parent();
                if ($element.length === 1 && $container.length === 1) {
                    $container.scrollTop($container.scrollTop() - $container.offset().top + $element.offset().top);
                    e.preventDefault();
                }
                return false;
            });
        }

        updateContent();
        mw.hook("wikipage.content").add(updateContent);

    });

}(mediaWiki, jQuery));
/* Any JavaScript here will be loaded for all users on every page load. */

/** <pre>
 * YouTube video embedder
 * Injects an iframe, rather than uploading the video to Wikia's video library
 * See http://runescape.wikia.com/wiki/Template:Youtube for further documentation
 */

;(function ($) {

    'use strict';

    function injectVideo() {
        var $tags = $('.youtube');

        if (!$tags.length) {
            return;
        }
        
        $tags.each(function () {
            var $this = $(this),
                contents = $this.html().split('|'),
                $iframe;

            // for no arguments in template use
            if (contents[0] === 'ERROR') {
                return;
            }
            
            $iframe = $('<iframe>')
                .attr({
                    src: 'https://www.youtube.com/embed/' + contents[0],
                    height: contents[1],
                    width: contents[2]
                });
                
            $this
                .empty()
                .append($iframe)
                // reverse the display:none; set in the template
                .show();
        });
        
        $('.original-link').hide();
    }
    
    $(injectVideo);

}(jQuery));
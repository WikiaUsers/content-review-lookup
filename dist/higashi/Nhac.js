;(function ($) {
 
    'use strict';
 
    function injectZingmp3() {
        var $tags = $('.zingmp3');
 
        if (!$tags.length) {
            return;
        }
 
        $tags.each(function () {
            var $this = $(this),
                contents = $this.html().split('|'),
                $iframe;
 
            if (contents[0] === 'ERROR') {
                return;
            }
 
            $iframe = $('<iframe>')
                .attr({
                    src: 'http://mp3.zing.vn/embed/' + contents[0] + '?autostart=false',
                    height: contents[1],
                    width: contents[2]
                });
 
            $this
                .empty()
                .append($iframe)
                .show();
        });
 
        $('.original-link').hide();
    }
 
    $(injectZingmp3);
 
}(jQuery));
 
// Phan 2
 
;(function ($) {
 
    'use strict';
 
    function injectPoll() {
        var $tags = $('.poll');
 
        if (!$tags.length) {
            return;
        }
 
        $tags.each(function () {
            var $this = $(this),
                contents = $this.html().split('|'),
                $iframe;
 
            if (contents[0] === 'ERROR') {
                return;
            }
 
            $iframe = $('<iframe>')
                .attr({
                    src: 'http://fans.vote/embed/' + contents[0],
                    height: contents[1],
                    width: contents[2]
                });
 
            $this
                .empty()
                .append($iframe)
                .show();
        });
 
        $('.original-link').hide();
    }
 
    $(injectPoll);
 
}(jQuery));
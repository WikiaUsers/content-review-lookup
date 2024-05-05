/* vertical tabs */
$(function() {
    if (!$('#vertical-tabs').length) return;
    $('#vertical-tabs .tab-nav > ul > li').on('click', function() {
        if ($(this).siblings().hasClass('active')) {
            $(this).siblings().removeClass('active');
        }
        $(this).addClass('active');
        $('#vertical-tabs .tab-container')
            .attr('id', $(this).data('id'))
            .html('<div>' + $(this).find('.tab-content').html() + '</div>');
    });
});

/* Apester Polls */
$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("class")) {
        outerLoop:
        switch (spans[index].className) {
            case "Roar":
                spans[index].innerHTML = '<iframe style="width: inherit; height: inherit;" src="//renderer.qmerce.com/interaction/' + spans[index].getAttribute("data-widget-id") + '/" frameborder="0" scrolling="no"></iframe>';
                break outerLoop;
            default:
                break outerLoop;
        }
      }
   }
});

/**
 * YouTube video embedder
 *
 * Injects an iframe, rather than uploading the video to Wikia's video library
 * Slightly modified from source, to support AJAX-loaded pages (e.g. edit preview in Wikia skin)
 *
 * See http://runescape.wikia.com/wiki/Template:Youtube for further documentation
 * @source http://runescape.wikia.com/wiki/MediaWiki:Common.js/youtube.js
 */
 
;(function ($) {
 
    'use strict';
 
    function injectVideo($content) {
        var $tags = $content.find('.youtube');
 
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
 
        $content.find('.original-link').hide();
    }
 
    mw.hook('wikipage.content').add(injectVideo);
 
}(jQuery));

/* Rail Module */
$(window).load(function() {
    $('#WikiaRail').prepend($('<section></section>', {
        id:'sitenotice',
        html:'<div style="padding: 5px;"><span class="mptext">Rachel Who?</span></div><p><span class="Roar" data-widget-id="571e8e5bff2f10522dfb03b4" style="width: 100%; height: 350px;"><iframe style="width: inherit; height: inherit;" src="//renderer.qmerce.com/interaction/571e8e5bff2f10522dfb03b4/" frameborder="0" scrolling="no"></iframe></span></p>'
    }));
});
/**
 * This script allows users to embed Twitter follow buttons.
 * To embed a follow button, use the following HTML:
 * <div class="twitter-follow-button" data-href="https://twitter.com/username" data-show-count="false">Follow @username</div>
 * See https://dev.twitter.com/web/follow-button for more information.
**/
(function() {
    if (window.TwitterFollowButtonLoaded) {
        return;
    }
    function loadTwitterJavaScript() {
        if (window.twttr) {
            if (window.twttr.widgets) {
                twttr.widgets.load();
            }
        } else {
            if ($('#twitter-wjs').length) {
                return;
            }
            var $script = $('<script>', {
                id: 'twitter-wjs',
                src: 'https://platform.twitter.com/widgets.js'
            }).insertBefore($('script').first());
            window.twttr = {
                _e: [],
                ready: function(f) {
                    window.twttr._e.push(f);
                }
            };
        }
    }
    window.TwitterFollowButtonLoaded = true;
    var regex = /^https?:\/\/(?:www\.)?twitter\.com\/@?[A-Za-z0-9_]+$/;
    mw.hook('wikipage.content').add(function($content) {
        var $buttons = $content.find('.twitter-follow-button:not(.twitter-follow-button-rendered)');
        $buttons.each(function() {
            var $this = $(this),
                href = $this.attr('data-href'),
                attributes = $this.prop('attributes'),
                text = $this.text(),
                $anchor = $('<a></a>');
            regex.lastIndex = 0;
            // Check if the URL matches a valid Twitter user account link, otherwise continue to the next item.
            if (!regex.test(href)) {
                return;
            }
            $.each(attributes, function() {
                $anchor.attr(this.name, this.value);
            });
            $anchor.text(text).attr('href', href).removeAttr('data-href');
            $this.replaceWith($anchor);
        });
        if ($buttons.length) {
            loadTwitterJavaScript();
        }
    });
})();
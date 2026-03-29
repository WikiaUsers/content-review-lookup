/*
 * Based on the original gadget from https://dev.fandom.com/wiki/MediaWiki:ScrollUpButton.js
 * Modified only to replace the default icon with a custom image and some other minor changes.
 */

mw.loader.using(['jquery'], function () {
    (function ($, mw) {

        var scrollDownButtonId = 'scrollDownButton',
            scrollUpButtonId = 'scrollUpButton';
            
        /* Custom icon replacement */
        var scrollButtonIcon = 'https://static.wikia.nocookie.net/diabolik-lovers/images/b/bb/Arrow-circle-up.png/revision/latest';

        var $scrollDownButton = $('<img>', {
            src: scrollButtonIcon,
            id: scrollDownButtonId
        }).css({
            cursor: 'pointer',
            opacity: 1,
            position: 'fixed',
            display: 'block',
            right: '18px',
            transform: 'rotate(180deg)',
            'z-index': 9999
        }).on('click', function () {
            $('html, body').animate({
                scrollTop: $(document).height() - $(window).height()
            }, 660);
        }).appendTo('body');

        var $scrollUpButton = $('<img>', {
            src: scrollButtonIcon,
            id: scrollUpButtonId
        }).css({
            cursor: 'pointer',
            opacity: 1,
            position: 'fixed',
            display: 'block',
            right: '18px',
            'z-index': 9999
        }).on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 660);
        }).appendTo('body');

        $(window).on('scroll', function () {
            var dingHeight = $('#bluedeck_ding>div').height() || 0;

            if ($('#mw-ge-help-panel-cta-button').length > 0) {
                $scrollDownButton.css('bottom', dingHeight + 75 + 'px');
                $scrollUpButton.css('bottom', dingHeight + 116 + 'px');
            } else if ($('body').hasClass('theme-fandomdesktop-dark')) {
                $scrollDownButton.css('bottom', dingHeight + 54 + 'px');
                $scrollUpButton.css('bottom', dingHeight + 95 + 'px');
            } else if ($('body').hasClass('theme-fandomdesktop-light')) {
                $scrollDownButton.css('bottom', dingHeight + 54 + 'px');
                $scrollUpButton.css('bottom', dingHeight + 95 + 'px');
            } else {
                $scrollDownButton.css('bottom', dingHeight + 24 + 'px');
                $scrollUpButton.css('bottom', dingHeight + 65 + 'px');
            }

            if ($('#cat_a_lot').length > 0 || $('#proveit').length > 0 || $('.wordcount').length > 0) {
                $scrollDownButton.css('left', '10px');
                $scrollUpButton.css('left', '10px');
            } else {
                $scrollDownButton.css('left', 'unset');
                $scrollUpButton.css('left', 'unset');
            }
        });

    })(jQuery, mw);
});
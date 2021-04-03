/**
 * Disables commenting on old forums on Forum Board
 *
 * @author [[User:UltimateSupreme]]
 * @author [[User:Spottra]]
 * @author [[User:DarthKitty]]
 */
;(function ($, mw) {
    'use strict';

    // Set up default config options if custom ones haven't been supplied.
    window.LockForums = window.LockForums || {};

    var LockForums = $.extend({
        lockMessageWalls: false,
        expiryDays: 30,
        expiryMessage: 'This thread hasn\'t been commented on for over <expiryDays> days. There is no need to reply.',
        warningDays: 0,
        warningMessage: 'This thread hasn\'t been commented on for over <warningDays> days. Please reply ONLY if a response is really needed.',
        disableOn: [],
        banners: false,
        expiryBannerMessage: '<span style="color: maroon; font-weight: bold;">Note:</span> This topic has been unedited for <actualDays> days. It is considered <b>archived</b> - the discussion is over. If you feel this thread needs additional information, contact an administrator.',
        warningBannerMessage: '<span style="color: maroon; font-weight: bold;">Note:</span> This topic has been unedited for <actualDays> days. It is considered <b>archived</b> - the discussion is over. Do not add to it unless it really <i>needs</i> a response.',
        warningPopup: false,
        warningPopupMessage: 'This thread has not had a response for over <actualDays> days; are you sure you want to reply?',
    }, window.LockForums);

    // Specify 'stylesheet' if you want to use local CSS, otherwise define any
    // overrides with `{'tag1': 'value1', 'tag2': 'value2'}`, etc. Note that
    // specifying 'stylesheet' will not apply any styling at all to the banner.
    ['expiryBannerStyle', 'warningBannerStyle'].forEach(function (propName) {
        var prop = LockForums[propName];

        if (prop !== 'stylesheet' && !$.isPlainObject(prop)) {
            LockForums[propName] = {};
        }
    });

    var config = mw.config.get([
        'wgNamespaceNumber',
        'wikiaPageType',
        'wgTitle',
        'wgNow'
    ]);

    var namespaceWhitelist = [1201]; // Thread

    if (LockForums.lockMessageWalls) {
        namespaceWhitelist.push(1200); // Message Wall
    }

    if (
        namespaceWhitelist.indexOf(config.wgNamespaceNumber) === -1 ||
        (config.wikiaPageType !== 'forum' && !LockForums.lockMessageWalls) ||
        LockForums.disableOn.indexOf(config.wgTitle) !== -1
    ) {
        return;
    }

    function daysToMilliseconds(days) {
        return days * 24 * 60 * 60 * 1000;
    }

    function millisecondsToDays(milliseconds) {
        return milliseconds / 1000 / 60 / 60 / 24;
    }

    var expiryDaysPattern = /<expiryDays>/g;
    var actualDaysPattern = /<actualDays>/g;
    var warningDaysPattern = /<warningDays>/g;

    // Iterate over every thread on the page. This is needed to lock message
    // walls, which frequently have multiple threads.
    $('#Wall > .comments > .SpeechBubble').each(function () {
        var $thread = $(this);

        // Get the last comment date.
        var then = $thread.find('.permalink').last().text().split(/,(.+)/);

        // Small trick by MGeffro.
        if (then.length === 1) {
            then = then[0];
        } else {
            then = then[1];
        }

        var currentDate = config.wgNow;
        var oldDate = new Date(then.trim());
        var diffMilliseconds = currentDate.getTime() - oldDate.getTime();
        var diffDays = Math.floor(millisecondsToDays(diffMilliseconds));
        var expiryMilliseconds = daysToMilliseconds(LockForums.expiryDays);
        var warningMilliseconds = daysToMilliseconds(LockForums.warningDays);
        var isExpired = diffMilliseconds > expiryMilliseconds;
        var shouldWarn =
            !isExpired &&
            warningMilliseconds > 0 &&
            diffMilliseconds > warningMilliseconds;

        // Replace placeholders with dynamic values.
        var expiryMessage = LockForums.expiryMessage
            .replace(expiryDaysPattern, LockForums.expiryDays)
            .replace(actualDaysPattern, diffDays);
        var warningMessage = LockForums.warningMessage
            .replace(warningDaysPattern, LockForums.warningDays)
            .replace(actualDaysPattern, diffDays)
            .replace(expiryDaysPattern, LockForums.expiryDays);
        var warningPopupMessage = LockForums.warningPopupMessage
            .replace(warningDaysPattern, LockForums.warningDays)
            .replace(actualDaysPattern, diffDays);
        var expiryBannerMessage = LockForums.expiryBannerMessage
            .replace(expiryDaysPattern, LockForums.expiryDays)
            .replace(actualDaysPattern, diffDays);
        var warningBannerMessage = LockForums.warningBannerMessage
            .replace(warningDaysPattern, LockForums.warningDays)
            .replace(actualDaysPattern, diffDays);

        var $replyBody = $thread.find('textarea.replyBody');

        if (isExpired) {
            // Lock commenting.
            $thread.find('.buttons > .quote-button').remove();
            $replyBody
                .attr({
                    placeholder: expiryMessage,
                    disabled: 'disabled'
                });
        } else if (shouldWarn) {
            $replyBody
                .attr('placeholder', warningMessage);

            // If we've enabled warnings, intercept the events on the reply
            // button and add a confirmation dialog.
            if (LockForums.warningPopup) {
                $thread.find('.replyButton').on('click', function (event) {
                    if (!confirm(warningPopupMessage)) {
                        event.stopPropagation();
                    }
                });
            }
        }

        // If we've enabled banners and we need one, put one on the page.
        if ((isExpired || shouldWarn) && LockForums.banners) {
            var message = isExpired
                ? expiryBannerMessage
                : warningBannerMessage;
            var styles = isExpired
                ? LockForums.expiryBannerStyle
                : LockForums.warningBannerStyle;
            var $banner = $('<div>', {
                id: 'forum-warning-banner',
                class: 'warning-banner-' + (isExpired ? 'expired' : 'warning'),
                html: message
            });

            // Apply default styles unless 'stylesheet' is specified, allowing
            // wikis to define styles in their local CSS.
            if (styles !== 'stylesheet') {
                $banner.css({
                    'background-color': 'whitesmoke',
                    'border': '2px solid #f66',
                    'color': 'black',
                    'margin': '0.8em 0px',
                    'padding': '0.5em 12px'
                });

                // Apply user-specified CSS.
                $banner.css(styles);
            }

            $thread.before($banner);
        }
    });
})(window.jQuery, window.mediaWiki);
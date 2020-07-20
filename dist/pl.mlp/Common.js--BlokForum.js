/**
 * 10:05, June 19, 2017 (UTC)
 * http://dev.wikia.com/wiki/LockForums
 * Disables commenting on old forums on Forum Board
 * @doc: http://dev.wikia.com/wiki/LockForums
 * @author: UltimateSupreme (http://dev.wikia.com/wiki/User:UltimateSupreme)
 * Additional (optional) features added by Spottra (http://dev.wikia.com/wiki/User:Spottra)
 */
 
/* global mediaWiki, jQuery */
(function ($, mw, undefined) {
    "use strict";
 
    // set up default config options if custom ones haven't been supplied
    window.LockForums = window.LockForums || {};
    var LockForums = $.extend({
            expiryDays          : 30,
            expiryMessage       : "This forum hasn't been commented on for over <expiryDays> days. There is no need to reply.",
            ignoreDeletes       : false,
            warningDays         : 0,
            warningMessage      : "This forum hasn't been commented on for over <warningDays> days. Please reply ONLY if a response is really needed.",
            disableOn           : [],
            banners             : false,
            expiryBannerMessage : "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been unedited for <actualDays> days. It is considered <b>archived</b> - the discussion is over. If you feel this forum needs additional information, contact an administrator.",
            warningBannerMessage: "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been unedited for <actualDays> days. It is considered <b>archived</b> - the discussion is over. Do not add to it unless it really <i>needs</i> a response.",
            warningPopup        : false,
            warningPopupMessage : "This forum has not had a response for over <actualDays> days; are you sure you want to reply?",
            boxHeight           : 50
        }, window.LockForums);
 
    // Specify 'stylesheet' if you want to use local CSS, otherwise
    // define any overrides with "{'tag1': 'value1', 'tag2': 'value2'}", etc.
    // Note that specifying 'stylesheet' will not apply any styling at all
    // to the banner.
    if (!$.isPlainObject(LockForums.expiryBannerStyle) && LockForums.expiryBannerStyle !== 'stylesheet') {
        LockForums.expiryBannerStyle = {};
    }
    if (typeof LockForums.warningBannerStyle !== "object" && LockForums.warningBannerStyle !== 'stylesheet') {
        LockForums.warningBannerStyle = {};
    }
 
    if (
        mw.config.get('wgNamespaceNumber') !== 1201 || // Threads
        mw.config.get('wikiaPageType') !== 'forum' || // Forums only
        $.inArray(mw.config.get('wgTitle'), LockForums.disableOn) !== -1 // Not disabled
    ) {
        return;
    }
 
    // Get the last comment date
    var expiryMilliseconds  = LockForums.expiryDays * 24 * 60 * 60 * 1000,
        warningMilliseconds = LockForums.warningDays * 24 * 60 * 60 * 1000,
        then                = $('ul.comments li.SpeechBubble .permalink').last().text().split(/,(.+)/),
        replies             = $('ul.comments li.SpeechBubble'),
        oldDate,
        currentDate         = mw.config.get('wgNow'),
        diffMilliseconds,
        diffDays,
        expired,
        warning;
 
    // If desired, ignore deleted replies when calculating oldDate
    if (LockForums.ignoreDeletes) {
        var i = replies.length - 1;
 
        while (i > 0 && ($(replies[i]).hasClass('new-reply') || replies[i].getElementsByClassName('speech-bubble-message-removed').length > 0)) {
            i -= 1;
        }
 
        then = $(replies[i].getElementsByClassName('permalink')).last().text().split(/,(.+)/);
    }
 
    // Small trick by MGeffro
    if (then.length === 1) {
        then = then[0];
    } else {
        then = then[1];
    }
    
    /* Reformat Polish month abbreviations back into javascript-understandable English */
    then = then.replace("sty", "jan");
	then = then.replace("lut", "feb");
	then = then.replace("kwi", "apr");
	then = then.replace("maj", "may");
	then = then.replace("cze", "jun");
	then = then.replace("lip", "jul");
	then = then.replace("sie", "aug");
	then = then.replace("wrz", "sep");
	then = then.replace("paź", "oct");
	then = then.replace("lis", "nov");
	then = then.replace("gru", "dec");
	
	/*Resume original code */
    oldDate                         = new Date(then.trim());
    diffMilliseconds                = currentDate.getTime() - oldDate.getTime();
    diffDays                        = Math.floor(diffMilliseconds / 1000 / 60 / 60 / 24);
    expired                         = diffMilliseconds > expiryMilliseconds;
    warning                         = (!expired && warningMilliseconds > 0 && diffMilliseconds > warningMilliseconds);
 
    // dynamically replace <expiryDays> with the value of LockForums.expiryDays
    // also allow the use of <actualDays> to show actual age in days
    LockForums.expiryMessage        = LockForums.expiryMessage.replace(/<expiryDays>/g, LockForums.expiryDays).replace(/<actualDays>/g, diffDays);
    LockForums.expiryBannerMessage  = LockForums.expiryBannerMessage.replace(/<expiryDays>/g, LockForums.expiryDays).replace(/<actualDays>/g, diffDays);
 
    // dynamically replace <warningDays> with the value of LockForums.warningDays
    // also allow the use of <actualDays> to show actual age in days
    LockForums.warningMessage       = LockForums.warningMessage.replace(/<warningDays>/g, LockForums.warningDays).replace(/<actualDays>/g, diffDays).replace(/<expiryDays>/g, LockForums.expiryDays);
    LockForums.warningBannerMessage = LockForums.warningBannerMessage.replace(/<warningDays>/g, LockForums.warningDays).replace(/<actualDays>/g, diffDays);
    LockForums.warningPopupMessage  = LockForums.warningPopupMessage.replace(/<warningDays>/g, LockForums.warningDays).replace(/<actualDays>/g, diffDays);
 
    // lock commenting if expired
    if (expired) {
        $('textarea.replyBody').attr({
            placeholder: LockForums.expiryMessage,
            disabled   : 'disabled'
        }).height(LockForums.boxHeight);
        $(".replyButton").parent().remove();
    }
    // we haven't locked yet but we want to warn people that it is old
    else if (warning) {
        $('textarea.replyBody').attr("placeholder", LockForums.warningMessage).height(LockForums.boxHeight);
 
        // If we've enabled warnings, intercept the events on the
        // reply button and add a confirmation dialog
        if (LockForums.warningPopup) {
            $('.replyButton').on('click', function (event) {
                if (!confirm(LockForums.warningPopupMessage)) {
                    event.stopPropagation();
                }
            });
        }
    }
 
    // If we've enabled banners and we need one, put one on the page
    if ((expired || warning) && LockForums.banners) {
        var message = (expired ? LockForums.expiryBannerMessage : LockForums.warningBannerMessage);
        var styles = (expired ? LockForums.expiryBannerStyle : LockForums.warningBannerStyle);
        var mainMsg = $('.SpeechBubble.message-main').get(0);
        var banner = document.createElement('div');
 
        banner.id        = 'forum-warning-banner';
        banner.className = 'warning-banner-' + (expired ? 'expired' : 'warning');
        banner.innerHTML = message;
 
        // apply some default styling unless 'stylesheet' is specified,
        // which will allow the wiki to define styles in their local CSS
        if (styles !== 'stylesheet') {
            $(banner).css({
                'border'          : '2px solid #f66',
                'background-color': 'whitesmoke',
                'margin'          : '0.8em 0px',
                'padding'         : '0.5em 12px',
                'color'           : 'black'
            });
 
            // apply any user-specified CSS as well
            $(banner).css(styles);
        }
 
        mainMsg.parentNode.insertBefore(banner, mainMsg);
    }
 
}(jQuery, mediaWiki));
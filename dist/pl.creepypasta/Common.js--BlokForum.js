/**
 * 15:05, January 23, 2014 (UTC)
 * http://dev.wikia.com/wiki/LockForums
 * Disables commenting on old forums
 * On Forum Board
 * @author: UltimateSupreme (http://dev.wikia.com/wiki/User:UltimateSupreme)
 */
// <source lang=JavaScript>
(function (LockForums) {
    "use strict";
    jQuery(function ($) {
 
        // set up default config options if custom ones haven't been supplied
        // want to ensure variables have the right type, so not using $.extend here
        if (!$.isPlainObject(LockForums)) {
            LockForums = {};
        }
        if (typeof LockForums.expiryDays !== "number") {
            LockForums.expiryDays = 30;
        }
        if (typeof LockForums.expiryMessage !== "string") {
            LockForums.expiryMessage = "This forum hasn\'t been commented on for over <expiryDays> days. There is no need to reply.";
        }
        if (typeof LockForums.forumName !== "string") {
            LockForums.forumName = "Forum";
        }
 
        // dynamically replace <expiryDays> with the value of LockForums.expiryDays
        LockForums.expiryMessage = LockForums.expiryMessage.replace(/<expiryDays>/g, LockForums.expiryDays);
 
        if (
            mediaWiki.config.get('wgNamespaceNumber') !== 1201 || // Threads
            $(".BreadCrumbs a:first").text() !== LockForums.forumName // Forums only
        )
            return;
 
        // Get the last comment date
        var expiryMilliseconds = LockForums.expiryDays * 24 * 60 * 60 * 1000,
            then = $('ul.comments li.SpeechBubble .permalink').last().text().split(/,(.+)/),
            oldDate,
            currentDate = new Date(),
            diffMilliseconds,
            expired;
 
        // Small trick by MGeffro
        if (then.length === 1) {
            then = then[0];
        } else {
            then = then[1];
        }
 
        //Depolonizacja polskich nazw miesięcy
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
 
        //Kontynuacja kodu
        oldDate = new Date(then.trim());
        diffMilliseconds = currentDate.getTime() - oldDate.getTime();
        expired = diffMilliseconds > expiryMilliseconds;
 
        // lock commenting if expired
        if (expired) {
            $('textarea.replyBody')
                .attr({
                    placeholder: LockForums.expiryMessage,
                    disabled: 'disabled'
                })
                .height(50);
        }
 
        // expose public interface
        window.LockForums = LockForums;
    });
}(window.LockForums));
// </source>
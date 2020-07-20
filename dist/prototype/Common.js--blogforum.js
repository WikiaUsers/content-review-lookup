/**
 * LockOldBlogs
 * http://dev.wikia.com/wiki/LockOldBlogs
 *
 * - Original version by User:Joeyaa
 * - Modified to work with Wikia's Lazy Loading by User:Mathmagician
 * - Configuration options by User:Mathmagician
 * - additional category option by User:Pecoes
 * 
 * License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
 */
if (mediaWiki.config.get('wgNamespaceNumber') === 500) {
    (function ($, mw, LockOldBlogs, ArticleComments) {
        "use strict";

        // set up default config options if custom ones haven't been supplied
        // want to ensure variables have the right type, so not using $.extend here
        if (typeof LockOldBlogs !== "object" || LockOldBlogs === null) {
            LockOldBlogs = {};
        }
        if (typeof LockOldBlogs.expiryDays !== "number") {
            LockOldBlogs.expiryDays = 30;
        }
        if (typeof LockOldBlogs.expiryMessage !== "string") {
            LockOldBlogs.expiryMessage = "This blog hasn\'t been commented on for over <expiryDays> days. There is no need to comment.";
        }
        if (typeof LockOldBlogs.nonexpiryCategory !== "string") {
            LockOldBlogs.nonexpiryCategory = "Nonexpiry blogs";
        }
        
        if (!$.isArray(LockOldBlogs.expiryCategories)) {
            LockOldBlogs.expiryCategories = [];
        }

        // dynamically replace <expiryDays> with the value of LockOldBlogs.expiryDays
        LockOldBlogs.expiryMessage = LockOldBlogs.expiryMessage.replace(/<expiryDays>/g, LockOldBlogs.expiryDays);
        
        // (private) true if comments should be locked, false otherwise
        var expired; // needs to be undefined by default
        
        // (public) gets whether or not this blog has expired
        LockOldBlogs.getExpiration = function () {
            return expired;
        };
        
        // Finds if any of element of array A is in array B
        // [Only works with primitives (strings/numbers), not objects]
        function areAnyInArray(arr1, arr2) {
            /*jshint curly:false */
            var i = arr1.length, hash = {};
            while (i--) hash[arr1[i]] = 1;
            i = arr2.length;
            while (i--) {
                if (hash[arr2[i]] === 1) return true;
            }
            return false;
        }

        // (private) sets whether or not this blog has expired
        function setExpiration() {
            var wgCategories = mw.config.get('wgCategories'),
                $articleCommentsLI,
                expiryMilliseconds,
                then,
                year,
                month,
                date,
                oldDate,
                currentDate,
                diffMilliseconds;

            // return false if this blog is in the nonexpiry category
            // indexOf is IE9+, Wikia supports IE8
            if (-1 !== $.inArray(LockOldBlogs.nonexpiryCategory, wgCategories)) {
                return (expired = false);
            }
            
            // return false if this blog is not on the list of categories that expire
            // (if there is no list of categories then it's treated as match-any)
            if (LockOldBlogs.expiryCategories.length && !areAnyInArray(LockOldBlogs.expiryCategories, wgCategories)) {
                return (expired = false);
            }

            // return false if there aren't any comments on this blog
            // NOTE: Lazy Loading needs to be complete before parser reaches this line
            $articleCommentsLI = $('#article-comments-ul li.SpeechBubble');
            if ($articleCommentsLI.length < 1) {
                return (expired = false);
            }

            // return whether or not the blog has expired
            expiryMilliseconds = LockOldBlogs.expiryDays * 24 * 60 * 60 * 1000;
            then = $articleCommentsLI
                .first()
                .find('.permalink')
                .attr('href')
                .match(/\d{8}/)[0];
            year = +then.substring(0, 4);
            month = +then.substring(4, 6) - 1;
            date = +then.substring(6);
            oldDate = new Date(year, month, date);
            currentDate = new Date();
            diffMilliseconds = currentDate.getTime() - oldDate.getTime();
            return (expired = diffMilliseconds > expiryMilliseconds);
        }

        // (private) function to lock comments when called
        function lockComments() {
            // if expired is undefined, calculate it
            if (expired === undefined) {
                setExpiration();
            }

            // if this blog has expired, lock commenting
            if (expired) {
                $('#article-comm')
                .attr('disabled', 'disabled')
                .text(LockOldBlogs.expiryMessage);

                $('#article-comm-submit').attr('disabled', 'disabled');

                $('.article-comm-reply').remove();
            }
        }

        // (private) initialize LockOldBlogs
        function initLockOldBlogs() {
            if (ArticleComments && ArticleComments.addHover) {
                var realFunc = ArticleComments.addHover;
                ArticleComments.addHover = function () {
                    var result = realFunc.apply(ArticleComments, arguments);
                    lockComments();
                    return result;
                };
            }

            // special case where article comments have already loaded (shouldn't happen)
            if ($('#article-comments-ul li.SpeechBubble').length > 0) {
                lockComments();
            }
        }

        // add onload handler
        $(initLockOldBlogs);

        // expose public interface
        window.LockOldBlogs = LockOldBlogs;
    }(jQuery, mediaWiki, window.LockOldBlogs, window.ArticleComments));
}

/* </source> */
/* __NOWYSIWYG__
/**
 * Convert "A Wikia contributor" to IP address by User:Mathmagician
 * https://dev.wikia.com/wiki/RevealAnonIP/code.js
 *
 * - original functionality from User:Rappy 4187
 * - works in article/blog comments and on Special:WikiActivity
 * - safe to use together with AjaxRC script from dev.wikia.com
 * - works when viewing pages 2, 3, etc. of article comments
 * - reloads when article comments paginate thanks to User:Pecoes
 * - JSHint / some bug fixes / improvements also by User:Lunarity
 *
 * License: CC-BY-SA - https://creativecommons.org/licenses/by-sa/3.0/
 */
(function ($, mw, RevealAnonIP, ArticleComments, WikiActivity) {
    "use strict";

    RevealAnonIP = $.extend(RevealAnonIP, {});
    // Check for multiple instantiations. If it's active already then quit.
    if (typeof(RevealAnonIP.reveal) === 'function') {
        return;
    }

    // converts "A Wikia contributor" -> IP address when called
    // Depends on mw.util. Must not be called until mw.loader.load('mediawiki.util')
    // has succeeded.
    function revealIPs() {

        // core MediaWiki functions for checking if a string is an IP address
        var isIPv4Address = mw.util.isIPv4Address,
            isIPv6Address = mw.util.isIPv6Address;

        // reveal all IP addresses
        // .activityfeed covers Special:WikiActivity and <activityfeed />
        // .edited-by covers article comments and Recent Wiki Activity module
        // Walls display the IP address next to the "A Wikia Contributor" so filter
        // those out.
        $('.edited-by > a').not('#Wall *')
        .add($('#Forum .last-post > a').filter(function () { return !this.children.length; })) // Boards and Special:Forum
        .add('.activityfeed cite a')
        .each(function () {
            var $this = $(this),
                href = $this.attr('href'),
                lastSlash = href.lastIndexOf('/'),
                ip;

            if (lastSlash !== -1) {
                ip = href.substr(lastSlash + 1);

                if (isIPv4Address(ip) || isIPv6Address(ip)) {
                    $this.text(ip);
                }
            }
        });
    }

    // This can't be run until mw.util is loaded
    RevealAnonIP.reveal = $.noop;

    // This code functions as the constructor for the singleton
    // It installs hooks into various anchor points in the page and applies
    // the reveal logic once.
    // is false.
    RevealAnonIP.init = function () {
        mw.loader.using('mediawiki.util', function () {
            RevealAnonIP.reveal = revealIPs;
            $(window).load(function () {
                if (ArticleComments) {
                    // from User:Pecoes - reload when article comments paginate
                    var realFunc = ArticleComments.addHover;
                    ArticleComments.addHover = function () {
                        var result = realFunc.apply(this, arguments);
                        RevealAnonIP.reveal();
                        return result;
                    };
                } else {
                    if (WikiActivity) {
                        var ajaxFunc = WikiActivity.ajax;
                        WikiActivity.ajax = function (a, b, callback) {
                            return ajaxFunc.call(this, a, b, function () {
                                var result = callback.apply(this, arguments);
                                RevealAnonIP.reveal();
                                return result;
                            });
                        };
                    }
                    // add RevealAnonIP.reveal to ajaxCallAgain for use with AjaxRC
                    if (!$.isArray(window.ajaxCallAgain)) {
                        window.ajaxCallAgain = [];
                    }
                    window.ajaxCallAgain.push(RevealAnonIP.reveal);
                }

                // reveal() after initialized
                RevealAnonIP.reveal();
            });
        });

        // Disable the init function so it can't be called twice
        this.init = $.noop;
    };

    RevealAnonIP.init();

    // expose public interface
    window.RevealAnonIP = RevealAnonIP;
}(jQuery, mediaWiki, window.RevealAnonIP, window.ArticleComments, window.WikiActivity));
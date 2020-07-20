$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});
// Alert contributors that they are editing with their bot flag set
 
if (mediaWiki.config.get("wgAction") == "edit" && mediaWiki.config.get("wgUserGroups").indexOf("bot") != -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: red; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set.</div>')
}

//**********************************
// Support for [[Template:USERNAME]]
//**********************************
 
$(document).ready(function(){
  if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace === null || wgUserName === null) {return;}
  $(".insertusername").each(function(){
    $(this).html(wgUserName);
  });
});

// ****************
// Duplicate images
// ****************
if (wgPageName == "My_Lego_Network_Users_Wiki:Duplicate_images"){
importScriptPage('DupImageList/code.js', 'dev');
}

importScriptPage('AnswersEditButton/code.js', 'dev');
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/*

 */
 
 /*jshint undef:true, curly:true, browser:true, jquery:true, indent:4 */
 /*global mediaWiki */
 
 /**
 * Convert "A Wikia contributor" to IP address by User:Mathmagician
 * http://dev.wikia.com/wiki/RevealAnonIP/code.js
 *
 * - original functionality from User:Rappy 4187
 * - works in article/blog comments and on Special:WikiActivity
 * - safe to use together with AjaxRC script from dev.wikia.com
 * - works when viewing pages 2, 3, etc. of article comments
 * - can use RevealAnonIP.permissions to grant permission to specific groups
 * - reloads when article comments paginate thanks to User:Pecoes
 * - JSHint / some bug fixes / improvements also by User:Lunarity
 *
 * License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
 */
 (function ($, mw, RevealAnonIP, ArticleComments) {
    "use strict";
 
    // set up RevealAnonIP object and its permissions property
    RevealAnonIP = $.extend(RevealAnonIP, {});
    RevealAnonIP.permissions = $.extend(['*'], RevealAnonIP.permissions);
 
    // Check for multiple instantiations. If it's active already then quit.
    if (typeof(RevealAnonIP.reveal) === 'function') {
        return;
    }
 
    // private property
    var hasPermission = (function/* setPermission*/() {
        var permissions = RevealAnonIP.permissions;
        var usergroups;
 
        usergroups = mw.config.get('wgUserGroups');
        usergroups = $.extend(['*'], usergroups);
 
        for (var i = 0, plen = permissions.length; i < plen; ++i) {
            for (var j = 0, ulen = usergroups.length ; j < ulen ; ++j) {
                if (usergroups[j] === permissions[i]) {
                    return true;
                }
            }
        }
        return false;
    }());
 
    // converts "A Wikia contributor" -> IP address when called
    // Depends on mw.util. Must not be called until  mw.loader.load('mediawiki.util')
    // has succeeded.
    function revealIPs() {
        if (!hasPermission) {
            return;
        }
 
        // core MediaWiki functions for checking if a string is an IP address
        var isIPv4Address = mw.util.isIPv4Address,
            isIPv6Address = mw.util.isIPv6Address;
 
        // reveal all IP addresses
        // .activityfeed covers Special:WikiActivity and <activityfeed />
        // .edited-by covers article comments and Recent Wiki Activity module
        $('.activityfeed cite a, .edited-by > a').each(function () {
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
 
    // gets permission level
    RevealAnonIP.getPermission = function () {
        return hasPermission;
    };
 
    // This code functions as the constructor for the singleton
    // It installs hooks into various anchor points in the page and applies
    // the reveal logic once.
    // This function can be invoked manually to force-enable if it hasPermission
    // is false.
    RevealAnonIP.init = function () {
        hasPermission = true;
        mw.loader.using('mediawiki.util', function () {
            RevealAnonIP.reveal = revealIPs;
            $(function ($) {
                if (ArticleComments) {
                    // from User:Pecoes - reload when article comments paginate
                    var realFunc = ArticleComments.addHover;
                    ArticleComments.addHover = function () {
                        var result = realFunc.apply(ArticleComments, arguments);
                        RevealAnonIP.reveal();
                        return result;
                    };
                } else {
                    // add RevealAnonIP.reveal to ajaxCallAgain for use with AjaxRC
                    var ajaxRC = window.ajaxCallAgain;
                    if (!$.isArray(ajaxRC)) {
                        ajaxRC = [];
                    }
                    ajaxRC.push(RevealAnonIP.reveal);
                    window.ajaxCallAgain = ajaxRC;
                }
 
                // reveal() after initialized
                RevealAnonIP.reveal();
            });
        });
 
        // Disable the init function so it can't be called twice
        this.init = $.noop;
    };
 
    // If the user has permission, start now
    if (hasPermission) {
        RevealAnonIP.init();
    }
 
    // expose public interface
    window.RevealAnonIP = RevealAnonIP;
}(jQuery, mediaWiki, window.RevealAnonIP, window.ArticleComments));
 
/*

*/
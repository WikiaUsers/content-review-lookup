/* Any JavaScript here will be loaded for all users on every page load. */

/* Social Media buttons script */
/* Partially from http://dev.wikia.com/wiki/ShowHide/code.js by Daniel Friesen and others */
// Namespaces the buttons should be loaded on
if (!$.isArray(window.SocialMediaButtonsNamespaces)) {
    window.SocialMediaButtonsNamespaces = [0, 6, 14, 500];
}
 
// Check namespace of article, cross-reference with namespaces entered
if (SocialMediaButtonsNamespaces.indexOf(mediaWiki.config.get('wgNamespaceNumber')) > -1 && wgAction === 'view') {
    (function ($, mw, Wikia) {
        "use strict";
        //Configuration
        var config = window.SocialMediaButtons = $.extend(true, {
            position: 'top', //Position of the buttons: "top" or "bottom"
            colorScheme: 'dark', //Color scheme of the buttons: "dark", "light" or "color"
            buttonSize: 'default', //Button size: "default" or "#px"
            wikiTwitterAccount: 'default', //Wiki Twitter account: "default" or "accountname"
            userLang: true, //i18n settings: "true"
            // German
            de: {
                google: "Teile diesen Artikel auf Google+",
                facebook: "Teile diesen Artikel auf Facebook",
                twitter: "Teile diesen Artikel auf Twitter",
                vkontakte: "Teile diesen Artikel auf VKontakte",
                weibo: "Teile diesen Artikel auf Weibo",
                via: "via",
                twitterAccount: "Wikia_de",
                twitterMessage: "+von+Fans,+für+Fans.+"
            },
            // English
            en: {
                google: "Share this on Google+",
                facebook: "Share this on Facebook",
                twitter: "Share this on Twitter",
                vkontakte: "Share this on VKontakte",
                weibo: "Share this on Weibo",
                via: "via",
                twitterAccount: "Wikia",
                twitterMessage: "+from+the+most+knowledgeable+fans+on+the+planet.+"
            },
            // Spanish
            es: {
                google: "Compártelo en Google+",
                facebook: "Compártelo en Facebook",
                twitter: "Compártelo en Twitter",
                vkontakte: "Compártelo en VKontakte",
                weibo: "Compártelo en Weibo",
                via: "vía",
                twitterAccount: "Wikia_es",
                twitterMessage: "+de+fans,+para+fans.+"
            },
            // French
            fr: {
                google: "Partager sur Google+",
                facebook: "Partager sur Facebook",
                twitter: "Partager sur Twitter",
                vkontakte: "Partager sur VKontakte",
                weibo: "Partager sur Weibo",
                via: "@Wikia_fr",
                twitterAccount: "Wikia_fr",
                twitterMessage: "+from+the+most+knowledgeable+fans+on+the+planet.+"
            },
            // Hungarian
            hu: {
                google: "Megosztás a Google+-on",
                facebook: "Megosztás a Facebookon",
                twitter: "Megosztás a Twitteren",
                vkontakte: "Megosztás a VKontakte",
                weibo: "Megosztás a Weibo-on",
                via: "via",
                twitterAccount: "Wikia",
                twitterMessage: "+a+földkerekség+legnagyobb+tudású+rajongóitól.+"
            },
            // Japanese
            ja: {
                google: "Google+でシェアする",
                facebook: "Facebookでシェアする",
                twitter: "Twitterでシェアする",
                vkontakte: "VKontakteでシェアする",
                weibo: "Weiboでシェアする",
                via: "を用いて",
                twitterAccount: "Wikia",
                twitterMessage: "+from+the+most+knowledgeable+fans+on+the+planet.+"
            },
            // Dutch
            nl: {
                google: "Deel dit op Google+",
                facebook: "Deel dit op Facebook",
                twitter: "Deel dit op Twitter",
                vkontakte: "Deel dit op VKontakte",
                weibo: "Deel dit op Weibo",
                via: "via",
                twitterAccount: "Wikia_nl",
                twitterMessage: "+from+the+most+knowledgeable+fans+on+the+planet.+"
            },
            // Polish
            pl: {
                google: "Podziel się na Google+",
                facebook: "Podziel się na Facebooku",
                twitter: "Podziel się na Twitterze",
                vkontakte: "Podziel się na VKontakte",
                weibo: "Podziel się na Weibo",
                via: "przez",
                twitterAccount: "Wikia_pl",
                twitterMessage: "+from+the+most+knowledgeable+fans+on+the+planet.+"
            },
            // Portuguese
            pt: {
                google: "Compartilhe no Google+",
                facebook: "Compartilhe no Facebook",
                twitter: "Compartilhe no Twitter",
                vkontakte: "Compartilhe no VKontakte",
                weibo: "Compartilhe no Weibo",
                via: "via",
                twitterAccount: "Wikia_pt",
                twitterMessage: "+from+the+most+knowledgeable+fans+on+the+planet.+"
            },
            // Russian
            ru: {
                google: "Поделиться в Google+",
                facebook: "Поделиться в Facebook",
                twitter: "Поделиться в Twitter",
                vkontakte: "Поделиться ВКонтакте",
                weibo: "Поделиться в Weibo",
                via: "с помощью",
                twitterAccount: "wikia_ru",
                twitterMessage: "+—+от+фанатов.+Для+фанатов.+"
            },
            // Chinese
            zh: {
                google: "在Google+上分享",
                facebook: "在Facebook上分享",
                twitter: "在Twitter上分享",
                vkontakte: "在VKontakte上分享",
                weibo: "在Weibo上分享",
                via: "を用いて",
                twitterAccount: "Wikia",
                twitterMessage: "+from+the+most+knowledgeable+fans+on+the+planet.+"
            }
        }, window.SocialMediaButtons || {});
 
        // i18n function
        function msg(name) {
            if (config.userLang && mw.config.get('wgUserLanguage') in config && name in config[mw.config.get('wgUserLanguage')]) {
                return config[mw.config.get('wgUserLanguage')][name];
            }
            if (mw.config.get('wgContentLanguage') in config && name in config[mw.config.get('wgContentLanguage')]) {
                return config[mw.config.get('wgContentLanguage')][name];
            }
            return config.en[name];
        }
 
        // Image colorscheme
        if (config.colorScheme === 'light') {
            var gInactive = 'https://images.wikia.nocookie.net/messaging/images/7/7c/Google%2B_Light.png',
                fbInactive = 'https://images.wikia.nocookie.net/messaging/images/5/56/Facebook_Light.png',
                twitterInactive = 'https://images.wikia.nocookie.net/messaging/images/b/b8/Twitter_Light.png';
            if (mw.config.get('wgUserLanguage') === "ru") {
                var vkInactive = 'https://images.wikia.nocookie.net/messaging/images/1/1d/VKLight.png';
            }
            if (mw.config.get('wgContentLanguage') === "zh") {
                var weiboInactive = 'https://images.wikia.nocookie.net/messaging/images/1/16/WeiboLight.png';
            }
        } else if (config.colorScheme === 'color') {
            var gInactive = 'https://images.wikia.nocookie.net/messaging/images/7/74/Google%2B_Hover.png',
                fbInactive = 'https://images.wikia.nocookie.net/messaging/images/2/22/Facebook_Hover.png',
                twitterInactive = 'https://images.wikia.nocookie.net/messaging/images/5/5d/Twitter_Hover.png';
            if (mw.config.get('wgUserLanguage') === "ru") {
                var vkInactive = 'https://images.wikia.nocookie.net/messaging/images/a/a6/VKHover.png';
            }
            if (mw.config.get('wgContentLanguage') === "zh") {
                var weiboInactive = 'https://images.wikia.nocookie.net/messaging/images/9/93/WeiboHover.png';
            }
        } else {
            var gInactive = 'https://images.wikia.nocookie.net/messaging/images/4/45/Google%2B_Dark.png',
                fbInactive = 'https://images.wikia.nocookie.net/messaging/images/8/83/Facebook_Dark.png',
                twitterInactive = 'https://images.wikia.nocookie.net/messaging/images/d/d1/Twitter_Dark.png';
            if (mw.config.get('wgUserLanguage') === "ru") {
                var vkInactive = 'https://images.wikia.nocookie.net/messaging/images/1/14/VKDark.png';
            }
            if (mw.config.get('wgContentLanguage') === "zh") {
                var weiboInactive = 'https://images.wikia.nocookie.net/messaging/images/8/8f/WeiboDark.png';
            }
        }
        var gHover = 'https://images.wikia.nocookie.net/messaging/images/7/74/Google%2B_Hover.png',
            fbHover = 'https://images.wikia.nocookie.net/messaging/images/2/22/Facebook_Hover.png',
            twitterHover = 'https://images.wikia.nocookie.net/messaging/images/5/5d/Twitter_Hover.png';
 
        // Pre-load the hover images to avoid delay
        var gHoverLoad = new Image(),
            fbHoverLoad = new Image(),
            twitterHoverLoad = new Image();
        gHoverLoad.src = gHover;
        fbHoverLoad.src = fbHover;
        twitterHoverLoad.src = twitterHover;
 
        if (mw.config.get('wgUserLanguage') === "ru") {
            var vkHover = 'https://images.wikia.nocookie.net/messaging/images/a/a6/VKHover.png';
 
            var vkHoverLoad = new Image();
            vkHoverLoad.src = vkHover;
        }
        if (mw.config.get('wgContentLanguage') === "zh") {
            var weiboHover = 'https://images.wikia.nocookie.net/messaging/images/9/93/WeiboHover.png';
 
            var weiboHoverLoad = new Image();
            weiboHoverLoad.src = weiboHover;
        }
 
        // Share URL's
        var currentURL = document.URL;
        var currentSiteName = mw.config.get('wgSiteName').replace(/ /g, "+");
        var currentPageName = mw.config.get('wgPageName').replace(/_/g, "+").replace(/"/g, "%22");
 
        if (mw.config.get('wgContentLanguage') === "zh") {
            var siteName = mw.config.get('wgSiteName');
            var sudaRef = mw.config.get('wgServer').replace(/http\:\/\//g, "");
        }
 
        var gShare = 'https://plus.google.com/share?url=' + currentURL;
        var fbShare = 'https://facebook.com/sharer/sharer.php?u=' + currentURL;
 
        if (config.wikiTwitterAccount !== 'default') {
            var twitterAcc = config.wikiTwitterAccount;
        } else {
            var twitterAcc = msg('twitterAccount');
        }
        var twitterShare = 'https://twitter.com/intent/tweet?original_referer=' + currentURL + '&text=' + currentPageName + msg('twitterMessage') + currentSiteName + '&url=' + currentURL + '&via=' + twitterAcc; + '&via=' + twitterAcc;
 
        if (mw.config.get('wgUserLanguage') === 'ru') {
            var vkShare = 'http://vk.com/share.php?url=' + currentURL + '&title=' + currentPageName;
        }
        if (mw.config.get('wgContentLanguage') === "zh") {
            var weiboShare = 'http://service.weibo.com/share/share.php?url=' + currentURL + '&title=' + siteName + '&sudaref=' + sudaRef;
        }
        //Border color, positioning and HTML for the various namespaces
        if (mediaWiki.config.get('wgNamespaceNumber') === 500) {
            var borderColor = $('#WikiaUserPagesHeader').css('border-bottom-color');
            var appendTo = '#WikiaUserPagesHeader';
            var topHTML = 'float: right; margin-top: -24px;';
        } else if (mediaWiki.config.get('wgNamespaceNumber') === 1201) {
            var borderColor = $('#mw-content-text .BreadCrumbs').css('border-bottom-color');
            var appendTo = '#mw-content-text .BreadCrumbs';
            var topHTML = 'float:right;';
        } else {
            var borderColor = $('#WikiaPageHeader').css('border-bottom-color');
            var appendTo = '#WikiaPageHeader';
            if (mediaWiki.config.get('wgPageName') === mediaWiki.config.get('wgMainPageTitle').replace(/ /g, '_')) {
                var topHTML = 'padding-top: 4px; position: absolute; top: 29px; right: 0;';
            } else {
                var topHTML = 'position: absolute; top: 29px; right: 0;';
            }
        }
 
        // Append the buttons
        $(function () {
            if (config.position === 'top') {
                if (config.buttonSize !== 'default') {
                    var buttonSizePX = config.buttonSize;
                } else {
                    var buttonSizePX = "21px";
                }
                var socialHTML = '<div style="' + topHTML + '" class="socialmedia-share top"><a target="_blank" title="' + msg("google") + '" href="' + gShare + '"><img style="cursor: pointer;" class="share-button googleplus ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + gInactive + '" /></a><a target="_blank" title="' + msg("facebook") + '" href="' + fbShare + '"><img style="cursor: pointer; padding-left: 1px;" class="share-button facebook ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + fbInactive + '" /></a><a target="_blank" title="' + msg("twitter") + '" href="' + twitterShare + '"><img style="cursor: pointer; padding-left: 1px;" class="share-button twitter ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + twitterInactive + '" /></a></div>';
 
                $(appendTo).append(socialHTML);
 
                if ($('#WikiaPageHeader').length) {
                    var WikiaPageHeaderHeight = $('#WikiaPageHeader').height();
                    if (mediaWiki.config.get('wgPageName') !== mediaWiki.config.get('wgMainPageTitle').replace(/ /g, '_')) {
                        var paddingBottom = parseInt(buttonSizePX.replace('px', '')) + 5 + 'px';
                        $('#WikiaPageHeader').css('padding-bottom', paddingBottom);
                    } else if (mediaWiki.config.get('wgPageName') === mediaWiki.config.get('wgMainPageTitle').replace(/ /g, '_')) {
                        var paddingBottom = parseInt(buttonSizePX.replace('px', '')) + 8 + 'px';
                        $('#WikiaPageHeader').css('padding-bottom', paddingBottom);
                    }
                }
            } else {
                if (config.buttonSize !== 'default') {
                    var buttonSizePX = config.buttonSize;
                } else {
                    var buttonSizePX = "64px";
                }
                var socialHTML = '<section class="SocialMediaButtons" id="SocialMediaButtons" style="border-top: 1px solid ' + borderColor + '; text-align: center; margin-top: 20px;"><div style="padding-top: 1px; margin-top: 10px; text-align: center;" class="socialmedia-share bottom"><a target="_blank" title="' + msg("google") + '" href="' + gShare + '"><img style="cursor: pointer;" class="share-button googleplus ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + gInactive + '"></a><a target="_blank" title="' + msg("facebook") + '" href="' + fbShare + '"><img style="cursor: pointer; padding-left: 5px;" class="share-button facebook ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + fbInactive + '"></a><a target="_blank" title="' + msg("twitter") + '" href="' + twitterShare + '"><img style="cursor: pointer; padding-left: 5px;" class="share-button twitter ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + twitterInactive + '"></a></div></section>';
 
                $('#mw-content-text').append(socialHTML);
            }
 
			if (mw.config.get('wgUserLanguage') === 'ru') {
                if (config.position === 'top') {
                    $('.socialmedia-share').prepend('<a target="_blank" title="' + msg("vkontakte") + '" href="' + vkShare + '"><img style="cursor: pointer;" class="share-button vkontakte ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + vkInactive + '" /></a>');
                } else {
                    $('.socialmedia-share').prepend('<a target="_blank" title="' + msg("vkontakte") + '" href="' + vkShare + '"><img style="cursor: pointer;" class="share-button vkontakte ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + vkInactive + '" /></a>');
                    $('.socialmedia-share .googleplus').css('padding-left', '5px');
                }
            }
            if (mw.config.get('wgContentLanguage') === "zh") {
                if (config.position === 'top') {
                    $('.socialmedia-share').prepend('<a target="_blank" title="' + msg("weibo") + '" href="' + weiboShare + '"><img style="cursor: pointer;" class="share-button weibo ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + weiboInactive + '" /></a>');
                } else {
                    $('.socialmedia-share').prepend('<a target="_blank" title="' + msg("weibo") + '" href="' + weiboShare + '"><img style="cursor: pointer;" class="share-button weibo ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + weiboInactive + '" /></a>');
                    $('.socialmedia-share .googleplus').css('padding-left', '5px');
                }
            }
 
            // Change the button on hover
            $('.socialmedia-share .googleplus').hover(function () {
                $(this).attr('src', gHover);
            }, function () {
                $(this).attr('src', gInactive);
            });
            $('.socialmedia-share .facebook').hover(function () {
                $(this).attr('src', fbHover);
            }, function () {
                $(this).attr('src', fbInactive);
            });
            $('.socialmedia-share .twitter').hover(function () {
                $(this).attr('src', twitterHover);
            }, function () {
                $(this).attr('src', twitterInactive);
            });
            if (mw.config.get('wgUserLanguage') === 'ru') {
                $('.socialmedia-share .vkontakte').hover(function () {
                    $(this).attr('src', vkHover);
                }, function () {
                    $(this).attr('src', vkInactive);
                });
            }
            if (mw.config.get('wgContentLanguage') === "zh") {
                $('.socialmedia-share .weibo').hover(function () {
                    $(this).attr('src', weiboHover);
                }, function () {
                    $(this).attr('src', weiboInactive);
                });
            }
            // Pop-up instead of new window
            function createPopup(url, windowName) {
                var popupWindow = window.open(url, windowName, 'height=500,width=600,menubar=0,toolbar=0,location=1,scrollbars=1,status=1,resizable=1');
                if (window.focus) {
                    popupWindow.focus();
                }
                return false;
            }
 
            function trackClick(label, event) {
                return Wikia.Tracker.track({
                    action: Wikia.Tracker.ACTIONS.CLICK_LINK_BUTTON,
                    browserEvent: event,
                    category: 'custom-share',
                    label: label,
                    trackingMethod: 'ga'
                });
            }
 
            $('.socialmedia-share img').on('click', function (event) {
                event.preventDefault();
                var socialNetwork = $(this).attr('class');
                var socialNetworkURL = $(this).parent().attr('href');
                if (socialNetwork.indexOf('googleplus') >= 0) {
                    createPopup(socialNetworkURL, 'googleplusPopup');
                    trackClick('googleplus', event);
                } else if (socialNetwork.indexOf('facebook') >= 0) {
                    createPopup(socialNetworkURL, 'facebookPopup');
                    trackClick('facebook', event);
                } else if (socialNetwork.indexOf('twitter') >= 0) {
                    createPopup(socialNetworkURL, 'twitterPopup');
                    trackClick('twitter', event);
                } else if (socialNetwork.indexOf('vkontakte') >= 0) {
                    createPopup(socialNetworkURL, 'vkPopup');
                    trackClick('vk', event);
                } else if (socialNetwork.indexOf('weibo') >= 0) {
                    createPopup(socialNetworkURL, 'weiboPopup');
                    trackClick('weibo', event);
                }
            });
        });
    }(jQuery, mediaWiki, Wikia));
}
//

/**
 * InactiveUsers
 *
 * documentation at: http://dev.wikia.com/wiki/InactiveUsers
 * © Peter Coester, 2012
 * 
 */
/*jshint curly:false laxbreak:true es5:true jquery:true */
 
(function (module, $, mw) {
 
    "use strict";
 
    var log = (function () {
        if (!window.console || !window.console.log) return function () {};
        var log = typeof window.console.log === 'object' ?  Function.prototype.bind.call(window.console.log, window.console) : window.console.log;
        return function () {
            log.apply(window.console, ['InactiveUsers', module].concat(Array.prototype.slice.call(arguments)));
        };
    }());
 
    // Polyfill for ECMAScript 5 function (so it works in older browsers)
    if (!Date.prototype.toISOString) Date.prototype.toISOString = function() {
        function pad(s) {
            return (s += '').length < 2 ? '0' + s : s;
        }
        return this.getUTCFullYear()
            + '-' + pad(this.getUTCMonth() + 1)
            + '-' + pad(this.getUTCDate())
            + 'T' + pad(this.getUTCHours())
            + ':' + pad(this.getUTCMinutes())
            + ':' + pad(this.getUTCSeconds())
            + '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).substr(-3)
            + 'Z';
    };
 
    function getSkinType () {
        switch (mw.config.get('skin')) {
            case 'uncyclopedia': case 'wowwiki': case 'lostbook': case 'monobook':
                return 'monobook';
            case 'oasis': case 'wikia':
                return 'oasis';
            default:
                return false;
        }
    }
 
    function getUserName () {
        var namespace = mw.config.get('wgNamespaceNumber'),
            title     = mw.config.get('wgTitle'),
            user      = mw.config.get('wgUserName'),
            special   = mw.config.get('wgCanonicalSpecialPageName'),
            page      = mw.config.get('wgPageName'),
            indexphp  = mw.config.get('wgScript');
        switch (module.skinType) {
            case 'monobook':
                if (2 !== namespace || -1 !== title.indexOf('/')) return false;
                return title;
            case 'oasis':
                if (-1 < [2,3,500,501,1200].indexOf(namespace) && -1 === title.indexOf('/')) {
                    return title;
                } else if (-1 === namespace && -1 < ['Contributions','Following'].indexOf(special)) {
                    if (indexphp === location.pathname) {
                        return $.getUrlVar('target') || false;
                    }
                    var lastPart = location.pathname.split('/').pop();
                    if (lastPart.length && lastPart !== page) {
                        return decodeURIComponent(lastPart.replace(/_/g, ' '));
                    }
                    return user;
                }
                return false;
            default:
                return false;
        }
    }
 
    function isoDateNDaysAgo (days) {
        return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    }
 
    function getApiUrl () {
        // mw.util.wikiScript('api') is only available in MW 1.19
        return mw.config.get('wgScriptPath') + '/api' + mw.config.get('wgScriptExtension') +
               '?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
               '&ucuser='  + encodeURIComponent(module.userName) +
               '&ucstart=' + isoDateNDaysAgo(0) +
               '&ucend='   + isoDateNDaysAgo(30 * Math.max(parseInt(module.months, 10) || 1, 1));
    }
 
    function labelAsInactive () {
        switch (module.skinType) {
            case 'oasis':
                $(function () {
                    var context = $('#UserProfileMasthead');
                    context.find('.inactive-user').remove();
                    var container = context.find('hgroup');
                    if ('1.16.5' === mw.config.get('wgVersion')) {
                        container.append(
                            '<span class="group inactive-user">' + module.text +  '</span>'
                        );
                    } else {
                        var css = container.find('.tag').length ? ' style="margin-left: 10px !important"' : '';
                        container.append(
                            '<span class="tag inactive-user"' + css + '>' + module.text +  '</span>'
                        );
                    }
                });
                break;
            case 'monobook':
                $(function () {
                    var context = $('h1#firstHeading');
                    context.find('.inactive-user').remove();
                    context.append(
                        ' <span class="inactive-user">[' + module.text +  ']</span>'
                    );
                });
                break;
        }
    }
 
    module = $.extend({
        text: 'inactive', gone: [], months: 3, debug: false
    }, module);
 
    module.skinType = getSkinType();
    module.userName = getUserName();
 
    if (!module.skinType || !module.userName) {
        if (module.debug) log('abort');
        return;
    }
 
    if (-1 < module.gone.indexOf(module.userName)) {
        if (module.debug) log('gone');
        labelAsInactive();
    } else {
        module.apiUrl = getApiUrl ();
        $.getJSON(module.apiUrl, function (result) {
            module.reply = result;
            if (result.query && result.query.usercontribs && !result.query.usercontribs.length) {
                if (module.debug) log('query', result);
                labelAsInactive();
            } else if (module.debug) log('abort');
        });
    }
 
} (window.InactiveUsers = window.InactiveUsers || {}, jQuery, mediaWiki));
 
//

/** 
 * __NOWYSIWYG__
 *
 * lists all admins on the wiki
 * documentation at: http://dev.wikia.com/wiki/ListAdmins
 * © Peter Coester, 2012
 * 
 */
/*jshint curly:false */
/*global mediaWiki */
$(function ($) {
    "use strict";
    if (!$('#admin-list').length) return;
    $.getJSON('/api.php?action=query&list=allusers&augroup=sysop&format=json', function (data) {
        if (data.query && data.query.allusers) {
            var html = '';
            for (var i = 0; i < data.query.allusers.length; i++) {
                var n = data.query.allusers[i].name;
                var nURL = mediaWiki.util.wikiUrlencode(n);
                html += '<li><a href="/wiki/User:' + nURL + '">' + n + '</a></li>';
            }
            if (html.length) {
                $('#admin-list').html('<ul>' + html + '</ul>');
            }
        }
    });
});
//

/*jshint smarttabs:true jquery:true browser:true bitwise:false laxbreak:true */
/*global mediaWiki */
 
// ES5 requires Date.parse to support this, ES3 doesn't (i.e. IE8 chokes on it)
Date.parseISO8601 = function(text) {
	"use strict";
	// Decode MediaWiki ISO8601 Strict date and convert it to milliseconds
	// This regex only supports basic dates that MediaWiki produces, it isn't comprehensive.
	// It also doesn't support non UTC Timezones, I'm pretty sure MW never curveballs us
	// like that though so it should be fine.
	var when = (/^(\d{4})-?(\d\d)-?(\d\d)[T\s](\d\d):?(\d\d):?(\d\d)(?:\.?(\d+))?(?:Z|\+00(?::?00)?)$/).exec(text);
	if (!when) {
		return NaN;
	}
	return +new Date(when[1], when[2] - 1, when[3], when[4], when[5], when[6], ('.' + when[7]) * 1000 | 0);
};
 
/**
 * UserTags Loader script
 *
 * UserTags is quite large and complex which means that the page weight is too much to bear
 * on every page load since most pages ARE NOT user pages. This mini-script decides whether
 * or not the current page is a user page then loads the full UserTags script only on those
 * pages. This drastically reduces the weight since this is far lighter so represents a
 * more acceptable every-page cost.
 */
(function(window, $, mw, config) {
"use strict";
 
// Core logic, detect user page and determine the skin and user names
var loaderData = (function($, mw) {
	//
	// Figure out what skin we're on.
	//
	var siteSkin = mw.config.get('skin');
	if (({oasis:1, wikia:1})[siteSkin] === 1) {
		siteSkin = 'oasis';
	} else if (({wowwiki:1, uncyclopedia:1, monobook:1, vector:1})[siteSkin] === 1) {
		siteSkin = 'monobook';
	} else {
		if (window.console) {
			window.console.log('USERTAGS(Loader): Unsupported skin:', siteSkin);
		}
		return;
	}
 
	//
	// Grab the username (complicated) and decide if we are going to run or not.
	// NOTE: We could use mw.Title for this but it must be loaded using
	//	mw.loader.using('mediaWiki.Title') first and doesn't really give us the right tools.
	//
	var username = mw.config.get('wgTitle'),
	    namespace = mw.config.get('wgNamespaceNumber') | 0;
 
	if (siteSkin === 'oasis') {
		// We need to figure out if we're on a user page or not without a DOM query
		// since we want to launch the AJAX ASAP without waiting for the DOM.
		if (({'-1':1, 2:1, 3:1, 500:1, 1200:1})[namespace] !== 1) {
			return;
		}
 
		// No masthead on edit pages
		// Message Walls are always in edit mode
		if (mw.config.get('wgAction') === 'edit' && namespace !== 1200) {
			return;
		}
 
		// MediaWiki disallows names from containing forward slashes which is very
		// useful since we need to check for subpages and forward slashes are the
		// only real way to do it.
		// (Subpages are lacking the masthead)
		if (({1200:1, 500:1, 2:1, 3:1})[namespace] === 1 && username.indexOf('/') !== -1) {
			return;
		}
 
		// Special pages need special handling...
		if (namespace === -1) {
			username = null;
			namespace = mw.config.get('wgCanonicalSpecialPageName');
			if (namespace === 'Contributions') {
				// wgPageName/wgTitle does not include the username, we need to pull
				// it directly from the window location.
				username = window.location.pathname;
 
				// Special:Contributions is dumb, here are the URL possibilities:
				// Special:Contributions = You
				// Special:Contributions/ = You
				// Special:Contributions/Username = Username
				// index.php?title=Special:Contributions = You
				// index.php?title=Special:Contributions&target= = You
				// index.php?title=Special:Contributions&target=Username = Username
				// Special:Contributions?target=Username = Username (*sigh*)
				// Special:Contributions/Username?target=OtherUser = OtherUser (*facepalm*)
 
				// Find /Username
				namespace = window.decodeURIComponent(username.substr(username.lastIndexOf('/') + 1));
				// No user name, it displays self
				namespace = (namespace !== mw.config.get('wgPageName') && namespace);
 
				// Find ?target=Username
				username = (/(?:^\?|&)target=([^&]*)/).exec(window.location.search);
				// If target is missing or has an empty string then it displays self
				username = (username && window.decodeURIComponent(username[1]));
 
				// Target param overrides the slash param
				username = username || namespace;
 
				// Canonicalise back to space instead of underscores
				username = (username && username.replace(/_/g, ' '));
			} else if (namespace !== 'Following') { // Following is self only
				return; // Some other special page.
			}
			// If the username is blank then they show self.
			username = username || mw.config.get('wgUserName');
		}
	} else {
		// User, User Talk, Message Wall
		if (({2:1, 3:1, 1200:1})[namespace] !== 1) {
			return;
		}
 
		// If we're on a subpage, drop the subpage part
		username = username.match(/^[^\/]+/)[0];
	}
	// NOTE: We only get here if this IS a compatible user page
 
	return {
		skin: siteSkin,
		user: username
	};
})($, mw);
 
// Make sure the config exists and is usable
config = ($.isPlainObject(config) && config) || {};
 
// If it's a user page then we need to expose our data to the core
if (loaderData) {
	window.UserTagsJS = config;
	config.loader = loaderData;
 
	// Debugging hook for debugging arbitrary Wikis without having to modify
	// MediaWiki:Common.js to enable debug mode.
	if ((/(?:^\?|&)debugusertags=1(?:&|$)/i).test(window.location.search)) {
		config.debug = true;
	}
 
	// Default module configuration when one is not provided.
	// TODO: Maybe I should just force this always using $.extend()?
	//	[i.e. optout by false to disable instead of optin]
	config.modules = ($.isPlainObject(config.modules) && config.modules) || {};
	if ($.isEmptyObject(config.modules)) {
		config.modules = {
			inactive: true, // Internal defaults
			newuser: true, // Internal defaults
			autoconfirmed: true,
			mwGroups: true, // Internal defaults
			metafilter: {
				sysop: ['bureaucrat','founder'],
				bureaucrat: ['founder'],
				chatmoderator: ['sysop','bureaucrat']
			}
		};
	}
	// Force load the blocking modules unless they are manually disabled
	// (Manual disable means manually set to false/0/etc instead of just being undefined)
	config.modules.stopblocked = config.modules.stopblocked
		|| config.modules.stopblocked === void 0;
	// Only Monobook needs this, OasisTagsModule can scrape the blocked state from
	// the DOM instead.
	config.modules.isblocked = config.modules.isblocked
		|| (config.modules.isblocked === void 0 && loaderData.skin === 'monobook');
	// Force the i18n module to load
	config.modules.i18n = true;
}
 
// Dependency computations for loading modules
var importList = (function(config, alwaysOnly) {
	// These are core modules that have irregular features so need special handling
	// Most modules fit the "module.NAME.js" pattern
	var moduleMap = {
		explode: { s: 'w:dev:UserTags/module.implode.js' },
		prefLanguages: { s: 'w:dev:UserTags/module.prefLanguages.js', always: true }
	};
	moduleMap.prefCoding = moduleMap.prefLanguages;
 
	// Look for external module requests
	// NOTE: Disabled. Needs a design review for if this is the way I want to go or not.
	/*if ($.isArray(config.externals)) {
		data = config.externals;
		for (var i = 0, len = data.length ; i < len ; ++i) {
			module = data[i] + '';
			if (alwaysOnly) {
				if (module.substr(0, 5) !== 'meta.') {
					continue;
				}
			}
			module = 'w:dev:UserTags/' + module + '.js';
			if (hash[module] !== 1) {
				hash[module] = 1;
				list[list.length] = module;
			}
		}
	}*/
 
	// Check all the modules for matches in the above list.
	// Hash ensures that each one will only be imported once.
	/*jshint forin:true */
	var list = [], hash = {}, exts = config.extensions || {}, script, data, module;
	for (module in config.modules) {
		// Skip already loaded
		if (exts[module] !== void 0) { continue; }
 
		if (moduleMap.hasOwnProperty(module)) {
			data = moduleMap[module];
			if (alwaysOnly && !data.always) {
				continue;
			}
			script = data.s;
		} else if (!alwaysOnly) {
			// Attempt to load the module by name from the Dev page
			script = 'w:dev:UserTags/module.' + module + '.js';
		} else {
			continue;
		}
		if (hash[script] !== 1) {
			hash[script] = 1;
			list[list.length] = script;
		}
	}
	/*jshint forin:false */
 
	// Improve caching by ensuring list always has the same order
	list.sort();
 
	// Core script (must always be last, obviously)
	if (!alwaysOnly) {
		list[list.length] = 'w:dev:UserTags/core.js';
	}
	return list;
})(config, !loaderData);
 
// If we aren't going to load anything then we're done.
if (!importList.length) {
	// Tidy up to reduce memory usage
	window.UserTagsJS = null; // IE8 won't let you delete stuff from the window
	try { delete window.UserTagsJS; } catch(e) { /* IE8 throws just to increase it's crapness */ }
	return;
}
// If we are going to load modules despite not being on a user page then we
// need to honor the module contract by ensuring the global exists and has
// the extensions member. Everything else is unnecessary.
if (!loaderData) {
	window.UserTagsJS = config = {};
}
config.extensions = ($.isPlainObject(config.extensions) && config.extensions) || {};
 
// Do the actual load. We also need to load the core script's dependencies from
// ResourceLoader as well.
var coreDeps = ['mediawiki.util'];
mw.loader.load(coreDeps, null, true);
if (config.debug !== 'noload') {
	mw.loader.using(coreDeps, function() {
		window.importArticles({ type:'script', articles: importList });
	});
} else {
	config.imports = importList;
}
 
// Done.
})(window, jQuery, mediaWiki, window.UserTagsJS);
 
//

/*jshint curly:false smarttabs:true laxbreak:true laxcomma:true jquery:true browser:true */
/*global importArticle mediaWiki */
 
/**
 * This script is a loader thunk.
 * It converts people still using UserBadges to UserTags by converting their
 * configuration data and importing UserTags instead.
 *
 * This should be avoided as it's slower than loading UserTags directly.
 */
 
 
importArticle({type: 'script', article:'w:c:dev:UserTags/code.js'});
 
// Convert configuration block to be usable with UserTags
// We don't enable all of UserTags' default features as I want the behaviour to be indistinguishable
if (!window.UserTagsJS)
window.UserTagsJS = (function(oldConf) {
	"use strict";
	var newConf = { tags: {}, modules: {} };
 
	// Legacy default configuration for mirroring purposes
	oldConf = $.extend({
		inactive: 30, // Inactive if no edits in this many days, 0=disabled
		gone: {},
		groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 /*Added->*/, bannedfromchat:1, bot:1, sysop:1, 'bot-global':1 },
		stopBlocked: true, // Don't display any non-custom badges for blocked users
		newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
		nonusers: true, // Tag global Wikia accounts that have never edited anything
		custom: {}, // Map of user names to arrays of strings
		names: {} // Badge display names
		//debug: false
	}, oldConf);
 
	// 1-to-1
	newConf.modules.inactive = oldConf.inactive;
	newConf.modules.stopblocked = !!oldConf.stopBlocked;
	newConf.modules.autoconfirmed = newConf.modules.newuser = !!oldConf.newusers;
	newConf.modules.nonuser = !!oldConf.nonusers;
 
	// Convert map to array
	newConf.modules.mwGroups = [];
	if (!$.isEmptyObject(oldConf.groups)) {
		for (var g in oldConf.groups) {
			if (oldConf.groups.hasOwnProperty(g)) {
				if (!oldConf.groups[g]) continue;
				newConf.modules.mwGroups.push(g);
			}
		}
	}
 
	// Forced config
	// These were forced in the old design but aren't forced in UserTags
	newConf.modules.mwGroups.push('bannedfromchat', 'sysop');
 
	// Now the hard part.
	// We need to convert both custom+names to tags AND configure the custom module
	if ($.isPlainObject(oldConf.names) && !$.isEmptyObject(oldConf.names)) {
		newConf.tags = oldConf.names;
	}
	var arr, user;
	if ($.isPlainObject(oldConf.custom) && !$.isEmptyObject(oldConf.custom)) {
		newConf.modules.custom = {};
		var i, len, guid = 0, id;
		for (user in oldConf.custom) {
			if (oldConf.custom.hasOwnProperty(user)) {
				arr = oldConf.custom[user];
				if (!$.isArray(arr)) continue;
 
				newConf.modules.custom[user] = [];
				for (i = 0, len = arr.length ; i < len ; ++i) {
					id = 'UserBadges-Legacy-' + guid++;
					// order:0 = mediaWiki, we want offset from those
					newConf.tags[id] = { u: arr[i], order: i+1 };
					newConf.modules.custom[user].push(id);
				}
			}
		}
	}
 
	// Gone list is more custom tags
	if ($.isPlainObject(oldConf.gone) && !$.isEmptyObject(oldConf.gone)) {
		newConf.modules.custom = (newConf.modules.custom || {});
		for (user in oldConf.gone) {
			if (oldConf.gone.hasOwnProperty(user)) {
				if (!oldConf.gone[user]) continue;
				arr = (newConf.modules.custom[user] || []);
				arr.push('inactive');
				newConf.modules.custom[user] = arr;
			}
		}
	}
 
	// Monobook styles, since UserBadges dealt with this itself
	if (({wikia:1, oasis:1})[mediaWiki.config.get('skin')] !== 1) {
		mediaWiki.util.addCSS(
			  '.tag:before {'
			+ 'content: "["'
			+ '}'
			+ '.tag:after {'
			+ 'content: "]"'
			+ '}'
			+ '.tag {'
			+ 'font-size: 10pt;'
			+ 'vertical-align: middle;'
			+ '}'
			+ '.tag-container > .tag:first-child {'
			+ 'margin-left: 1ex;'
			+ '}'
		);
	}
 
	return newConf;
})(window.UserBadgesJS || {});
try { delete window.UserBadgesJS; } catch(e) { window.UserBadgesJS = null; /* IE8 sucks */ }
 
//
//<syntaxhighlight lang="javascript">
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
                twitterMessage: "+By+Fans,+For+Fans.+"
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
                twitterMessage: "+By+Fans,+For+Fans.+"
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
                twitterMessage: "+By+Fans,+For+Fans.+"
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
                twitterMessage: "+By+Fans,+For+Fans.+"
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
                twitterMessage: "+By+Fans,+For+Fans.+"
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
                twitterMessage: "+By+Fans,+For+Fans.+"
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
                twitterMessage: "+By+Fans,+For+Fans.+"
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
//</syntaxhighlight>
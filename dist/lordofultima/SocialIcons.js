/* Social Media buttons script */
/* Partially from http://dev.wikia.com/wiki/ShowHide/code.js by Daniel Friesen and others */
// Namespaces the buttons should be loaded on
if (!$.isArray(window.SocialMediaButtonsNamespaces)) {
    window.SocialMediaButtonsNamespaces = [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 110, 111, 500, 501, 502, 503, 1201, 2002];
}

// Check namespace of article, cross-reference with namespaces entered
if (SocialMediaButtonsNamespaces.indexOf(mediaWiki.config.get('wgNamespaceNumber')) > -1) {
    (function($, mw, Wikia) {
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
                weibo: "Teile diesen Artikel auf Weibo",
                via: "via",
                twitterAccount: "Wikia_de"
            },
            // English
            en: {
                google: "Share this on Google+",
                facebook: "Share this on Facebook",
                twitter: "Share this on Twitter",
                weibo: "Share this on Weibo",
                via: "via",
                twitterAccount: "Wikia"
            },
            // Spanish
            es: {
                google: "Compártelo en Google+",
                facebook: "Compártelo en Facebook",
                twitter: "Compártelo en Twitter",
                weibo: "Compártelo en Weibo",
                via: "vía",
                twitterAccount: "Wikia_es"
            },
            // French
            fr: {
                google: "Partager sur Google+",
                facebook: "Partager sur Facebook",
                twitter: "Partager sur Twitter",
                weibo: "Partager sur Weibo",
                via: "@Wikia_fr",
                twitterAccount: "Wikia_fr"
            },
            // Hungarian
            hu: {
                google: "Megosztás a Google+-on",
                facebook: "Megosztás a Facebookon",
                twitter: "Megosztás a Twitteren",
                weibo: "Megosztás a Weibo-on",
                via: "via",
                twitterAccount: "Wikia"
            },
            // Japanese
            ja: {
                google: "Google+でシェアする",
                facebook: "Facebookでシェアする",
                twitter: "Twitterでシェアする",
                weibo: "Weiboでシェアする",
                via: "を用いて",
                twitterAccount: "Wikia"
            },
            // Dutch
            nl: {
                google: "Deel dit op Google+",
                facebook: "Deel dit op Facebook",
                twitter: "Deel dit op Twitter",
                weibo: "Deel dit op Weibo",
                via: "via",
                twitterAccount: "Wikia_nl"
            },
            // Polish
            pl: {
                google: "Podziel się na Google+",
                facebook: "Podziel się na Facebooku",
                twitter: "Podziel się na Twitterze",
                weibo: "Podziel się na Weibo",
                via: "przez",
                twitterAccount: "Wikia_pl"
            },
            // Portuguese
            pt: {
                google: "Compartilhe no Google+",
                facebook: "Compartilhe no Facebook",
                twitter: "Compartilhe no Twitter",
                weibo: "Compartilhe no Weibo",
                via: "via",
                twitterAccount: "Wikia_pt"
            },
            // Chinese
            zh: {
                google: "在Google+上分享",
                facebook: "在Facebook上分享",
                twitter: "在Twitter上分享",
                weibo: "在Weibo上分享",
                via: "を用いて",
                twitterAccount: "Wikia"
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

        // Images
        var gInactive = 'https://images.wikia.nocookie.net/lordofultima/images/b/ba/Googleplus-wood.png',
            gHover = 'https://images.wikia.nocookie.net/lordofultima/images/6/6f/G%2B-wood-hover.png',
            fbInactive = 'https://images.wikia.nocookie.net/lordofultima/images/1/10/Facebook-wood.png',
            fbHover = 'https://images.wikia.nocookie.net/lordofultima/images/e/ed/Fb-wood-hover.png',
            twitterInactive = 'https://images.wikia.nocookie.net/lordofultima/images/5/5c/Twitter-wood.png',
            twitterHover = 'https://images.wikia.nocookie.net/lordofultima/images/e/e7/Wood-twitter-hover.png';

        // Pre-load the hover images to avoid delay
        var gHoverLoad = new Image(),
            fbHoverLoad = new Image(),
            twitterHoverLoad = new Image();
        gHoverLoad.src = gHover;
        fbHoverLoad.src = fbHover;
        twitterHoverLoad.src = twitterHover;

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
        }
        else {
            var twitterAcc = msg('twitterAccount');
        }
        var twitterShare = 'https://twitter.com/intent/tweet?original_referer=' + currentURL + '&text=' + currentPageName + '+-+' + currentSiteName + '&url=' + currentURL + '&via=' + twitterAcc;
        +'&via=' + twitterAcc;

        if (mw.config.get('wgContentLanguage') === "zh") {
            var weiboShare = 'http://service.weibo.com/share/share.php?url=' + currentURL + '&title=' + siteName + '&sudaref=' + sudaRef;
        }

        //Border color, positioning and HTML
        var appendTo = '#WikiaRail';
        var topHTML = 'margin-bottom: 8px; width: 56%; height: 50px;';

        // Append the buttons
        $(function() {
            if (config.position === 'top') {
                if (config.buttonSize !== 'default') {
                    var buttonSizePX = config.buttonSize;
                }
                else {
                    var buttonSizePX = "50px";
                }
                var socialHTML = '<center><div style="' + topHTML + '" class="socialmedia-share top"><a target="_blank" title="' + msg("google") + '" href="' + gShare + '"><img style="cursor: pointer;" class="share-button googleplus ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + gInactive + '" /></a><a target="_blank" title="' + msg("facebook") + '" href="' + fbShare + '"><img style="cursor: pointer; margin-left: 5%;" class="share-button facebook ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + fbInactive + '" /></a><a target="_blank" title="' + msg("twitter") + '" href="' + twitterShare + '"><img style="cursor: pointer; margin-left: 5%;" class="share-button twitter ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + twitterInactive + '" /></a></div></center>';

                $(appendTo).append(socialHTML);

                if (config.buttonSize !== 'default') {
                    var buttonSizePX = config.buttonSize;
                }
                else {
                    var buttonSizePX = "50px";
                }
            }

            if (mw.config.get('wgContentLanguage') === "zh") {
                if (config.position === 'top') {
                    $('.socialmedia-share').prepend('<a target="_blank" title="' + msg("weibo") + '" href="' + weiboShare + '"><img style="cursor: pointer;" class="share-button weibo ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + weiboInactive + '" /></a>');
                }
                else {
                    $('.socialmedia-share').prepend('<a target="_blank" title="' + msg("weibo") + '" href="' + weiboShare + '"><img style="cursor: pointer;" class="share-button weibo ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + weiboInactive + '" /></a>');
                    $('.socialmedia-share .googleplus').css('padding-left', '5px');
                }
            }

            // Change the button on hover
            $('.socialmedia-share .googleplus').hover(function() {
                $(this).attr('src', gHover);
            }, function() {
                $(this).attr('src', gInactive);
            });
            $('.socialmedia-share .facebook').hover(function() {
                $(this).attr('src', fbHover);
            }, function() {
                $(this).attr('src', fbInactive);
            });
            $('.socialmedia-share .twitter').hover(function() {
                $(this).attr('src', twitterHover);
            }, function() {
                $(this).attr('src', twitterInactive);
            });
            if (mw.config.get('wgContentLanguage') === "zh") {
                $('.socialmedia-share .weibo').hover(function() {
                    $(this).attr('src', weiboHover);
                }, function() {
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

            $('.socialmedia-share img').on('click', function(event) {
                event.preventDefault();
                var socialNetwork = $(this).attr('class');
                var socialNetworkURL = $(this).parent().attr('href');
                if (socialNetwork.indexOf('googleplus') >= 0) {
                    createPopup(socialNetworkURL, 'googleplusPopup');
                    trackClick('googleplus', event);
                }
                else if (socialNetwork.indexOf('facebook') >= 0) {
                    createPopup(socialNetworkURL, 'facebookPopup');
                    trackClick('facebook', event);
                }
                else if (socialNetwork.indexOf('twitter') >= 0) {
                    createPopup(socialNetworkURL, 'twitterPopup');
                    trackClick('twitter', event);
                }
                else if (socialNetwork.indexOf('weibo') >= 0) {
                    createPopup(socialNetworkURL, 'weiboPopup');
                    trackClick('weibo', event);
                }
            });
        });
    }(jQuery, mediaWiki, Wikia));
}
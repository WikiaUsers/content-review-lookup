/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Social Media buttons script */
/* Partially from http://dev.wikia.com/wiki/ShowHide/code.js by Daniel Friesen and others */
 
// Only load on article, blog and thread pages
if ( mediaWiki.config.get( 'wgPageName' ) !== mediaWiki.config.get( 'wgMainPageTitle' ).replace(/ /g,'_') && ({ 0:1, 500:1, 1201:1 }[ mediaWiki.config.get( 'wgNamespaceNumber' ) ] === 1 )) {
(function ($, mw) {
	"use strict";
	//Configuration
	var config = window.SocialMediaButtons = $.extend(true, {
		position: 'top', //Position of the buttons: "top" or "bottom"
		colorScheme: 'dark', //Color scheme of the buttons: "dark", "light" or "light"
		userLang: true, //i18n settings: "true"
		// German
		de: {
			google: "Teile diesen Artikel auf Google+",
			facebook: "Teile diesen Artikel auf Facebook",
			twitter: "Teile diesen Artikel auf Twitter",
			via: "via+@Wikia_de"
		},
		// English
		en: {
			google: "Share this on Google+",
			facebook: "Share this on Facebook",
			twitter: "Share this on Twitter",
			via: "via+@Wikia"			
		},
		// Spanish
		es: {
			google: "Compártelo en Google+",
			facebook: "Compártelo en Facebook",
			twitter: "Compártelo en Twitter",
			via: "vía+@Wikia_es"
		},
		// Hungarian
		hu: {
			google: "Megosztás a Google+-on",
			facebook: "Megosztás a Facebookon",
			twitter: "Megosztás a Twitteren",
			via: "via+@Wikia"			
		},
		// Japanese
		ja: {
			google: "Google+でシェアする",
			facebook: "Facebookでシェアする",
			twitter: "Twitterでシェアする",
			via: "を用いて+@Wikia"
		},
		// Dutch
		nl: {
			google: "Deel dit op Google+",
			facebook: "Deel dit op Facebook",
			twitter: "Deel dit op Twitter",
			via: "via+@Wikia_nl"
		},
		// Polish
		pl: {
			google: "Udostępnij na Google+",
			facebook: "Udostępnij na Facebook",
			twitter: "Udostępnij na Twitter",
			via: "przez+@Wikia_pl"
		},
		// Portuguese
		pt: {
			google: "Compartilhe no Google+",
			facebook: "Compartilhe no Facebook",
			twitter: "Compartilhe no Twitter",
			via: "via+@Wikia_pt"
		},
		// Chinese
		zh: {
			google: "在Google+上分享",
			facebook: "在Facebook上分享",
			twitter: "在Twitter上分享",
			via: "を用いて+@Wikia"
		},
                // French
		fr: {
			google: "Partager sur Google+",
			facebook: "Partager sur Facebook",
			twitter: "Partager sur Twitter",
			via: "via+@wikia_fr"			
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
	} else if (config.colorScheme === 'color') {
		var gInactive = 'https://images.wikia.nocookie.net/messaging/images/7/74/Google%2B_Hover.png',
		    fbInactive = 'https://images.wikia.nocookie.net/messaging/images/2/22/Facebook_Hover.png',
		    twitterInactive = 'https://images.wikia.nocookie.net/messaging/images/5/5d/Twitter_Hover.png';
	} else {
		var gInactive = 'https://images.wikia.nocookie.net/messaging/images/4/45/Google%2B_Dark.png',
		    fbInactive = 'https://images.wikia.nocookie.net/messaging/images/8/83/Facebook_Dark.png',
		    twitterInactive = 'https://images.wikia.nocookie.net/messaging/images/d/d1/Twitter_Dark.png';
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
 
	// Share URL's
	var currentURL = document.URL;
 
	var gShare = 'https://plus.google.com/share?url=' + currentURL;
	var fbShare = 'https://facebook.com/sharer/sharer.php?u=' + currentURL;
	var twitterShare = 'https://twitter.com/intent/tweet?original_referer=' + currentURL + '&text=' + currentURL + '+' + msg('via');
 
	//Border color, positioning and HTML for the various namespaces
	if (mw.config.get('wgCanonicalNamespace') === "User_blog") {
		var borderColor = $('#WikiaUserPagesHeader').css('border-bottom-color');
		var topHTML = 'float: right; margin-top: -24px;';
		var appendTo = '#WikiaUserPagesHeader';
	} else if (mw.config.get('wgCanonicalNamespace') === "Thread") {
		var borderColor = $('#mw-content-text .BreadCrumbs').css('border-bottom-color');
		var topHTML = 'float:right;';
		var appendTo = '#mw-content-text .BreadCrumbs';
	} else {
		var borderColor = $('#WikiaPageHeader').css('border-bottom-color');
		var topHTML = 'position: absolute; top: 29px; right: 0;';
		var appendTo = '#WikiaPageHeader';
	}
 
	// Append the buttons
	$(function () {
		if (config.position === 'top') {
			var socialHTML = '<div style="' + topHTML + '" class="socialmedia-share top"><a target="_blank" title="' + msg("google") + '" href="' + gShare + '"><img class="share-button googleplus ' + config.colorScheme + '" height="21px" width="21px" src="' + gInactive + '" /></a><a target="_blank" title="' + msg("facebook") + '" href="' + fbShare + '"><img style="padding-left: 1px;" class="share-button facebook ' + config.colorScheme + '" height="21px" width="21px" src="' + fbInactive + '" /></a><a target="_blank" title="' + msg("twitter") + '" href="' + twitterShare + '"><img style="padding-left: 1px;" class="share-button twitter ' + config.colorScheme + '" height="21px" width="21px" src="' + twitterInactive + '" /></a></div>';
 
			$(appendTo).append(socialHTML);
 
			if (mw.config.get('wgCanonicalNamespace') === "") {
				var WikiaPageHeaderHeight = $('#WikiaPageHeader').height();
				if (WikiaPageHeaderHeight <= 28) {
					$('#WikiaPageHeader').css('padding-bottom', '27px');
				}
			}
		} else {
			var socialHTML = '<section class="SocialMediaButtons" id="SocialMediaButtons" style="border-top: 1px solid ' + borderColor + '; text-align: center; margin-top: 20px;"><div style="padding-top: 1px; margin-top: 10px; text-align: center;" class="socialmedia-share bottom"><a target="_blank" title="' + msg("google") + '" href="' + gShare + '"><img class="share-button googleplus ' + config.colorScheme + '" src="' + gInactive + '"></a><a target="_blank" title="' + msg("facebook") + '" href="' + fbShare + '"><img style="padding-left: 5px;" class="share-button facebook ' + config.colorScheme + '" src="' + fbInactive + '"></a><a target="_blank" title="' + msg("twitter") + '" href="' + twitterShare + '"><img style="padding-left: 5px;" class="share-button twitter ' + config.colorScheme + '" src="' + twitterInactive + '"></a></div></section>';
 
			$('#mw-content-text').append(socialHTML);
		}
 
		//Change the button on hover
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
	});
}(jQuery, mediaWiki));
}
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Zeromaro': 'ADMIN',
        'Spellbinder666': 'ADMIN',
        'Aldo_The_Fox': 'ADMIN',
        

    }
};
 
/* ================
 Imports
 ================ */
 
importArticles({
    type: "script",
    articles: [
        'w:c:dev:SignatureCheck/code.js',
        'w:c:dev:CategoryRenameAuto-update/code.js',
        'w:c:dev:MessageWallUserTags/code.js'
    ]
});
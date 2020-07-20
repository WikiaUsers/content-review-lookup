//<syntaxhighlight lang="javascript">
/* Social Media buttons script */
/* Partially from http://dev.wikia.com/wiki/ShowHide/code.js by Daniel Friesen and others */
//Extra namespaces
if (SocialMediaButtonsExtraNamespaces === undefined) {
	var SocialMediaButtonsExtraNamespaces = [];
}

// Only load on article, blog and thread pages or on user defined namespaces
if ( mediaWiki.config.get( 'wgPageName' ) !== mediaWiki.config.get( 'wgMainPageTitle' ).replace(/ /g,'_') && ({ 0:1, 1:1, 4:1, 6:1, 8:1, 10:1, 12:1, 14:1, 500:1, 1201:1 }[ mediaWiki.config.get( 'wgNamespaceNumber' ) ] === 1) || SocialMediaButtonsExtraNamespaces.indexOf(mediaWiki.config.get( 'wgNamespaceNumber' )) > -1) {
(function ($, mw) {
	"use strict";
	//Configuration
	var config = window.SocialMediaButtons = $.extend(true, {
		position: 'top', //Position of the buttons: "top" or "bottom"
		colorScheme: 'dark', //Color scheme of the buttons: "dark", "light" or "color"
		buttonSize: 'default', //Button size: "default" or "#px"
		userLang: true, //i18n settings: "true"
		// German
		de: {
			google: "Teile diesen Artikel auf Google+",
			facebook: "Teile diesen Artikel auf Facebook",
			twitter: "Teile diesen Artikel auf Twitter",
			weibo: "Teile diesen Artikel auf Weibo",
			via: "via+@Wikia_de"
		},
		// English
		en: {
			google: "Share this on Google+",
			facebook: "Share this on Facebook",
			twitter: "Share this on Twitter",
			weibo: "Share this on Weibo",
			via: "via+@Wikia"			
		},
		// Spanish
		es: {
			google: "Compártelo en Google+",
			facebook: "Compártelo en Facebook",
			twitter: "Compártelo en Twitter",
			weibo: "Compártelo en Weibo",
			via: "vía+@Wikia_es"
		},
		// French
		fr: {
			google: "Partager sur Google+",
			facebook: "Partager sur Facebook",
			twitter: "Partager sur Twitter",
			weibo: "Partager sur Weibo",
			via: "via+@wikia_fr"			
		},
		// Hungarian
		hu: {
			google: "Megosztás a Google+-on",
			facebook: "Megosztás a Facebookon",
			twitter: "Megosztás a Twitteren",
			weibo: "Megosztás a Weibo-on",
			via: "via+@Wikia"			
		},
		// Japanese
		ja: {
			google: "Google+でシェアする",
			facebook: "Facebookでシェアする",
			twitter: "Twitterでシェアする",
			weibo: "Weiboでシェアする",
			via: "を用いて+@Wikia"
		},
		// Dutch
		nl: {
			google: "Deel dit op Google+",
			facebook: "Deel dit op Facebook",
			twitter: "Deel dit op Twitter",
			weibo: "Deel dit op Weibo",
			via: "via+@Wikia_nl"
		},
		// Polish
		pl: {
			google: "Udostępnij na Google+",
			facebook: "Udostępnij na Facebook",
			twitter: "Udostępnij na Twitter",
			weibo: "Udostępnij na Weibo",			
			via: "przez+@Wikia_pl"
		},
		// Portuguese
		pt: {
			google: "Compartilhe no Google+",
			facebook: "Compartilhe no Facebook",
			twitter: "Compartilhe no Twitter",
			weibo: "Compartilhe no Weibo",
			via: "via+@Wikia_pt"
		},
		// Chinese
		zh: {
			google: "在Google+上分享",
			facebook: "在Facebook上分享",
			twitter: "在Twitter上分享",
			weibo: "在Weibo上分享",
			via: "を用いて+@Wikia"
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
		var gInactive = 'http://static.wikia.com/messaging/images/7/7c/Google%2B_Light.png',
		    fbInactive = 'http://static.wikia.com/messaging/images/5/56/Facebook_Light.png',
		    twitterInactive = 'http://static.wikia.com/messaging/images/b/b8/Twitter_Light.png';
			if (mw.config.get('wgContentLanguage') === "zh") {
				var weiboInactive = 'http://static.wikia.com/messaging/images/1/16/WeiboLight.png';
			}
	} else if (config.colorScheme === 'color') {
		var gInactive = 'http://static.wikia.com/messaging/images/7/74/Google%2B_Hover.png',
		    fbInactive = 'http://static.wikia.com/messaging/images/2/22/Facebook_Hover.png',
		    twitterInactive = 'http://static.wikia.com/messaging/images/5/5d/Twitter_Hover.png';
			if (mw.config.get('wgContentLanguage') === "zh") {
				var weiboInactive = 'http://static.wikia.com/messaging/images/9/93/WeiboHover.png';
			}
	} else {
		var gInactive = 'http://static.wikia.com/messaging/images/4/45/Google%2B_Dark.png',
		    fbInactive = 'http://static.wikia.com/messaging/images/8/83/Facebook_Dark.png',
		    twitterInactive = 'http://static.wikia.com/messaging/images/d/d1/Twitter_Dark.png';
			if (mw.config.get('wgContentLanguage') === "zh") {
				var weiboInactive = 'http://static.wikia.com/messaging/images/8/8f/WeiboDark.png';
			}
	}
	var gHover = 'http://static.wikia.com/messaging/images/7/74/Google%2B_Hover.png',
	    fbHover = 'http://static.wikia.com/messaging/images/2/22/Facebook_Hover.png',
	    twitterHover = 'http://static.wikia.com/messaging/images/5/5d/Twitter_Hover.png';
 
	// Pre-load the hover images to avoid delay
	var gHoverLoad = new Image(),
	    fbHoverLoad = new Image(),
	    twitterHoverLoad = new Image();
	gHoverLoad.src = gHover;
	fbHoverLoad.src = fbHover;
	twitterHoverLoad.src = twitterHover;
	
	if (mw.config.get('wgContentLanguage') === "zh") {
		var weiboHover = 'http://static.wikia.com/messaging/images/9/93/WeiboHover.png';
	
		var weiboHoverLoad = new Image();
		weiboHoverLoad.src = weiboHover;
	}
 
	// Share URL's
	var currentURL = document.URL;
	
	if (mw.config.get('wgContentLanguage') === "zh") {	
		var siteName = mw.config.get('wgSiteName');
		var sudaRef = mw.config.get('wgServer').replace(/http\:\/\//g,"");
	}
 
	var gShare = 'https://plus.google.com/share?url=' + currentURL;
	var fbShare = 'https://facebook.com/sharer/sharer.php?u=' + currentURL;
	var twitterShare = 'https://twitter.com/intent/tweet?original_referer=' + currentURL + '&text=' + currentURL + '+' + msg('via');
	
	if (mw.config.get('wgContentLanguage') === "zh") {
		var weiboShare = 'http://service.weibo.com/share/share.php?url=' + currentURL + '&title=' + siteName + '&sudaref=' + sudaRef;
	}
 
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
			if(config.buttonSize !== 'default') {
				var buttonSizePX = config.buttonSize;
			}
			else {
				var buttonSizePX = "21px";
			}
			var socialHTML = '<div style="' + topHTML + '" class="socialmedia-share top"><a target="_blank" title="' + msg("google") + '" href="' + gShare + '"><img class="share-button googleplus ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + gInactive + '" /></a><a target="_blank" title="' + msg("facebook") + '" href="' + fbShare + '"><img style="padding-left: 1px;" class="share-button facebook ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + fbInactive + '" /></a><a target="_blank" title="' + msg("twitter") + '" href="' + twitterShare + '"><img style="padding-left: 1px;" class="share-button twitter ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + twitterInactive + '" /></a></div>';
 
			$(appendTo).append(socialHTML);
 
			if ($('#WikiaPageHeader').length) {
				var WikiaPageHeaderHeight = $('#WikiaPageHeader').height();
				if (WikiaPageHeaderHeight <= 28) {
					$('#WikiaPageHeader').css('padding-bottom', '27px');
				}
			}
		} else {
			if(config.buttonSize !== 'default') {
				var buttonSizePX = config.buttonSize;
			}
			else {
				var buttonSizePX = "64px";
			}		
			var socialHTML = '<section class="SocialMediaButtons" id="SocialMediaButtons" style="border-top: 1px solid ' + borderColor + '; text-align: center; margin-top: 20px;"><div style="padding-top: 1px; margin-top: 10px; text-align: center;" class="socialmedia-share bottom"><a target="_blank" title="' + msg("google") + '" href="' + gShare + '"><img class="share-button googleplus ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + gInactive + '"></a><a target="_blank" title="' + msg("facebook") + '" href="' + fbShare + '"><img style="padding-left: 5px;" class="share-button facebook ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + fbInactive + '"></a><a target="_blank" title="' + msg("twitter") + '" href="' + twitterShare + '"><img style="padding-left: 5px;" class="share-button twitter ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + twitterInactive + '"></a></div></section>';
 
			$('#mw-content-text').append(socialHTML);
		}
		
		if (mw.config.get('wgContentLanguage') === "zh") {
			if (config.position === 'top') {	
				$('.socialmedia-share').prepend('<a target="_blank" title="' + msg("weibo") + '" href="' + weiboShare + '"><img class="share-button weibo ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + weiboInactive + '" /></a>');
			}
			else {
				$('.socialmedia-share').prepend('<a target="_blank" title="' + msg("weibo") + '" href="' + weiboShare + '"><img class="share-button weibo ' + config.colorScheme + '" height="' + buttonSizePX + '" width="' + buttonSizePX + '" src="' + weiboInactive + '" /></a>');
				$('.socialmedia-share .googleplus').css('padding-left','5px');
			}
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
		if (mw.config.get('wgContentLanguage') === "zh") {
			$('.socialmedia-share .weibo').hover(function () {
				$(this).attr('src', weiboHover);
			}, function () {
				$(this).attr('src', weiboInactive);
			});
		}
	});
}(jQuery, mediaWiki));
}
//</syntaxhighlight>
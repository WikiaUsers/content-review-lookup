var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "35px"
};

//<syntaxhighlight lang="javascript">
/* Social Media buttons script */
/* Partially from http://dev.wikia.com/wiki/ShowHide/code.js by Daniel Friesen and others */
//Extra namespaces
if (window.SocialMediaButtonsExtraNamespaces === undefined) {
	window.SocialMediaButtonsExtraNamespaces = [0, 500, 1201];
}

// Only load on article, blog and thread pages or on user defined namespaces
if ( SocialMediaButtonsExtraNamespaces.indexOf(mediaWiki.config.get( 'wgNamespaceNumber' )) > -1) {
(function ($, mw) {
	"use strict";
	//Configuration
	var config = window.SocialMediaButtons = $.extend(true, {
		position: 'top', //Position of the buttons: "top" or "bottom"
		colorScheme: 'dark', //Color scheme of the buttons: "dark", "light" or "color"
		buttonSize: 'default', //Button size: "default" or "#px"
		wikiTwitterAccount: 'default', //Wiki Twitter account: "default" or "accountname"
		userLang: true, //i18n settings: "true"
		// English
		en: {
			google: "Share this on Google+",
			facebook: "Share this on Facebook",
			twitter: "Share this on Twitter",
			weibo: "Share this on Weibo",
			via: "via",
			twitterAccount: "@Wikia"		
		},
		// Japanese
		ja: {
			google: "Google+でシェアする",
			facebook: "Facebookでシェアする",
			twitter: "Twitterでシェアする",
			weibo: "Weiboでシェアする",
			via: "を用いて",
			twitterAccount: "@Wikia"
		},
		// Chinese
		zh: {
			google: "在Google+上分享",
			facebook: "在Facebook上分享",
			twitter: "在Twitter上分享",
			weibo: "在Weibo上分享",
			via: "を用いて",
			twitterAccount: "@Wikia"
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
			if (mw.config.get('wgContentLanguage') === "zh") {
				var weiboInactive = 'https://images.wikia.nocookie.net/messaging/images/1/16/WeiboLight.png';
			}
	} else if (config.colorScheme === 'color') {
		var gInactive = 'https://images.wikia.nocookie.net/messaging/images/7/74/Google%2B_Hover.png',
		    fbInactive = 'https://images.wikia.nocookie.net/messaging/images/2/22/Facebook_Hover.png',
		    twitterInactive = 'https://images.wikia.nocookie.net/messaging/images/5/5d/Twitter_Hover.png';
			if (mw.config.get('wgContentLanguage') === "zh") {
				var weiboInactive = 'https://images.wikia.nocookie.net/messaging/images/9/93/WeiboHover.png';
			}
	} else {
		var gInactive = 'https://images.wikia.nocookie.net/messaging/images/4/45/Google%2B_Dark.png',
		    fbInactive = 'https://images.wikia.nocookie.net/messaging/images/8/83/Facebook_Dark.png',
		    twitterInactive = 'https://images.wikia.nocookie.net/messaging/images/d/d1/Twitter_Dark.png';
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
	
	if (mw.config.get('wgContentLanguage') === "zh") {
		var weiboHover = 'https://images.wikia.nocookie.net/messaging/images/9/93/WeiboHover.png';
	
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
	
	if(config.wikiTwitterAccount !== 'default') {
		var twitterAcc = '@' + config.wikiTwitterAccount;
	}
	else {
		var twitterAcc = msg('twitterAccount');
	}
	var twitterShare = 'https://twitter.com/intent/tweet?original_referer=' + currentURL + '&text=' + currentURL + '+' + msg('via') + '+' + twitterAcc;
	
	if (mw.config.get('wgContentLanguage') === "zh") {
		var weiboShare = 'http://service.weibo.com/share/share.php?url=' + currentURL + '&title=' + siteName + '&sudaref=' + sudaRef;
	}
 
	//Border color, positioning and HTML for the various namespaces
	if (mw.config.get('wgCanonicalNamespace') === "User_blog") {
		var borderColor = $('#WikiaUserPagesHeader').css('border-bottom-color');
		var appendTo = '#WikiaUserPagesHeader';
		var topHTML = 'float: right; margin-top: -24px;';
	} else if (mw.config.get('wgCanonicalNamespace') === "Thread") {
		var borderColor = $('#mw-content-text .BreadCrumbs').css('border-bottom-color');
		var appendTo = '#mw-content-text .BreadCrumbs';
		var topHTML = 'float:right;';
	} else {
		var borderColor = $('#WikiaPageHeader').css('border-bottom-color');
		var appendTo = '#WikiaPageHeader';
		if (mediaWiki.config.get( 'wgPageName' ) === mediaWiki.config.get( 'wgMainPageTitle' ).replace(/ /g,'_')) {
			var topHTML = 'padding-top: 4px; position: absolute; top: 29px; right: 0;';		
		}
		else {
			var topHTML = 'position: absolute; top: 29px; right: 0;';
		}
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
				if (WikiaPageHeaderHeight <= 28 && mediaWiki.config.get( 'wgPageName' ) !== mediaWiki.config.get( 'wgMainPageTitle' ).replace(/ /g,'_')) {
					$('#WikiaPageHeader').css('padding-bottom', '27px');
				}
				else if(WikiaPageHeaderHeight <= 28 && mediaWiki.config.get( 'wgPageName' ) === mediaWiki.config.get( 'wgMainPageTitle' ).replace(/ /g,'_')) {
					$('#WikiaPageHeader').css('padding-bottom', '30px');
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
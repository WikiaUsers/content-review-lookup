// ==UserScript==
// @name           Wikia Side Rail Social Icons
// @author         T3CHNOCIDE
// @description    Adds social media icons to the side rail of articles.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
 
function SocialIcons() {
	if (mw.config.get('wgCanonicalNamespace') != 'User' && mw.config.get('wgCanonicalNamespace') != 'User_talk' && mw.config.get('wgCanonicalNamespace') != 'User_blog' && mw.config.get('wgCanonicalNamespace') != 'Special' && mw.config.get('wgPageName') != 'Main_Page') {
		$('.WikiaSearch').append('<table cellspacing="0" style="z-index: 9999; padding-top: 10px; margin-bottom: -11px; margin-left: 5px;"><tr>'
			+ '<td style="padding-right:5px;">'
				+ '<div style="height:22px; width:32px; overflow:hidden;">'
					+ '<div class="SocialIcon">'
						+ '<a href="http://www.facebook.com/TokyoESPWiki">'
							+ '<img src="https://images.wikia.nocookie.net/destinypedia/images/8/8f/Facebook_Icon.png">'
						+ '</a>'
					+ '</div>'
				+ '</div>'
			+ '</td>'
		}
	}
}
 
addOnloadHook(SocialIcons);
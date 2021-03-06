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
						+ '<a href="http://www.facebook.com/pages/Halo-Nation/128085370648618">'
							+ '<img src="https://images.wikia.nocookie.net/destinypedia/images/8/8f/Facebook_Icon.png">'
						+ '</a>'
					+ '</div>'
				+ '</div>'
			+ '</td>'
			+ '<td style="padding-left:5px; padding-right:5px;">'
				+ '<div style="height:22px; width:32px; overflow:hidden;">'
					+ '<div class="SocialIcon">'
						+ '<a href="https://twitter.com/HaloWiki">'
							+ '<img src="https://images.wikia.nocookie.net/destinypedia/images/9/92/Twitter_Icon.png">'
						+ '</a>'
					+ '</div>'
				+ '</div>'
			+ '</td>'
			+ '<td style="padding-left:5px; padding-right:5px;">'
				+ '<div style="height:22px; width:32px; overflow:hidden;">'
					+ '<div class="SocialIcon">'
						+ '<a href="http://halo.wikia.com/wiki/Special:RecentChanges?feed=rss&amp;type=html">'
							+ '<img src="https://images.wikia.nocookie.net/destinypedia/images/c/c7/RSS_Icon.png">'
						+ '</a>'
					+ '</div>'
				+ '</div>'
			+ '</td>'
			+ '<td style="padding-left:5px;">'
				+ '<div style="height:22px; width:32px; overflow:hidden;">'
					+ '<div class="SocialIcon">'
						+ '<a href="http://www.wikia.com/Mobile%2FGameGuides">'
							+ '<img src="https://images.wikia.nocookie.net/destinypedia/images/c/c0/Game_Guides_Icon.png">'
						+ '</a>'
					+ '</div>'
				+ '</div>'
			+ '</td>'
		+ '<tr></table>');
	} else {
		if (mw.config.get('wgCanonicalNamespace') === 'User' || mw.config.get('wgCanonicalNamespace') === 'User_talk' || mw.config.get('wgCanonicalNamespace') === 'User_blog' || mw.config.get('wgCanonicalSpecialPageName') === 'Contributions' || mw.config.get('wgCanonicalSpecialPageName') === 'Following') {
			$('.tabs').append('<table cellspacing="0" style="z-index: 9999; padding-top: 10px; margin-right: 10px; float: right;"><tr>'
				+ '<td style="padding-right:5px;">'
					+ '<div style="height:22px; width:32px; overflow:hidden;">'
						+ '<div class="SocialIcon">'
							+ '<a href="http://www.facebook.com/pages/Halo-Nation/128085370648618">'
								+ '<img src="https://images.wikia.nocookie.net/destinypedia/images/8/8f/Facebook_Icon.png">'
							+ '</a>'
						+ '</div>'
					+ '</div>'
				+ '</td>'
				+ '<td style="padding-left:5px; padding-right:5px;">'
					+ '<div style="height:22px; width:32px; overflow:hidden;">'
						+ '<div class="SocialIcon">'
							+ '<a href="https://twitter.com/HaloWiki">'
								+ '<img src="https://images.wikia.nocookie.net/destinypedia/images/9/92/Twitter_Icon.png">'
							+ '</a>'
						+ '</div>'
					+ '</div>'
				+ '</td>'
				+ '<td style="padding-left:5px; padding-right:5px;">'
					+ '<div style="height:22px; width:32px; overflow:hidden;">'
						+ '<div class="SocialIcon">'
							+ '<a href="http://halo.wikia.com/wiki/Special:RecentChanges?feed=rss&amp;type=html">'
								+ '<img src="https://images.wikia.nocookie.net/destinypedia/images/c/c7/RSS_Icon.png">'
							+ '</a>'
						+ '</div>'
					+ '</div>'
				+ '</td>'
				+ '<td style="padding-left:5px;">'
					+ '<div style="height:22px; width:32px; overflow:hidden;">'
						+ '<div class="SocialIcon">'
							+ '<a href="http://www.wikia.com/Mobile%2FGameGuides">'
								+ '<img src="https://images.wikia.nocookie.net/destinypedia/images/c/c0/Game_Guides_Icon.png">'
							+ '</a>'
						+ '</div>'
					+ '</div>'
				+ '</td>'
			+ '<tr></table>');
		}
	}
}
 
addOnloadHook(SocialIcons);
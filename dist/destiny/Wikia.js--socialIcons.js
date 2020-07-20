// ==UserScript==
// @name           Wikia Side Rail Social Icons
// @author         T3CHNOCIDE
// @description    Adds social media icons to the side rail of articles.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
 
function SocialIcons() {
	if (mw.config.get('wgCanonicalNamespace') != 'User' && mw.config.get('wgCanonicalNamespace') != 'User_talk' && mw.config.get('wgCanonicalNamespace') != 'User_blog' && mw.config.get('wgCanonicalNamespace') != 'Special' && mw.config.get('wgPageName') != 'Destiny_Wiki') {
	    $('.WikiaSearch').append('<table cellspacing="0" style="z-index: 9999; margin-bottom: -11px; margin-left: 5px;"><tr>'
            + '<td style="padding-right:5px;">'
				+ '<div class="IconBox SocialContainer">'
					+ '<a href="https://www.bungie.net/en/Clan/Forum/147791">'
						+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/a/a4/Bungie_icon.png">'
					+ '</a>'
				+ '</div>'
			+ '</td>'
			+ '<td style="padding-right:5px;">'
				+ '<div class="IconBox SocialContainer"">'
					+ '<a href="https://www.facebook.com/pages/Destinypedia/498321176909780?fref=ts">'
						+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/1/1b/Facebook_icon.svg">'
					+ '</a>'
				+ '</div>'
			+ '</td>'
			+ '<td style="padding-left:5px; padding-right:5px;">'
				+ '<div class="IconBox SocialContainer">'
					+ '<a href="http://www.twitter.com/DestinyWikia">'
						+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/1/19/Twitter_icon.svg">'
					+ '</a>'
				+ '</div>'
			+ '</td>'
            + '<td style="padding-left:5px; padding-right:5px;">'
				+ '<div class="IconBox SocialContainer">'
					+ '<a href="https://plus.google.com/112749946320262064123/about">'
						+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/1/1d/Google_icon.svg">'
					+ '</a>'
				+ '</div>'
			+ '</td>'
			+ '<td style="padding-left:5px;">'
				+ '<div class="IconBox SocialContainer">'
					+ '<a href="http://destiny.wikia.com/wiki/Special:RecentChanges?feed=rss&amp;type=html">'
						+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/1/16/RSS_icon.svg">'
					+ '</a>'
				+ '</div>'
			+ '</td>'
		+ '<tr></table>');
	} else {
		if (mw.config.get('wgCanonicalNamespace') === 'User' || mw.config.get('wgCanonicalNamespace') === 'User_talk' || mw.config.get('wgCanonicalNamespace') === 'User_blog' || mw.config.get('wgCanonicalSpecialPageName') === 'Contributions' || mw.config.get('wgCanonicalSpecialPageName') === 'Following') {
			$('.tabs').append('<table cellspacing="0" style="z-index: 9999; margin-right: 10px; float: right;"><tr>'
                + '<td style="padding-right:5px;">'
	    			+ '<div class="IconBox SocialContainer">'
			    		+ '<a href="https://www.bungie.net/en/Clan/Forum/147791">'
				    		+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/a/a4/Bungie_icon.png">'
					    + '</a>'
	    			+ '</div>'
		    	+ '</td>'
			    + '<td style="padding-right:5px;">'
    				+ '<div class="IconBox SocialContainer">'
		    			+ '<a href="https://www.facebook.com/pages/Destinypedia/498321176909780?fref=ts">'
			    			+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/1/1b/Facebook_icon.svg">'
    					+ '</a>'
		    		+ '</div>'
			    + '</td>'
    			+ '<td style="padding-left:5px; padding-right:5px;">'
	    			+ '<div class="IconBox SocialContainer">'
			    		+ '<a href="http://www.twitter.com/DestinyWikia">'
				    		+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/1/19/Twitter_icon.svg">'
					    + '</a>'
	    			+ '</div>'
		    	+ '</td>'
                + '<td style="padding-left:5px; padding-right:5px;">'
    				+ '<div class="IconBox SocialContainer">'
		    			+ '<a href="https://plus.google.com/112749946320262064123/about">'
			    			+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/1/1d/Google_icon.svg">'
				    	+ '</a>'
	    			+ '</div>'
		    	+ '</td>'
    			+ '<td style="padding-left:5px;">'
	    			+ '<div class="IconBox SocialContainer">'
			    		+ '<a href="http://destiny.wikia.com/wiki/Special:RecentChanges?feed=rss&amp;type=html">'
				    		+ '<img src="https://vignette.wikia.nocookie.net/destinypedia/images/1/16/RSS_icon.svg">'
					    + '</a>'
	    			+ '</div>'
		    	+ '</td>'
    		+ '<tr></table>');
		}
	}
}
	 
addOnloadHook(SocialIcons);
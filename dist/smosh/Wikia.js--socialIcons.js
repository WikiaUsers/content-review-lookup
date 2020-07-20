// ==UserScript==
// @name           Wikia Side Rail Social Icons
// @namespace      http://userscripts.org/users/Madnessfan34537
// @author         Madnessfan34537
// @author         T3CHNOCIDE
// @description    Adds social media icons for Smosh Wiki to the side rail of articles.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://www.facebook.com/pages/Smosh-Wiki/471708619585371"><img src="https://images.wikia.nocookie.net/smosh/images/5/53/Facebookicon.png"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/SmoshWiki"><img src="http://smosh.wikia.com/wiki/File:Twittericon.png"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="http://www.youtube.com/user/SmoshWiki"><img src="https://images.wikia.nocookie.net/smosh/images/e/ea/Youtubeicon.png"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="http://myskype.info/SmoshWiki"><img src="https://images.wikia.nocookie.net/smosh/images/4/4e/Skypeicon.jpg"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="http://www.smosh.com/users/smoshwiki"><img src="https://images.wikia.nocookie.net/smosh/images/6/64/Smoshicon.jpg"></a></div></div><div style="position: absolute; margin-top:84px" class="SocialIcon"><div style="float:right;"><a href="http://smosh.wikia.com/wiki/Special:RecentChanges?feed=rss&type=html"><img src="https://images.wikia.nocookie.net/smosh/images/4/42/Rssicon.jpg"></a></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}
// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
 
// ==UserScript==
// @name           Wikia Side Rail Social Icons
// @namespace      http://userscripts.org/users/Madnessfan34537
// @author         Madnessfan34537
// @description    Adds social media icons for the wiki to the side rail of articles.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://www.facebook.com/ResidentEvilWiki?ref=hl"><img src="https://images.wikia.nocookie.net/halo/images/e/ef/MP_Facebook_Icon.png"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/RE_Wiki"><img src="https://images.wikia.nocookie.net/halo/images/a/a7/MP_Twitter_Icon.png"></a></div></div><div style="position: absolute; margin-top:84px" class="SocialIcon"><div style="float:right;"><a href="https://plus.google.com/u/0/b/109470418806696630682/"><img src="https://images.wikia.nocookie.net/residentevil/images/b/b4/MP_Google_Plus_Icon.png"></a></div></div><div style="position: absolute; margin-top:126px" class="SocialIcon"><div style="float:right;"><a href="http://residentevil.wikia.com/Special:RecentChanges?feed=rss&type=html"><img src="https://images.wikia.nocookie.net/halo/images/1/1a/MP_RSS_Icon.png"></a></div></div><div style="position: absolute; margin-top:168px" class="SocialIcon"><div style="float:right;"><a href="http://www.wikia.com/Mobile%2FGameGuides"><img src="https://images.wikia.nocookie.net/halo/images/4/4e/MP_Game_Guides_Icon.png"></a></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}
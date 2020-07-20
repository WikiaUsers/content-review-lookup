// ==UserScript==
// @name           Wikia Side Rail Social Icons
// @author         T3CHNOCIDE
// @description    Adds social media icons for Halo Nation to the side rail of articles.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
$('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://www.facebook.com/GodzillaWiki"><img src="https://images.wikia.nocookie.net/halo/images/e/ef/MP_Facebook_Icon.png"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/GodzillaWiki"><img src="https://images.wikia.nocookie.net/halo/images/a/a7/MP_Twitter_Icon.png"></a></div></div><div style="position: absolute; margin-top:84px" class="SocialIcon"><div style="float:right;"><a href="https://plus.google.com/u/0/100512352048144403856/posts"><img src="https://images.wikia.nocookie.net/493titanollante/images/6/66/Google_Plus_Icon.png"></a></div></div><div style="position: absolute; margin-top:84px" class="SocialIcon"><div style="float:right;"><a href="http://youtube.com/user/GodzillaWiki"><img src="https://images.wikia.nocookie.net/493titanollante/images/c/c0/YouTube_Icon.png"></a></div></div></div>');
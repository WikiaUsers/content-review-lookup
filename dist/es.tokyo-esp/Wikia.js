importArticles({
    type: "script",
    articles: [
       "MediaWiki:Wikia.js/Slider.js"
    ]
});
 
// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
/* importScriptPage('MediaWiki:Snow.js', 'community'); */
 
// Authenticated Bungie and 343i users
 
var authenticatedUsers = ['User:Paul_Russel', 'User_talk:Paul_Russel', 'User_blog:Paul_Russel', 'Special:Contributions/Paul_Russel'];
 
if ($.inArray(mw.config.get('wgPageName'), authenticatedUsers) > -1) {
	$('.masthead-info').find('hgroup').append('<span class="tag">Authenticated</span>')
}

/* Iconos en páginas para redes sociales */
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://www.facebook.com/TokyoESPWiki"><img src="https://images.wikia.nocookie.net/destinypedia/images/8/8f/Facebook_Icon.png"></a></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}
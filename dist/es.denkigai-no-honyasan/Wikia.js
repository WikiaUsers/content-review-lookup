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
 
// Social icons
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "25px",
	wikiTwitterAccount: "default"
};
 
importScriptPage('SocialIcons/code.js','dev');
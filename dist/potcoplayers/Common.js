/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
/****************************/
/* IMPORTED START           */
/****************************/
// Notifications popup

// Namespace for notiplus
window.notiplus = window.notiplus || {};

// Settings for notiplus
notiplus.url = '/wiki/Project:Notiplus?action=render';
notiplus.cookiePrefix = 'gfw';
notiplus.consentRequired = false;
notiplus.reverseOrder = false;
notiplus.lang = 'en';

importScriptPage('MediaWiki:Notiplus.js', 'dev')
// END Notifications popup

// Medals
importScriptPage('MediaWiki:Medals/code.js', 'dev')
// END Medals

// Extra Rollback Buttons -Thanks Monch 
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback
 
/* Standard edit summaries*/
importScript('MediaWiki:Common.js/es.js');
 
/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
 
/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');
 
/* Collapsible Tables */
importScript('MediaWiki:Common.js/collapsetables.js');
 
/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');
 
/** Dynamic Navigation Bars (experimental)**/
importScript('MediaWiki:Common.js/Nav.js');
 
/* other */ 
importScript('MediaWiki:Common.js/other.js');
 
 
/****************************/
/* END OF THE IMPORTED     */
/****************************/
 
/* Fast Delete see below */
importScriptPage('MediaWiki:Common.js/fastDelete.js');
 
 
// *****************************************************************
// Custom automatic delete buttons 
// *****************************************************************
// Adds customizable one-click deletion buttons to any deletable page.
// Requires MediaWiki:Common.js/fastDelete.js in appendScript();
 
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Cleaning up bad pages',
  'label': 'Clean-Up'};
fdButtons[fdButtons.length] = {
  'summary': 'Removing Stub Page',
  'label': 'Stub'};
 
// end Custom automatic delete buttons 
 
if(wgNamespaceNumber!=-1) addOnloadHook(function() { addPortletLink('p-cactions','/wiki/Special:Prefixindex/' + escape(wgPageName),'Subpages','ca-subpages','Show subages of ' + wgPageName); });
 
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		president: { u:'President' },
		vicepresident: { u:'Vice President' },
	}
};
 
UserTagsJS.modules.custom = {
	'Lord Andrew Mallace': ['president'], // Add President
	'WaglingtonŒ': ['vicepresident'], // Add Vice President
 
};
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// MassBlock //
massBlockDelay = 1000;
importScriptPage('MediaWiki:MassBlock/code.js', 'dev');

// BlockMessage //
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});

// RevealAnonIP //
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
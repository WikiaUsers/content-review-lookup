/* Any JavaScript here will be loaded for all users on every page load. */

/* This code is loaded on all skins. */

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/* End of the {{USERNAME}} replacement */


 // Namespace for notiplus
window.notiplus = window.notiplus || {};
 
// Settings for notiplus
notiplus.url = '/wiki/Project:Notiplus?action=render';
notiplus.cookiePrefix = 'brit';
notiplus.consentRequired = true;
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

// *****************************************************************
// Custom automatic delete buttons 
// *****************************************************************
// Adds customizable one-click deletion buttons to any deletable page.
// Requires MediaWiki:Common.js/fastDelete.js in appendScript();

 
// end Custom automatic delete buttons 
 
if(wgNamespaceNumber!=-1) addOnloadHook(function() { addPortletLink('p-cactions','/wiki/Special:Prefixindex/' + escape(wgPageName),'Subpages','ca-subpages','Show subages of ' + wgPageName); });

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		primeminister: { u:'Prime Minister' },
		lordchancellor: { u:'Lord Chancellor' },
	}
};

UserTagsJS.modules.custom = {
	'Johnny Goldtimbers': ['primeminister'], // Add President
	'Lord Andrew Mallace': ['lordchancellor'], // Add Vice President
};


importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});
 
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
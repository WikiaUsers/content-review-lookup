/* Any JavaScript here will be loaded for all users on every page load. */
 
var WikiaNotificationexpiry = 30;
var WikiaNotificationMessage = "<a href='/d'>Remember to check our the new Discussion forum!</a>";

window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};

window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Allpages",
    "Special:Log",
    "Special:WikiActivity",
    "Special:Contributions",
    "Blog:Recent posts",
    "Blog:News",
    "Blog:Featured blog posts",
    "Blog:Popular blog posts"
];

var monoBookText = 'Mono',
    oasisText = 'Oasis';

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
 
if ( /^MediaWiki(\/.+)?$/.test( wgPageName ) && wgAction == 'view' ) {
	addOnloadHook(function(){
		document.body.className+=" mainpage";
	});
}
 
// switches for scripts
// TODO: migrate to JSConfig
// var load_extratabs = true;
var load_edittools = true;
 
// Editpage scripts
if( wgAction == 'edit' || wgAction == 'submit' )
	importScript('MediaWiki:Editpage.js');
 
/* End of extra pages */
 
/* Test if an element has a certain class **************************************
 *
 * From English Resident Evil Wiki, 2008-09-15
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
var hasClass = (function() {
	var reCache = {};
	return function ( element, className ) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();
 

 

 // *********

 
/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}



/*******************************************************************************
** Imports
*******************************************************************************/


importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/MessageBlock.js',
        'MediaWiki:Common.js/ArticleType.js',
    ]
});
/********
 * ** WAM logger
 ******/

window.railWAM = {
    logPage:"Project:WAM Log"
};
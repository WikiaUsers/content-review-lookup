/* Any JavaScript here will be loaded for all users on every page load. */

/* Rail WAM Logger */
window.railWAM = {
    logPage: "Project:WAM Log"
    autoLogForUsers: ["JacobMrox","Myfffff1989"]
};

/* Reveal Anon IP */
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};
 
/* Auto-refresh pages */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxCallAgain = [RevealAnonIP];
ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Allpages",
    "Special:Log",
    "Special:WikiActivity",
    "Special:Contributions",
    "Blog:Recent posts",
    "Blog:News",
    "Blog:Featured blog posts",
    "Blog:Popular blog posts",
    "Template:Portal/Community"
];

/*This code above will referesh our [[Template:Community|Community template]]*/
 
var monoBookText = 'Mono',
    oasisText = 'Oasis';
 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
 
// switches for scripts
// TODO: migrate to JSConfig
// var load_extratabs = true;
var load_edittools = true;
 
// AjaxRC configuration option
var ajaxRefresh = 30000;

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
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
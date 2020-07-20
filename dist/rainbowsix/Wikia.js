/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================

/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');

/* Stats */
importScript('MediaWiki:Common.js/stats.js');

/* Clock */
importScript('MediaWiki:Common.js/Clock.js');

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// ******************
// Collapsible tables
// ******************
 
importScriptPage('ShowHide/code.js', 'dev');

// *******
// Auto-Refreshing RecentChanges, Logs, Contributions, and WikiActivity (Courtesy of Sactage)
// *******
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
var AjaxRCRefreshText = 'AutoRefresh';
importScriptPage('AjaxRC/code.js', 'dev');

//Username 
var username = wgUserName; 
if (username !== null) { 
    $('#InputUsername').html(username); 
}
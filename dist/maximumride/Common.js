/* AJAX */
Window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:NewPages"];

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

//Spoiler alert config 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};
})();

/* add contribs to user menu - 2/1/11 */
 
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);
 
/* add history to the dropdown menu for pages - 2/1/11 */
function HistoryDropdownMenuItem() {
	$('ul.wikia-menu-button li:first-child ul li:first-child').after('<li><a href="/index.php?title='+ encodeURIComponent (wgPageName) +'&action=history">History</a></li>');
}

addOnloadHook(HistoryDropdownMenuItem);

//lock old blogs config
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days.",
    nonexpiryCategory: "Never archived blogs"
};

//lock forums config 
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This forum is considered archived because it hasn\'t been commented on in over <expiryDays> days.",
    forumName: "Forum Board" 
};

//ajax rc config
window.ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];

//script imports
window.importArticles( {
    type: 'script',
    articles: [
        'u:dev:LockOldBlogs/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'w:c:dev:ReferencePopups/code.js',
        "w:c:dev:LockForums/code.js",
        'u:dev:DisplayClock/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:AjaxRC/code.js',
        'w:dev:WallGreetingButton/code.js',
        'u:admintools:MediaWiki:Common.js/SvgToPng.js',
        'u:dev:ExtendedNavigation/code.js',
    ]
} );
/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
PurgeButtonText = 'Refresh';
 
window.DisplayClockJS = {
	hoverText: 'Click here to refresh the page and clear the cache!'
};
 
importArticles({
    type: 'script',
    articles: [
	"u:dev:AjaxRC/code.js", /* Auto Refresh */
	"u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
	"u:dev:PurgeButton/code.js", /* Adds refresh button to page controls */
	"u:dev:ExternalImageLoader/code.js", /* Allows adding of images external to the wiki */
	"w:c:dev:Countdown/code.js", /* Creates a Countdown clock where specified */
	'w:c:dev:SignatureCheck/code.js', /* Checks users have signed their talk page replies */
	'u:dev:AllPagesHideRedirect/code.js',
	'u:dev:DisplayClock/code.js', /* Displays clock on wiki */
	"MediaWiki:Common.js/displayTimer.js",
	"MediaWiki:Common.js/Toggler.js"
    ]
});
 
/* Replaces {{Visitor}} with the name of the user browsing the page. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{Visitor}} replacement */
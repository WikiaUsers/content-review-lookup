/* Any JavaScript here will be loaded for all users on every page load. */

/*** Change Redirect Image ***/

function ChangeRedirectImage() {
	$('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/men-in-black/images/9/91/Redirect.png');
  }
addOnloadHook(ChangeRedirectImage);

/*** Auto-refreshing recent changes ***/
 
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically Refreshes the Recent Activity';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/*** Works with Anonymous only Css ***/ 
function AnonMessage() {
	if(wgUserGroups == null) {
		$('.anonmessage').css('display', 'inline');
	}
}
addOnloadHook(AnonMessage)

/*** Pre-Load Show/Hide Code ***/

importScriptPage('ShowHide/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});
 
window.lastEdited = {
    avatar: false,
    size: true,
    diff: true,
    comment: true,
    time: 'timeago',
    lang: 'en',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};
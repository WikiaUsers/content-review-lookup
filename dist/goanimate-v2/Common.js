/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

importScriptPage("User:Monchoman45/ChatHacks.js","c"); // Put this on your MediaWiki:Common.js
importScriptPage('User:Monchoman45/ChatHacks.js', 'c');
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* Any JavaScript here will be loaded for all users on every page load. See w:c:dev:AjaxRC for info & attribution  */  
AjaxRCRefreshText = 'Auto-Refresh'; AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"]; 
importScriptPage('AjaxRC/code.js', 'dev');

/* Installed scripts */
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		'u:dev:DisplayTimer/code.js',
		'u:dev:MessageWallUserTags/code.js',
		'u:dev:LastEdited/code.js',
		// ...
	]
});

/* Clock */
window.DisplayClockJS = '%X %x [%{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w] (UTC)';

/* Last edit header */
window.lastEdited = {
    avatar: true,
    size: false,
    diff: true,
    comment: true,
    time: 'timeago',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};
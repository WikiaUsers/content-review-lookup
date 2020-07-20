/* Any JavaScript here will be loaded for all users on every page load. */

/* See w:c:dev:AjaxRC for info & attribution  */  
AjaxRCRefreshText = 'Auto-Refresh'; AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
]; 

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

SpoilerAlert = {
  pages: ["Spoiler"],
};

/* Installed scripts */
importArticles({
	type: 'script',
	articles: [
        'u:dev:AjaxRC/code.js',
		'u:dev:DisplayClock/code.js',
		'u:dev:DisplayTimer/code.js',
		'u:dev:MessageWallUserTags/code.js',
		'u:dev:LastEdited/code.js',
        "w:c:dev:SpoilerAlert/code.2.js"
	]
});
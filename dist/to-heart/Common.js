/*

   Any JavaScript here will be loaded for all users on every page load.

   Do not install any JavaScripts here. Instead, install JScripts via
   MediaWiki:ImportJS.

*/

/* ============== AJAXRC ============== */
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];

AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the Activity page.'; 

/* ============== CLOCK ============== */
window.DisplayClockJS = '%X %x [%{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w] (UTC)';

/* ============== LAST EDIT ============== */
window.lastEdited = {
    avatar: true,
    size: true,
    diff: true,
    comment: true,
    time: 'timeago',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};
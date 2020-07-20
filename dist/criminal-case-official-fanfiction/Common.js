/* Any JavaScript here will be loaded for all users on every page load. */

SpoilerAlert = {
  pages: ["Gary Perkins", "Doodley"],
}
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.2.js"
    ]
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */

/****************
 * Auto Refresh *
 ***************/
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';
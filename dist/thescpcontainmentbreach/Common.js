/* Any JavaScript here will be loaded for all users on every page load.
Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

importArticles({
    type: 'script',
    articles: [
        "w:dev:WallGreetingButton/code.js",
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:UserTags/code.js",
        "w:c:dev:PurgeButton/code.js",
        "w:c:dev:AjaxRC/code.js",
        "w:c:dev:VisualSpellCheck/code.js",
        "u:dev:ListFiles/code.js"
    ]
});
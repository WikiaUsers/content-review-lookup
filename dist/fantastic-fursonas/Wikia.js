/* Any JavaScript here will be loaded for all users on every page load. */

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';

/* Imports */
importArticles({
    type: "script",
    articles: [
	"w:c:dev:AjaxRC/code.js",
    ]
});
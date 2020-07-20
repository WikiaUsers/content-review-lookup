AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('YoutubePlayer/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
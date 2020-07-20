var ajaxRefresh = 5000;
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
importArticles({
    type: 'script',
    articles: [
        'u:dev:DiscussionsFeed.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:DisplayClock/code.js',
        "u:dev:MediaWiki:LockOldBlogs/code.js",
        'w:c:dev:TopEditors/code.js',
    ]
});
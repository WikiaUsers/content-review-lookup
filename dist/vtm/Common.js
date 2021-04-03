/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Countdown/code.js",
        "MediaWiki:ChangeTitle/code.js"
        "MediaWiki:Common.js/AjaxBatchDelete.js"
    ]
});

importScriptPage('AjaxBatchDelete/code.js', 'dev');
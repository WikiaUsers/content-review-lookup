/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "u:dev:ListFiles/code.js" // ListFiles from Dev Wiki
    ]
});

batchDeleteDelay = 1000;
importScriptPage('AjaxBatchDelete/code.2.js', 'dev');
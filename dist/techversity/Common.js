/* Any JavaScript here will be loaded for all users on every page load. */
PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:DisplayClock/code.js'
    ]
});
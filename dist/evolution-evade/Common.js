/* Any JavaScript here will be loaded for all users on every page load. */
// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

window.UserStatusSettings = {
    colorBlindMode: 1,
    lightTheme: 1,
    statusIndicator: 1,
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Status/code.js',
    ]
});
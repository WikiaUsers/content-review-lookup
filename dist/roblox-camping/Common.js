/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
    logPage:"Project:WAM Log"
};
dev:UserStatus.js

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});
/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */

window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionsRailModule/code.js',
    ]
});

importScriptPage('TwitterWidget/code.js', 'dev');
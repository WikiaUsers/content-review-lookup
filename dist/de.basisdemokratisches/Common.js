/* JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

window.railWAM = {
    logPage:"Project:WAM Log"
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionsRailModule/code.js',
    ]
});
[
        'u:dev:MediaWiki:WikiActivity.js',
    ]
});
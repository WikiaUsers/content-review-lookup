importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!ban/code.js',
        // ...
    ]
} );

importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js',
        // ...
    ]
} );

importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!kick/code.js',
        // ...
    ]
} );

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
chatAnnouncementsAll = true;
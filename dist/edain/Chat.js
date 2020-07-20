importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        'u:dev:!kick/code.js'
    ]
} );

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

chatAnnouncementsAll = true;
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
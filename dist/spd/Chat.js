/* Chat Hacks */

importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:ChatHacks.js'
]});

/* Chat Announcements (Can only be used by Admins and Chat Mods) */

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

/* Mod Pings (use !mods) */

importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js',
        // ...
    ]
} );
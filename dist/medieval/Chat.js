/* !kick command */
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );

/* announcements */
importScriptPage('ChatAnnouncements/code.js','dev');

/* chathacks */
importScriptPage('ChatOptions/code.js', 'dev');

/* chat tags */
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
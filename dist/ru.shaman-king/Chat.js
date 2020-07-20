importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FandomizedChat/code.2.js',
    ]
});

/*2*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FandomizedChat/core.js',
    ]
});


/*3*/

importArticles({
    type: 'script',
    articles: ['u:dev:FandomizedChat/library.js']
});

/*4*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions.js',
    ]
});

/*5*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatBlockButton/code.3.js'
    ]
});

/*6*/

importScriptPage('ChatTimestamps/code.js','dev');

importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:TitleNotifications.js'
]});

/*1*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:GiveChatMod/code.js'
    ]
});

/*ChatTags*/
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
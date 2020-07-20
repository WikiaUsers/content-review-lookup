
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatSendButton.js'
    ]
});

importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:ChatHacks.js'
]});

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

importScriptPage( 'ChatObject/code.js', 'dev' );

var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
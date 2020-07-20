var chatags = { images: true, videos: true };
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:MediaWiki:CustomChatPings/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        ]
    });
    importScriptPage('MediaWiki:ChatAnnouncements/code.js', 'dev');
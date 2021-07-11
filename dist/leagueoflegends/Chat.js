var chatags = { images: true, videos: true };

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:IsTyping/code.js'
    ]
});

WikiaEmoticons.EMOTICON_HEIGHT = 24;
WikiaEmoticons.EMOTICON_WIDTH = 24;
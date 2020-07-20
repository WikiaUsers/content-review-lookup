var chatags = { images: true, videos: true };
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EmoticonsWindow/code.js',    
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:MediaWiki:CustomChatPings/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:ChatToolbox/code.js',
    ]
});
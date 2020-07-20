importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage('MediaWiki:Emoticons/code.js', 'kocka');
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js', // ChatHacks
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatImages/code.js',
        'u:dev:ChatBinaryButton.js',
        'u:dev:ChatMessageWallCount.js',
        'u:dev:MediaWiki:CustomChatPings/code.js',
    ]
});
importScriptPage('SpeedEmoticon/latest.js', 'korniux');
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:NewMessageCount.js'
    ]
});

importScriptPage('MediaWiki:LMBWChat.js');
importScriptPage("MediaWiki:ChatTags.js");
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatSendButton.js'
    ]
});
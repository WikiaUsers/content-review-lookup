importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatLogger.js',
    ]
})
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MediaWikiWordFilter/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GiveChatMod/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatSendButton.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
    ]
});

/*Окно со смайликами*/
importArticles({
    type: 'script',
    articles: [
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:IsTyping/code.js',
        'u:dev:ChatImages/code.js',
    ]
});

/*ChatTags*/
 
var chatags = { images: true, videos: true };
 
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
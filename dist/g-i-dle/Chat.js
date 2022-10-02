/*Imports*/
importScriptPage('MediaWiki:ExtendedPrivateMessaging/code.js', 'dev');

/*Emoticons*/
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        // ...
    ]
});

/*Private Message Alert*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
    ]
});
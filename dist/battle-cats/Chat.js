/* add emoticons list to the chat */
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});
/* end */

/* add more options to the chatroom */
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
/* end */
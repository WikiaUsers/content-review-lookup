//Emoticon Button
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});

//Chat Options
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

//Chat Tags
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
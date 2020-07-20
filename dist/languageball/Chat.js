importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage('MediaWiki:Emoticons/code.js', 'kocka');
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js', // ChatHacks
    ]
});
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
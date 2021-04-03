importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons/code.js',
        // ...
    ]
});

window.EmoticonsWindowConfig = {
    chatOptionsIntegration: true
};
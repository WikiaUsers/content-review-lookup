/*chat */
importArticles( {
    type: 'script',
    articles: [
        "u:dev:ChatOptions/code.js",
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
    ]
} );
 
window.chatTagsDisable = ['img', 'yt'];
var chatags = { images: true, videos: true };
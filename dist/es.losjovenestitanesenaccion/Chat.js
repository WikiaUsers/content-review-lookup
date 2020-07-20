// Dev Wiki imports
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:kocka:MediaWiki:Emoticons.js'
    ]
});

window.chatTagsDisable = ['img', 'yt'];
var chatags = { images: true, videos: true };
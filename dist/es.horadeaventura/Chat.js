/*Configuraciones*/
var chatags = { images: true, videos: true }; // Habilitar img y yt
 
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
        "u:dev:ChatOptions/code.js",
        'u:dev:ChatTags/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
    ]
} );
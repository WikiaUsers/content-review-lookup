//ChatTags
var chatags = { images: true, videos: true };
importScriptPage('ChatTags/code.js', 'dev');
 
//Importes (modo noche, chatoptions y ventana de emoticones)
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatThemeSwitcher.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
    ]
});
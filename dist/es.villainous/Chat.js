/*Configuraciones*/
var chatags = { images: true, videos: true }; // Habilitar img y yt

/*Importes*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:NewMessageCount.js',
        ]
});
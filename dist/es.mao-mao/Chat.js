/***** En este lugar se encuentra todo el javascript del Chat *****/

/**** Imports Externos ****/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EmoticonsWindow/code.js',    
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:MediaWiki:CustomChatPings/code.js',
        'u:dev:MediaWiki:FixAdminKick/code.js',
        'u:dev:MediaWiki:IsTyping.js',
    ]
});

/* Permitir Imagenes y Videos */
var chatags = { images: true, videos: true };
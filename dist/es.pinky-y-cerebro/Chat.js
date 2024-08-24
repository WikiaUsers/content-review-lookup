/* Extensión de YT e imágenes */
// Desactivar tags de imagen y de YouTube
window.chatTagsDisable = ['img', 'yt'];
 
/* tags */
importArticles( {
    type: 'script',
    articles: [
        'MediaWiki:ChatOptions.js',
        'MediaWiki:ChatTags.js',
        'u:dev:ChatToolbox/code.js',
        'u:kocka:MediaWiki:Emoticons.js'
    ]
});

var chatags = { images: true, videos: true };
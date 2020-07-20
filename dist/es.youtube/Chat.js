importArticles( {
    type: 'script',
    articles: [
        'u:tobias-laboratory:MediaWiki:Emoticons/code.js',
        'u:dev:MediaWiki:ChatSendButton.js'
    ]
} );
 
var chatags = { images: true, videos: true };
 
/* Añade el botón de los emoticones */
$(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    }
});
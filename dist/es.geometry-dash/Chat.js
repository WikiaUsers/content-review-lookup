var chatags = { images: true, videos: true };
importArticles( {
    type: 'script',
    articles: [
        /*'MediaWiki:ChatOptions.js',*/
        'u:dev:ChatToolbox/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:IsTyping/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatOptions/es/code.js',
        /*'u:es.steven-universe:MediaWiki:Tags.js',*/
    ]
} );

/* Añade el botón de los emoticones */
$(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    }
});

/* Notificacion de mensaje*/
var PrivateMessageAlert = {
    beepSound: 'https://vignette.wikia.nocookie.net/geometry-dash/images/8/8e/Achievement01.ogg/revision/latest?cb=20160222143235&path-prefix=es',
//  beepSound: ['http://vignette1.wikia.nocookie.net/geometry-dash/images/8/8e/Achievement01.ogg/revision/latest?cb=20160222143235&path-prefix=es', 'http://vignette1.wikia.nocookie.net/geometry-dash/images/8/8e/Achievement01.ogg/revision/latest?cb=20160222143235&path-prefix=es'],
    message: '$1 te envió un mensaje!',
    notifications: true,
    alertWhileFocused: true
};
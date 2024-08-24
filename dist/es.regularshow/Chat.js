// ChatTags
var chatags = { images: true, videos: true };
// ChatEmoticons
window.kockaEmoticons = {
    vocab: {
        emoticons: "Emoticonos",
        close: "Salir"
    },
    help: "Clickea un emoticón para poder enviarlo."
};

// ChatEmoticonsButton
$(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 550);
    }
});

// ChatStatus
window.ChatStatus = {
	statuses: {
		afk: "Ausente",
		edit: "Editando",
		food: "Comiendo",
		tv: "Mirando TV",
		game: "Soy virgen",
		cake: "Clavo el visto",
		book: "Viendo MLP",
		code: "Programando",
		google: "Atacando wikis",
		notsoos: "Con tu gfa",
		ufo: "Masturbándose"
	},
	debug: false
};

// ChatAnnounce - escribe /announce seguido del mensaje.
importScriptPage('ChatAnnouncements/code.js','dev');
chatAnnouncementsAll = true;

// Notificacion de mensaje
var PrivateMessageAlert = {
    beepSound: 'https://vignette.wikia.nocookie.net/regularshow/images/6/6c/Iapetus.ogg/revision/latest?cb=20161205215118&path-prefix=es',
    message: '¡$1 te envió un mensaje!',
    notifications: true,
    alertWhileFocused: true
};

// Scripts
importArticles({
type: 'script',
articles: [
'u:dev:ChatOptions/es/code.js',
'u:dev:ChatTags/code.js',
'u:dev:ChatToolbox/code.js',
'u:dev:MediaWiki:ChatStatus/code.js',
'u:dev:NewMessageCount.js',
'u:kocka:MediaWiki:Emoticons.js',
'u:dev:MediaWiki:PrivateMessageAlert/code.js',
'u:dev:ChatInterwikiLinks/code.js',
'u:dev:AjaxEmoticons/code.js',
]
});
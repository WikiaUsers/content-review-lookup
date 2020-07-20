// ChatTags
var chatags = { images: true, videos: true };
 
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
		game: "Jugando",
		cake: "Clavo el visto",
		book: "Leyendo",
		code: "Programando",
		google: "Atacando wikis",
		notsoos: "Con tu gfa",
		ufo: "Viendo SVTFOE"
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
 
// Tabla de emoticones
window.EmoticonsWindowVocab = {
    emoticons: "Emoticonos",
    close: "Cerrar",
    help: "Para insertar un emoticono, haz clic en él."
};
 
// Condiciones de links a enviar en el chat
$('[name="message"]').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {
        var message = this.value;
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();
        }
        if (/[\/[:]Especial:Chat|Special:Chat/i.test(message)) {
            e.preventDefault();
            inlineAlert('Debido a las reglas de la comunidad, no puedes enviar enlaces de chats de Fandom.');
        }
        if (/[\/[:]Special:UserLogout|Special:Salida del usuario|Special:Salida_del_usuario|Special:CloseMyAccount/i.test(message)) {
            e.preventDefault();
            inlineAlert('No puedes enviar este enlace.');
        }
        if (/60484617|54176365|794488387260435|kat\.cr|thepiratebay|toonget|worldofsteven|twosu|animeflavor|kisscartoon|gogoanime|beachcitybugle|toonova|watchonlinecartoons|seriesflv|seodiv|ustream|cartooncrazy/i.test(message)) {
            e.preventDefault();
            inlineAlert('No puedes enviar este enlace, debido a que violaría la política de derechos de autor.');
        }
        if (/vocaroo\.com\/i\//i.test(message)) {
            e.preventDefault();
            inlineAlert('Para enviar un clip de audio desde Vocaroo, escribe [vocaroo="id del clip"]. Revisa [[Ayuda:Tags|esta página de ayuda]] para más información.');
        }
    }
});
 
// Scripts
importArticles({
type: 'script',
articles: [
    'u:dev:ChatTags/code.js', // ChatTags
    'u:dev:MediaWiki:ChatStatus/code.js', // ChatStatus
    'u:dev:ChatAnnouncements/code.js', // ChatAnnounce
    'u:dev:MediaWiki:PrivateMessageAlert/code.js', // Notificación de mensaje
    'u:dev:ChatOptions/es/code.js', 
    'u:dev:ChatToolbox/code.js',
    'u:dev:NewMessageCount.js', 
    'u:kocka:MediaWiki:Emoticons.js',
    'u:dev:ChatInterwikiLinks/code.js',
    'u:dev:AjaxEmoticons/code.js',
    'u:es.halflife:MediaWiki:Tags-import.js',
    'u:dev:ChatSendButton.js',
    'u:dev:MediaWiki:ChatNotifications/code.js'
]
});
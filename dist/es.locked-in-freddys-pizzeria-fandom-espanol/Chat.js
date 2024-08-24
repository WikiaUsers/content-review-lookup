/***** Aquí se añadira el javascript del Chat *****/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:PrivateMessageAlert/code.js',       
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:MediaWiki:CustomChatPings/code.js',
        'u:dev:MediaWiki:FixAdminKick/code.js',
        'MediaWiki:MusicBeta.js',
        'u:dev:MediaWiki:IsTyping.js',
    ]
});

//Estados del chat //
window.ChatStatus = {
	statuses: {
		afk: "AFk",
		edit: "Muy ocupado",
		food: "Comiendo", 
		music: "Escuchando música",
		game: "Jugando",
		studies: "Estudiando",
		watching: "Protegiendo",
		minecra: "Maincra",
		code: "Editando",
		love: "Enamorandote",
		notsoos: "Perdiendose",
		google: "Matando moscas",
		jaf: "FNAF",
		
	},
	debug: false
};

 
// Permitir imagenes y videos en chat tags //
 
var chatags = { images: true, videos: true };
 
// boton de clear //
 
$(window).load(function addButtons() {
    var $o = $('.Rail');
    if ($o.length === 0) {
        setTimeout(addButtons, 250);
    } else if ([0, 1].indexOf($('.chat-button').length) != -1) {
        $o.prepend(clearChatText());
    }
});
 
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Limpiar chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}

$('[name="message"]').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {
        var message = this.value;
        // Evitar mensajes de espacios en blanco
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();  
        }
    }
});

//Mensajes privados//
var PrivateMessageAlert = {
    beepSound: 'http://www.sonidosmp3gratis.com/sounds/fnaf-start-day.mp3',
    message: '$1 te envio un mensaje!',
    notifications: true,
    alertWhileFocused: true
};
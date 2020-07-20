// Imports:

importArticles({
	type: "script",
	articles: [
		'u:dev:MediaWiki:ChatStatus/code.js',
		'u:dev:MediaWiki:!mods/code.js',
		'u:dev:MediaWiki:ChatAnnouncements/code.js',
		'u:dev:ChatOptions/code.js',
		'u:shining-armor:ChatTags/code.js',
		'u:dev:MediaWiki:ChatStatus/code.js',
		'u:dev:NewMessageCount.js',
		"u:dev:MediaWiki:PrivateMessageAlert/code.js"
	]
});

//Activación de los Announcements:
chatAnnouncementsAll = true;

//Activación de los Tags:
var chatags = { 
    images: true, 
    videos: true 
    };

//Estados del chat:
window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editando",
		food: "Comiendo", 
		tv: "Viendo videos",
		game: "Jugando",
		ufo: "Estudiando",
		cake: "Observando",
		book: "Programando",
		code: "Ocupado",
		notsoos: "Dibujando",
		homo: "Escuchando música",
		google: "Viendo Yuri"
	},
	debug: false
};

//Sonido de los mods:

window.ModPing = "https://vignette.wikia.nocookie.net/sonic/images/5/5f/Extra_Life_Sound.ogg/revision/latest?cb=20161129204905&path-prefix=es";

//Notificaciones de MP:

var PrivateMessageAlert = {
    beepSound: 'https://vignette.wikia.nocookie.net/sonic/images/a/ac/Chaos_Emerald_Sound.ogg/revision/latest?cb=20161128180127&path-prefix=es',
    message: '$1 te envió un mensaje!',
    notifications: true,
    alertWhileFocused: true
};
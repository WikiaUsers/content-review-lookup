importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage('ChatTags/code.js', 'dev');
var chatags = { images: true, videos: true };

/***Colección de botones de usuarios***/
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatButtonsCollection.js'
    ]
});

/* Chat Status */
window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editando",
		nomolestar: "No molestar",
		food: "Comiendo",
		videos: "Viendo videos",
		game: "Jugando",
		bored: "Aburrido/a",
		dibujando: "Dibujando",
		
	},
	debug: false
};

/** Notificaciones **/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatNotifications/code.js',
    ]
});
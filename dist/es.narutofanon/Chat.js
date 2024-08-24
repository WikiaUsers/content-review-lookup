window.ChatStatus = {
	statuses: {
		afk: "AFK",
		editando: "Editando",
		escribiendocap: "Escribiendo cap",
		dibujando: "Dibujando",
		videos: "Viendo videos",
		comiendo: "Comiendo",
		ba�o: "En el ba�o",
		movil: "Desde el m�vil",
		estudiando: "Estudiando",
		juego: "Jugando"
	},
	debug: true
};
importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:Pings.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:ChatBlockButton/code.2.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:MediaWiki:ChatUserPageButton.js',
        'u:dev:MediaWiki:NewMessageCount.js',
    ]
});
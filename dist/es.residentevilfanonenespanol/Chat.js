// Configuración de ChatStatus

window.ChatStatus = {
	statuses: {
		afk: "AFK",
		editar: "Editando",
		comiendo: "Comiendo",
		tv: "Mirando TV",
		juegos: "Jugando videojuegos",
		baño: "En el baño",
		social: "Revisando redes sociales"
	},
	debug: false
};

// Importar

importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatHacks.js',
        'u:dev:ChatSendButton.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:NewMessageCount.js'
        ]
    } );
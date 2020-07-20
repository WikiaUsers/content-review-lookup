// Imports:

importArticles({
	type: "script",
	articles: [
		'u:dev:MediaWiki:ChatStatus/code.js'
	]
});

//Estados del chat
window.ChatStatus = {
	statuses: {
		afk: "Ausente",
		homo: "Ocupado",
		edit: "Editando",
		food: "Comiendo",
		cake: "Tomando un bocadillo",
		tv: "Disponible",
		game: "Jugando",
		code: "Viendo vídeos",
		google: "Escuchando música",
		book: "Leyendo",
	},
	debug: false
};
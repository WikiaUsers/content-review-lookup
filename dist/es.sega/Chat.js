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
		cake: "Desayunando o Merendando",
		tv: "Viendo TV",
		game: "Jugando a SEGA",
		code: "Viendo vídeos",
		google: "Escuchando música",
		book: "Leyendo",
	},
	debug: false
};
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
		code: "Viendo v�deos",
		google: "Escuchando m�sica",
		book: "Leyendo",
	},
	debug: false
};
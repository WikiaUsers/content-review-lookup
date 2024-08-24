importScriptPage('MediaWiki:ChatOptions/es/code.js', 'dev');
importScriptPage('ChatTags/code.js', 'dev');
var chatags = { images: true, videos: true };
 
importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:ChatStatus/code.js"
	]
});
 
// ESTADOS DEL CHAT
window.ChatStatus = {
	statuses: {
		afk: "MedioTiempo",
		homo: "Ocupado",
		edit: "Editando",
		food: "Comiendo", 
		tv: "Viendo Béisbol",
		game: "En el Estadio",
		cake: "Observando",
		book: "Leyendo",
		code: "Actualizando",
		google: "Buscando Links",
		notsoos: "No Disponible",
		ufo: "Lesionado",
	},
	debug: false
};
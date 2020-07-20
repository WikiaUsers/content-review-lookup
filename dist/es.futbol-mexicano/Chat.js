importScriptPage('MediaWiki:ChatOptions/es/code.js', 'dev');
importScriptPage('ChatTags/code.js', 'dev');
importScriptPage('MediaWiki:ClassicModIcons/code.js', 'dev');
var chatags = { images: true, videos: true };

importArticles({
	type: "script",
	articles: [
		'u:dev:MediaWiki:ChatStatus/code.js',
		'u:dev:MediaWiki:IsTyping/code.js',
	]
});
 
// ESTADOS DEL CHAT
window.ChatStatus = {
	statuses: {
		afk: "MedioTiempo",
		homo: "Ocupado",
		edit: "Editando",
		food: "Comiendo", 
		tv: "Viendo la Liga MX",
		game: "En el Estadio",
		cake: "Observando",
		book: "Leyendo Revista MX",
		code: "Actualizando",
		google: "Buscando Links",
		notsoos: "No Disponible",
		ufo: "Lesionado",
	},
	debug: false
};
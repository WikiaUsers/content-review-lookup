// Imports //
 
importArticles({
	type: "script",
	articles: [
		'u:dev:MediaWiki:ChatStatus/code.js',
		'u:dev:MediaWiki:ChatOptions/es/code.js',
		'u:dev:ChatTags/code.js',
		'u:dev:NewMessageCount.js',
		"u:dev:IsTyping/code.js"
	]
});
 
// Activación de los Tags //
var chatags = { 
    images: true, 
    videos: true 
    };
    
// Estados del chat //
window.ChatStatus = {
	statuses: {
		afk: "AFK",
		code: "No molestar",
		edit: "Editando",
		food: "Comiendo",
		book: "Leyendo",
		study: "Estudiando",
		draw: "Dibujando",
		game: "Jugando",
		tv: "Viendo videos",
		music: "Escuchando música",
		anime: "Viendo anime",
		looking: "Observando",
		boredom: "Flojeando",
		kawaii: "Haciéndose kawaii"
	},
	debug: false
};
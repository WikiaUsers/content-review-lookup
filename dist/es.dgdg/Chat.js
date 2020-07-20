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
		code: "Ayudando a Kitsunezaki",
		edit: "Ocservando",
		mameando: "Mameando",
		book: "Amando a Mida",
		study: "Amando a Muyma",
		draw: "Traficando cigarrillos",
		game: "Alabando a Ranadios",
		tv: "Viendo videos",
		music: "Alabando a la birgenzita xhii",
		anime: "Viendo anime",
		looking: "Viendo nopor (l)",
		boredom: "Bailando con Sanadios",
		kawaii: "Haciéndose kawaii",
		tacos: "Comiendo takos",
		moerte: "muriendose de sueño",
		tutuz: "En la Yutuz",
	},
	debug: false
};
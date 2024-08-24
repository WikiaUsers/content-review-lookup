importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:ChatStatus/code.js"
	]
});
 
window.ChatStatus = {
	statuses: {
		afk: "AFK",
		wiki: "Bearbeiten",
		besch: "Besch�ftigt",
		online: "Online",
		handy: "Mit Handy online",
		tv: "TV schauen",
		youtube: "Youtube schauen",
		stream: "Stream schauen",
		musik: "Musik h�ren",
		lesen: "Lesen",
		lernen: "Lernen",
		arbeiten: "Arbeiten",
		essen: "Essen",
		kochen: "Kochen",
		haus: "Hausarbeit",
		spiel: "Spielen",
		schlafen: "Schlafen",
	},
	debug: false
};
importScriptPage('ChatOptions/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        "MediaWiki:Custom-Jumbles/code.js",
        "u:dev:Jumbles/gameinterface.js",
        "u:dev:Jumbles/startup.js",
		"u:dev:QuickModTools/code.js"
	]
});

window.QuickModTools = {
	quickreasons: [
		"Trolling",
		"Spamming",
		"Not listening to staff members",
		"Not following chat rules"
	],
	defbanreason: "some reason",
	defbanlength: "some time"
};
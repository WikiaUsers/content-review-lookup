window.dev = window.dev || {};
window.dev.chatdelay = {
	max: 10,
	mainOnly: false
};

importArticles({
	type: "script",
	articles: [
		'u:dev:MediaWiki:ChatDelay/code.js',
		'u:dev:MediaWiki:ChatBlockButton/code.3.js',
		'u:dev:MediaWiki:ChatNotifications/code.js',
		'u:dev:MediaWiki:ChatModHover/code.js'
	]
});
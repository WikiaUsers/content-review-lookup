/* Any JavaScript here will be loaded for users using the mobile site */

window.dev = window.dev || {};

// VerifyUser defaults
window.dev.VerifyUser = {
	command: '$verify',
	channel: 'verification'
};

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:VerifyUser.js'
	]
});
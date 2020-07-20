chatBlockReason = "ToU violation";
chatBlockExpiry = "3 months";
importScriptPage('MediaWiki:ChatBlockButton/code.3.
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:GiveChatModPrompt/code.js',
        // ...
    ]
} );
window.QuickModTools = {
	quickreasons: [
		"First reason",
		"Second reason",
		"Third reason",
		"etc. reason"
	],
	defbanreason: "some reason",
	defbanlength: "some time
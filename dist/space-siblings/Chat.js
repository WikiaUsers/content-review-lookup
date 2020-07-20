importScriptPage('ChatOptions/code.js', 'dev');
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importArticles( {
    type: 'script',
    articles: [
        "u:dev:MediaWiki:Jumbles/startup.js"
    ]
} );
importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:QuickModTools/code.js"
	]
});
window.QuickModTools = {
	quickreasons: [
		"First reason",
		"Second reason",
		"Third reason",
		"etc. reason"
	],
	defbanreason: "some reason",
	defbanlength: "some time"
}
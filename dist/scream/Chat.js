importArticles({
	type: "script",
	articles: [
    'u:dev:MediaWiki:ChatHacks.js',
    'u:dev:ChatUserPageButton.js'
	]
});

/* Chat Imports (Credit to Once Upon A Time Wiki) */
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage('ChatImages/code.js', 'dev');
importScriptPage('MediaWiki:FixAdminKick/code.js','dev');
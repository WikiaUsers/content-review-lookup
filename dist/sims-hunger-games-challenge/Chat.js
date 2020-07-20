importArticles({
	type: "script",
	articles: [
    'u:dev:MediaWiki:ChatHacks.js'
	]
});

var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage('ChatImages/code.js', 'dev');
importScriptPage('MediaWiki:FixAdminKick/code.js','dev');
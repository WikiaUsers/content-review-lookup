/* Chattags */
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
var chatags = { images: true, videos: true };
 
/* PrivateMessageAlert */
importScriptPage('MediaWiki:PrivateMessageAlert/code.js', 'dev');
 
/* Status */
importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:ChatStatus/code.js"
	]
});

/* Nuevos mensajes */
importArticles({
type: 'script',
articles: [
'u:dev:NewMessageCount.js'
]
});
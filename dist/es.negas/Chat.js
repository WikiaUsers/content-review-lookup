// Imports:
 
importArticles({
	type: "script",
	articles: [
		'u:dev:MediaWiki:ChatStatus/code.js',
		'u:dev:MediaWiki:!mods/code.js',
		'u:dev:MediaWiki:ChatAnnouncements/code.js',
		'u:dev:ChatOptions/code.js',
		'u:dev:ChatTags/code.js',
		'u:dev:MediaWiki:ChatStatus/code.js',
		'u:dev:NewMessageCount.js'
	]
});
 
//Activación de los Announcements:
chatAnnouncementsAll = true;
 
//Activación de los Tags:
var chatags = { 
    images: true, 
    videos: true 
    };
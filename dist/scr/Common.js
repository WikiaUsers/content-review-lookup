/* Any JavaScript here will be loaded for all users on every page load. */

// TopicBlockLog
TBL_GROUP = "roblox-en";

// MessageWallGreeting
importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:WallGreeting.js', 
	]
});

// LockOldComments
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 28;
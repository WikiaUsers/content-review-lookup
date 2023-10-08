// LockOldBlogs configuration
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: 'This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, there is no need to comment',
    nonexpiryCategory: 'Never archived blogs'
};
 
 
// CacheCheck configuration
window.cacheSkip = [];
window.cacheSkipLimit = 1000;
 
//Message wall usertags config
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'Rider_ranger47': 'Admin • Local Wiki Developer',
       
    }
};
window.UserTagsJS = {
	modules: {},
	tags: {
		pres: 'President',
		vice: 'Vice-President'
	}
};
UserTagsJS.modules.custom = {
	'The Scotsman': ['pres'], // Add Editor of the Month
	'': ['vice'], // Add Vice-President
};

// Script imports
window.importArticles( {
    type: 'script',
    articles: [
        'u:dev:CacheCheck/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:DisableBotMessageWalls/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:UserTags/code.js',
           ]
} );


importScriptPage('ArchiveTool/code.js', 'dev');

importArticle({type:'script', article:'w:c:dev:AntiUnicruft/code.js'});
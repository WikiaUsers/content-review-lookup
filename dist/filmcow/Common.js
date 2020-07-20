/***Important Note: Please do not mess with the Javascript unless your name is Senjumaru Shutara. Thank you.***/
 
/*Ajax Auto-Refresh Stuff*/
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');
window.ajaxRefresh = 30000;
importScriptPage('AjaxRC/code.js', 'dev');
 
 /*Usertags*/
 window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: { u:'Bureaucrat' }
	}
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
 
/*Message Wall/Forum Tags*/
 
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: false,
    glowSize: '20px',
    glowColor: 'red',
    users: {
        'Senjumaru_Shutara': 'Bureaucrat'
        }
};
 
/*imported articles*/
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		'w:c:dev:UserTags/code.js',
		'u:dev:MessageWallUserTags/code.js',
		'u:dev:AjaxRedirect/code.js',
		// ...
	]
});
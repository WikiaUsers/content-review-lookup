/* Any JavaScript here will be loaded for all users on every page load. */
/*Imported Articles*/
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

/*Username Template*/
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/*Usertags*/
 window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: { u:'Bureaucrat' },
		sysop: { u:'Sysop' },
		threadmoderator: { u:'Moderator' },
	}
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat', 'bot'], // Remove "Admin" tag from bureaucrats and bots
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'threadmoderator', 'bot'];
/*Message Wall/Forum Tags*/
 
window.MessageWallUserTags = {
    tagColor: 'gold',
    glow: false,
    glowSize: '20px',
    glowColor: 'red',
    users: {
        'Senjumaru_Shutara': 'Bureaucrat',
        'G4T0R4D3xEN3RGY': 'Bureaucrat',
        'SoPretentious': 'Bureaucrat'
        }
};
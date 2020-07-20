/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */


/* Variables list for scripts below */
    var ChannelIdentify = "#SPWChat";
    var ServerIdentify = "irc.mibbit.net";
    var Height = "700";
    var Width = "800";
 
importArticles({
	type:'script',
	articles: [
                "w:c:dev:LockOldBlogs/code.js",
                'w:c:dev:SignatureCheck/code.js',
                'u:dev:SearchSuggest/code.js',
                'w:c:dev:MibbitIRC/code.js',
		'w:c:dev:UserTags/code.js'
	]
});

 /*Usertags*/
 window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: { u:'Bureaucrat' },
		sysop: { u:'Sysop' }
	}
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat', 'bot'], // Remove "Admin" tag from bureaucrats and bots
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'bot'];
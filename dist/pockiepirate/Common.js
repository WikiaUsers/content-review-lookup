importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js",
        "u:dev:BackToTopButton/code.js"
        "u:dev:ShowHide/code.js",
    ]
});

/* Catch {{USERNAME}} */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

////////////////////////////////////////////////////////////////////////////////
// Custom User Tags
window.UserTagsJS = {
	modules: {},
	tags: {
	bureaucrat: { order: 1,},
	sysop: { order: 1,},
	rollback: { u: 'Vice-Captain (Rollback)', order: 1,},
	chatmoderator: { order: 2,},
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat']
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
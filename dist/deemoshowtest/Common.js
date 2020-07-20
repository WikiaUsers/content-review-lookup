/* Any JavaScript here will be loaded for all users on every page load. */
/* Credits to My Little Pony Wiki and Sam and Cat Wiki, Call of Duty Wiki */

// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
                founder: { link:'DeeMoShow_Test_Wiki:Staff#Administrators and Bureaucrats' },
                bureaucrat: { link:'DeeMoShow_Test_Wiki:Staff#Administrators and Bureaucrats' },
		sysop: { link:'DeeMoShow_Test_Wiki:Staff#Administrators and Bureaucrats' },
		rollback: { link:'DeeMoShow_Test_Wiki:Staff#Chat_Moderators_and_Rollbacks' },
                chatmoderator: { link:'DeeMoShow_Test_Wiki:Staff#Chat_Moderators_and_Rollbacks' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bot'];
UserTagsJS.modules.metafilter = { 'notautoconfirmed': ['newuser'] };
UserTagsJS.modules.newuser = { days: 5, edits: 0 };

importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/filluploadform.js",
		"MediaWiki:Common.js/insertusername.js",
	]
});

/* Any JavaScript here will be loaded for all users on every page load. */
jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})
 
jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})
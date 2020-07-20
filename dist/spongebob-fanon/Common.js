/* Credits to Dev Wiki */

// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { link:'SpongeBob Fanon Wiki:Sysops#Bureaucrats' },
		sysop: { link:'SpongeBob Fanon Wiki:Sysops#Sysop' },
		rollback: { link:'SpongeBob Fanon Wiki:Sysops#Rollback' },
                chatmoderator: { link:'SpongeBob Fanon Wiki:Sysops#Chat Moderator' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bot'];
UserTagsJS.modules.metafilter = { 'notautoconfirmed': ['newuser'] };
UserTagsJS.modules.newuser = { days: 5, edits: 0 };

importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:Countdown/code.js",
                "w:dev:DupImageList/code.js",
		"w:dev:ReferencePopups/code.js",
		"w:dev:SearchSuggest/code.js",
                "w:dev:UserBadges/code.js", 
                "w:dev:WallGreetingButton/code.js",
		"MediaWiki:Common.js/activityrefresh.js",
		"MediaWiki:Common.js/displayclock.js",
	        "MediaWiki:Common.js/disableuploadpopup.js",
		"MediaWiki:Common.js/filluploadform.js",
		"MediaWiki:Common.js/insertusername.js",
                "MediaWiki:Common.js/star-ratings.js",
	]
});
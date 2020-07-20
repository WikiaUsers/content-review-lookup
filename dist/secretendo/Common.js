/* Admin Group Stuff and other Junk */

// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
                founder: { link:'Secretendo Wiki:Administrators' },
                bureaucrat: { link:'Secretendo Wiki:Administrators' },
		sysop: { link:'Secretendo Wiki:Administrators' },
		rollback: { link:'Secretendo Wiki:Administrators' },
                chatmoderator: { link:'Secretendo Wiki:Administrators' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bot'];

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
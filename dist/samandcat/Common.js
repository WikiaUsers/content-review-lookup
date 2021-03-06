/* Credits to Dev Wiki */

// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { link:'Project:Administration#Bureaucrats and Administrators' },
		sysop: { link:'Project:Administration#Bureaucrats and Administrators' },
		rollback: { link:'Project:Administration#Rollbacks and Chat Moderators' },
                chatmoderator: { link:'Project:Administration#Rollbacks and Chat Moderators' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bot'];
UserTagsJS.modules.metafilter = { 'notautoconfirmed': ['newuser'] };
UserTagsJS.modules.newuser = { days: 5, edits: 0 };

// LastEdited settings
window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};

importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:Countdown/code.js",
		"w:dev:ChatOptions/code.js",
                "w:dev:DupImageList/code.js",
                "w:dev:DynamicImages/code.js",
		"w:dev:FloatingToc/code.js",
		"w:dev:ReferencePopups/code.js",
		"w:dev:RevealAnonIP/code.js",
		"w:dev:SearchSuggest/code.js",
		"w:dev:ShowHide/code.js",
                "w:dev:Standard_Edit_Summary/code.js",
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

/* To replace the now dead "welcome bot" */

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:Default Profile}}',
        3: false
    },
    summary: 'Script: Creating user profile'
};
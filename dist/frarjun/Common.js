/* Credits to Avatar, Sam and Cat, and Dev Wiki */

// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { link:'Admins' },
		sysop: { link:'Admins' },
		rollback: { link:'Admins' },
                chatmoderator: { link:'Admins' }
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
                "w:dev:DisableArchiveEdit/code.js",
                "w:dev:FloatingToc/code.js",
                "w:dev:PurgeButton/code.js",
                "w:dev:ReferencePopups/code.js",
                "w:dev:RelatedDiscussionsModule/code.js",
                "w:dev:RevealAnonIP/code.js",
                "w:dev:SearchSuggest/code.js",
		"w:dev:ShowHide/code.js",
                "w:dev:UserBadges/code.js",
                "w:dev:VisualSpellCheck/code.js",
		"MediaWiki:Common.js/activityrefresh.js",
		"MediaWiki:Common.js/displayclock.js",
		"MediaWiki:Common.js/disablecomments.js",
		"MediaWiki:Common.js/disableuploadpopup.js",
                "MediaWiki:Common.js/filluploadform.js",
		"MediaWiki:Common.js/insertusername.js",
                "MediaWiki:Common.js/navigationlinks.js",
		"MediaWiki:Common.js/wallgreetingbutton.js",
	]
});

/* Any JavaScript here will be loaded for all users on every page load. */
jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})
 
jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})

/* Slider */
importScriptPage('BackToTopButton/code.js',  'dev');
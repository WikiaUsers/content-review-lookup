/* Credits to Dev Wiki */

// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
                burocrata: { link:'Proyecto:Administración#Burócratas y Admninistradores' },
		admin: { link:'Proyecto:Administración#Burócratas y Admninistradores' },
		reversor: { link:'Proyecto:Administración#Reversores y Moderadores de Chat' },
                moderadordechat: { link:'Proyecto:Administración#Reversores y Moderadores de Chat' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['burocrata', 'admin', 'reversor', 'moderadordechat', 'bot'];
UserTagsJS.modules.metafilter = { 'notautoconfirmed': ['newuser'] };
UserTagsJS.modules.newuser = { days: 5, edits: 0 };

importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:Countdown/code.js",
                "w:dev:DupImageList/code.js",
		"w:dev:FloatingToc/code.js",
		"w:dev:ReferencePopups/code.js",
		"w:dev:RevealAnonIP/code.js",
		"w:dev:SearchSuggest/code.js",
                "w:dev:SexyUserPage/code.js",
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
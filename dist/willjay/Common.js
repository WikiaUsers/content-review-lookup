/* Any JavaScript here will be loaded for all users on every page load. */

/* Credits to Sam and Cat Wiki and Dev Wiki */

// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { link:'Project:Wiki Staff' },
		sysop: { link:'Project:Wiki Staff' },
		rollback: { link:'Project:Wiki Staff' },
                chatmoderator: { link:'Project:Wiki Staff' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bot', 'autoconfirmed'];
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
		"w:dev:ShowHide/code.js",
		"w:dev:UserBadges/code.js", 
        "w:dev:WallGreetingButton/code.js",
	]
});

importScriptPage('DisplayClock/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
/* Credits to Dev Wiki and Sam and Cat Wiki */

importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:Countdown/code.js",
		'w:dev:ReferencePopups/code.js',
		"w:dev:RevealAnonIP/code.js",
		"w:dev:SearchSuggest/code.js",
		"w:dev:ShowHide/code.js",
		"w:dev:VisualSpellCheck/code.js",
                "w:dev:WallGreetingButton/code.js",
		"MediaWiki:Common.js/displayclock.js",
		"MediaWiki:Common.js/insertusername.js",
	]
});
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Bureaucrat' },
		rollback: { u: 'Rollback' },
	}
};
UserTagsJS.modules.custom = {

};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
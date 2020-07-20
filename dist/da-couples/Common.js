/* Credits to Avatar, Sam and Cat, and Dev Wiki */

// UserBadges settings
window.UserBadgesJS = {
	inactive: 30,          // Inactive if no edits in this many days, 0=disabled
	gone: {'Some User Name':true}, // List of users who have formally left or are taking a break but it hasn't been 'inactive' days yet
//      example - gone: {'Some User Name':true, 'Some Other User':true},
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true,     // Don't display any non-custom tags for blocked users
	newusers: true,        // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true,        // Tag global Wikia accounts that have never edited anything
	custom: { 'SCbot': ['Bot'] },    // Custom tags for users
//      example - custom: { 'UserName 1': ['My Badge 1', 'My Badge 2'], 'UserName 2': ['Other Badge'] },
	names: {},             // Tags display names
	debug: false           // Extra debugging messages in the console
}

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
                "MediaWiki:Common.js/toolbar.js",
		"MediaWiki:Common.js/wallgreetingbutton.js",
	]
});
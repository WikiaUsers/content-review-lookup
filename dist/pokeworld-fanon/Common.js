/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];


importArticles({
    type: "script",
    articles: [
        'u:dev:AjaxRC/code.js',
        "u:dev:HighlightUsers/code.js",
        "u:dev:Countdown/code.js",
        'u:dev:UserTags/code.js',
        'u:dev:DisplayClock/code.js',
		"u:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"u:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
		"u:dev:Countdown/code.js", /* Countdown clock */
		"u:runescape:MediaWiki:Common.js/standardeditsummaries.js", /* Standard edit summaries */
		"MediaWiki:Common.js/imports.js", /* InactiveUsers and AjaxRC */
		"MediaWiki:Common.js/randompagelink.js", /* Special:Random > Special:Random/main in navigation */
		"MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */
		"MediaWiki:Common.js/disableforumedit.js", /* Discourage/disable the editing of forum archives */
		"MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
		"MediaWiki:Common.js/disablecomments.js", /* Disable comments for specified pages at discretion */
		"MediaWiki:Common.js/wallgreetingbutton.js", /* Add a button to edit Message Wall Greeting */
		"MediaWiki:Common.js/socialmedia.js", /* Add social media buttons to blog posts */
		"MediaWiki:Common.js/displaytitle.js", /* Ability to change full page title */
		"MediaWiki:Common.js/addnavlinks.js", /* Add "about us" and IRC links to "On the Wiki" menu */
		"MediaWiki:Common.js", /* Adds icons to page header bottom border */
		"MediaWiki:Common.js/fillupjs", /* Fills the summary field in upload form with imagebox */
		"MediaWiki:Common.js/rollbacktag.js", /* Add a tag for "rollback" to user page profile header */
		"MediaWiki:Common.js/talkbutton.js", /* Talk page buttons to article headers */
    ]
});
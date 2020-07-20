importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
		"w:dev:Countdown/code.js", /* Countdown clock */
		"w:runescape:MediaWiki:Common.js/standardeditsummaries.js", /* Standard edit summaries */
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
 
 
 
 
 
/* Any JavaScript here will be loaded for all users on every page load. */ /* Any JavaScript here will be loaded for all users on every page load. A lot of this code has been taken from other Wikis, which follow the same copyright laws. */ /* Replaces {{Username}} with the name of the user browsing the page. Requires copying Template:Username. */ function UserNameReplace() { if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; $("span.insertusername").html(wgUserName); } addOnloadHook(UserNameReplace); /* End of the {{Username}} replacement */
 
jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})
 
jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})
 
importScriptPage('ShowHide/code.js', 'dev')
importScriptPage('ShowHide/code.js', 'dev');
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* change wiki activity to recent changes */
function WikiActivity2RecentChanges() {
	$('.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges);
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">November 24 2011 00:00:00 PST</span> until Thanksgiving.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

/* Any JavaScript here will be loaded for all users on every page load. */
 
highlight = {
    selectAll: false,
    rollback: '1E90FF',
    chatmoderator: 'FFFF00',
    sysop: '00FF00',
    bureaucrat: 'FF00FF'
}
 
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }, (The last line doesn't need a comma at the end but all the other do)
                coowner: { u:'Head Chat Moderator' },
		voiceactor: { u:'The True Creator of Tundra' },
                synopsis: { u:'Media Manager' },
                synopsisss: {u:'PAW Helper'},
                synopsissss: {u:'Temporary Chat Moderator'},
                synopsisssss: {u:'User Of The Month'},
                synopsissssss: {u:'Content Moderator'} 
	}
};
 
UserTagsJS.modules.custom = {
        // 'username': ['tag'], (The last line doesn't need a comma at the end but all the other do)
    'Tundrathesnowpup': ['voiceactor'],
    'Zumarocks3390': ['synopsisss'],
    'Chase787': ['synopsissssss']
 
};
 
 
importArticles({
    type: "script",
    articles: [
        "u:dev:HighlightUsers/code.js",
        "w:c:dev:Countdown/code.js",
	'w:c:dev:UserTags/code.js',
	'u:dev:DisplayClock/code.js',
    ]
});
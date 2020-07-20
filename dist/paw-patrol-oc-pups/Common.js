/* Any JavaScript here will be loaded for all users on every page load. */ 
/* Any JavaScript here will be loaded for all users on every page load. 
   Alot of this code has been taken from other Wikis, which follow the same copyright laws. */ 

importArticles({
	type: 'script',
	articles: [
		'u:runescape:MediaWiki:Common.js/standardeditsummaries.js',
	]
});

/* Replaces {{Username}} with the name of the user browsing the page. Requires copying Template:Username. */ 
$(function UserNameReplace() { 
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return; 
    $("span.insertusername").html(wgUserName);
});
 
$('.achievementbox').mouseover(function() {
   $("div", this).show();
});
 
$('.achievementbox').mouseout(function() {
   $("div", this).hide();
});
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

window.highlight = {
    selectAll: false,
    rollback: '1E90FF',
    chatmoderator: 'FFFF00',
    sysop: '00FF00',
    bureaucrat: 'FF00FF'
};
 
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
    'Itsmemangleiscool': ['synopsisss'],
    '^^ThePuppy^^': ['synopsisss'],
    'PinkTrinaCat101': ['synopsisssss']
};
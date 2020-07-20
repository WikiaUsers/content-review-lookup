/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js", /* Auto Refresh */
        "u:dev:WallGreetingButton/code.js", /* Wall Greeting Button */
        "u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
        "u:dev:ShowHide/code.js", /* Show/Hide */
        "w:c:dev:ReferencePopups/code.js",
        "MediaWiki:Common.js/displayTimer.js",
        "MediaWiki:Common.js/Toggler.js"
    ]
});

/* User Tags */
 
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u: 'rollbacker' },
	}
};
UserTagsJS.modules.inactive = 0;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.autoconfirmed = false;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	rollback: ['sysop', 'bureaucrat', 'founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Replaces {{Visitor}} with the name of the user browsing the page. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{Visitor}} replacement */
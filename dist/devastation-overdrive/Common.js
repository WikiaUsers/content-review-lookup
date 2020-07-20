/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
InactiveUsers = { months: 6 };
 
importArticles({
    type: "script",
    articles: [
        'u:dev:DisplayClock/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:DisableBotMessageWalls/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:AjaxRC/code.js'
        ]
});
 
var ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Contributions"];
 
/***User Tags***/
window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { associated tag data }
        bureaucrat: 'Bureaucrat ',
        sysop: 'Administrator',
        moderator: 'Moderator',
        chatmoderator: 'Chat Moderator'
    }
};
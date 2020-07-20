/* User profile header custom tags */
UserTagsJS.modules.inactive = 72;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
            bot: ['bot-global']
};

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Reveal anon IPs */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:AjaxRC/code.js",
        "u:dev:MediaWiki:UserTags/code.js",
        "u:dev:MediaWiki:RevealAnonIP/code.js"
    ]
});
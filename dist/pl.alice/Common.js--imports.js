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
 
/* AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page'; */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity"];

/* Reveal anon IPs */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
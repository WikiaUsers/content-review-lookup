/* Any JavaScript here will be loaded for all users on every page load. */

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
// END AUTO-REFRESH
 
window.railWAM = {
    logPage:"Project:WAM Log"
};
 
/* Message Wall User Tags */
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'EarthlingnAkumi': 'Bureaucrat • Administrator',
        'Messenger of Heaven': 'Bureaucrat • Administrator',
        'Quinton1721':'Bureaucrat • Administrator',
        
        'Endercat TM':'Content Moderater • Chat Moderator', 
        
        'SlendyBot': 'Bot',
    }
};
/* End of Message Wall User Tags */
/* Making the chat logs only visible to certain user rights groups */

(function(){
if (!$('pre.ChatLog').exists()) return;
if (!(/sysop|vstf|staff|helper|chatmoderator/m.test(mw.config.get('wgUserGroups').join(' ')))) $('pre.ChatLog').hide();
})();

/* End of Making the chat logs only visible to certain user rights groups */
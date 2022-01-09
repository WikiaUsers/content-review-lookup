/* Any JavaScript here will be loaded for all users on every page load. */

window.railWAM = {
    logPage:"Project:WAM Log"
};

// Message Wall User tags (For staff) 
window.MessageWallUserTags = {
    tagColor: '#ff9226',
    txtSize: '13px',
    glow: true,
    glowSize: '20px',
    glowColor: '#e97f16',
    users: {
        // Bcrats
        'ExecutiveLight': 'Founder • Administrator',
        'Marktheartest': 'Bureaucrat • Administrator',
        'LordDuncan7': 'Bureaucrat • Administrator',
        //Admins
        'DiscordResistance': 'Administrator',
        'AmyD1': 'Administrator',
        'Lightning789': 'Administrator',
        //Mods
        'ItsYoBoyJorde': 'Moderator',
        'Tomoyogawa521': 'Moderator',
        'DarkStar720': 'Moderator',
        'Roloxian212156': 'Moderator',
        //Former staff
        'CosmicKai227': 'Former Stafff',
        'ForgotTheFood': 'Former Staff',
        'Oof ImStupid': 'Former Staff',
        'LeSunPraiser': 'Former Staff',
        'Saywhat321': 'Former Staff',
        'Waifu_Magnet_Mk_XVIII': 'Former Staff',
        'Gamerz1436': 'Former Staff',
        'Phycotox': 'Former Staff',
        'StormDragon456': 'Former Staff',
        'Evita128': 'Former Staff',
        'Jdoggie14': 'Former Staff',
        'AppleNoo69': 'Former Staff',
        //Wiki representative
        'Sitb': 'Wiki Representative'
        
    }
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/*Necropost stopper*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;

/* AjaxRC */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Contributions"];
window.ajaxRefresh = 20000;
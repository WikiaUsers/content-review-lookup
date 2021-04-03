/* Any JavaScript here will be loaded for all users on every page load. */

/* Referenced from One Punch Man Wikia */
$(function addPageBottom() {
        $("#WikiaRail").append('<div style="width:auto; height:auto; margin-bottom:10px; border:0px solid #0D2139; background-color: trasparent; padding:2px 5px; text-align:center; color: black; font-size:130%;"><div style="color: #721410; font-size: 150%; font-weight: bold; margin-bottom:-15px;">WARNING</div><br>This FANDOM site contains information that is <spn style="font-weight:bold;">NOT</spn> in the current translations!<br><br><spn style="font-style:italic;"><center>Read at your own risk.</center></spn></div>');
});

/* RailWAM */
window.railWAM = {
    logPage:         "Project:WAM Log/Auto-Statistics",
    loadOnPage:      "Special:WikiActivity",
    loadOnNamespace: [-1]
};

/* Auto Refresh */
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.MessageWallUserTags = {
    tagColor: '#1b2a80',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#34d7e3',
    users: {
        'Gilthuner444': 'Taboo Existence • Supreme • Chaotic Sword God',
     }
};
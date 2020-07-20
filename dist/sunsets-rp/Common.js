 /* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
   var MessageBlock = {
  title : 'Blocked.',
  message : 'This user has been blocked for $2 for the following offence(s): "$1"',
  autocheck : true
};
 
/* Auto refresh */
window.ajaxPages = ["Special:NewFiles","Blog:Recent posts","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
/* Reveal anon IP */
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'threadmoderator', 'sysop', 'bureaucrat', 'helper', 'util', 'staff']
};
/* Clock */
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
/* FastDelete */
window.fdButtons = [];
 
window.fdButtons[window.fdButtons.length] = {
    summary: 'Vandalism',
    label: 'V'
};
 
window.fdButtons[window.fdButtons.length] = {
    summary: 'Spam',
    label: 'S'
};
 
/* QuickDelete [Categories ONLY] */
window.category = 'Candidates for deletion';
window.reason = 'Marked for deletion';
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:MessageBlock/code.js',
        'w:c:dev:AjaxRC/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:CleanWantedFiles/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:HeaderLinks/code.js',
        'u:dev:LastEdited/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'w:dev:WallGreetingButton/code.js',
        'u:dev:ChatReload/code.js',
        'u:dev:FastDelete/code.js',
        'u:dev:QuickDelete/code.js'
    ]
});
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */
window.UserTagsJS = {
	modules: {},
	tags: {
	   	bureaucrat: {u:'Bureaucrat', link:'Project:Staff#Bureaucrats'},
                founder: {u:'Founder', link:'Project:Staff#Bureaucrats'},
                sysop: {u:'Admin', link:'Project:Staff#Admins'},
                chatmoderator: {u:'Chat moderator', link:'Project:Staff#Chat_Moderators'},
                rollback: {u:'Rollback', link:'Project:Staff#Rollbacks'},
                threadmoderator: {u:'Moderator', link:'Project:Staff#Moderators'},
                sunset: {u:'Bannie'},
                jester: {u:'Jester'},
                galaxy: {u:'Galactic Cosmos'},
	}
};
UserTagsJS.modules.custom = {
                'SunsetBlaze': ['sunset','jester','galaxy'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.MessageWallUserTags = {
    tagColor: 'Ghostwhite',
    glow: true,
    glowSize: '22px',
    glowColor: '#3104B4',
    users: {
        'SunsetBlaze': 'Owner',
        'UltimateSonicGame123': 'Admin',
        'Rebun123': 'Admin',
        'Kingfireblast': 'Admin',
        'Dremora_Stormcloak': 'Admin',
        'DB511611': 'Moderator',
        'Neoninjaboy320': 'Admin',
        'GforGolden': 'Chat Moderator',
        'Sukie_The_Human_Mangle': 'Chat Moderator',
    }
};

//Remember that most of these must be inserted BEFORE the 'importArticles' code.
/* ~ .: Auto-Refresh :. ~ */
window.ajaxPages = ["Special:NewFiles","Blog:Recent posts","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
/* ~ .: Admin Dashboard: Javascript Shortcut :. ~ */
var editURL;
$("#AdminDashboardGeneral .control-section.wiki .controls").prepend("<a href='" + (editURL || "/wiki/MediaWiki:Common.js?action=edit") + "'><div style='border: 1px solid #CCCCCC; width: 50px; height: 50px; border-radius: 7px; font-family: Arial; cursor: pointer; position: absolute; left: 430px; top: 58px;'><img src='https://vignette.wikia.nocookie.net/lllioliol/images/d/d0/JS.png/revision/latest?cb=20150727171949' width='36' height='22' style='position:absolute; top: 13px; left: 8px;'><p style='position:absolute; top: 50px; font-size: 11px;'><a href='" + (editURL || "/wiki/MediaWiki:Common.js?action=edit") + "' style='text-decoration:none;' onmouseover='text-decoration: underline;'>JavaScript</a></p></div></a>");
 
/* ~ .: Reveal Anon IP :. ~ */
// License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
window.RevealAnonIP = {
    permissions : ['bureaucrat', 'sysop', 'rollback', 'threadmoderator', 'helper', 'util', 'staff']
};
 
/* ~ .: QuickDeletes :. ~ */
window.category = 'Candidates for deletion';
window.reason = 'Marked for deletion';
 
/* ~ .: Automatic Block Message :. ~ */
var MessageBlock = {
  title : 'Block.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true
};

/* ~ .:LockForums :. ~ */
window.LockForums = {
    ignoreDeletes: true,
};

// NOW for the 'importArticles' code!
importArticles({
   type: "script",
   articles: [
       'w:c:dev:UserTags/code.js',
       'u:dev:MessageWallUserTags/code.js',
       'u:dev:MessageBlock/code.js',
       'u:dev:AdminDashboard JS-Button/code.js',
       'u:dev:QuickDelete/code.js',
       'w:c:dev:RevealAnonIP/code.js',
       'u:dev:LastEdited/code.js',
       'u:dev:CleanWantedFiles/code.js',
       'w:dev:WallGreetingButton/code.js',
       'w:c:dev:Countdown/code.js',
       'u:dev:LockForums/code.js',
   ]
});
 
/* ~ .: Custom User Tags :. ~ */

window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: {u:'Bureaucrat'},
        founder: {u:'Founder'},
        sysop: {u:'Admin'},
        chatmoderator: {u:'Chat Moderator'},
        rollback: {u:'Rollback'},
        threadmoderator: {u:'Moderator'},
        coder: {u:'Wiki Coder'},
        owner: {u: 'Owner'},
        tubby: {u:'Tubby Maker'},
        pothree: {u:'Voice of Po and Employee #3'},
        game: {u:'Game Developer'},
        inact: {u:'Inactive'},
	}
};

UserTagsJS.modules.custom = {
    'Critolious': ['owner', 'tubby'],
    'TinyThyMelon': ['pothree'],
};

UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'moderator',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'newuser'
];

UserTagsJS.modules.metafilter = {
    bureaucrat: ['founder'],
    sysop: ['bureaucrat', 'founder'],
    chatmoderator: ['sysop', 'bureaucrat'],
    rollback: ['sysop', 'bureaucrat'],
    threadmoderator: ['sysop', 'bureaucrat'],
    newuser: ['chatmoderator', 'bannedfromchat', 'newuser']
};

// this one: ['is overridden', 'by these']
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
};

/* ~ .: Message Wall User Tags :. ~ */
window.MessageWallUserTags = {
    tagColor: 'GhostWhite',
    glow: true,
    glowSize: '22px',
    glowColor: '#e05353',
    users: {
        'William0918': 'Founder',
        'Critolious': 'Game Creator',
        'Tuparman': 'Owner',
        'Skyd3rp': 'Moderator',
    }
};
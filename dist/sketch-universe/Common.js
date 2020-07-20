/* Any JavaScript here will be loaded for all users on every page load. */
/* This code was put together with various snippets of code from [[w:c:dev]], or the Dev Wiki! */
/* Breaks VERY easily; DO NOT edit before telling [[User:SketchNebula]]. */
/* Remember that most of these must be inserted BEFORE the 'importArticles' code. */



/* ------ Auto-Refresh ------ */
window.ajaxPages = ["Special:NewFiles","Blog:Recent posts","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';



/* ------ Admin Dashboard: Javascript Shortcut ------ */
var editURL;
$("#AdminDashboardGeneral .control-section.wiki .controls").prepend("<a href='" + (editURL || "/wiki/MediaWiki:Common.js?action=edit") + "'><div style='border: 1px solid #323232; width: 50px; height: 50px; border-radius: 7px; font-family: Arial; cursor: pointer; position: absolute; left: 430px; top: 58px;'><img src='https://vignette.wikia.nocookie.net/lllioliol/images/d/d0/JS.png/revision/latest?cb=20150727171949' width='36' height='22' style='position:absolute; top: 13px; left: 8px;'><p style='position:absolute; top: 50px; font-size: 11px;'><a href='" + (editURL || "/wiki/MediaWiki:Common.js?action=edit") + "' style='text-decoration:none;' onmouseover='text-decoration: underline;'>JavaScript</a></p></div></a>");


 
/* ------ WikiaPage Digital Clock ------ */
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (CST)';


 
/* ------ Reveal Anon IP ------ */
    // License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
window.RevealAnonIP = {
    permissions : ['bureaucrat', 'sysop', 'rollback', 'threadmoderator', 'helper', 'util', 'staff']
};


 
/* ------ FastDeletes ------ */
window.fdButtons = [];
    window.fdButtons[window.fdButtons.length] = {
        summary:'Vandalism',
        label:'V',
    };
    window.fdButtons[window.fdButtons.length] = {
        summary:'Spam',
        label:'S',
    };
    window.fdButtons[window.fdButtons.length] = {
        summary:'Housekeeping',
        label:'HK',
    };


 
/* ------ QuickDeletes ------ */
window.category = 'Candidates for deletion';
window.reason = 'Marked for deletion';


 
/* ------ Automatic Block Message ------ */
var MessageBlock = {
  title : 'Block.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true
};



/* ------ Inactive Users ------ */
InactiveUsers = { 
    months: 3
};



    // NOW for the 'importArticles' code!
importArticles({
   type: "script",
   articles: [
       'w:c:dev:UserTags/code.js',
       'u:dev:MessageWallUserTags/code.js',
       'u:dev:MessageBlock/code.js',
       'u:dev:AdminDashboard JS-Button/code.js',
       'u:dev:FastDelete/code.js',
       'u:dev:QuickDelete/code.js',
       'w:c:dev:CleanWantedFiles/code.js',
       'u:dev:DisplayTimer/code.js',
       'u:dev:DisplayClock/code.js',
       'w:c:dev:RevealAnonIP/code.js',
       'u:dev:LastEdited/code.js',
       'u:dev:CleanWantedFiles/code.js',
       'w:dev:WallGreetingButton/code.js',
       'w:c:dev:Countdown/code.js',
       'u:dev:HighlightUsers/code.js',
       'u:dev:InactiveUsers/code.js',
   ]
});


 
/* ------ Wikia User Tags ------ */
window.UserTagsJS = {
        modules: {},
        tags: {
                founder: {u:'Founder', link:'Project:Staff#Bureaucrats'},
                bureaucrat: {u:'Bureaucrat', link:'Project:Staff#Bureaucrats'},
                sysop: {u:'Admin', link:'Project:Staff#Admins'},
                threadmoderator: {u:'Moderator', link:'Project:Staff#Moderators'},
                chatmoderator: {u:'Chat Moderator', link:'Project:Staff#Chat_Moderators'},
                rollback: {u:'Rollback', link:'Project:Staff#Rollbacks'},
                coder: {u:'Wiki Coder'},
                bot: {u:'Wiki Bot'},
                honoured: {u:'Honoured User'},
                vesper: {u:'Evening Star'},
                paradox: {u:'Paradoxical Enigma'},
                smash: {u:'Amnesia Rainbow'},
                spring: {u:'Springtrap'},
                arca: {u:'Memelord'},
                dicky: {u:'Dicky'},
                sly: {u:'Sly Blue'},
                cas: {u:'*Wizard*'},
                ben: {u:'Official Yandere'},
                revin: {u:'11037'},
                wenis: {u:'Wenis'},
                hanji: {u:'Do it for Science'},
                dan: {u:'Sin of Sloth'},
                aki: {u:'Asriel'},
                sera: {u:'Yeet Lord'},
        }
};
    // NO MORE than two/three custom tags per user!
    // Exceptions are staff position, coder, and honoured tags.
UserTagsJS.modules.custom = {
        'SketchNebula': ['founder', 'vesper', 'paradox'],
        'Arca Asami': ['arca', 'dicky', 'sly'],
        'Foxdini': ['sera'],
        'CypherStarnova': ['honoured', 'cas'],
        'AyanoTheYandere': ['honoured', 'ben'],
        'HugeClockTowerFan': ['honoured'],
        'The Haze3456': ['honoured', 'smash', 'spring'],
        'Rebun123': ['honoured', 'revin'],
        'Dan Uzumaki': ['dan'],
        'Kuromin': ['aki'],
};


 
/* ------ User Tag Filters ------ */
UserTagsJS.modules.metafilter = {
        'inactive': ['sysop', 'bureaucrat'], 
        'sysop': ['bureaucrat', 'founder'],
        'chatmoderator': ['sysop', ['patroller', 'rollback']],
};


 
/* ------ Message Wall User Tags ------ */
window.MessageWallUserTags = {
    tagColor: 'GhostWhite',
    glow: true,
    glowSize: '22px',
    glowColor: '#FF80FF',
    users: {
        'SketchNebula': 'Founder',
        'Arca Asami': 'Second-in-Command',
        'Xersin': 'Admin',
        'Foxdini': 'Admin',
        'PierrotEclipse': 'Admin',
        'DroidUnit774': 'Rollback',
        'AyanoTheYandere': 'Honoured User',
        'CypherStarnova': 'Honoured User',
        'HugeClockTowerFan': 'Honoured User',
        'The Haze3456': 'Honoured User',
        'Rebun123': 'Honoured User',
    }
};



/* ------ {{USERNAME}} Template ------ */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
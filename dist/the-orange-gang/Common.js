/* Any JavaScript here will be loaded for all users on every page load. */
// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================
 
// RevealAnonIP
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};
 
// DynamicImages Config
DynamicImages = {
    gifImages: true,
    gifGalleryImages: false
};
 
// Auto-refresh
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
//Auto Message Blocked
var MessageBlock = {
  title : 'Blocked.',
  message : 'This user has been blocked for $2 for the following offence(s): "$1"',
  autocheck : true
};
 
//Last Edited Config
window.lastEdited = {
    avatar: false
};

// BackToTopButton settings
var Speed = 600;
var Start = 800;
 
// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================
 
$(function () {
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $('span.insertusername').each(function () {
        $(this).text(wgUserName);
    });
});
 
// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================
// ================================================================
// Username tags additions/filters (Working as intended)
// Be careful ye retarded twats, this'll break D:< 
// ================================================================
 
window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: { u: 'Bureaucrat' },
        founder: { u: 'Creator' },
        king: { u: 'Killstreak Killer' },
        tyler: {u: 'tYELR' },
        pootis: {u: 'Shalapootska' },
        gfor: {u: 'Narcissist' },
        kaine: {u: 'Nimble Navigator' },

    }
};
 
UserTagsJS.modules.custom = {
    'Kingfireblast': ['king'],
    'HugeClockTowerFan': ['tyler'],
    'Dalokohs_Pootis_Spencer': ['pootis'],
    'Doctor_Quillo': ['quillo'],
    'DroidUnit774': ['droid'],
    'Cyrax_The_Machine': ['cyrax'],
    'Kaine_Flow': ['kaine'],
    'GforGolden': ['gfor'],
};
 
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
];
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat', 'founder'],
    chatmoderator: ['sysop', 'bureaucrat', 'rollback'],
    rollback: ['sysop'],
    newuser: ['chatmoderator', 'bannedfromchat', 'sysop', 'bureaucrat', 'rollback']
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
{
};
// MessageWallUserTags config
window.MessageWallUserTags = {
    tagColor: 'Ghostwhite', //Tag color – The color of the tag's text
    glow: true, //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '50px', //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'orange', //Glow color
    users: {
        'Kingfireblast': 'Bureaucrat',
        'Dalokohls_Pootis_Spencer': 'Bureaucrat',
        'HugeClockTowerFan': 'Admin',
        'Docter_Quillo': 'Admin',
        'Cyrax_The_Machine': 'Chat Moderator',
        'DroidUnit774': 'Chat Moderator',
        'GforGolden': 'Chat Moderator',
        'Kaine_Flow': 'Chat Moderator',
    }
};

//===================================================================
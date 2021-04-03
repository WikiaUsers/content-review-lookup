/* Any JavaScript here will be loaded for all users on every page load. */
 
// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================
 
// RevealAnonIP
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'administrator']
};
 
// DynamicImages Config
DynamicImages = {
	gifImages: true,
        gifGalleryImages: false,
};
 
// Auto-refresh
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
//Auto Message Blocked
var MessageBlock = {
  title : 'Block.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true
};
 
//Last Edited Config
window.lastEdited = {
    avatar: false
};
 
// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================
 
$(function () {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $('span.insertusername').each(function() {
       $(this).text(wgUserName);
   });
});
 
// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================
 
// ===========================================
// Message Wall Tags (Part 1)
// ===========================================
window.MessageWallUserTags = {
    tagColor: '#DF1063',
    glow: true,
    glowSize: '15px',
    glowColor: '#F6136E',
    users: {
        '---': 'Bureaucrat',
    }
};
 
// ================================================================
// MessageWallUserTags config
window.MessageWallUserTags = {
    tagColor: '#DF1063',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '20px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: '#F6136E', //Glow color
    users: {
        'LeTesla': 'Current Owner',
        'Splatterflame': 'Administrator',
        'SpongeFreddy777': 'Administrator',
        'ImAPenguin': 'Founder',
        'WyattMars_the_FNARI_Developer': '2nd in Command',
        'DoesItLookLikeICare': 'Administraror',
        'Moonrat': 'Adminiatrator',
        'Xamp6': 'Decompiler',
        'Lucagumballf': 'Administrator',
        'DeathForAMillenuim': 'Administrator',
        'Tobias_Alcaraz': 'Music Changer',
        'WwwWario': 'Developer',
        'Shadowgallade777': 'Administrator',
        'MariowiiX': 'Administrator',
        'Mario_FNAW': 'Bureacrat',
        'Bionicjumpscare': 'Minicrat',
        'Norev_Doruk': 'Minicrat',
        'Aether255': 'Minicrat',
        'SomeRandomApple': 'Minicrat',
        'DoesItLooksLikeICare': 'Administrator',
        'Bonnie_The_King_Bunny': 'Chat Mod',
        'MikeGaming': 'Chat Mod',
        'Gaap2000': 'Rollbacker',
        '6f5e4d': 'Chat Mod',
        'JGiggee': 'Chat Mod',
        'Treeforest27': 'Admin',
        'InfiniteNo': 'Admin',
        'Bonnie_the_Kawaii_Rabbit': 'Chat Mod',
        'Offline4Now': 'Moderator',
        'Tyrannosaurus_dude11': 'Minicrat',
        'Scopica': 'Admininstrator',
        'Venomtrex': 'Administrator',
        'Wa-Wa-Wrekt': 'Content Moderator'
        'Dragonmasterdrago302': 'Content Moderator'
 
    }
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});
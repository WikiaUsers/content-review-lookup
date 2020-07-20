/* Any JavaScript here will be loaded for all users on every page load. */
 
 
// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================
 
// RevealAnonIP
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']};
 
// DynamicImages Config
DynamicImages = {
	gifImages: true,
        gifGalleryImages: false,};
 
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
  title : 'Block',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true};
 
//Last Edited Config
window.lastEdited = {
    avatar: false};
 
// ==============================
importArticles({
    type: "script",
    articles: [
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:UserTags/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:DisplayClock/code.js',
        'w:c:dev:AjaxRC/code.js',
        'u:dev:MessageBlock/code.js',
        'w:c:dev:FixMultipleUpload/code.js',
        'w:c:dev:LockOldBlogs/code.js',
        'u:dev:LockForums/code.js',
        'MediaWiki:Common.js/plok.js', // (Club Penguin Wiki has crazy stuff)
        'u:dev:CleanWantedFiles/code.js'
    ]
});
 
 
// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================
 
$(document).ready( function () {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $('span.insertusername').each(function() {
       $(this).text(wgUserName);
   });
});
 
// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================
 
// ================================================================
// Username tags additions/filters (Working as intended)
// ================================================================
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat'},
        majora: { u:'Developer'},
        newuser: { u:'Sweg Apprentice'},
        chatmoderator: { u:'Chat Mod'},
        rollback: { u:'Rollback'},
        sysop: {u:'Sweg Master'},
        puppeteer: {u:'Puppeteer'},
        mothra: {u:'Mothra'},
        copuppeteer: {u:'Co Puppeteer'},

	}
};
 
UserTagsJS.modules.custom = {
        'Iskaldur': ['mothra', 'puppeteer'],
        'Schmidkalkan': ['co puppeteer']
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat'], }
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = {
	days: 3, // Must have been on the Wiki for 3 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

 
// ===================
// MessageWallUserTags config
// ===================
 
window.MessageWallUserTags = {
    tagColor: 'Ghostwhite',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '20px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'Indigo', //Glow color
    users: {
        
        'Schmidkalkan': 'Squidduckid',
        'Iskaldur': 'Mothra',
        'The_Tickle_Monster_SCP-999': 'Founder',
        'Warpyro': 'Warlord',
        'Teacup_Terry': 'Teacup',
        'LeonDWave': 'Doge',
        'FacciaBianco': 'Beefy',
        'Bed_Head_Zed': 'Plague Doctor',
        'Darkstar293': 'Sexy Demon',

    }
};
 
 
//===================================================================
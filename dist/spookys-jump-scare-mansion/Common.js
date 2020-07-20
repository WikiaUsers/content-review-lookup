/* Any JavaScript here will be loaded for all users on every page load. */


// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// Please don't edit this without Psychobilly's permission, this breaks easily.
// ==============================

// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']};

// DynamicImages Config
window.DynamicImages = {
	gifImages: true,
        gifGalleryImages: false,};

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

//Auto Message Blocked
window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true};

// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================

$(function () {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
   $('span.insertusername').each(function() {
       $(this).text(wgUserName);
   });
});

// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================

// ================================================================
// Username tags additions/filters (Working as intended)
// Be careful and edit only with Psychobilly's permission, this breaks easily. 
// ================================================================
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat'},
        dev: { u:'Developer'},
        newuser: { u:'Fresh Blood'},
        chatmoderator: { u:'Chat Mod'},
        rollback: { u:'Rollback'},
        sysop: {u:'Admin'},
        mothra: {u:'Mothra'},
        kek: {u:'Kek'},
        owner: {u:'owner'},
        qa: {u:'Lead QA'}
	}
};

UserTagsJS.modules.custom = {
        'Psychobilly2422': ['dev'],
        'Iskaldur': ['mothra'],
        'Schmidkalkan': ['kek'],
        'Shruk': ['owner'],
        'Centaura': ['qa'],
        'Akuma_Kira': ['dev']

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
    'newuser'
];

UserTagsJS.modules.metafilter = {
    sysop: [
        'bureaucrat',
        'founder'
    ],
    chatmoderator: [
        'sysop',
        'bureaucrat',
        'rollback'
    ],
    rollback: ['sysop'],
    newuser: ['chatmoderator', 'bannedfromchat'], 
};

UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = {
	days: 3, // Must have been on the Wiki for 3 days
	edits: 5, // And have at least 5 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.userfilter = {
    'Psychobilly2422': ['bureaucrat'], //Remove Bureaucrat
    'Shruk': ['bureaucrat'], //Remove Bureaucrat
    'Centaura': ['sysop'] //Admin
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
        'Psychobilly2422': 'Developer',
        'Akuma_Kira': 'Developer',
        'Shruk': 'Owner',
        'Schmidkalkan': 'Bureaucrat',
        'Iskaldur': 'Bureaucrat',
        'FacciaBianco': 'Retired',
        'Waterway1': 'Bureaucrat',
        'The_Tickle_Monster_SCP-999': 'Chatmod',
        'Darkstar293': 'Retired',
        'Centaura': 'Lead QA',
        'Homura-chan': 'Content Mod',
    }
};
/* Any JavaScript here will be loaded for all users on every page load. */
/* Include Global Anime-Common.js Information */
importArticles({
    type: 'script',
    article: 'u:anime:MediaWiki:Anime-Common.js'
});

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
});
// ****** END: JavaScript for [[Special:Upload]] ******

/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];

/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: {
            u: 'Sovereign',
            link: 'Help:User_access_levels#Bureaucrats', 
            order: -1/0
        },
        sysop: {
            u: 'Aristocrat of Evil',
            link: 'Help:User_access_levels#Administrators', 
            order: -1/0 
        },
        'content-moderator': { 
            u: 'Order of the Garter',
            link: 'Help:User_access_levels#Content_Moderators', 
            order: -1/0
        },
        rollback: { 
            u: 'Watchdog',
            link: 'Help:User_access_levels#Rollbacks', 
            order: 1/0
        },
        threadmoderator: {
            u: 'Earl Forums',
            link: 'Help:User_access_levels#Discussions_Moderators',
            order: 2/0
        },
        chatmoderator: {
            u: 'Scotland Yard Officer',
            link: 'Help:User_access_levels#Chat_Moderators',
            order: 2/0
        },
        bot: { 
            u: 'Steam-Powered Bot',
            link: 'Help:User_access_levels#Bots',
            order: -1/0
        },
        blocked: { 
            u: 'Banished to the East End',
            link: 'Kuroshitsuji_Wiki:Policies#Blocking_Policy',
            order: -1/0
        },
        ambassador: { u: 'Ambassador', order: 2/0 },
        eventhost: { u: 'Event Host', order: 2/0 },
        inactive: { u: 'Has vacated the Empire' },
        newuser: { u: 'Newly inducted citizen', order: -1/0 }
	}
};

// Add custom groups to several users
UserTagsJS.modules.custom = {
    'MasterLau': ['rollback', 'chatmoderator', 'eventhost', 'threadmoderator'],
	'Michee': ['rollback', 'chatmoderator', 'ambassador'], // Add Ambassador
};

UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 40, // And have at least 40 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'inactive',
    'blocked',
];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder', 'bot'], // Remove administrator group from bureaucrats and bots
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};

// Load forum changes only in the forum namespace.
if (({1201: 1, 2000: 1})[mw.config.get('wgNamespaceNumber')] === 1 || mw.config.get('wgCanonicalSpecialPageName') === 'Forum') {
    importScriptPage("MediaWiki:Common.js/Forum.js");
}

// LockForums
window.LockForums = {
    expiryDays: 200,
    expiryMessage: "This forum is considered archived because it is no longer active and hasn\'t been commented on in over 6 months, please don\'t bump this forum!",
    warningDays: 150,
    warningMessage: "This forum hasn\'t been commented on for 5 months. Please reply ONLY if a response is really needed.",
    forumName: "Forum",
    banners: true,
    ignoreDeletes: true,
    warningPopup: true,
    disableOn: ["36128"],
};
// - end -  LockForums
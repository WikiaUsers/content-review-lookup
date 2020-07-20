/* Any JavaScript here will be loaded for all users on every page load. */
/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: {
            u: 'PÂTISSIER',
            link: 'http://to-all-the-boys-ive-loved-before.wikia.com/wiki/Special:ListUsers/bureaucrat',
            order:-1/0
        },
        sysop: { 
            u: 'CONFECTIONER',
            link: 'http://to-all-the-boys-ive-loved-before.wikia.com/wiki/Special:ListUsers/sysop',
            order: -1/0
        },
		inactive: { u: 'WENT TO COLLEGE' },
        chatmoderator: { u: 'BAKER', order: 1/0 },
        rollback: { 
            u: 'TASTE TESTER',
            link: 'http://to-all-the-boys-ive-loved-before.wikia.com/wiki/Special:ListUsers/rollback'
        },
        ambassador: { u: 'MODEL UN AMBASSADOR', order: -1/0 },
	}
};
 
// Add custom groups to several users
UserTagsJS.modules.custom = {
 
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
    'bot-global'
];
 
UserTagsJS.modules.metafilter = {
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
// MessageWallUserTags
window.MessageWallUserTags = {
    tagColor: '#ff8dbd',
    glow: true,
    glowSize: '15px',
    glowColor: '#ffcfd5',
    users: {
        "RueNightshade" : "PÂTISSIER • CONFECTIONER",
    }
};
// Load forum changes only in the forum namespace.
if (({1201: 1, 2000: 1})[mw.config.get('wgNamespaceNumber')] === 1 || mw.config.get('wgCanonicalSpecialPageName') === 'Forum') {
    importScriptPage("MediaWiki:Common.js/Forum.js");
}
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
// LockOldBlogs
window.LockOldBlogs = {
    expiryDays: 180,
    expiryMessage: "This blog is considered inactive and archived because it hasn\'t been commented on in 6 months and there is no longer an ongoing discussion in the comments section.",
};
 // - end -  LockOldBlogs
 
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};
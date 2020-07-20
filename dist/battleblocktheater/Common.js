/* Any JavaScript here will be loaded for all users on every page load. */

//Auto Message Blocked
var MessageBlock = {
    title: 'Block.',
    message: 'You have been blocked for $2 for the following reason(s): "$1"',
    autocheck: true
};
 
//Last Edited Config
window.lastEdited = {
    avatar: true
};

// <_--_>
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span
// <_--_>
 
$(function () {
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $('span.insertusername').each(function () {
        $(this).text(wgUserName);
    });
});

// =---=
// Username tags (be careful with these)
// =---=
 
window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: { u: 'Theater Head-Staff' },
        newuser: { u: 'New Performer' },
        founder: { u: 'Purrham Furbottom' },
        admin: { u: 'Theater Staff' },
        moderator: { u: 'Theater Guard' }
    }
};
 
UserTagsJS.modules.custom = {
    'Vernanonix': ['retired'],
    'Jillips Entertainment': ['bacon'],
    'StealthyMoose': ['moose'],
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat', 'founder'],
    chatmoderator: ['sysop', 'bureaucrat', 'rollback'],
    rollback: ['sysop'],
    newuser: ['chatmoderator', 'bannedfromchat']
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = {
    days: 3, // Must have been on the Wiki for 3 days
    edits: 5, // And have at least 5 edits to remove the tag
    namespace: 0 // Edits must be made to articles to count
};

importArticles({
	type:'script',
	articles: [
		'w:c:dev:UserTags/code.js',
	]
});
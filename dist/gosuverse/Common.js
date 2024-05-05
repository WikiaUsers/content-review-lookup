/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
        'Special:WikiActivity',
        'Special:RecentChanges',
        'Special:Contributions',
        'Special:Log',
        'Special:Log/move',
        'Special:AbuseLog',
        'Special:NewFiles',
        'Special:NewPages',
        'Special:Watchlist',
        'Special:Statistics',
        'Special:ListFiles'
];

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* UserTags from Dev Wikia */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Wiki Eminence'},
		sysop: { u:'Supreme Master'},
		'content-moderator': { u:'Gosu'},
		chatmoderator: { u:'Gosu'},
		threadmoderator: { u:'Gosu'},
		blocked: { u:'Sealed'},
		eminence1: { u:'Editing Eminence'},
		eminence2: { u:'Discord Eminence'},
		poweruser: { u:'Power User'}
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.stopblocked = true; // Manually turn on/off
UserTagsJS.modules.mwGroups = ['bureaucrat', 'content-moderator', 'chatmoderator', 'threadmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global',  'blocked', 'founder', 'poweruser'];
UserTagsJS.modules.metafilter = {
	'content-moderator': ['bureaucrat', 'sysop', 'founder'],
	chatmoderator: ['bureaucrat', 'sysop', 'founder'],
	threadmoderator: ['bureaucrat', 'sysop', 'founder'],
	rollback: ['bureaucrat', 'sysop', 'founder', 'content-moderator', 'chatmoderator', 'threadmoderator'],
	patroller: ['bureaucrat', 'sysop', 'founder', 'content-moderator', 'chatmoderator', 'threadmoderator']
};
UserTagsJS.modules.custom = {
    // Three most prominent editors!
	'HuronFal00': ['eminence1'], 
	'Raimonryujin': ['eminence2']
};

// Custom edit buttons
if (mw.toolbar) {
    mw.toolbar.addButton(
        'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
        'Redirect',
        '#REDIRECT [[',
        ']]',
        'Insert text',
        'mw-editbutton-redirect'
    );
    mw.toolbar.addButton(
        'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
        'Add a reference',
        '<ref>',
        '</ref>',
        'Insert source',
        'mw-editbutton-ref'
    );
}

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
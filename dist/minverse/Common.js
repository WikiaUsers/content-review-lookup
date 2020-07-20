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
	rollback: ['bureaucrat', 'sysop', 'founder'],
	patroller: ['bureaucrat', 'sysop', 'founder']
};

window.DisplayClockJS = {
	hoverText: 'Click the clock to purge and refresh the page!'
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
        'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
        'Add the ō character',
        'ō',
        '',
        '',
        'mw-editbutton-macron-o'
    );

    mw.toolbar.addButton(
        'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
        'Add the ū character',
        'ū',
        '',
        '',
        'mw-editbutton-macron-u'
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
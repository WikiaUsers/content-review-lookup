/*/* Any JavaScript here will be loaded for all users on every page load. */

/*****************************************************/
/******** Auto updating recent changes opt-in ********/
/*** Attribution: http://dev.wikia.com/wiki/AjaxRC ***/
/*****************************************************/
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

/* importArticles-start */
window.DisplayClockJS = {
	hoverText: 'Click here to kick some ass and clear the cache!'
};

/* UserTags from Dev Wikia */
window.UserTagsJS = {
	modules: {},
	tags: {
		bot: { u:'Charyeok'},
		rollback: { u:'Power Borrower'},
		threadmoderator: { u:'Judge'},
		chatmoderator: { u:'Judge'},
		'content-moderator': { u:'Judge'},
		highjudge: { u:'Ascended Judge'},
		sysop: { u:'The Six'},
		bureaucrat: { u:'God'},
		poweruser: { u:'Key'}
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10 // And have at least 19 edits to remove the tag
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.stopblocked = true; // Manually turn on/off
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'threadmoderator',
    'content-moderator',
    'patroller',
    'rollback',
    'sysop',
    'bot',
    'bot-global',
    'blocked',
    'poweruser'
];
UserTagsJS.modules.metafilter = {
	chatmoderator: ['bureaucrat', 'sysop'],
	threadmoderator: ['bureaucrat', 'sysop'],
	'content-moderator': ['bureaucrat', 'sysop'],
	rollback: ['bureaucrat'],
	patroller: ['bureaucrat', 'sysop'],
	sysop: ['bureaucrat'],
};
UserTagsJS.modules.implode = {
	'highjudge': ['chatmoderator', 'content-moderator', 'threadmoderator']
};

// Custom edit buttons
if (mw.toolbar) {
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
 
    mw.toolbar.addButton(
        'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
        'Redirect',
        '#REDIRECT [[',
        ']]',
        'Insert text',
        'mw-editbutton-redirect'
    );
}

window.kockaEmoticons = {
    vocab: {
        emoticons: "Emojis",
        close: "Close!"
    },
    help: "Choose an emoji by clicking on it!"
};
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
});

// God of High School Discord
window.DiscordIntegratorConfig = {
    siderail: {
        title: "God of High School Discord",
        id: "717370812155559996",
        theme: "light"
    }
};
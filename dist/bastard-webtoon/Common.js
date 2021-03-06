/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Logs",
    "Special:Contributions",
    "Special:Watchlist"
];

window.PurgeButtonText = 'Refresh';
 
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
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'threadmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bot',
    'bot-global',
    'blocked',
    'founder',
    'poweruser'
];

/* importArticles-start */
window.DisplayClockJS = {
	hoverText: 'Click here to refresh the page and clear the cache!'
};

window.railWAM = {
    logPage:"Project:WAM Log"
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

importArticles({
    type: 'script',
    articles: [
        'u:kocka:MediaWiki:Emoticons.js'        // Adds a window with all emoticons listed
    ]
});
/* importArticles-end */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
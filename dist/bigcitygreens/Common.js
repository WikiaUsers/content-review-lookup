/* Any JavaScript here will be loaded for all users on every page load. */

//Auto Message Blocked
var MessageBlock = {
    title : 'Banned From Here',
    message : 'You have been blocked for $2 for the following reason(s): "$1"',
    autocheck : true
};

/* AjaxRC */
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:Images"
];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/theloudhouse/images/5/53/Loading_bar.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Update content';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
/* LockForums */
window.LockForums = {
    expiryDays: 10,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived due to inactivity.'
}; 
 
/* LockOldBlogs */
window.LockOldBlogs = {
    expiryDays: 10,
    expiryMessage: "This blog hasn\'t been commented on for over 30 days. There is no need to comment."
};
 
/* LinkPreview */
window.pPreview.defimage = 'https://static.wikia.nocookie.net/countryclub9732/images/6/67/No_Screenshot.png/revision/latest?cb=20220630011000';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/countryclub9732/images/6/67/No_Screenshot.png/revision/latest?cb=20220630011000';

//UserTags config
window.UserTagsJS = {
    modules: {
        inactive: 30,
        userage: true,
        mwGroups: true,
        autoconfirmed: true
    },
    tags: {
            'bot': {link: 'Special:ListUsers/bot'},
            'bureaucrat': {link: 'Special:ListUsers/bureaucrat'},
            'chatmoderator': {link: 'Special:ListUsers/chatmoderator'},
            'content-moderator': {link: 'Special:ListUsers/content-moderator'},
            'rollback': {link: 'Special:ListUsers/rollback'},
            'sysop': {link: 'Special:ListUsers/sysop'},
            'threadmoderator': {link: 'Special:ListUsers/threadmoderator'
    }
    },
};

/* Users blocked infinite */
window.addEventListener('load', function() {
	// Timeouts are always a terrible way to go, but UserTags has no event dispatched when it finished loading.
	setTimeout(function() {
		if (document.getElementById('UserProfileMasthead') === null) return;
		var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
		if (blockTag === null) return;
		new mw.Api().get({
			action: 'query',
			list: 'blocks',
			bkprop: 'expiry',
			bktimestamp: new Date().getTime(),
			bkusers: wgTitle
		}).done(function(d) {
			if (d.query.blocks[0] && d.query.blocks[0].expiry == 'indefinite') {
				blockTag.innerHTML = 'Shattered';
			}
		});
	}, 250);
});
 
if (mw.config.get('skin') != 'oasis' ) { // if skin == monobook or skin == uncyclopedia
	importScriptPage('UserWikiInfo/code.js', 'dev');
}
 
/* to make ReportLog visible */
(function showLogs() {
	var $reportLog = $('.ReportLog');
	ug = mw.config.get('wgUserGroups');
	if ( wgPageName==="Special:WikiActivity" && $reportLog.length === 0) setTimeout(showLogs, 250);
	else if (ug.indexOf('bot') + ug.indexOf('chatmoderator') + ug.indexOf('imagecontrol') + ug.indexOf('rollback') + ug.indexOf('sysop') + ug.indexOf('patroller') + ug.indexOf('bureaucrat') > -7) $reportLog.css('display', 'block');
})();

window.MessageWallUserTags = {
    tagColor: 'green',
    txtSize: '15px',
    glow: true,
    glowSize: '7px',
    glowColor: 'skyblue',
    users: {
        'username': 'usergroup',
        'ThePokémonGamer': 'Founder',
        'NeoplanDan': 'Bureaucrat',
        'User3': 'Admin',
        'User4': 'Rollback',
        'User5': 'Custom Tag'
    }
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ImageCategory/code.js',
        'u:dev:MediaWiki:View Source/code.js',
        'u:dev:MediaWiki:DisplayTimer/code.js',
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
        'u:dev:MediaWiki:Rollback/code.js',
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});
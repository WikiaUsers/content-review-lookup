// AjaxRC
var ajaxRefresh = 30000;
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
var AjaxRCRefreshText = 'Auto Refresh';
var AjaxRCRefreshHoverText = 'Automatically refreshes the page every 30 seconds';

/* Adds link to contribs for logged-out people's article/blog comments
$('.details span[title]').each(function(){
	var t = $(this),
	title = $(this).attr("title");
	t.html('Unregistered user (IP: <a href="/wiki/Special:Contributions/' + title + '"  target="_blank" rel="nofollow">' + title + ')</a>');
}); */

// highlight comments of the blog post's author
if (mw.config.get("wgNamespaceNumber") == 500) {
	var authorUsername = wgTitle.split('/')[0];
	appendCSS('\
	.comments li[data-user="' + authorUsername + '"] blockquote { background: lightgray; }\
	.comments li[data-user="' + authorUsername + '"] .speech-bubble-message { background: lightgray; }\
	.comments li[data-user="' + authorUsername + '"] blockquote:after { border-color: transparent lightgray lightgray transparent !important; }\
	');
}

// Adding a cog icon to the end of Discussion Moderator's usernames on Forum and Message Walls
discussionMod = "";
$('.MiniEditorWrapper .edited-by a[href="' + wgServer + '/wiki/Message_Wall:' + discussionMod.split(' ').join('_') + '"]:not(.subtle)').after('&nbsp;' + '<attr title="Discussion Moderator"><img src="https://images.wikia.nocookie.net/flippr/images/6/6d/Cog_Icon.png" width="16" height="16"/></attr>');

// Group-specific code
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1 || mw.config.get('wgUserGroups').indexOf('content-moderator') > -1 || mw.config.get('wgUserGroups').indexOf('threadmoderator') > -1) {
    importScriptPage('MediaWiki:Thread Inspection/code.js', 'dev');
}

if (mw.config.get('wgUserGroups').indexOf('sysop') > -1 || mw.config.get('wgUserGroups').indexOf('chatmoderator') > -1) {
    QuickModTools = {
	quickreasons: [
		"Swearing",
		"Spamming",
		"Inappropriate talk",
	],
    };
    importScriptPage('MediaWiki:QuickModTools/loader.js', 'dev');
}

// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
        flipprstaff: { u:'Flippr Staff', link:'Project:Flippr Staff', order:-1/0 },
        founder: { u:'Founder', order: 0 },
        bureaucrat: { u:'Bureaucrat', link:'Project:Bureaucrats', order: 1 },
        sysop: { u:'Administrator', link:'Project:Administrators', order: 2 },
        'content-moderator': { u:'Content Moderator', link:'Project:Content Moderators', order: 3 },
        threadmoderator: { u:'Discussion Moderator', link:'Project:Discussion Moderators', order: 4 },
        rollback: { u:'Rollback', link:'Project:Rollbacks', order: 5 },
        chatmoderator: { u:'Chat Moderator', link:'Project:Chat Moderators', order: 6 },
        bot: { u:'Bot', link:'Project:Bots', order: 7 },
	}
};

UserTagsJS.modules.custom = {
	'Phineas99cp': ['founder'],
};

UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'rollback',
    'chatmoderator',
    'bot'
];
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.nonuser = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.metafilter = {
	'inactive': ['nonuser'],
};
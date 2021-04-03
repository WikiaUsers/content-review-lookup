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
		poweruser: { u:'Power User'},
		pseudosysop: { u:'Pseudo-Admin'}
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.stopblocked = true; // Manually turn on/off
UserTagsJS.modules.mwGroups = ['bureaucrat', 'content-moderator', 'chatmoderator', 'threadmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global',  'blocked', 'founder', 'poweruser'];
UserTagsJS.modules.metafilter = {
	pseudosysop: ['bureaucrat', 'sysop'],
	'content-moderator': ['bureaucrat', 'sysop'],
	chatmoderator: ['bureaucrat', 'sysop'],
	threadmoderator: ['bureaucrat', 'sysop'],
	rollback: ['bureaucrat', 'sysop'],
	patroller: ['bureaucrat', 'sysop']
};
UserTagsJS.modules.implode = {
	'pseudosysop': ['chatmoderator', 'content-moderator', 'threadmoderator']
};
 
// Comments, message wall, forum posts user tags
(function ($, ArticleComments) {
    "use strict";
 
    function addTag() {
        var users = {
            'Demotivator': 'Admin',
            'Nyanko626': 'Admin',
            'Danimalals': 'Admin',
            '5thCrownedHead': 'Admin',
            'Oreo the Cookie': 'Admin',
        };
 
        for (var name in users) {
            $('.comments .edited-by a[href$="' + name + '"]:not(.subtle)')
            .after('<span class="tag">' + users[name] + '</span>');
        }
    }
 
    function init() {
        addTag();
        if (ArticleComments && ArticleComments.addHover) {
            var realFunc = ArticleComments.addHover;
            ArticleComments.addHover = function () {
                var result = realFunc.apply(ArticleComments, arguments);
                addTag();
                return result;
            };
        }
    }
 
    $(init);
}(jQuery, window.ArticleComments));
 
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
}
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
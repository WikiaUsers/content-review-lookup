/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});
 
/* Autorefresh */
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity","Blog:Recent_posts"];
 
var AjaxRCRefreshText = 'Auto-refresh';
 
/* HighlightUsers */
highlight = {
    selectAll: true,
    bot: '#FF8000',
    users: {
    }
};
 
/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
        bot: { u: 'Bot', m: 'Bot', f: 'Bot'},
        threadmoderator: { u: 'Moderator', m: 'Moderator', f: 'Moderator', link:'Project:The_Staff_Department', order:-1e10 },
        rollback: { u: 'Rollback', m: 'Rollback',  f: 'Rollback', link:'Project:The_Staff_Department', order:-1e10 },
        RB: { u: 'Rollback', m: 'Rollback',  f: 'Rollback', link:'Project:The_Staff_Department', order:-1e10 },
        sysop: { u: 'Admin', m: 'Admin', f: 'Admin', link:'Project:The_Staff_Department', order:-1e10 },
        bureaucrat: { u: 'Bureaucrat', m: 'Bureaucrat', f: 'Bureaucrat', link:'Project:The_Staff_Department', order:-1e100 },
        TS: { u: 'Technical Specialist', m: 'Technical Specialist', f: 'Technical Specialist', link:'Project:The_Staff_Department', order:-1e1 },
        CS: { u: 'Community Specialist', m: 'Community Specialist', f: 'Community Specialist', link:'Project:The_Staff_Department', order:-1e1 },
        inactive: { u: 'Inactive', m: 'Inactive', f: 'Inactive', order:-1/0 },
    }
};
 
UserTagsJS.modules.inactive = {
    days: 31,
    namespaces: [0, 'Talk', 'User talk', 'Forum', 'Thread', 'Board', 'Board Thread']
};
 
UserTagsJS.modules.implode = {
};
 
UserTagsJS.modules.userfilter = {
};
 
UserTagsJS.modules.custom = {
};
 
/* Article Import */
importArticles({
	type:'script',
	articles: [
	'u:dev:UserTags/code.js',
	'u:dev:DisableBotMessageWalls/code.js',
	'u:dev:HighlightUsers/code.js',
	'u:dev:AjaxRC/code.js',
    'u:dev:ChatOptions/code.js',
    'u:dev:DupImageList/code.js',
    'u:dev:User Rights Reasons Dropdown/code.js',
    'MediaWiki:Common.js/FairUseUpload.js',
	]
});
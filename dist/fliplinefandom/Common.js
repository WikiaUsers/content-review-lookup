window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.mwGroups = ['founder', 'bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback'];

/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    $('.insertusername').html(wgUserName);
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];

window.railWAM = {
    logPage:"Project:WAM Log"
};
window.railWAM = {
     logPage: 'My log page',
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
    ]
});
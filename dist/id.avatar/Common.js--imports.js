/* Any JavaScript here will be loaded for all users on every page load. */
/* User profile header custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Project:Pengurus' },
		rollback: { link:'Project:Pengembali revisi' }
	}
};
window.UserTagsJS.modules.inactive = 30;
window.UserTagsJS.modules.mwGroups = ['rollback', 'sysop', 'bot', 'bot-global'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Auto-refreshing recent changes */
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-segarkan';
AjaxRCRefreshHoverText = 'Secara otomatis menyegarkan halaman';
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');

/* Standard edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'MediaWiki:Stdsummaries'
};
importArticle({type: 'script', article:'w:dev:Standard_Edit_Summary/code.js'});
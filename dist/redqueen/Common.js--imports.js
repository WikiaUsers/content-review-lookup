/* User profile header custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Project:Administrators' },
		bot: { link:'Help:Bots' }
	}
};
UserTagsJS.modules.inactive = 72;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
            bot: ['bot-global']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Standard edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'MediaWiki:Stdsummaries',
    css: '#stdSummaries { ... }'
};
importScriptPage('Standard_Edit_Summary/code.js', 'dev');

/* Reveal anon IPs */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Imagebox */
window.uploadText = "{{Imagebox\n"
		+ "| description = \n"
		+ "| series      = \n"
		+ "| source      = \n"
		+ "| author      = \n"
		+ "| origin      = \n"
		+ "| cats        = \n"
		+ "| license     = \n"
		+ "}}";
importScriptPage('MediaWiki:Imagebox.js', 'nephilim');
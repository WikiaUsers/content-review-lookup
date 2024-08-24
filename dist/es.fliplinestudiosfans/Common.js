/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

window.UserTagsJS = {
	modules: {},
	tags: {
    juniorsysop: {u:'Junior Administrator'},
	discord: {u:'Discord Server'},
	}
};
UserTagsJS.modules.custom = {
    'AnimatronixXD'     : ['discord'],
    'Geillade12'        : ['discord'],
    'Roman6767'         : ['discord'],
};

UserTagsJS.modules.mwGroups = [
    'founder',
    'bureaucrat',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'chatmoderator',
    'rollback',
];
 
/* Autodata updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
 
massCategorizationDelay = 10; importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
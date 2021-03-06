/* Any JavaScript here will be loaded for all users on every page load.*/

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
    'Roman6767'         : ['juniorsysop', 'discord'],
    
};
UserTagsJS.modules.userfilter = {
    'Roman6767': ['chatmoderator', 'threadmoderator', 'content-moderator'],
    'RobloxRulesEst2019': ['chatmoderator', 'threadmoderator', 'content-moderator'],
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
/* Any JavaScript here will be loaded for all users on every page load. */
//User Tags
window.UserTagsJS = {
	modules: {},
	tags: {
        bot: {u:'Bot'},
        discord      : {u:'Discord Server'},
        Principaladmin: {u:'Principal Admin'},
        nonspanish: {u:'I do not Speak Spanish'},
	},
};
 
UserTagsJS.modules.custom = {
    'Mallow Bot'                : ['bot'],
    'Anthony045'                : ['discord'],
    'Laundry Machine'           : ['nonspanish'],
    'Roman6767'                 : ['discord'],
    'Nick2345'                  : ['Principaladmin'],
    'Geillade12'                : ['discord'],
};
 
UserTagsJS.modules.mwGroups = [
    'founder',
    'bureaucrat',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'chatmoderator',
    'rollback',
    'global-discussions-moderator',
    'vstf',
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
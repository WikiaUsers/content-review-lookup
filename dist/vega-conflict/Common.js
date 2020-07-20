/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('AjaxRC/code.js', 'dev');

//User tags//
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
//End//

///User tag module pt2//
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	bureaucrat: ['founder'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
///User tag module-end//
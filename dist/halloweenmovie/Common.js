/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for ALL users on every page load. */
importScriptPage('MarkForDeletion/code.js', 'dev');
importScriptPage('View_Source/code.js', 'dev');
importScriptPage('WallGreetingButton/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('RevealAnonIP/code.js', 'dev');
importScriptPage('SexyUserPage/code.js', 'dev');
importScriptPage('VisualSpellCheck/code.js', 'dev');
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Head Admin' },
		rollback: { u: 'Rollback' }
	}
};
UserTagsJS.modules.custom = {

};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
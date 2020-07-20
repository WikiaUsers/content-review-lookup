/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		group1: { u:'Group 1 Displayed text' },
		group2: { u:'Group 2' },
		sysop: { u:'Casper' },
                rollback: { u:'Recruit' },
                bureaucrat: { u:'Crenshaw' }
         }
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Altaïr Skywalker 47': ['bureaucrat'],
	'Corellian Premier': ['sysop'],
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
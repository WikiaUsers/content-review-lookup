/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		group1: { u:'Approved Player' },
		group2: { u:'Group 2' },
		sysop: { u:'Senior Warrior' },
                rollback: { u:'Recruit' },
                chatmod: { u:'Warriors' }
         }
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Altaïr Skywalker 47': ['sysop'],
	'Eeveestar': ['group1'],
        'Hawkbreath': ['group1'],
        'BCEngine': ['group1'],
        'Gingerstripe': ['group1'],
        'Bluestar&Brightheart': ['group1'],
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
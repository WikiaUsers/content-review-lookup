/* User profile header custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Project:Administrators' },
		rollback: { link:'Project:Rollbacks' }
	}
};
 
UserTagsJS.modules.userfilter = {
	'Rassilon of Old': ['founder', 'bureaucrat'],
	'Thailog': ['bureaucrat']
};
window.UserTagsJS.modules.inactive = 30;
window.UserTagsJS.modules.mwGroups = ['rollback', 'sysop', 'bot', 'bot-global'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
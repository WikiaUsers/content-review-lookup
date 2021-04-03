/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:'Project:Bureaucrats', order:1e101 },
		trial: { u:'Trial Moderator', link:'Staff:Moderator', order:1e103 },
		full: { u:'Moderator',link: 'Staff:Moderator', order:1e102 },
		bcdstaff: {u:'BCD Staff Member'},
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

UserTagsJS.modules.custom = {
	'DasUnterstrich': ['bcdstaff'],
	'Mad bonkio user': ['bcdstaff']
};
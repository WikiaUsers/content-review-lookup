// This page is used for UserTags.js customisation. PLEASE BE CAREFUL WITH ALL THE EDITS YOU MAKE.
window.UserTagsJS = {
	modules: {},
	tags: {
			//usergroup: tag data
			founder: {u:'Wiki Founder', order:-1/0},
			bureaucrat: {u:'Wiki Bureaucrat', link:'Wiki Staff#Bureaucrats', order:0},
			sysop: {u:'Wiki Administrator', link:'Wiki Staff#Admins', order:1},
			wikicoder: {u:'Wiki Coder', link:'Wiki Staff',order:2},
			supermod: {u:'Super Moderator', link:'Wiki Staff#Mods', order:3},
			'content-moderator': {u:'Wiki Moderator', link:'Wiki Staff#Mods',order:4},
			threadmoderator: {u:'Wiki Moderator', link:'Wiki Staff#Mods',order:5},
			patroller: {u:'Wiki Patroller', link:'Wiki Staff#Patrollers',order:6},
			rollback: {u:'Active Editor', link:'Wiki Staff#Active Editors',order:7},
			bot: {u:'Bot',order:8}
}
};
UserTagsJS.modules.implode = {
	supermod: ['threadmoderator', 'content-moderator']
};

UserTagsJS.modules.stopblocked = false;
UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: false // 0 article edits = inactive
};
UserTagsJS.modules.autoconfirmed = true; // Switch on


UserTagsJS.modules.custom = {
	'Raz Mail': ['wikicoder'], 
	'HelloSummerMemee': ['founder'],
};
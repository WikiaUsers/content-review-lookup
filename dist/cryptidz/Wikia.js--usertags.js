// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		coder: { u: 'Code Editor' },
		retired: { u: 'Retired' },
		warned: { u: 'Warned' },
		'inadmin': { u: 'Inactive Admin' },
		'inbureaucrat': { u: 'Inactive Bureaucrat' },
		'readmin': { u: 'Retired Admin' },
		'rebureaucrat': { u: 'Retired Bureaucrat' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Lythronax': ['sysop', 'coder']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
};
UserTagsJS.modules.implode = {
	'inadmin': ['sysop', 'inactive'],
	'inbureaucrat': ['bureaucrat', 'inactive'],
	'readmin': ['sysop', 'retired'],
	'rebureaucrat': ['bureaucrat', 'retired']
};
UserTagsJS.modules.explode = {
	'inadmin': ['inbureaucrat'],
	'readmin': ['rebureaucrat']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
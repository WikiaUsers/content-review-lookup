// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		accuracy: { u: 'Accuracy Checker' },
		quality: { u: 'Quality Control' },
		moderator: { u: 'Moderator' },
		coder: { u: 'Code Editor' },
		botop: {u: 'Bot Operator' },
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
	'Justisaurus': ['bureaucrat'],
	'The Dinosaur rules': ['accuracy'],
	'Lythronax': ['sysop', 'threadmoderator', 'accuracy', 'coder', 'botop'],
	'Mattkenn3': ['bureaucrat', 'retired'],
	'Myotragus': ['accuracy'],
	'Cha0tic Arch0saur': ['quality'],
	'Andreone93': ['warned']
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
	'inbureaucrat': ['inadmin'],
	'rebureaucrat': ['readmin']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
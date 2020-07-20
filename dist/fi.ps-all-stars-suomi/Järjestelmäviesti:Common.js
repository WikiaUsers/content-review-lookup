importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		hello: { m: 'Mies', f:'Nainen', u: 'No Gender Set', order: -1/0, link:'http://en.wikipedia.org/wiki/Gender' },
		muckraker: 'Tonkija',
		sysop: { u:'Ylläpitäjä', link:'Project:Ylläpitäjät' }, // Change "Administrator" to "Ylläpitäjä"
		'mini-sysop': { u: 'Puoliksi Ylläpitäjä', link:'Project:PuoliYlläpitäjät' },
		allstar: 'All-Star',
		kunnia: 'Kunniamerkki',
		terävä: 'Terävänä',
		'vandal-patrol': { u: 'Kurinpitäjä', link:'Project:Janitors' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'T95450': ['sysop', 'kunnia'],
	'Juhoran': ['hello', 'terävä'],
	'You': ['inactive'], // Force inactive group instead of relying on the inactive module
	'Other User': ['hello', 'muckraker']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
	hello: ['muckraker'], // Remove hello group from people with muckraker group
	'vandal-patrol': ['mini-sysop'] // Remove vandal-patrol from mini-sysops
};
UserTagsJS.modules.userfilter = {
	'John Smith': ['inactive'] // John Smith is never inactive, even when he is
};
UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator'] // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
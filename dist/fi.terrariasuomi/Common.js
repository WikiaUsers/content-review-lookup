/* T‰m‰n sivun JavaScript-koodi liitet‰‰n jokaiseen sivulataukseen */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importArticles({type:'script', articles: [
    // ...
    'w:c:dev:DisplayClock/code.js',
    // ...
]);

// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		hello: { m: 'Mies', f:'Nainen', u: 'No Gender Set', order: -1/0, link:'http://en.wikipedia.org/wiki/Gender' },
		muckraker: 'Tonkija',
		sysop: { u:'Yll‰pit‰j‰', link:'Project:Yll‰pit‰j‰t' }, // Change "Administrator" to "Yll‰pit‰j‰"
		'mini-sysop': { u: 'Puoli-Yll‰pit‰j‰', link:'Project:PuoliYll‰pit‰j‰t' },
		slime: 'Limamitali',
		kunnia: 'Kunniamerkki',
		ter‰v‰: 'Ter‰v‰n‰',
		'vandal-patrol': { u: 'Kurinpit‰j‰', link:'Project:Janitors' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'T95450': ['slime'],
	'Juhoran': ['hello', 'ter‰v‰'],
	'K‰ytt‰j‰1': ['inactive'], // Force inactive group instead of relying on the inactive module
	'Konstaduck': ['slime']
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
	'mini-sysop': ['rollback', 'chatmoderator'] // Poistaa rollback ja chatmoderator, jos molemmat ovat olemassa poistaa ne ja lis‰‰ 'mini-sysop'
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
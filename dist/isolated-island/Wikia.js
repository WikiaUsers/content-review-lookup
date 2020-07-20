importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		'u:dev:SkinSwitchButton/code.js',
		"w:c:dev:Countdown/code.js",
		'w:c:dev:SignatureCheck/code.js',
		'u:dev:Message/code.js',
		'w:c:dev:UserTags/code.js'
		// ... 
		]
});

// Chat tags! Be careful when editing this.
window.UserTagsJS = {
	modules: {},
	tags: {
		hello: { m: 'Male', f:'Female', u: 'No Gender Set', order: -1/0, link:'http://en.wikipedia.org/wiki/Gender' },
		techsupport: 'Tech Support',
		prince: 'Prince',
		princess: 'Princess',
		legend: 'Legend',
		fightinggameenthusiast: 'Fighting Game Enthusiast',
		oddworldinhabitant: 'Oddworld Inhabitant',
		smol: 'Smol',
		blocked: 'One of Dr. Robotniks Goons',
		chatmoderator: 'Freedom Fighter',
		founder: 'Creator',
		authenticated: 'Authenticated User',
		secondincommand: 'Maskeds Second in Command',
		guardianofmasteremerald: { u:'Guardian of the Master Emerald', link:'http://sonic.wikia.com/wiki/Master_Emerald' },
		otaku: { u:'Otaku', link:'http://en.wikipedia.org/wiki/Otaku' },
		lurker: { u:'Lurker', link:'http://en.wikipedia.org/wiki/Lurker'},
		troublemaker: { u:'Troublemaker', link:'http://en.wiktionary.org/wiki/troublemaker'},
		bureaucrat: { u: 'Leader', link:'Project:Bureaucrats' },
		sysop: { m:'Hero', f:'Heroine', u: 'Hero', link:'Project:Administrators' }, // Change "Hero" to "Hero/Heroine"
		'mini-sysop': { m:'Semi-Hero', f:'Semi-Heroine', u: 'Semi-Hero', link:'Project:HalfAdmins' },
		'vandal-patrol': { u: 'Spam Cleaner', link:'Project:Janitors' }
	}
};
// Custom groups for users! Be careful when editing this.
UserTagsJS.modules.custom = {
	'SonicStorm478': ['techsupport'],
	'Kumatora-San': ['otaku'],
	'Kirbyyyyyyy': ['guardianofmasteremerald'],
	'Oddworld-2001': ['oddworldinhabitant', 'fightinggameenthusiast'],
	'Meryl014': ['smol'],
	'Masked Rage': ['legend'],
	'Asshole Iamzu': ['fightinggameenthusiast', 'secondincommand'],
	'Prince Elias': ['prince'],
	'Princess Sally': ['princess'],
	'VictorShpee170': ['troublemaker']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
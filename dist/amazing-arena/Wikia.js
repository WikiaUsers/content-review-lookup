// Chat tags! Be careful when editing this.
window.UserTagsJS = {
	modules: {},
	tags: {
		hello: { m: 'Male', f:'Female', u: 'No Gender Set', order: -1/0, link:'http://en.wikipedia.org/wiki/Gender' },
		techsupport: 'Tech Support',
		prince: 'Prince',
		princess: 'Princess',
		king: 'King',
		queen: 'Queen',
		legend: 'Legend',
		popstar: 'Hero of Popstar',
		fightinggameenthusiast: 'Fighting Game Enthusiast',
		oddworldinhabitant: 'Oddworld Inhabitant',
		blocked: 'One of Dr. Robotniks Goons',
		chatmoderator: 'Freedom Fighter',
		founder: 'Creator',
		authenticated: 'Authenticated User',
		guardianofmasteremerald: { u:'Guardian of the Master Emerald', link:'http://sonic.wikia.com/wiki/Master_Emerald' },
		lurker: { u:'Lurker', link:'http://en.wikipedia.org/wiki/Lurker'},
		bureaucrat: { m:'Hero', f:'Heroine', u: 'Hero', link:'Project:Bureaucrats' },
		sysop: { m:'Hero', f:'Heroine', u: 'Hero', link:'Project:Administrators' }, // Change "Hero" to "Hero/Heroine"
		'mini-sysop': { m:'Semi-Hero', f:'Semi-Heroine', u: 'Semi-Hero', link:'Project:HalfAdmins' },
		'vandal-patrol': { u: 'Spam Cleaner', link:'Project:Janitors' }
	}
};
// Custom groups for users! Be careful when editing this.
UserTagsJS.modules.custom = {
	'SonicStorm478': ['techsupport'],
	'Kirbyyyyyyy': ['guardianofmasteremerald', 'popstar'],
	'Oddworld-2001': ['oddworldinhabitant', 'fightinggameenthusiast'],
	'Masked Rage': ['legend'],
	'Space Jamzu': ['fightinggameenthusiast'],
	'Prince Elias': ['prince'],
	'Princess Sally': ['princess'],
	'King Maximillian': ['king'],
	'Queen Alicia': ['queen'],
	'Rotor Walrus': ['techsupport'],
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
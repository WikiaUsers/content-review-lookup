var aka = wgRelevantUserName;
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: {
			u: 'Administrator',
    	    m: 'Administrator',
    	    f: 'Administratress',
        	title: 'Respect this member because ' + aka + ' is an administrator of Snowflakie Tent. ' + aka + ' blocks you easily!',
            link: 'Project:Administrators'
		}, // I don't really like the name "sysop".
		sfounder: {
			u: 'Founder',
			title: aka + ' is the starter of The Ice Mystery series.'
		},
		collaborator: {
			u: 'Collaborator',
			m: 'Collaborator',
			f: 'Collaboratress',
			title: aka + ' develops the series.'
			
		},
		'mini-collab': {
			u: 'Mini Collab.',
			title: aka + ' helps the collaborators to develop the series.'
		},
		spellcheck: {
			u: 'Spellchecker',
			title: aka + ' correct spelling and grammar.'
		}
	}
};
// Add custom groups to several users.
UserTagsJS.modules.custom = {
	'ZayKitty': ['sfounder', 'collaborator', 'spellcheck'],
	'-Scratchland-': ['sysop','collaborator'],
	'-Rainyland-': ['mini-collab'],
	'-HigHrocks-': ['mini-collab'],
	'ZayNeko': ['spellcheck']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days.
UserTagsJS.modules.userfilter = {
	'-Scratchland-': ['inactive'] // Ivy or Lunar is never inactive, even when she is.
};
// prevents existing tags from being hidden
UserTagsJS.modules.custom = {
	'chocochipccokiescreams911': ['co-founder', 'odd', 'acquaintance'] 
};
window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'Local Moron', order:1 },
		b: { u: 'Founder', order:2 },
		c: { u: 'u/whamzilla', order:3 },
		d: { u: 'beauracrat', order:4 },
		e: { u: 'i cant spell', order:5 }
	},
	oasisPlaceBefore: '> h1'
};
UserTagsJS.modules.custom = {
	'MorganaSenpai': ['local moron', 'founder', 'u/whamzilla', 'beauracrat', 'i cant spell', 'inactive']
};

UserTagsJS.modules.autoconfirmed = true; 
UserTagsJS.modules.stopblocked = true; 

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
UserTagsJS.modules.custom = {
	'MorganaSenpai': ['founder', 'local moron', 'jshelper'] 
};
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	threadmoderator: ['sysop', 'bureaucrat']
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['rollback', 'patroller'] 
};
UserTagsJS.modules.implode = {
	'inactive-bureaucrat': ['bureaucrat', 'inactive'], 
                                                           
	'inactive-sysop': ['sysop', 'inactive'],
	'half-sysop': ['threadmoderator', 'patroller', 'rollback']
};
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat Tag', link:'Project:Bureaucrats' },
		inactive: { u: 'Has not edited recently' }
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:'Project:Bureaucrats', order:1e101 }
	}
};

UserTagsJS.modules.inactive = 60; 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback'];
UserTagsJS.modules.mwGroups = {
    merge: true,
    groups: ['patroller', 'imagecontrol']
};
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
UserTagsJS.modules.newuser = {
	namespace: 10, 
	computation: function(days, edits) {
		
		return days < 10 && edits < 30;
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {hello: { m: 'Male', f:'Female', u: 'No Gender Set', order: -1/0, link:'https://en.wikipedia.org/wiki/Gender' },
		muckraker: 'Muckraker',
		sysop: { u:'Hawth of the Creation', link:'Project:Administrators' }, // Change "Administrator" to "Hawth of the Creation"
		'mini-sysop': { u: 'Helpers of Vesmis', link:'Project:HalfAdmins' },
		'vandal-patrol': { u: 'Warlord', link:'Project:Moderators' }
	}
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
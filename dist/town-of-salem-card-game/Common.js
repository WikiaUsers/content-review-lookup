/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		// ranks
		founder: { u:'Founder', order:-1 },
		bureaucrat: { u:'Bureaucrat', order:0 },
		sysop: { u:'Admin', order:0},
		threadmoderator: { u:'Moderator', order:0 },
		chatmoderator: { u:'Chat Moderator', order:0 },
		rollback: { u:'Rollback', order:0 },
		autoconfirmed: { u:'Autoconfirmed User', order:0 },
	},
	oasisPlaceBefore: ''
};
 
UserTagsJS.modules.mwGroups = [ // ability to CSS these tags
     'autoconfirmed', 'notautoconfirmed', 'inactive','blocked',
    'founder', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback',
    ];
 
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat', 'founder'],
	'threadmoderator': ['sysop', 'bureaucrat', 'founder'],
	'chatmoderator': ['threadmoderator', 'sysop', 'bureaucrat', 'founder'],
	'rollback': ['chatmoderator', 'threadmoderator', 'sysop', 'bureaucrat', 'founder'],
	'autoconfirmed': ['rollback', 'chatmoderator', 'threadmoderator', 'sysop', 'bureaucrat', 'founder'],
};
 
UserTagsJS.modules.newuser = {
	days: 4, 
	edits: 10, 
	namespace: 1 
};
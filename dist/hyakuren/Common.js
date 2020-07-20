/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
    logPage:"Project:WAM Log"
};

window.BackToTopModern = true;

// User tags
window.UserTagsJS = {
	tags: {
        bureaucrat: {
            u:'Einherjar',
            link: 'Project:Bureaucrats'
        },
		sysop: {
            u:'Ragnarok',
            link: 'Project:Sysops'
        },
		'content-moderator': { 
            u:'Patriach',
            link: 'Project:Content moderator'
        },
		'autoconfirmed-user': {
            u:'Human',
            link: 'Project:Autoconfirmed users'
        },
		user: {
            u:'Human',
            link: 'Project:Autoconfirmed users'
        },
		newuser: { u:'Human' },
		inactive: {
            u:'Deceased',
            title: 'The user hasn\'t edited for last 30 days'
        },
		blocked: { 
            u:'Game Over',
            link:'Project:Blocking policy' 
        },
	},
	modules: {
		stopblocked: false,
		inactive: 30,
		mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'rollback',
            'autoconfirmed-user',
            'user',
            'autoconfirmed-user',
            'bot',
            'bot-global',
            'blocked',
            'nonuser'
        ],
		autoconfirmed: true,
		newuser: true,
		metafilter: {
			'content-moderator': ['bureaucrat'],
			rollback: [
                'bureaucrat',
                'content-moderator'
            ],
			threadmoderator: ['content-moderator'],
			user: [
                'bureaucrat',
                'sysop',
                'content-moderator',
                'rollback',
                'translator',
                'newuser',
                'inactive',
                'blocked'
            ],
			bot: ['bot-global'],
			newuser: ['inactive'],
			bureaucrat: ['inactive'],
			sysop: ['inactive'],
			founder: ['inactive'],
			blocked: ['inactive'],
			poweruser: ['newuser']
		},
	},
};
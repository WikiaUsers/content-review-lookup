/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/* User Tags*/
window.UserTagsJS = {
	modules: {
        autoconfirmed: true,
        newuser: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        custom: {
			'Idekmandy': ['Idekmandy']
		},
		metafilter: {
			'rollback': ['sysop', 'bureaucrat', 'content-moderator'],
			'threadmoderator': ['sysop', 'bureaucrat'],
			'content-moderator': ['sysop', 'bureaucrat']
		},
        mwGroups: [
            'bureaucrat',
            'content-moderator',
            'threadmoderator',
            'bot',
            'rollback'
        ],
    },
	tags: {
        bureaucrat: {u:'Glamazon', link: 'Special:ListUsers/bureaucrat'}, 
        sysop: {u:'Hunty', link: 'Special:ListUsers/sysop'},
        'content-moderator': {u: 'Content Moderator', link: 'Special:ListUsers/content-moderator'},
        threadmoderator: {u: 'Thread Moderator', link: 'Special:ListUsers/threadmoderator'},
        'wiki-manager': {link: 'Help:Wiki_Representatives'},
        blocked: {link: 'Special:BlockList'},
        bot: {link: 'Special:ListUsers/bot'},
        rollback: {u: 'Rollback', link: 'Special:ListUsers/rollback'},
        'Idekmandy': { u:'Drag Superstar'}
	}
};
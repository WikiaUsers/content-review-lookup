/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreetingButton/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PurgeButton/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DisplayTimer/code.js',
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

// User tags
	window.UserTagsJS = {
		tags: {
			'bureaucrat': { u:'Guild Leader', link: 'Project:Bureaucrats' },
			'sysop': { u:'Wizard', link: 'Project:Sysops' },
			'content-moderator': { u:'Vice Leader', link: 'Project:Content moderator' },
			'poweruser': { u:'New Player', link: 'Project:Autoconfirmed users' },
			'autoconfirmed-user': { u:'Adventurer', link: 'Project:Autoconfirmed users' },
			'user': { u:'Adventurer', link: 'Project:Autoconfirmed users' },
			'newuser': { u:'New Player' },
			inactive: { u:'Inactive Player', title: 'The user hasn\'t edited for last 30 days' },
		blocked: { u:'Game Over', link:'Project:Blocking policy' },
		},
		modules: {
			stopblocked: false,
			inactive: 30,
			mwGroups: ['bureaucrat', 'sysop', 'content-moderator', 'rollback', 'autoconfirmed-user', 'user', 'autoconfirmed-user', 'bot', 'bot-global', 'blocked', 'nonuser'],
			autoconfirmed: true,
			newuser: true,
			metafilter: {
				'content-moderator': ['bureaucrat'],
				rollback: ['bureaucrat', 'content-moderator'],
				threadmoderator: ['content-moderator'],
				user: ['bureaucrat', 'sysop','content-moderator', 'rollback','translator', 'newuser', 'inactive','blocked'],
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
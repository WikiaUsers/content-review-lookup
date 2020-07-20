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
        'u:dev:MediaWiki:BackToTopButton/code.js',
    ]
});
window.BackToTopModern = true;
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionsActivity.js',
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
 
// User tags
	window.UserTagsJS = {
		tags: {
		    'founder': { u:'Dragon', link: 'Project:Bureaucrats' },
			'bureaucrat': { u:'Grand Paladin', link: 'Project:Bureaucrats' },
			'sysop': { u:'Sensei', link: 'Project:Sysops' },
			'content-moderator': { u:'Pacifist Faction', link: 'Project:Content moderator' },
			'poweruser': { u:'Siriusian', link: 'Project:Autoconfirmed users' },
			'autoconfirmed-user': { u:'Human', link: 'Project:Autoconfirmed users' },
			'user': { u:'Human', link: 'Project:Autoconfirmed users' },
			'newuser': { u:'Human' },
			inactive: { u:'Deceased', title: 'The user hasn\'t edited for last 30 days' },
		blocked: { u:'Error', link:'Project:Blocking policy' },
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
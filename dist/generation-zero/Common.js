window.UserTagsJS = {
	modules: {},
	tags: {
		discordmod: { u: 'Discord Moderator', order: -1/0 },
		//bureaucrat: { order: 1 },
		staffleader: { u: 'Staff Leader', link:'Wiki Staff'},
		admin: { u: 'Administrator', link:'Wiki Staff'},
		moderator: { u: 'Moderator', link:'Wiki Staff'},
		editor: { u: 'Editor', link:'Wiki Staff'},
		recruiter: { u: 'Recruiter', link:'Wiki Staff', order: 1/0 },
		
	}
};

UserTagsJS.modules.custom = {
	'CryticalAcee': ['recruiter'],
	'BiddinWar': ['discordmod', 'recruiter'],
	'Larzbarzcarz': ['discordmod'],
	'SirCarniv0re': ['discordmod', 'admin', 'recruiter'],
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator', 'content-moderator', 'rollback', 'threadmoderator'];

UserTagsJS.modules.implode = {
	'staffleader': ['bureaucrat', 'sysop'],
	'admin': ['content-moderator', 'threadmoderator', 'sysop', 'rollback'],
	'moderator': ['content-moderator', 'threadmoderator', 'rollback', 'chatmoderator'],
	'editor': ['content-moderator'],
};

UserTagsJS.modules.metafilter = {
    'editor': ['moderator', 'admin'],
    'rollback': ['staffleader'],
    'admin': ['staffleader', 'moderator']
    
};

//Preload Templates config
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
preloadTemplates_subpage = "case-by-case";

//Needed for some templates.
importArticles({
    type: 'script',
    articles: [
        'u:templates:MediaWiki:Tabs.js',
    ]
});
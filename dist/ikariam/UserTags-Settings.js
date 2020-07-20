// Core configuration.
window.UserTagsJS =
{
	modules: {},
	tags:
	{
		// FANDOM Tags
		
		founder:		{ order: 1, link:'Ikariam:Bureaucrats' },
		bureaucrat:		{ order: 2, link:'Ikariam:Bureaucrats' },
		sysop:			{ order: 3, u: 'Administrator / Sysop', link:'Ikariam:Administrators' },

		chatmoderator:	{ order: 4 },
		patroller:		{ order: 5, link:'Ikariam:Patroller' },    
		rollback:		{ order: 6, link:'Ikariam:Rollback' },
		bannedfromchat:	{ order: 7 },
		bot:			{ order: 0 },
		'bot-global':	{ order: 0, link: 'Ikariam:Bots' },
		
		// CUSTOM Tags
		
		js:				{ order: 20, u: 'JavaScript' },
		css:			{ order: 21, u: 'CSS' },
		template:		{ order: 22, u: 'Templates Guru' },
		behindscene:	{ order: 23, u: 'Behind the scene person' },
		
		// INACTIVE Tag
		
		inactive:		{ order: 99 }
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30; // Inactive if no edits in 30 days
UserTagsJS.modules.mwGroups = ['founder', 'bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global']; // Add FANDOM groups

UserTagsJS.modules.metafilter =
{
	sysop: ['bureaucrat', 'founder'], // Remove administrator group from bureaucrats/founders
	bureaucrat: ['founder'], // Remove bureaucrat group from founders
	chatmoderator: ['sysop', 'bureaucrat'] // Remove chatmoderator group from admins/bureacrats
};

UserTagsJS.modules.userfilter =
{ // Removes tags - They are never seen on the person
	'Jrooksjr': ['inactive']
};

UserTagsJS.modules.implode =
{ // Combines tags - If multi-tags then display single tag
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator'] // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};

UserTagsJS.modules.explode =
{ // Expands tags - Adds additional tag if certain tags exist
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};

// Add custom groups to users
UserTagsJS.modules.custom =
{
	'Jrooksjr': ['css', 'template', 'behindscene'],
	'Panos78':  ['css', 'template', 'js', 'behindscene']
};
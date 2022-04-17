// Core configuration. for user tags based on dev.fandom.com/usertags
window.UserTagsJS = {
	modules: {},
	tags: {
		hyper: {u: 'HyperHippo Staff', order: -1/0, link:'https://hyperhippogames.com/studio/' },//Must prove they are staff somehow only here just incase they ever decide to edit.
		templates:{ u: 'Templates Guru', link: 'Category:Templates' },//ONLY for people who have advanced template knowledge.
		newuser:{ u: 'New Comrade', },
		inactive: { u: 'Has not edited recently' }, //Inactive tag
		blocked:{ u: 'Capitalist', }, //Who needs blocked people
		sysop: { u:'Supreme Officer', link:'Project:Administrators' }, // Change "Administrator" to "Supreme Officer"
		bureaucrat: { u:'Supreme Leader', }, // Change "Bureaucrat" to "Supreme Leader"
		
	}
};
//activating modues
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days


//Metafilter for removing certain groups from bots, bureaucrat and sysop
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat','bot'], // Remove "Admin" tag from bureaucrats
	'chatmoderator': ['bot'], //Remove "Chat Moderator" tag from bots as they should only display bot tag.
	'content-moderator': ['bot'], //Remove "Content Moderator" tag from bots as they should only display bot tag.
	'theadmoderator': ['bot']//Remove "Discussions Moderator" tag from bots as they should only display bot tag.
};

// Add custom groups to several users
UserTagsJS.modules.custom = {
	'EarthWyrmJym': ['templates'],
	'AVeryCreativeName': ['blocked'], // Force capitalist group.
    'TimmehBot': ['bot']
};

// Disable users using dev.fandom.com/Rollback as per instructions on that page.
window.RollbackWikiDisable = true
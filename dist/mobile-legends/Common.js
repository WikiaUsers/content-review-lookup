/* Any JavaScript here will be loaded for all users on every page load. */
importArticles( {
	type: 'script',
	articles: [
	    'MediaWiki:Mixitup/code.js',
	    'u:dev:OggPlayer.js',
	    'u:dev:ChatReload/code.js',
	    'u:dev:MediaWiki:MassCategorization/code.js',
	    'w:c:dev:MediaWiki:Countdown/code.js' ,
	    'u:dev:MediaWiki:LangSwitch.js'
	]
});

window.MassCategorizationGroups = ['sysop', 'content-moderator'];

/* Any JavaScript here will be loaded for all users on every page load. */
 
/* User Tag Configuration */
window.UserTagsJS = {
	modules: {},
	tags: { templatemaker: { u: 'Template Maker'},
            leaker: { u: 'MLBB Leaker'},
			newuser: { u: 'MLBB Lover'}

	},
	oasisPlaceBefore: ''
};
 
UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 15, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
 
UserTagsJS.modules.templatemaker = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 15, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.leaker = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 15, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.custom = {
    'Cooky922': ['templatemaker'],
    'Rheinaldi kian jiu': ['leaker'],
};
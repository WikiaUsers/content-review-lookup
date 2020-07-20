/* Any JavaScript here will be loaded for all users on every page load. */

/* Inactive Configuration */
window.InactiveUsers = {
    months: 2,
};

/* Spoiler Configuration */
window.SpoilerAlert = {
  categories: "Spoiler",
};

/* UserTag */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat', order:-1 },
		sysop: { u:'Administrator', order:0 },
		bot: { u: 'Auto Bot', order:50 },
		newuser: { u: 'Newbie', order:100 }
	}
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.metafilter = {
	'autoconfirmed': []
};

UserTagsJS.modules.newuser = {
	days: 14, // Must have been on the Wiki for 14 days
	edits: 50, // And have at least 50 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

importArticles({
    type: 'script',
    articles: [
        'u:es.alternativo:MediaWiki:Slider.js',
        'u:pad.wikia.com:MediaWiki:FilterTable.js',
    ]
}, {
    type: 'style',
    articles: [
        'u:dev:FontAwesome/code.css'
    ]
});

// RailWAM configuration
window.railWAM = {
    logPage:"Project:WAM Log",
    appendAfter:'DiscordIntegrator'
};
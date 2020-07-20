/* Any JavaScript here will be loaded for all users on every page load. */
/* User Tag Configuration */
window.UserTagsJS = {
	modules: {},
	tags: { user: { u: 'HYPHEN'},
	},
oasisPlaceBefore: ''
};

UserTagsJS.modules.user = {
	days: 60, // Must have been on the Wiki for 10 days
	edits: 500, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.custom = {
    'Tsukihibiki': ['user'],
};
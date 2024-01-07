/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});
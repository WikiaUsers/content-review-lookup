/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:AddRailModule/code.js',
        "u:dev:MediaWiki:Medals/code.js"
    ]
});

window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { link:'Project:Bureaucrats', order:1e101 }
	}
};
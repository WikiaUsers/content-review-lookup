/* Any JavaScript here will be loaded for all users on every page load. */

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
        mw.util.addCSS($(this).attr("data-css"));
    });
});

// Import LastEdited
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LastEdited/code.js',
    ]
});

window.lastEdited = {
	avatar: false,
	size: false,
	diff: false,
	comment: false,
	newpage: false,
	mainpage: false,
	namespaces: {
		exclude: [-1,2]
	},
	pages: [Project_Flight_Wiki]
};
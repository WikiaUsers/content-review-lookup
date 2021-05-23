/* Any JavaScript here will be loaded for all users on every page load. */
var Start = 0;

//configuration for dev:WikiActivity.js
/* Added on 2020-10-25 by D4rkWzd */
window.rwaOptions = {
	limit: 50,
	namespaces: [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
	autoInit: true 
};

importArticles({
    /* Added on 2020-09-28 by ElpisGalaxy */
    type: "script",
    articles: [
        "u:dev:MediaWiki:BackToTopButton/code.js",
        "u:dev:MediaWiki:ReferencePopups/code.js", 
		/* Added on 2020-10-25 by D4rkWzd */
        'u:dev:MediaWiki:WikiActivity.js',
        /* Added on 2021-04-21 by D4rkWzd */
        'u:dev:MediaWiki:YouTubeModal/code.js',
    ]
});
/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
	var articles = [];
	if ($content.find('#VilleinNumberGenerator')[0]) articles.push('MediaWiki:Villein Number.js');
	if ($content.find('#VilleinNumber')[0]) articles.push('MediaWiki:Villein Number.js');
	if ($content.find('#GauntletMazeSolver')[0]) articles.push('MediaWiki:Gauntlet Maze Solver.js');
	
	if (articles.length) importArticles({type: "script", articles: articles});
})
/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function($content) {
	var articles = [];

	if ($content.find('#game_universe')[0]) articles.push('MediaWiki:Planets.js');
	if ($content.find('.specialMaintenance')[0]) articles.push('MediaWiki:SpecialPageReporting.js');
	if (mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Specialpages') articles.push('MediaWiki:SpecialPageReporting.js');
	if ($content.find('.tabbernav')[0]) articles.push('MediaWiki:Tabber.js');

	if (articles.length) importArticles({type: "script", articles: articles});
});
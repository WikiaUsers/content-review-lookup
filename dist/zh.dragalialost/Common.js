/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function($content) {
	var articles = [];

	if ($content.find('#AdventurerPageStatsCalculator')[0]) articles.push('MediaWiki:AdventurerPageStatsCalculator.js');
	if ($content.find('#EnemyMapDropdown')[0]) articles.push('MediaWiki:EnemyMapDropdown.js');
	if ($content.find('.event-dialogue')[0]) articles.push('MediaWiki:FontToggle.js');
	if ($content.find('#halidom-grid-toggle-container')[0]) articles.push('MediaWiki:Halidom.js');
	if ($content.find('.character-filters')[0]) articles.push('MediaWiki:ListFilter.js');
	if ($content.find('#UnitStatsCalculator')[0]) articles.push('MediaWiki:UnitStatsCalculator.js');
	if ($content.find('.weibo')[0]) articles.push('MediaWiki:Weibo.js');

	if (articles.length) importArticles({type: "script", articles: articles});
});
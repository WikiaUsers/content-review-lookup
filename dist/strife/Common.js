/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
	var articles = [];
	if ($content.find('#hero_infobox_slider')[0]) articles.push('MediaWiki:Hero infobox slider.js');

	if (articles.length) importArticles({type: "script", articles: articles});
});
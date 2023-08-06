/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
	var articles = [];
	if ($content.find('#cookingCalc')[0]) articles.push('MediaWiki:CookingCalc.js');
	if ($content.find('#damageCalc')[0]) articles.push('MediaWiki:DamageCalc.js');
	if ($content.find('#StatCalc')[0]) articles.push('MediaWiki:StatCalc.js');
	
	if (articles.length) importArticles({type: "script", articles: articles});
});
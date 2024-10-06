mw.hook('wikipage.content').add(function($content) {
	var articles = [];
	if ($content.find('#maple_quiz_filter')[0]) articles.push('MediaWiki:Maple Quiz Filter.js');
	if ($content.find('#skill_filter')[0]) articles.push('MediaWiki:Skill filter.js');

	if (articles.length) importArticles({type: "script", articles: articles});
});
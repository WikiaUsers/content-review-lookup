$(function() {
	var categories = mw.config.get('wgCategories');
	
	if (categories.indexOf('Тринадцать_Огней') !== -1){
		importArticles({
			type: "style",
			articles: [
				"MediaWiki:TOStyles.css",
			]
		});
	}
});
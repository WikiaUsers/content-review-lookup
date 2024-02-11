function test(){
	var categories = mw.config.get('wgCategories');
	
	if (categories.indexOf('Тринадцять Вогнів') !== -1){
		importArticles({
			type: "style",
			articles: [
				"MediaWiki:TOStyles.css"
			]
		});
	}
}

test();
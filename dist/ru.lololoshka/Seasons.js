function test(){
	var categories = mw.config.get('wgCategories');
	
	if (categories.indexOf('Тринадцать Огней') !== -1){
		importArticles({
			type: "style",
			articles: [
				"MediaWiki:TOStyles.css"
			]
		});
	}
}

test();
mw.loader.using('mediawiki.api').then(function(){
	var modulePage = 'Модуль:CategoryTheme.json';
	
	new mw.Api().get({
		action: 'parse',
		prop: 'wikitext',
		page: modulePage,
		format: 'json',
		utf8: 1
	}).done(function(data) {
		if (data.error) {
			console.error("Parsing " + modulePage + " error");
			return;
		}
		
		var jsonText = data.parse.wikitext['*'];
		var categoryToCss = JSON.parse(jsonText);
		var pageCategories = mw.config.get("wgCategories");
		
		for (var i in pageCategories) {
			category = pageCategories[i];
			if (categoryToCss[category]) {
				importArticle({
					type: 'style',
					article: categoryToCss[category]
				});
				break;
			}
		}
	});
});
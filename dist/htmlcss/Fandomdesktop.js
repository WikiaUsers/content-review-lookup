function linkLocalScripts( articles ) { 
	const localScriptName = "MediaWiki:Fandomdesktop.js";
	
	return articles.map( function( article ) { 
		return article.startsWith( localScriptName + "/" ) ? 
			article : 
			localScriptName + "/" + article;
	} );
}

importArticles( { 
	type: "script",
	articles: linkLocalScripts( [
		"slideshow.js"
	] )
} );
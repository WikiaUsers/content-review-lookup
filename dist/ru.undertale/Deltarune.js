mw.loader.using('mediawiki.util').then(function() {
	var data = mw.config.get(['wgNamespaceNumber','wgTitle']);
	var ns = data["wgNamespaceNumber"];
	if(ns != 0 && ns != 14)
        return;

	if (mw.config.get("wgCanonicalNamespace") == "") {
	    var BGcategories = mw.config.get("wgCategories");
	        for (var ct = 0; ct < BGcategories.length; ct++) {
	        if (BGcategories[ct] == "Deltarune") {
			    importArticle({
			        type: 'style',
			        article: 'MediaWiki:Deltarune.css'
			    });
	            break;
	        }
		}
	}
});
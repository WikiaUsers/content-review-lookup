mw.loader.using('mediawiki.api').then(
	$(function(){
		// load protection
		if (window.CategoryRedLinksLoaded) return;
		window.CategoryRedLinksLoaded = true;

		// only logged-in users
		if(!mw.config.get("wgUserName")) return;
		
		// do not affect Special or non-existent namespaces
		if(mw.config.get("wgNamespaceNumber") < 0) return;
		
		// get list of categories, only continue script if there are any
		var mwCatList = mw.config.get("wgCategories");
		if(!mwCatList) return;
		if(mwCatList.length === 0) return;
		
		// begin API call
		var apiCatList = "";
		var catNSName = mw.config.get("wgFormattedNamespaces")[14];
		for(var i = 0; i < mwCatList.length; i++){
			apiCatList += catNSName + ":" + mwCatList[i] + "|";
		}
		apiCatList = apiCatList.substring(0, apiCatList.length - 1);
		var api = new mw.Api();
		api.get({
			action: "query",
			prop: "categoryinfo",
			titles: apiCatList
		}).done(function(d){
			if(!d.error){
				var anyCats = false;
				var i = -1;
				// non-existent pages return as negative numbers in order
				while(d.query.pages[i]){
					var missingCatLink = $("#articleCategories, .page-header__categories").find("a[title=\""+d.query.pages[i].title+"\"]");
					missingCatLink.each(function(){
						$(this).addClass("new");
						$(this).attr("href", $(this).attr("href")+"?action=edit&redlink=1");
					});
					anyCats = true;
					i--;
				}
			} else {
				console.error("Error while checking for missing categories:" + d.error.code);
			}
		}).fail(function(){
			console.error("Failed to check for missing categories");
		});
	})
);
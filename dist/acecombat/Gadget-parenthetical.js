// Smaller parenthetical in page titles
$(function(){
	if(mw.config.get("wgNamespaceNumber") == 0){
		var pageTitle = "h1.page-header__title";
		if(!$(pageTitle).length){
			pageTitle = "#firstHeading";
			if(!$(pageTitle).length){
				pageTitle = "";
			}
		}
		if(pageTitle.length != 0){
			var res = $(pageTitle).text().split(" (");
			if(res[1]){
				var final = res[res.length-1].split(")");
				$(pageTitle).html(res[0] + " <span class='small-parenthetical'>(" + final[0] + ")</span>" + final[1]);
			}
		}
	}
});
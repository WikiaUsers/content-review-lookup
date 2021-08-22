$(function(){
	/* If logged in, determine if a page has any wanted categories */
	/* & apply redlink behavior to wanted category links in footer */
	/* designed by User:SlyCooperFan1 for English No Man's Sky Wiki */
	if(!mw.config.get("wgUserName")) return;
	if(mw.config.get("wgNamespaceNumber") < 0) return;
	var mwCatList = mw.config.get("wgCategories");
	if(!mwCatList) return;
	if(mwCatList.length === 0) return;
	var apiCatList = "";
	for(var i = 0; i < mwCatList.length; i++){
		apiCatList += "Category:" + mwCatList[i] + "|";
	}
	apiCatList = apiCatList.substring(0, apiCatList.length - 1);
	var api = new mw.Api();
	api.get({
		action: "query",
		prop: "categoryinfo",
		titles: apiCatList
	}).done(function(d){
		console.log(d);
		if(!d.error){
			var anyCats = false;
			var i = -1;
			while(d.query.pages[i]){
				var missingCatLink = $("#articleCategories a[title='"+d.query.pages[i].title+"'");
				missingCatLink.addClass("new");
				missingCatLink.attr("href", missingCatLink.attr("href")+"?action=edit&redlink=1");
				anyCats = true;
				i--;
			}
			if(anyCats) $(".page-footer__categories.wds-is-collapsed .wds-collapsible-panel__header").click();
		} else {
			console.error("Error while checking for missing categories:" + d.error.code);
		}
	}).fail(function(){
		console.error("Failed to check for missing categories");
	});
});

/* Scrolling functions */
$(function(){
	$("html").css("scroll-behavior", "smooth");
	
	/* Add button to scroll back to top when sticky header is visible */
	$("#WikiaBar").before("<div class='nms-back-to-top' title='Scroll to top of page'>↑</div>");
	$(".nms-back-to-top").click(function(){
		document.getElementsByClassName("community-header-wrapper")[0].scrollIntoView();
	});
	
	/* Add link to scroll to categories section in bottom-right toolbar */
	$("#WikiaBar .tools li:last-of-type").before("<li><a onclick='scrollToCats()' style='cursor:pointer' title='Scroll to list of categories'>Categories</a></li>");
});
function scrollToCats(){
	$(".page-footer__categories.wds-is-collapsed .wds-collapsible-panel__header").click();
	document.getElementsByClassName("page-footer")[0].scrollIntoView();
}
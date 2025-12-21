/* Any JavaScript here will be loaded for all users on every page load. */
//back to top button
window.BackToTopModern = true;

//Wikitable Filterable https://community.fandom.com/wiki/User_blog:Sammylau/Wikitable_Filterable:_The_Filter_for_Long_Tables
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

// PreloadTemplate config
window.preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
window.preloadTemplates_subpage = "syntax";
window.preloadTemplates_namespace = "Template";
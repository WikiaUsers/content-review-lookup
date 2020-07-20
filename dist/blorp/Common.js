/* Any JavaScript here will be loaded for all users on every page load. */
//      For filterable tables
$(function(){
	importArticles({
		type: "script",
		articles: ["u:themightyquest.wikia.com:MediaWiki:FilterTable.js"]
	});
	importArticles({
		type: "script",
		articles: ["u:themightyquest.wikia.com:MediaWiki:NavTab.js"]
	});
	importArticles({
		type: "script",
		articles: ["u:themightyquest.wikia.com:MediaWiki:Tooltip.js"]
	});
});
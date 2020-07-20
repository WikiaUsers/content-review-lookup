/* Any JavaScript here will be loaded for all users on every page load. */
//      For filterable tables and tooltips
$(function(){
	importArticles({
		type: "script",
		articles: ["u:octopathtraveler.fandom.com:MediaWiki:FilterTable.js"]
	});
	importArticles({
		type: "script",
		articles: ["u:octopathtraveler.fandom.com:MediaWiki:Tooltip.js"]
	});
});
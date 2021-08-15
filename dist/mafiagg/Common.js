/* Any JavaScript here will be loaded for all users on every page load. */
$(function(){
	importArticles({
		// https://community.fandom.com/wiki/User_blog:Sammylau/Wikitable_Filterable:_The_Filter_for_Long_Tables
		// https://pad.fandom.com/wiki/MediaWiki:FilterTable.js
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});
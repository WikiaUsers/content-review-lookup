/* Any JavaScript here will be loaded for all users on every page load. */

var ShowHideConfig = { autoCollapse: 0};
importScriptPage('ShowHide/code.js', 'dev');

// code to filter trough tables by their values
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});
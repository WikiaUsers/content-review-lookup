/* Any JavaScript here will be loaded for all users on every page load. */
$(function(){
	importArticles({
		type: "script",
		articles: [
		    "u:pad.wikia.com:MediaWiki:FilterTable.js"
		    ]
	});
});
// 1. AjaxRC configuration option
var ajaxRefresh = 30000;
 
// 2. AjaxRC import statement
importScriptPage('AjaxRC/code.js','dev');

preloadTemplates_subpage = "syntax";
preloadTemplates_subpage = "case-by-case";

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
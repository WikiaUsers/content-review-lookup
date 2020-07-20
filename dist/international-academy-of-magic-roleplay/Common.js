/* Any JavaScript here will be loaded for all users on every page load. */



importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape');

$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});
/* Any JavaScript here will be loaded for all users on every page load. */

/* Imported */

importArticles({
	type: "script",
	articles: [
		"w:dev:PurgeButton/code.js", //Add "purge" option to page controls
		"MediaWiki:Common.js/preload.js", //Template preloads
                "MediaWiki:Common.js/standardeditsummaries.js",	//Edit Summary
                "MediaWiki:Common.js/LazyLoadVideo.js" //LazyLoadVideo
	]
});

/* ShowHide */
 
var ShowHideConfig = { 
    brackets: '[[]]'
};
importScriptPage('ShowHide/code.js', 'dev');
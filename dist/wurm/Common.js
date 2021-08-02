/* Any JavaScript here will be loaded for all users on every page load. */

var mwc = mw.config.get(['wgPageName', 'wgCategories']);
if ($.inArray( 'Fence Slope Calculator', mwc.wgCategories) !== -1) {
	importArticles({
    	type: "script",
    	articles: [
        		"MediaWiki:Fence_Slope_Calculator.js"
    	]
	});
}
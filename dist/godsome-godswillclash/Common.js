/* Any JavaScript here will be loaded for all users on every page load. */
var wgPageName = mw.config.get('wgPageName');
console.log(wgPageName);
if (wgPageName == 'Resource_Calc') {
	importArticles({
    	type: "script",
    	article:"MediaWiki:Resource_Calc.js"
	});
}
if (wgPageName == 'Speed_Boost_Calc') {
	importArticles({
    	type: "script",
    	article:"MediaWiki:Speed_Boost_Calc.js"
	});
}
if (wgPageName == 'Resource calculator') {
	importArticles({
    	type: "script",
    	article:"MediaWiki:Resource calculator.js"
	});
}
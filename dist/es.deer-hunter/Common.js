* Table of Contents
-----------------------
 * (X00) importArticle pre-script actions
 * * (X01) Less
 * * (X02) LastEdited
 * (Y00) importArticles
*/
 
//##############################################################
/* ==importArticle pre-script actions== (X00)*/
// The code in this section is for a script imported below
 
//###########################################
/* ===Less=== (X01) */
 
window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Common.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Common.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [ 'MediaWiki:Common.css', 'MediaWiki:Common.less' ],
    // target page header
    header: 'MediaWiki:Css-header/common'
} );
window.lessOpts.push( {
    target: 'MediaWiki:Handheld.css',
    source: 'MediaWiki:Handheld.less',
    load: [ 'MediaWiki:Handheld.css', 'MediaWiki:Handheld.less' ],
    header: 'MediaWiki:Css-header/handheld'
} );
 
//###########################################
/* ===LastEdited=== (X02) */
 
window.lastEdited = {
	avatar: true,
	size: false,
	diff: true,
	comment: true,
	time: false
};
 
//##############################################################
/* ==importArticles== (Y00)*/
// Imports scripts from other pages/wikis.
 
importArticles({
	type: 'script',
	articles: [
		'u:dev:Less/code.2.js',
		'MediaWiki:Common.js/cellTemplate.js',
		'u:dev:LastEdited/code.js',
		'u:dev:WallGreetingButton/code.js',
	]
});
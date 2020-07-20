/*
Any JavaScript here will be loaded for all users on every page load.
See MediaWiki:Wikia.js for scripts that only affect the oasis skin.
*/
 
/* Table of Contents
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
    source: 'MediaWiki:Custom-common.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [ 'MediaWiki:Common.css', 'MediaWiki:Custom-common.less' ],
    // target page header
    header: 'MediaWiki:Custom-css-header/common'
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
		'u:dev:MediaWiki:LastEdited/code.js',
		'u:dev:MediaWiki:WallGreetingButton/code.js',
	]
});
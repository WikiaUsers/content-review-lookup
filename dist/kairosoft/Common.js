/*
Any JavaScript here will be loaded for all users on every page load.
See MediaWiki:Wikia.js for scripts that only affect the oasis skin.
*/

/* Table of Contents
-----------------------
 * (A00) Add GameNav Friend ID Icon
 * (B00) Format Friend IDs
 * (X00) importArticle pre-script actions
 * * (X01) Less
 * * (X02) LastEdited
 * * (X03) Standard_Edit_Summary
 * (Y00) importArticles
*/

//##############################################################
/* ==Add GameNav Friend ID Icon== (A00)*/
// Adds friend id to icon the the link in the GameNav (need to get link styling + one link click)
var tNode;
if((tNode = $("#gamenavlinks [href*='/wiki/Friend_IDs_(']")).length || (tNode = $("#gamenavlinks .selflink:contains('Friend IDs')")).length) {
    tNode.html("<img id='gamenav-friend-icon' src='https://vignette.wikia.nocookie.net/kairosoft/images/b/bb/Friend_IDs_icon.png/revision/latest/scale-to-height-down/12?cb=20160131010508' /> "+tNode.html());
}

//##############################################################
/* ==Format Friend IDs== (B00)*/
// Adds friend id to icon the the link in the GameNav (need to get link styling + one link click)
$("#mw-content-text .friend-id-list li, #mw-content-text .friend-id-list ~ ul li").each(function(li){
	var html = $(this).text().trim();
	var friendIDLineData = html.match(/^(\d{0,3}[ \-,.]?\d{3}[ -,.]?\d{3}[ -,.]?\d{3}) ?-? ?(.*)*/);
	if(friendIDLineData) {
		var id = friendIDLineData[1]; id = id.replace(/[ \-,.]/g, "");
		var tSep = "<span class='friend-id-sep'></span>";
		var length = id.length;
		id = id.split('');
		id.splice(length-3, 0, tSep);
		id.splice(length-6, 0, tSep);
		if(length > 9) id.splice(length-9, 0, tSep);
		id = id.join('');
		var desc = friendIDLineData[2] ? " - "+friendIDLineData[2].trim() : "";
		$(this).html("<code class='friend-id'>"+id+"</code>"+desc);
	}
});


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
    load: [
        'MediaWiki:Common.css',
        'MediaWiki:Custom-common.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Custom-css-header/common'
} );
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Handheld.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Custom-handheld.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [
        'MediaWiki:Handheld.css',
        'MediaWiki:Custom-handheld.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Custom-css-header/handheld'
} );

//###########################################
/* ===Standard_Edit_Summary=== (X03) */

window.dev = window.dev || {};
window.dev.editSummaries = {
	css: '#stdSummaries { ... }',
	select: 'MediaWiki:StandardEditSummary'
};

//##############################################################
/* ==importArticles== (Y00)*/
// Imports scripts from other pages/wikis.

importArticles({
	type: 'script',
	articles: [
		'MediaWiki:Common.js/cellTemplate.js',
		'u:dev:MediaWiki:Less/code.2.js',
		'u:dev:MediaWiki:Standard_Edit_Summary/code.js',
		'u:dev:MediaWiki:WallGreetingButton/code.js'
	]
});
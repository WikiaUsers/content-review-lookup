/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage( 'MediaWiki:Functions.js', 'starwars' );

var firstRun = true;

function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;

	initFunctionsJS();

	rewriteTitle();
	showEras('title-eraicons');

	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;

	if( !bodyClass || (bodyClass.indexOf('page-') == -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
		body.className += ' page-' + page;
	}

	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
}

function showEras(className) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv == null || titleDiv == undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}

// ============================================================
// BEGIN JavaScript title rewrite

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE )
		return;
	var titleDiv = document.getElementById('title-meta');

	if( titleDiv == null )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	var node = firstHeading.childNodes[0];

	// new, then old!
	firstHeading.replaceChild(cloneNode, node);
	cloneNode.style.display = "inline";

	var titleAlign = document.getElementById('title-align');
	firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}
// END JavaScript title rewrite

addOnloadHook( loadFunc );
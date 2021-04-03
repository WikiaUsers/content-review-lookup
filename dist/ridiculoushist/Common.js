/* Any JavaScript here will be loaded for all users on every page load. */

/** Title rewrite ********************************************************
 * Rewrites the page's title, used by [[Template:Title]]
 * Credit to [[User:Sikon|Sikon]] 
 */
function rewriteTitle() {
	if( typeof( SKIP_TITLE_REWRITE ) != 'undefined' && SKIP_TITLE_REWRITE ) {
		return;
	}

	var titleDiv = document.getElementById( 'title-meta' );

	if( titleDiv == null || titleDiv == undefined ) {
		return;
	}

	var cloneNode = titleDiv.cloneNode( true );
	var firstHeading = document.getElementById( 'firstHeading' );
	var node = firstHeading.childNodes[0];

	// new, then old!
	firstHeading.replaceChild( cloneNode, node );
	cloneNode.style.display = 'inline';
	if ( titleDiv.childNodes[0].nodeValue.toLowerCase() == wgPageName.replace(/_/g,' 

').toLowerCase() ) {
		document.title = titleDiv.childNodes[0].nodeValue;
	}

	var titleAlign = document.getElementById( 'title-align' );
	firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

YAHOO.util.Event.onDOMReady( rewriteTitle );
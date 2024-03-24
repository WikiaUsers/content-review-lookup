/**
 * Name:        Context page on title
 * Description: If a DLC context box covers the whole page, move it next to the page title.
 */

// <nowiki>
( function ( log, document ) {

safeAddContentHook( function () {
	const pageContext = document.getElementById( 'context-page' );
	if ( !pageContext ) {
		return;
	}

	const pageTitle = document.getElementById( 'firstHeading' );
	if ( !pageTitle ) {
		log.warn( '[context-page-title] Could not find the page title.' );
		return;
	}

	const oldClone = document.getElementById( 'context-page-header' );
	if ( oldClone ) {
		// Code here might be run:
		//  - in edit mode, in which case the (cloned) context box from the previous preview should be replaced.
		//  - if this script has been run several times, in which case we do not want duplicates.
		oldClone.remove();
	}

	const pageContextClone = pageContext.cloneNode( true );
	pageContextClone.id = 'context-page-header';
	pageTitle.appendChild( pageContextClone );
} );

} )( mediaWiki.log, document );
// </nowiki>
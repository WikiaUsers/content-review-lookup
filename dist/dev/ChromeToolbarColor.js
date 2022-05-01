/**
 * @name    ChromeToolbarColor
 * @desc    Sets the mobile Chrome toolbar color to wiki's community header color
 * 
 * @author  Rail01
 * @author  KockaAdmiralac
 * @author  Caburum
 */
( function( mw, window ) {
	// Double-loading prevention
	if ( document.querySelector( 'meta[name="theme-color"]' ) ) return;

	var color = getComputedStyle( document.documentElement ).getPropertyValue( '--theme-sticky-nav-background-color' );

	if (!color) return;

	// Create and configure <meta> tag
	var meta = document.createElement( 'meta' );
	meta.setAttribute( 'name', 'theme-color' );
	meta.setAttribute( 'content',
		window.ChromeToolbarColor || color
	);

	// Add tag to document's head
	document.head.appendChild( meta );
} )( mediaWiki, this );
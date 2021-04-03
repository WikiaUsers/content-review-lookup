/**
 * @name    ChromeToolbarColor
 * @desc    Sets the mobile Chrome toolbar color to wiki's community header color
 * 
 * @author  Rail01
 * @author  KockaAdmiralac
 */
( function( mw, window ) {
    // Double-loading prevention
    if ( document.querySelector( 'meta[name="theme-color"]' ) ) return;

    // Find community header
    var header = document.getElementsByClassName( 'wds-community-header' )[0];
    if ( !header ) {
    	// There is no header in the editor
    	return;
    }

    // Create and configure <meta> tag
    var meta = document.createElement( 'meta' );
    meta.setAttribute( 'name', 'theme-color' );
    meta.setAttribute( 'content',
        window.ChromeToolbarColor || getComputedStyle( header )['background-color']
    );

    // Add tag to document's head
    document.head.appendChild( meta );
} )( mediaWiki, this );
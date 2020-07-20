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

    // Create and configure <meta> tag
    var meta = document.createElement( 'meta' );
    meta.name = 'theme-color';
    meta.content = window.ChromeToolbarColor || mw.config.get( 'wgSassParams' )['color-community-header'];

    // Add tag to document's head
    document.head.appendChild( meta );
} )( mediaWiki, this );
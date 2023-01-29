/**
 * charinsert loader
 */

if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 || mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
    mw.loader.load( 'ext.gadget.charinsert-core' );
}
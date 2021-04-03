/**
 * charinsert loader
 */

if ( /^(edit|submit)$/.test( mw.config.get( 'wgAction' ) ) || mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
    mw.loader.load( 'ext.gadget.charinsert-core' );
}
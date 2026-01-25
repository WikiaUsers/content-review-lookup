/* Any JavaScript here will be loaded for all users on every page load. */
/* https://dev.fandom.com/wiki/MisspelledPage */
window.deletedToo = true;

/* fixing the "redirected from another page bug" */
if($('.mw-redirect').length) {$('.mw-redirect').text( $( '.mw-redirect' ).attr( 'href' ).replace( mw.config.get( 'wgArticlePath' ).replace( '$1', '' ), '' ).replace('?redirect=no', '').replace(/_/g, ' ').replace(/%20/g, ' '));}
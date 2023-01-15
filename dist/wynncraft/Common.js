/* Any JavaScript here will be loaded for all users on every page load. */

( function() {
'use strict';

/* Variables for interface text used throughout the script, for ease of translating */
var i18n = {
	// File upload
	defaultLicense: 'License'
};


/* Fires when DOM is ready */
$( function() {

/**
 * Set unlicensed as the default license on file pages
 *
 * That way the file will be categorised so someone can find a license for the file
 */
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
	var $license = $( '#wpLicense' );
	if ( $license.length ) {
		if ( $license.val() === '' ) {
			$license.val( i18n.defaultLicense );
		}
		
		mw.loader.using( 'mediawiki.special.upload', function() {
			$license.change();
		} );
	}
}

} );
/* End DOM ready */

/**
 * Deselect "Create redirect" checkbox on "Special:MovePage" automatically if moving a file or a talk page
 */
if ( mw.config.get( 'wgPageName' ).indexOf( 'Special:MovePage/' ) != -1
  && document.querySelector( '.oo-ui-inputWidget-input' )
  && ( document.querySelector ('.oo-ui-inputWidget-input' ).value % 2 == 1 || document.querySelector( '.oo-ui-inputWidget-input' ).value == 6 )
  && document.querySelector( 'input[name="wpLeaveRedirect"]' ) )
{
    document.querySelector( 'input[name="wpLeaveRedirect"]' ).removeAttribute( 'checked' );
}


}() );


// Avoid redirecting for links in categories
$( '.ns-14 .redirect-in-category .mw-redirect' ).each(function( i, e ){
    var link = $( e ).attr( 'href' ).replace( /^\//, '' );
    $( e ).attr( 'href', '/index.php?title=' + link + '&redirect=no' );
});
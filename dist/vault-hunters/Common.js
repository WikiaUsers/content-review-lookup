/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScripts here are copied from either [[w:c:minecraft:Common.js]] or [[w:c:minecraft:MediaWiki:Gadget-purge.js]]*/
( function() {
'use strict';
/* Variables for interface text used throughout the script, for ease of translating */
var i18n = {
	// File upload
	defaultLicense: 'License'
};

// Make the purge tab work as it used to without a confirmation page by
// sending it using POST
'use strict';
$( function() {
	$( '#ca-purge a' ).on( 'click', function( e ) {
		var $form = $( '<form>' ).attr( {
			method: 'POST',
			action: this.href,
		} ).appendTo( document.body );
		
		$form.submit();
		
		e.preventDefault();
	} );
} );



/* Fires when DOM is ready */
$( function() {
	
/** 
 * Fix edit summary prompt for undo
 *
 * Fixes the fact that the undo function combined with the "no edit summary prompter"
 * causes problems if leaving the edit summary unchanged.
 * Added by [[wikipedia:User:Deskana]], code by [[wikipedia:User:Tra]].
 * See https://bugzilla.wikimedia.org/show_bug.cgi?id=8912
 */
if ( document.location.search.indexOf( "undo=" ) !== -1 && document.getElementsByName( 'wpAutoSummary' )[0] ) {
	document.getElementsByName( 'wpAutoSummary' )[0].value='1';
}

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

}() );
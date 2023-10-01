/* Any JavaScript here will be loaded, for all users using either the FandomDesktop or the FandomMobile skins, on every page load. */

// <nowiki>

// [START: module]
( function ( $, mw, array ) {

// [START: DOM ready]
$( function () {

	// Annotate empty TemplateData tables.
	function isNoParamsMessage( e ) {
		return e.textContent === 'No parameters specified';
	}
	function checkTemplateDataTable( table ) {
		if ( array.some.call( table.getElementsByClassName( 'mw-templatedata-doc-muted' ), isNoParamsMessage ) ) {
			table.classList.add( 'mw-templatedata-doc-params-empty' );
		}
	}
	array.forEach.call( document.getElementsByClassName( 'mw-templatedata-doc-params' ), checkTemplateDataTable );

} );
// [END: DOM ready]

} )( jQuery, mediaWiki, Array.prototype );
// [END: module]

// </nowiki>
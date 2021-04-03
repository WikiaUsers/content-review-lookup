/* Any JavaScript here will be loaded for all users on every page load. */

/* Adds icons to page header bottom border
 * from Avatar wiki by User:The 888th Avatar
 */
 
$(function() {
    if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#articletype' ).length ) {
        $( '.page-header__contribution > div' ).first().append( $( '#articletype' ).show() );
    } else if ( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#articletype' ).attr( 'style', 'position: absolute; right: 10px' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#articletype' ) );
		$( '#articletype' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});
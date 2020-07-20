/* Any JavaScript here will be loaded for all users on every page load. */

/* Adds icons to page header bottom border
 * from Avatar wiki by User:The 888th Avatar
 */
 
$(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#articletype' ).attr( 'style', 'position: absolute; right: 10px' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#articletype' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});
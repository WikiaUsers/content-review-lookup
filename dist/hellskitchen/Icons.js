/* Adds icons to page header bottom border
 * Credit to the Avatar Wiki
 */

$(function() {
	//if( $( '.page-header' ).length ) {
	$( '.page-header' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 65px;' )
	);
	/*} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}*/
});
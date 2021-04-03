/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]], adapted to new header by [[User:Thailog]]
 */

$( function IconsOasis() {
    if ( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#icons' ).attr( 'style', 'position: absolute;' )
        );
    } else {
    	$( '.WikiaPageHeader' ).append( $( '#icons' ) );
    	$( '#icons' ).css( { 'position' : 'absolute', 'bottom' : '-2em' } ).show();
    }
} );
/* Any JavaScript here will be loaded for all users on every page load. */

/* Adds icons to page header
 * by: The 888th Avatar, adapted to new header by Thailog
 */
$(function() {
    if( $( '#PageHeader' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#icons' ).attr( 'style', 'position: absolute; right: 0px; bottom: 50px;' )
        );
    }
});
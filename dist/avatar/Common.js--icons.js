/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]], adapted to new header by [[User:Thailog]]
 */

$( function IconsOasis() {
     mw.config.get( 'skin' ) == 'fandomdesktop' ;{
    		$( '.page-header__actions' ).first().append( $( '#icons' ).show() );
    	}
    } );
/**
 * jQuery Ajax Patrol Links
 *
 * @author Grunny
 *
 */

function ajaxPatrolLinks() {
	if( !$( '.patrollink' ).length ) return;
	$( '.patrollink' ).click( function ( e ) {
		e.preventDefault();
		var	$patrolLink = $( this ).children( 'a' ),
			$url = $patrolLink.attr( 'href' );
		$patrolLink.html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Sprawdzanie..." />');
		$.get( $url, $patrolLink.removeAttr( 'href' ).css( 'color', 'grey' ).text( 'Sprawdzone' ));
	} );
}

$( ajaxPatrolLinks );
/*
 * Toggler code
 * @author sactage <sactage@gmail.com>
 * @version 1.0.0
 */
$(function () {
  var containers = $( '.toggler-container' ),
      i,
      $container,
      $elem,
      $this;
  if ( containers.length === 0 ) {
  	return;
  }
  for ( i = 0; i < containers.length; i++ ) {
  	$container = $( containers[i] );
    $container.find( '.toggler-label' ).each( function ( ind, elem ) {
      $elem = $( elem );
    	$elem.html( $( '<a>' ).text( $elem.text() ) );
    });
  }
  $( '.toggler-label a' ).click( function ( event ) {
  	event.preventDefault();
   	var $this = $( this );
    if ( !$this.parents( 'span' ).hasClass( 'toggler-inactive' ) ) {
    	return;
    }
    $this.parents( 'span' ).removeClass( 'toggler-inactive' ).addClass( 'toggler-active' ).siblings( 'span' ).removeClass( 'toggler-active' ).addClass( 'toggler-inactive' );
    $this.parents( 'span' ).parents( 'p' ).siblings( '.toggler-image' ).each( function( a, b ) {
    	$b = $(b);
        $b.hasClass( 'toggler-active' ) ? $b.removeClass( 'toggler-active' ).addClass( 'toggler-inactive' ).hide() : $b.removeClass( 'toggler-inactive' ).addClass( 'toggler-active' ).show();
    });
  });
});


/** Username replace function ([[template:USERNAME]]) *******************************
 * Inserts user name into <span class="insertusername"></span>
 * Originally by [[wikia:User:Splarka|Splarka]]
 * New version by [[User:Spang|Spang]]
 */
function UserNameReplace() {
	if( typeof( disableUsernameReplace ) != 'undefined' && disableUsernameReplace || wgUserName == null ) {
		return;
	}
	var n = YAHOO.util.Dom.getElementsByClassName( 'insertusername', 'span', document.getElementById( 'bodyContent' ) );
	for ( var x in n ) {
		n[x].innerHTML = wgUserName;
	}
}
addOnloadHook( UserNameReplace );
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
    $this.parents( 'span' ).parents( 'p' ).siblings( '.toggler-image' ).each( function(a, b) {
    	$b = $(b);
      $b.hasClass( 'toggler-active' ) ? $b.removeClass( 'toggler-active' ).addClass( 'toggler-inactive' ) : $b.removeClass( 'toggler-inactive' ).addClass( 'toggler-active' );
    });
  });
  
});
//Kill auto-summary on deletion
$( function() {
 if ( wgAction === 'delete' ) {
  $( '#wpReason' ).val( '' );
 }
} );
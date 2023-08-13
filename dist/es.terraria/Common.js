// Para la Portada, scroll horizontal
$(document).ready(function() {
  var isDragging = false;
  var initialX, containerX;

  $(".afiliados-link").on("mousedown", function(e) {
    isDragging = true;
    initialX = e.clientX;
    containerX = $(this).scrollLeft();
    $(this).css("cursor", "grabbing");
  });

  $(document).on("mousemove", function(e) {
    if (isDragging) {
      var diffX = e.clientX - initialX;
      $(".afiliados-link").scrollLeft(containerX - diffX);
    }
  });

  $(document).on("mouseup", function() {
    isDragging = false;
    $(".afiliados-link").css("cursor", "grab");
  });
});

// Cerrar Upperbox
mw.hook( 'dev.wds' ).add( function( wds ) {
    $( '.upperbox' ).append( wds.icon( 'close-small', { class: 'upperbox-close' } ) );
	$( '.upperbox-close' ).click( function() {
        $( this ).parent().remove()
    } )
} );
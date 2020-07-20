$( '.infobox-container' ).each( function() {
  var infoboxContainer = $( this );
  var startInfobox = $( '.infobox' + infoboxContainer.attr( 'data-start-infobox' ) );
  var maxHeight = 0;
  infoboxContainer.children( '.infobox' ).each( function() {
  if ( maxHeight < $( this ).outerHeight() ) {
  maxHeight = $( this ).outerHeight();
  }
  $( this ).hide().css( "height", "100%" );
  } );
  infoboxContainer.css( "height", maxHeight );
  startInfobox.show();
  } );

$( '.infobox-tab' ).click( function() {
  var infoboxContainer = $( this ).closest( '.infobox-container' );
  var infoboxToShow = infoboxContainer.children( '.infobox' + $( this ).attr( 'data-target' ) );
  infoboxContainer.children( '.infobox' ).hide().css( "height", "100%" );
  infoboxToShow.show();
  } );
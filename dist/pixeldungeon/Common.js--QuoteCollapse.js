// This finds all quotes that are over a certain length and collapses them

// the height that a quote must be before is gets collapsed (in px)
var HEIGHT_TO_COLLAPSE = 200;

// the height that a quote will collapse to (in px)
var COLLAPSE_HEIGHT = 100;

// how to expand the quote
function expand( quote, button, fade ) {
  quote.css({
    'height': '',
    'overflow': ''
  });
  button.text( "Collapse" );
  button.doExpand = false;
  fade.remove();
}

// how to collapse the quote
function collapse( quote, button, fade ) {
  quote.css({
    'height': COLLAPSE_HEIGHT + 'px',
    'overflow': 'hidden'
  });
  button.text( "Expand" );
  button.doExpand = true;
  fade.css( 'height', quote.outerHeight() );
  quote.prepend( fade );
  
  // fade handler gets removed each time, so re-add
  fade.click( function( e ) {
    e.preventDefault();
    expand( quote, button, fade );
  });
}

$('.quote').not('.quote .quote').each(function (index) {
  if ($(this).height() >= HEIGHT_TO_COLLAPSE) {
    var quote = $(this);
    
    // create the expantion button
    var button = $('<a>');
    button.addClass( 'quote-expand-button' );
    quote.prepend( button );
    
    // create the fade effect
    var fade = $('<div>');
    fade.addClass( 'quote-fade' );
    fade.css( 'height', quote.outerHeight() );
      
    // set up the button's expanderer
    button.doExpand = true;
    button.click( function( e ) {
      e.preventDefault();
      if ( button.doExpand )
        expand( quote, button, fade );
      else
        collapse( quote, button, fade );
    });
    
    collapse( quote, button, fade );
  }
});
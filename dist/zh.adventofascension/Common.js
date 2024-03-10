/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */

/*
 Element animator
 
 Cycles through a set of elements (or "frames") on a 2 second timer per frame
 Add the "animated" class to the frame containing the elements to animate.
 Optionally, add the "animated-active" class to the frame to display first.
 Optionally, add the "animated-subframe" class to a frame, and the
 "animated-active" class to a subframe within, in order to designate a set of
 subframes which will only be cycled every time the parent frame is displayed.
 
 Requires some styling from [[MediaWiki:Common.css]].
 */
( function() {
  var $content = $( '.mw-body-content' );
  var advanceFrame = function( parentElem, parentSelector ) {
    var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
    $( curFrame ).removeClass( 'animated-active' );
    var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
    return $nextFrame.addClass( 'animated-active' );
  };
  setInterval( function() {
    $content.find( '.animated' ).each( function() {
      var $nextFrame = advanceFrame( this, '.animated' );
      if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
        advanceFrame( $nextFrame[0], '.animated-subframe' );
      }
    } );
  }, 2000 );
}() );
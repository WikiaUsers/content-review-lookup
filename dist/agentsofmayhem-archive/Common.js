
// Animate frontpage nav lines

(function() {

// Get current URL prefix (game-name.gamepedia.com)
var current_url = window.location.href;
var pre = current_url.match(/http.*\.gamepedia\.com/g);

$('#fpnav li a').each(function(){
  var url = $(this).attr('href');
  $(this).parent('li').css('cursor','pointer').click(function(){
      location.href = url;
  });
  
  var current_bg = $(this).parent('li').css('background-color');
  $(this).parent('li').hover(
    function() { $(this).css( {'background-color': '#2c1b4b'} ) },
    function() { $(this).css( {'background-color': current_bg} ) }
  );
  
  var current_lmargin = $(this).css('margin-left');
  current_lmargin = current_lmargin.replace('px','');
  $(this).parent('li').hover(
    function() { $(this).find('a').css( {'margin-left': (current_lmargin + 5) + 'px'} ) },
    function() { $(this).find('a').css( {'margin-left': current_lmargin} ) }
  );
});

})();

/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2013-Sept-21
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.fpmain' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '.fpsection1, .fpsection2, .fpsection3, .fpsection4' ) );
    } );
    if ( $( window ).width() > 789 && $( window ).width() < 1390 ) {
      $( '.fpmain' ).each( function (index) {
        var leftHeight = $( this ).find( '.fpsection1' ).height() + $( this ).find( '.fpsection4' ).height();
        var rightHeight = $( this ).find( '.fpsection2' ).height() + $( this ).find( '.fpsection3' ).height();
        var difference = Math.abs( rightHeight - leftHeight );
        
        if ( leftHeight < rightHeight ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( '.fpsection1, .fpsection4' ) );
        } else if ( rightHeight < leftHeight ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( '.fpsection2, .fpsection3' ) );
        }
      } );
    } else if ( $( window ).width() > 1389 ) {
      $( '.fpmain' ).each( function (index) {
        var leftHeight = $( this ).find( '.fpsection1' ).height() + $( this ).find( '.fpsection4' ).height();
        var middleHeight = $( this ).find( '.fpsection2' ).height();
        var rightHeight = $( this ).find( '.fpsection3' ).height();
        var maxHeight = Math.max( leftHeight, middleHeight, rightHeight );
        
        if ( leftHeight < maxHeight ) {
          fp.adjustSectionBoxHeights( maxHeight - leftHeight, $( this ).find( '.fpsection1, .fpsection4' ) );
        }
        if ( middleHeight < maxHeight ) {
          fp.adjustSectionBoxHeights( maxHeight - middleHeight, $( this ).find( '.fpsection2' ) );
        }
        if ( rightHeight < maxHeight ) {
          fp.adjustSectionBoxHeights( maxHeight - rightHeight, $( this ).find( '.fpsection3' ) );
        }
      } );
    }
  },

  findAdjustableSectionBoxes : function ( sections ) {
    var boxes = sections.find( '.fpbox.fpgreedy' );

    if ( boxes.length === 0 ) {
      return sections.find( '.fpbox' ).not( '.fpnoresize' );
    } else {
      return boxes;
    }
  },

  resetSectionBoxHeights : function ( sections ) {
    fp.findAdjustableSectionBoxes( sections ).each( function () {
      $( this ).height( 'auto' );
    } );
  },

  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
    var boxes, lastBox, remainingHeightToAdd, boxHeightToAdd;
    boxes = fp.findAdjustableSectionBoxes( sections );
    lastBox = boxes.last();
    remainingHeightToAdd = heightToAdd;
    boxHeightToAdd = Math.floor( heightToAdd / boxes.length );

    boxes.each( function() {
      if ( this === lastBox.get( 0 ) ) {
        $( this ).height( $( this ).height() + remainingHeightToAdd );
      } else {
        $( this ).height( $( this ).height() + boxHeightToAdd );
        remainingHeightToAdd -= boxHeightToAdd;
      }
    } );
  }
};

$( document ).ready( fp.equalizeColumns );
$( window ).resize( fp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/
/* Any JavaScript here will be loaded for users using the Hydra skin */
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
          fp.adjustSectionBoxHeights( Math.floor( difference / 2), $( this ).find( '.fpsection1' ) );
          fp.adjustSectionBoxHeights( difference - Math.floor( difference / 2), $( this ).find( '.fpsection4' ) );
        } else if ( rightHeight < leftHeight ) {
          fp.adjustSectionBoxHeights( Math.floor( difference / 2), $( this ).find( '.fpsection2' ) );
          fp.adjustSectionBoxHeights( difference - Math.floor( difference / 2), $( this ).find( '.fpsection3' ) );
        }
      } );
    } else if ( $( window ).width() > 1389 ) {
      $( '.fpmain' ).each( function (index) {
        var leftHeight = $( this ).find( '.fpsection1' ).height() + $( this ).find( '.fpsection4' ).height();
        var middleHeight = $( this ).find( '.fpsection2' ).height();
        var rightHeight = $( this ).find( '.fpsection3' ).height();
        var maxHeight = Math.max( leftHeight, middleHeight, rightHeight );
        
        if ( leftHeight < maxHeight ) {
          var difference = maxHeight - leftHeight;
          fp.adjustSectionBoxHeights( Math.floor( difference / 2), $( this ).find( '.fpsection1' ) );
          fp.adjustSectionBoxHeights( difference - Math.floor( difference / 2), $( this ).find( '.fpsection4' ) );
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

  resetSectionBoxHeights : function ( sections ) {
    sections.each( function () {
      $( this ).find( '.fpbox' ).each( function () {
        $( this ).height( 'auto' );
      } );
    } );
  },

  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
    var boxes, lastBox, remainingHeightToAdd, boxHeightToAdd;
    sections.each( function() {
      boxes = $( this ).find( '.fpbox' );
      lastBox = boxes.last();
      remainingHeightToAdd = heightToAdd;
      boxHeightToAdd = Math.floor( heightToAdd / boxes.length );

      boxes.each( function() {
        if ( this == lastBox ) {
          $( this ).height( $( this ).height() + remainingHeightToAdd );
        } else {
          $( this ).height( $( this ).height() + boxHeightToAdd );
          remainingHeightToAdd -= boxHeightToAdd;
        }
      } );
    } );
  }
};

$( document ).ready( fp.equalizeColumns );
$( window ).resize( fp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/
/* Any JavaScript here will be loaded for users using the 2 column main page layout */
/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2017-Jul-25
// License: CC-BY 3.0
// Version: beta
// (Note: customized version for this wiki)

var fp = fp || {
  equalizeColumns : function() {
    $( '.fpcontent' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '#fptopsection, #fpflexsection, #fpbottomsection' ) );
    } );
    fp.equalizeOuterColumns();
    fp.equalizeInnerColumns();
  },

  equalizeOuterColumns : function() {
    $( '.fpcontent' ).each( function ( index ) {
      if ( $( this ).find( '#fpflexsection' ).css( 'float' ) == 'right' ) {
        var tryCount = 0;
        do {
          var leftBottom = $( this ).find( '#fpbottomsection' ).offset().top + $( this ).find( '#fpbottomsection' ).height();
          var rightBottom = $( this ).find( '#fpflexsection' ).offset().top + $( this ).find( '#fpflexsection' ).height();

          var difference = Math.round( Math.abs( rightBottom - leftBottom ) );
        
          if ( leftBottom < rightBottom ) {
            fp.adjustSectionBoxHeights( difference, $( this ).find( '#fptopsection, #fpbottomsection' ) );
          } else if ( rightBottom < leftBottom ) {
            fp.adjustSectionBoxHeights( difference, $( this ).find( '#fpflexsection' ) );
          }
          ++tryCount;
        } while ( Math.round( leftBottom ) != Math.round( rightBottom ) && tryCount < 4 );
      }
    } );
  },

  equalizeInnerColumns : function() {
    $( '.fpcontent .fpinnercols' ).each( function ( index ) {
      if ( $( this ).find( '.fpleftcol' ).css( 'display' ) == 'inline-block' ) {
        var tryCount = 0;
        do {
          var leftBottom = $( this ).find( '.fpleftcol' ).offset().top + $( this ).find( '.fpleftcol' ).height();
          var centerBottom = $( this ).find( '.fpcentercol' ).offset().top + $( this ).find( '.fpcentercol' ).height();
          var rightBottom = $( this ).find( '.fprightcol' ).offset().top + $( this ).find( '.fprightcol' ).height();

          var lowestBottom = Math.max( leftBottom, centerBottom, rightBottom );
        
          var leftGap = Math.round( lowestBottom - leftBottom );
          var centerGap = Math.round( lowestBottom - centerBottom );
          var rightGap = Math.round( lowestBottom - rightBottom );
        
          if ( leftGap > 0 ) {
            fp.adjustSectionBoxHeights( leftGap, $( this ).find( '.fpleftcol' ) );
          }
          if ( centerGap > 0 ) {
            fp.adjustSectionBoxHeights( centerGap, $( this ).find( '.fpcentercol' ) );
          }
          if ( rightGap > 0 ) {
            fp.adjustSectionBoxHeights( rightGap, $( this ).find( '.fprightcol' ) );
          }
          ++tryCount;
        } while ( ( leftGap + centerGap + rightGap ) > 0 && tryCount < 4 );
      }
    } );
  },

  resetSectionBoxHeights : function ( sections ) {
    sections.each( function () {
      $( this ).find( '.fpbox, .fpboxlight' ).each( function () {
        $( this ).height( 'auto' );
      } );
    } );
  },

  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
    var boxCount = 0;
    sections.each( function() {
      boxCount += $( this ).find( '.fpbox, .fpboxlight' ).length;
    } );

    var avgHeightToAdd = heightToAdd / boxCount;
    var decimalPortion = 0.0;
    var boxes, heightToAdd;
    sections.each( function() {
      boxes = $( this ).find( '.fpbox, .fpboxlight' );

      boxes.each( function() {
        heightToAdd = Math.round( decimalPortion + avgHeightToAdd ); /* should iron out rounding error */
        decimalPortion += avgHeightToAdd - heightToAdd;
        $( this ).height( $( this ).height() + heightToAdd );
      } );
    } );
  }
};

$( document ).ready( fp.equalizeColumns );
$( window ).resize( fp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/
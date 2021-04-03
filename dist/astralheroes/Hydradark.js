/* Any JavaScript here will be loaded for users using the Hydra Dark skin */
/*****************************************************
/* Front Page (9 section) column height equalization *
/*****************************************************/
// Author:  Shawn Bruckner
// Date:    2017-Jan-24
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.fp9sections' ).each( function () {
      fp.resetSectionBoxHeights( $( this ) );
    } );
    if ( $( '#fp9wrapperGH' ).css( 'float' ) == 'right' ) {
      // Sections G and H are to the right. We're in medium mode, the simpler resize case
      fp.equalizeColumnsOfBlock( '.fp9sections',
                                 '#fp9wrapperABC, #fp9sectionF',
                                 '#fp9sectionD, #fp9sectionE, #fp9wrapperGH, #fp9sectionI'
                               );
    } else if ( $( '#fp9wrapperGH' ).css( 'float' ) == 'left' ) {
      // Sections G and H are to the right. We're in wide mode, the complicated resize case
      fp.equalizeColumnsOfBlock( '.fp9sections',
                                 '#fp9sectionA, #fp9sectionB, #fp9sectionE, #fp9sectionF, #fp9sectionG',
                                 '#fp9sectionD, #fp9sectionI'
                               );
      fp.equalizeColumnsOfBlock( '#fp9wrapperABC', '#fp9sectionB', '#fp9sectionC' );
      fp.equalizeColumnsOfBlock( '#fp9wrapperGH', '#fp9sectionG', '#fp9sectionH' );
    }
  },

  findBottom : function( block, selector ) {
    var bottom = 0;
    block.find( selector ).each( function() {
      bottom = Math.max( bottom, $( this ).offset().top + $( this ).height() );
    } );
    return bottom;
  },

  equalizeColumnsOfBlock : function( blockSel, leftSel, rightSel ) {
    $( blockSel ).each( function ( index ) {
      var tryCount = 0;
      do {
        var leftBottom = fp.findBottom( $( this ), leftSel );
        var rightBottom = fp.findBottom( $( this ), rightSel );

        var difference = Math.round( Math.abs( rightBottom - leftBottom ) );
        
        if ( leftBottom < rightBottom ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( leftSel ) );
        } else if ( rightBottom < leftBottom ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( rightSel ) );
        }
        ++tryCount;
      } while ( Math.round( leftBottom ) != Math.round( rightBottom ) && tryCount < 4 );
    } );
  },

  resetSectionBoxHeights : function ( sections ) {
    sections.each( function () {
      $( this ).find( '.fp9block.box' ).each( function () {
        $( this ).height( 'auto' );
      } );
    } );
  },

  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
    var boxCount = 0;
    sections.each( function() {
      boxCount += $( this ).find( '.fp9block.box' ).length;
    } );

    var avgHeightToAdd = heightToAdd / boxCount;
    var decimalPortion = 0.0;
    var boxes, heightToAdd;
    sections.each( function() {
      boxes = $( this ).find( '.fp9block.box' );

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
/* Any JavaScript here will be loaded for users using the Hydra Dark skin */
/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2015-Oct-12
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.va-main-page' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '.va-portal-columns-body' ) );

      var excludeSel = '';
      if ( $( window ).width() > 1271 ) {
        if ( $( this ).find( '.va-portal-columns-body-left-double' ).length > 0 ) {
          var leftBottom = $( this ).find( '.va-portal-columns-left' ).offset().top + $( this ).find( '.va-portal-columns-left' ).height();
          var middleBottom = $( this ).find( '.va-portal-columns-middle' ).offset().top + $( this ).find( '.va-portal-columns-middle' ).height();

          if ( leftBottom < middleBottom ) {
            excludeSel = '.va-portal-columns-left';
          } else {
            excludeSel = '.va-portal-columns-middle';
          }
        }

        fp.equalizeColumnsOfBlock( $( this ),
                                   '.va-portal-columns-body',
                                   '.va-portal-columns-body-left',
                                   '.va-portal-columns-body-left',
                                   '.va-portal-columns-body-right',
                                   '.va-portal-columns-body-right-bottom',
                                   excludeSel
                                 );
      }
      if ( $( window ).width() > 838 && $( this ).find( '.va-portal-columns-body-left-double' ).length > 0 ) {
        fp.equalizeColumnsOfBlock( $( this ),
                                   '.va-portal-columns-body .va-portal-columns-body-left .va-portal-columns-body-left-columns',
                                   '.va-portal-columns-left',
                                   '.va-portal-columns-left',
                                   '.va-portal-columns-middle',
                                   '.va-portal-columns-middle',
                                   ''
                                 );
      }
    } );
  },

  equalizeColumnsOfBlock : function( columns, blockSel, leftSel, leftBottomSel, rightSel, rightBottomSel, excludeSel ) {
    columns.find( blockSel ).each( function ( index ) {
      var tryCount = 0;
      do {
        var leftBottom = $( this ).find( leftBottomSel ).offset().top + $( this ).find( leftBottomSel ).height();
        var rightBottom = $( this ).find( rightBottomSel ).offset().top + $( this ).find( rightBottomSel ).height();

        var difference = Math.round( Math.abs( rightBottom - leftBottom ) );
        
        if ( leftBottom < rightBottom ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( leftSel ).not( excludeSel ) );
        } else if ( rightBottom < leftBottom ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( rightSel ).not( excludeSel ) );
        }
        ++tryCount;
      } while ( Math.round( leftBottom ) != Math.round( rightBottom ) && tryCount < 4 );
    } );
  },

  resetSectionBoxHeights : function ( sections ) {
    sections.each( function () {
      $( this ).find( '.va-portal-section-body' ).each( function () {
        $( this ).height( 'auto' );
      } );
    } );
  },

  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
    var boxCount = 0;
    sections.each( function() {
      boxCount += $( this ).find( '.va-portal-section-body' ).length;
    } );

    var avgHeightToAdd = heightToAdd / boxCount;
    var decimalPortion = 0.0;
    var boxes, heightToAdd;
    sections.each( function() {
      boxes = $( this ).find( '.va-portal-section-body' );

      boxes.each( function() {
        heightToAdd = Math.round( decimalPortion + avgHeightToAdd ); /* should iron out rounding error */
        decimalPortion += avgHeightToAdd - heightToAdd;
        $( this ).height( $( this ).height() + heightToAdd );
      } );
    } );
  }
};

$( document ).ready( fp.equalizeColumns );
$( window ).load( fp.equalizeColumns );
$( window ).resize( fp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/
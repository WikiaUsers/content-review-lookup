/******************************************
/* Responsive main page element transfers *
/******************************************/
/* Moves #rmpabovesearch and #rmpbelowsearch above and below the search box, respectively */
$( 'body.page-Hearthstone_Wiki.ns-0.action-view' ).append( $( '#rmpabovesearch' ) );
$( 'body.page-Hearthstone_Wiki.ns-0.action-view' ).append( $( '#rmpbelowsearch' ) );
$( 'body.page-Hearthstone_Wiki.ns-0.action-view #rmpabovesearch' ).show();
$( 'body.page-Hearthstone_Wiki.ns-0.action-view #rmpbelowsearch' ).show();

/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2014-Jul-07
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    fp.resetColumnBoxHeights( );

    $( 'body.page-Hearthstone_Wiki' ).each( function (index) {
      var leftHeight = $( this ).find( '#mf-fpcolumn1' ).height();
      var rightHeight = $( this ).find( '#mf-fpcolumn2' ).height();
      var difference = Math.abs( rightHeight - leftHeight );
        
      if ( leftHeight < rightHeight ) {
        fp.adjustColumnBoxHeights( difference, $( this ).find( '#mf-fpcolumn1' ) );
      } else if ( rightHeight < leftHeight ) {
        fp.adjustColumnBoxHeights( difference, $( this ).find( '#mf-fpcolumn2' ) );
      }
    } );
  },

  resetColumnBoxHeights : function ( ) {
    $( 'body.page-Hearthstone_Wiki' ).find( '#mf-fpcolumn1, #mf-fpcolumn2' ).each( function () {
      $( this ).find( '.fpblock' ).each( function () {
        $( this ).height( 'auto' );
      } );
    } );
  },

  adjustColumnBoxHeights : function ( heightToAdd, columns ) {
    var boxes, lastBox, remainingHeightToAdd, boxHeightToAdd;
    columns.each( function() {
      boxes = $( this ).find( '.fpblock' );
      lastBox = boxes.last();
      remainingHeightToAdd = heightToAdd;
      boxHeightToAdd = Math.floor( heightToAdd / boxes.length );

      boxes.each( function() {
        if ( $( this ).is( lastBox ) ) {
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

var rfp = rfp || {
  equalizeColumns : function() {
    rfp.resetColumnBoxHeights( );

    $( 'body.page-Hearthstone_Wiki, body.page-User_OOeyes_Hearthstone_Wiki' ).each( function (index) {
      if ( $( this ).find( '#mf-rfpcolumn2' ).css( 'float' ) == 'right' ) {
        var leftHeight = $( this ).find( '#mf-rfpcolumn1' ).height();
        var rightHeight = $( this ).find( '#mf-rfpcolumn2' ).height();
        var difference = Math.abs( rightHeight - leftHeight );
        
        if ( leftHeight < rightHeight ) {
          rfp.adjustColumnBoxHeights( difference, $( this ).find( '#mf-rfpcolumn1' ) );
        } else if ( rightHeight < leftHeight ) {
          rfp.adjustColumnBoxHeights( difference, $( this ).find( '#mf-rfpcolumn2' ) );
        }
      }
      if ( $( this ).find( '#rfpcolumn2sub2' ).css( 'float' ) == 'right' ) {
        var leftHeight = $( this ).find( '#rfpcolumn2sub1' ).height();
        var rightHeight = $( this ).find( '#rfpcolumn2sub2' ).height();
        var difference = Math.abs( rightHeight - leftHeight );
        
        if ( leftHeight < rightHeight ) {
          rfp.adjustColumnBoxHeights( difference, $( this ).find( '#rfpcolumn2sub1' ) );
        } else if ( rightHeight < leftHeight ) {
          rfp.adjustColumnBoxHeights( difference, $( this ).find( '#rfpcolumn2sub2' ) );
        }
      }
    } );
  },

  resetColumnBoxHeights : function ( ) {
    $( 'body.page-Hearthstone_Wiki, body.page-User_OOeyes_Hearthstone_Wiki' ).find( '#mf-rfpcolumn1, #mf-rfpcolumn2' ).each( function () {
      $( this ).find( '.rfpblock' ).each( function () {
        $( this ).height( 'auto' );
      } );
    } );
  },

  adjustColumnBoxHeights : function ( heightToAdd, columns ) {
    var boxes, lastBox, remainingHeightToAdd, boxHeightToAdd;
    columns.each( function() {
      boxes = $( this ).find( '.rfpblock' );
      lastBox = boxes.last();
      remainingHeightToAdd = heightToAdd;
      boxHeightToAdd = Math.floor( heightToAdd / boxes.length );

      boxes.each( function() {
        if ( $( this ).is( lastBox ) ) {
          $( this ).height( $( this ).height() + remainingHeightToAdd );
        } else {
          $( this ).height( $( this ).height() + boxHeightToAdd );
          remainingHeightToAdd -= boxHeightToAdd;
        }
      } );
    } );
  }
};

$( document ).ready( rfp.equalizeColumns );
$( window ).resize( rfp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/
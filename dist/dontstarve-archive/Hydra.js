/*
	Simple but flexible javascript tabs
	v0.3
	Author: Abdullah A. Abduldayem
	Contact: https://zelda.gamepedia.com/User:Abdullah5599
	See https://zelda.gamepedia.com/MediaWiki_talk:Tabs.js for examples and documentation
*/

$(document).ready(function(){
  // When a tab is clicked
  $(".tab").click(function () {
    var $siblings= $(this).parent().children();
    var $alltabs = $(this).closest(".tabcontainer");
    var $content = $alltabs.parent().children(".tabcontents");

    // switch all tabs off
    $siblings.removeClass("active");

    // switch this tab on
    $(this).addClass("active");

    // hide all content
    $content.children(".content").css("display","none");

    // show content corresponding to the tab
    var index = $siblings.index(this);
    $content.children().eq(index).css("display","block");
  });	
});

/**
  Related to Don't Starve Wiki Hover Tabs
  Enabling this scripts allows tab selectors identified by DSWHoverTabSelector css class to be pinned by   clicking the tab selector in them, identified by DSWHoverTabDefault css class.
  Clicking an item with DSWHoverTabSelector class changes adds DSWHoverTabDefault class to it, and removes it from its siblings.
**/


; (function ($) {
    $(".DSWHoverTab").click(function(){
        $(this).siblings(".DSWHoverTabDefault").removeClass("DSWHoverTabDefault");
        $(this).addClass("DSWHoverTabDefault");
    });
})(this.jQuery);

/* Any JavaScript here will be loaded for users using the Hydra Dark skin */
/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2015-Feb-12
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.fpmain' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '#fptopsection, #fpflexsection, #fpbottomsection' ) );
    } );
    var excludeSel = '';
    if ( $( '.fpmaybercol' ).css( 'float' ) == 'right' ) {
      excludeSel = '.fpmaybercol'; // at this width, it's necessary to hit those boxes in a separate pass after .fpmain
    }
    if ( $( '#fpflexsection' ).css( 'float' ) == 'right' ) {
      fp.equalizeColumnsOfBlock( '.fpmain',
                                 '#fptopsection, #fpbottomsection',
                                 '#fpbottomsection',
                                 '#fpflexsection',
                                 '#fpflexsection',
                                 excludeSel
                               );
    }
    if ( $( '.fpmaybercol' ).css( 'float' ) == 'right' ) {
      fp.equalizeColumnsOfBlock( '.fpmaybecols',
                                 '.fpmaybelcol',
                                 '.fpmaybelcol',
                                 '.fpmaybercol',
                                 '.fpmaybercol',
                                 ''
                               );
    }
  },

  equalizeColumnsOfBlock : function( blockSel, leftSel, leftBottomSel, rightSel, rightBottomSel, excludeSel ) {
    $( blockSel ).each( function ( index ) {
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
      $( this ).find( '.fpbox' ).each( function () {
        $( this ).height( 'auto' );
      } );
    } );
  },

  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
    var boxCount = 0;
    sections.each( function() {
      boxCount += $( this ).find( '.fpbox' ).length;
    } );

    var avgHeightToAdd = heightToAdd / boxCount;
    var decimalPortion = 0.0;
    var boxes, heightToAdd;
    sections.each( function() {
      boxes = $( this ).find( '.fpbox' );

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
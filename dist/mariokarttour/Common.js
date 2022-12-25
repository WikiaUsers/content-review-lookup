/* Any JavaScript here will be loaded for users using the 2 column main page layout */
/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2015-Feb-12
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.fpcontent' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '#fptopsection, #fpflexsection, #fpbottomsection' ) );
    } );
    var excludeSel = '';
    if ( $( window ).width() > 1539 ) {
      excludeSel = '.fpmaybercol'; // at this width, it's necessary to hit those boxes in a separate pass after .fpcontent
    }
    if ( $( window ).width() > 889 ) {
      fp.equalizeColumnsOfBlock( '.fpcontent',
                                 '#fptopsection, #fpbottomsection',
                                 '#fpbottomsection',
                                 '#fpflexsection',
                                 '#fpflexsection',
                                 excludeSel
                               );
    }
    if ( $( window ).width() > 1539 ) {
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


/*************************
 * JQuery Random  Plugin *
 *************************/

/**
 * Adds a 'random' filter to jQuery, which selects 1 or more elements at random for the current jQuery set.
 * Defaults to 1 element if a amount isn't given.
 */

jQuery.fn.random = function(count) {
    var count = (typeof count !== 'undefined') ?  count : 1;
    // Return the current set if an invalid count is asked for.
    if ( count < 1 || count >= this.length || ! Number.isInteger(Number(count)) ) {
        return jQuery(this);
    }

    var indexes = [];
    var resultset = [];
    while ( indexes.length < count ) {
        // Generate a random index
        var index = Math.floor(Math.random() * this.length);
        
        // reroll the random index if it's already present
        var reroll = false;
        for (var i = 0; i < indexes.length; i++) {
            if ( indexes[i] == index ) {
                reroll = true;
            }
        }
        if (reroll) {
            continue;
        }

        // Add the index/element to the result set
        indexes.push(index);
        resultset.push(this[index]);
    }
    return jQuery(resultset);
}

/*****************
 * Random subset *
 *****************/

/**
 * A random subset of list elements within elements with the 'random-subset' class are show, while the rest are hidden.
 * The 'data-random-subset-count' attribute can be used to specify the number of elements to be displayed.
 */

$('.random-subset').each(function() {
    var count = 1;
    // If the data-random-subset-count attribute is present use that count
    if ($(this).attr('data-random-subset-count')) {
        count = $(this).attr('data-random-subset-count');
    }
    var entries = $(this).find('li');
    $(entries).random(entries.length - count).remove();
    // show the root element in case it was hidden while waiting for JS.
    $(this).show();
});
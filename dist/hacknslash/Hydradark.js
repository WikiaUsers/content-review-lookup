/* Any JavaScript here will be loaded for users using the Hydra Dark skin */

/* Spoilers - based on Tierrie's code */
$(document).ready(function(){
  var cookiepref = 'spoilerdisplay_';

  function setCookie(key, value) {
    if(value=="undefined" || value == "null") value = null;
    $.cookie(cookiepref + key, value, { expires:100,path:'/' });
  }
  
  function getCookie(key) {
    return $.cookie(cookiepref + key);
  }
  
  $('.spoiler').click( function() {
    var id = $(this).attr('class').match(/spid_[\d\w]+/)[0].split('spid_')[1];
    if( $('.spid_'+id+' .spwrn').css('display') == 'none') {
      $('.spid_'+id+' .spwrn').fadeIn(200, function() {
        $(this).show(200);
      });
      $('.spid_'+id+' .sptxt').hide(0);
      setCookie(id, 'hidden');
    } else {
      $('.spid_'+id+' .spwrn').fadeOut(200, function() {
        $(this).hide(200);
      });
      $('.spid_'+id+' .sptxt').delay(200).show(0);
      setCookie(id, 'shown');
    }
  });
  /* Set to default or stored state on load */
  var spoiled = {};
  $('.spoiler').each( function() {
    var id = $(this).attr('class').match(/spid_[\d\w]+/)[0].split('spid_')[1];
    spoiled[id] = undefined;
  });
  for (var id in spoiled) {
    if (getCookie(id) === 'shown') {
      $('.spid_'+id+' .spwrn').hide(0);
      $('.spid_'+id+' .sptxt').show(0);
    } else if (getCookie(id) === 'hidden') {
      $('.spid_'+id+' .spwrn').show(0);
      $('.spid_'+id+' .sptxt').hide(0);
    } else if ($('.spid_'+id+' .spwrn').attr('display') == 'none') {
      $('.spid_'+id+' .spwrn').hide(0);
      $('.spid_'+id+' .sptxt').show(0);
    } else {
      $('.spid_'+id+' .spwrn').show(0);
      $('.spid_'+id+' .sptxt').hide(0);
    }
  }
});

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
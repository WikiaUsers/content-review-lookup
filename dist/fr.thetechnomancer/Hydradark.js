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
/*****************************************
/* Front Page 3-column height equalization *
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
/* Any JavaScript here will be loaded for all users on every page load. */

/* Any JavaScript here will be loaded for all users on every page load. */
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

// default setting to turn tooltips on
var tooltipsOn = true;

var $tfb;
var activeHoverLink = null;
var tipCache = new Object();

// hides the tooltip
function hideTip() {
  $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
  activeHoverLink = null;
}

// displays the tooltip
function displayTip(e) {
  $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
  moveTip(e);
  $tfb.not(":empty").css("visibility","visible");
  moveTip(e);
}

// moves the tooltip
function moveTip(e) {
  $ct = $tfb.not(":empty");
  var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($ct.innerHeight()+20):20);
  var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
  $ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
  var $t=$(this);
  activeHoverLink = $t;
  $p=$t.parent();
  if ($p.hasClass("selflink")==false) {
    $t.removeAttr("title");
    $p.removeAttr("title");
    var url = "/index.php?title="+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"&action=render .tooltip-content";
    if (tipCache[url] != null) {
      $tfb.html(tipCache[url]);
      displayTip(e);
      return;
    }
    $tfb.load(url,function () {
      if ($t != activeHoverLink) return;
      if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip-content").css("display","");
      tipCache[url] = $tfb.html();
      displayTip(e);
    });
  }
}

function bindTT() {
  $t=$(this);
  $p=$t.parent();
  if ($p.hasClass("selflink") == false) {
    $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTip,hideTip).mousemove(moveTip);
  }
}

// check to see if it is active then do it
function ttMouseOver() {
  if (tooltipsOn) {
    $("#bodyContent").append('<div id="tfb" class="htt"></div>');
    $tfb = $("#tfb");
    $("#bodyContent span.ajaxttlink").each(bindTT);
  }
}

$(ttMouseOver);

addOnloadHook(function() {
	$('.rolloverToggle').hover(
		function() {
			$('.rolloverItem', this).hide();
			$('.rolloverB', this).show();
		},
		function()  {
			$('.rolloverItem', this).hide();
			$('.rolloverA', this).show();
	});
});

addOnloadHook(function() {
	$('.tabdiv > div').hide();
	$('.tabdiv').each(function() {
		$(this).find('> ul li:first').addClass('active');
		$(this).find('> div:first').show();
	});

	$('.tabdiv > ul li a').each(function() {
		var target = $(this).attr('href');
		$(this).attr('href', ''); // Opera hates real hrefs
		$(this).parent().click(function() {
			$(this).parent().find('> li').removeClass('active');
			$(this).parent().parent().find('> div').hide();
			$(this).addClass('active');
			$(target).show();
			return false;
		});
	});
});


	

$( function() {
'use strict';


/**
 * Tab loader
 *
 * Loads content when a header tab is clicked
 */
$( window ).on( 'hashchange.tabs', function() {
	var tab = location.hash.match( /^#tab=(.+)/ );
	if ( !tab || !$( '#' + tab[1] ).find( '.load-tab' ).length ) {
		return;
	}
	tab = tab[1];
	var $content = $( '#' + tab );
	
	$.ajax( {
		url: '/api.php',
		data: {
			format: 'json',
			action: 'parse',
			prop: 'text',
			title: mw.config.get( 'wgPageName' ),
			text: '{' + '{:' + $content.find( '.load-tab' ).data( 'page' ) + '}}'
		},
		dataType: 'json',
		timeout: 20000
	} ).done( function( data ) {
		if ( data.error ) {
			mw.log( data.error );
			return;
		}
		
		$content.html( '<p/>' + data.parse.text['*'] );
		
		// Apply some JS to the new content
		// Tooltips
		$content.find( 'span.ajaxttlink' ).each( bindTT );
		// Tablesorter
		if ( $content.find( 'table.sortable' ).length ) {
			mw.loader.using( 'jquery.tablesorter', function() {
				$content.find( 'table.sortable' ).tablesorter();
			} );
		}
	} ).fail( function( error ) {
		mw.log( error );
	} );
} );

// Trigger the event on page load if the currently focused tab isn't loaded
if ( location.hash.match( /^#tab=.+/ ) ) {
	mw.loader.using( 'jquery.ui.tabs', function() {
		// Wait a bit for the tabification to happen
		setTimeout( function() {
			if ( $( '.ui-tabs > div:not(.ui-tabs-hide) .load-tab' ).length ) {
				$( window ).trigger( 'hashchange.tabs' );
			}
		}, 500 );
	} );
}


} );
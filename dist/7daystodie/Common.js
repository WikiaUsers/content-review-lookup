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
    $( '.fpcontent' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '#fptopsection, #fpflexsection, #fpbottomsection' ) );
    } );
    var excludeSel = '';
    if ( $( '.fpmaybercol' ).css( 'float' ) == 'right' ) {
      excludeSel = '.fpmaybercol'; // at this width, it's necessary to hit those boxes in a separate pass after .fpcontent
    }
    if ( $( '#fpflexsection' ).css( 'float' ) == 'right' ) {
      fp.equalizeColumnsOfBlock( '.fpcontent',
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


// Reload page with level specification
// Author: Gako

$(function () {
	function APIthing() {
		// If we ever use this gadget outside of the "main" namespace then we don't want to precede the name of the page with a ':'
		// So if current namespace number is 0 (i.e. main) then add a ':' before the pageName, otherwise don't
		var includePage = mw.config.get('wgNamespaceNumber') === 0 ? ':' + mw.config.get('wgPageName') : mw.config.get('wgPageName');
		var text = "{{#vardefine:mygamestage|" + inputValue + "}}{{" + includePage + "}}";
		var api = new mw.Api();
		api.get({
			action : "parse",
			title: mw.config.get('wgPageName'),
			text : text,
			prop : "text"
		}).then(function(data){
			var result = data.parse.text['*'];
			// define the container as a variable cos we'll use it twice
			var $container = $("#mw-content-text .mw-parser-output .mw-parser-output");
			$container.html(result);
			// this line of code makes the wiki reload the code that makes a table sortable after we replace the content of the page
			mw.hook('wikipage.content').fire($container);
		});
	}
	$("#level-entry-submit").click(function (event) {
		var checkValue = $("#level-entry-level").val();
		var inputVal;
		if (isNaN(checkValue) || checkValue>999999 || checkValue<0) {
			inputValue = 1;
		} else {
			inputValue = $("#level-entry-level").val();
		}
		event.preventDefault();
		// we'll always show the current game stage on the page as part of the header, so that people know it starts out as 1
		$('#level-entry-current').html(inputValue);
		APIthing();
	});
});
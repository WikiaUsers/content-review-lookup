/* Any JavaScript here will be loaded for users using the 2 column main page layout */
/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2015-Feb-12
// License: CC-BY 3.0
// Version: beta
(function($, mw) {
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
				var leftBottom, rightBottom;
				do {
					leftBottom = $( this ).find( leftBottomSel ).offset().top + $( this ).find( leftBottomSel ).height();
					rightBottom = $( this ).find( rightBottomSel ).offset().top + $( this ).find( rightBottomSel ).height();

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
			var boxes;
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

	// Back To Top Button
	function hideFade () {
		// hide #backtotop first
		$("#backtotop").hide ();
		// fade in #backtotop
		$(function() {
			$(window).scroll(function() {
				if ($(this).scrollTop() > ButtonStart) {
					$('#backtotop').fadeIn();
				} else {
					$('#backtotop').fadeOut();
				}
			});
		});
	}

	function addBackToTop() {
		if (mw.config.get('skin') === 'fandomdesktop') {
			$('<div id="backtotop"><div style="background: var(--theme-accent-color);color: var(--theme-accent-label-color);right: 55px;bottom: 40px;"><svg data-id="wds-icons-menu-control" height="24" width="24" viewBox="0 0 24 24" class="wds-icon" xmlns="http://www.w3.org/2000/svg"><svg id="wds-icons-menu-control" viewBox="0 0 24 24"><path d="M12 19a.997.997 0 0 1-.707-.293l-11-11a.999.999 0 1 1 1.414-1.414L12 16.586 22.293 6.293a.999.999 0 1 1 1.414 1.414l-11 11A.997.997 0 0 1 12 19"></path></svg></svg></div></div>').appendTo(document.body);
			document.getElementById("backtotop").addEventListener('click', function() {
				goToTop();
			});
			hideFade();
		}	
	}

	function goToTop(){
		// scroll body to 0px on click
		$('body,html').animate ({
			scrollTop: 0
		}, ScrollSpeed);
		return false;
	}

	var ButtonStart = 600;
	var ScrollSpeed = 600;

	if (!window.BackToTop ) {
		$(document).ready(function () {
			addBackToTop(); 
		});
	}
	window.BackToTop = true; // prevent duplication
})(window.jQuery, window.mediaWiki);
/* Game style tooltips
 * Code forked from https://minecraft.fandom.com/wiki/MediaWiki:Common.js
 * Add class "game-style-tooltip" to an element and set a title
 * It will work on any element with the class
 * Note that it will affect all custom tooltips but not regular tooltips (element without the class but with title)
*/
(function(){
	$('.game-style-tooltip').on( {
		'mouseenter.kitsuneTooltip': function( e ) {
			var elem = $( this ),
				kitsuneTitle = elem.attr( 'data-kitsune-tooltip' );
			if ( kitsuneTitle === undefined ) {
				kitsuneTitle = elem.attr( 'title' );
				if ( kitsuneTitle !== undefined ) {
					kitsuneTitle = $.trim( kitsuneTitle.replace( /&/g, '\\&' ) );
					elem.attr( 'data-kitsune-tooltip', kitsuneTitle );
				}
			}

			if ( !elem.data( 'kitsune-tooltip-ready' ) ) {
				// Remove title attributes so the native tooltip doesn't get in the way
				elem.find( '[title]' ).addBack().removeAttr( 'title' );
				elem.data( 'kitsune-tooltip-ready', true );
			}
			
			if ( kitsuneTitle === '' ) {
				return;
			}

			elem.tooltip({ title: kitsuneTitle });
		},
		'mousemove.kitsuneTooltip': function( e ) {
			var cursorX = event.clientX,
				cursorY = event.clientY,
				tooltipWidthOffset = $(".tooltip").width(),
				tooltipHeightOffset = $(".tooltip").height(),
				windowWidth = $(window).width(),
				windowHeight = $(window).height();
			
			//Move tooltip below cursor if going off the screen top
			if ( tooltipHeightOffset + cursorY > windowHeight ) {
				tooltipHeightOffset = 0;
			}
			
			//Prevent tooltip from going off the side of the screen
			if ( tooltipWidthOffset + cursorX > windowWidth ) {
				$(".tooltip").css("width", windowWidth - cursorX - 20 + "px");
			}
			//Standard size for larger tooltips
			else if ( tooltipWidthOffset > 880 ) {
				$(".tooltip").css("width", "880px");
			}
			
			//Position of tooltip
			var tooltipPosX = cursorX + 6 + "px";
			$(".tooltip").css({
				"position": "fixed",
				"left": tooltipPosX,
				"top": cursorY - tooltipHeightOffset + "px",
				"transform": "none"
			});
		}
	});
}() );
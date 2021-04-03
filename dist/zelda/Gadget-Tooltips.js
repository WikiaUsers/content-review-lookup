/** 
 * Original by Osvaldas Valutis: http://web.archive.org/web/20180306004159/https://osvaldas.info/elegant-css-and-jquery-tooltip-responsive-mobile-friendly
 * Modified and extended by KokoroSenshi for Zelda Wiki
 */

$(function() {
	
	var EDGE_BUFFER = 2; // pixels
	
	$(".explain, .tooltip").bind("mouseenter", function() {
		
		var $this = $(this)
		  , tipText = $this.attr("title");
		
		/** Do nothing if no tooltip text */
		if (!tipText || tipText === "") return false;
		
		/** Remove the title text since the tooltip will replace it */
		$this.removeAttr("title");
		
		/** Initialise and append the tooltip to page while hidden */
		var $tooltipText = $('<li style="padding: 10px 8px">' + tipText + '</li>')
		  , $tooltipCaret = $('<li style="margin: auto; margin-top: -2px;"></li>')
		  , $tooltip = $('<ul id="tooltip" class="referencetooltip"></ul>')
				.append($tooltipText)
				.append($tooltipCaret)
				.css("opacity", 0)
				.appendTo("body");
		
		/** Function to update the tooltip dimensions and properties then display it */
		var display_tooltip = function() {
			
			// Body properties (to which the tooltip is appended)
			var bodyMarginTop = parseFloat($("body").css("margin-top"));
			// Window properties
			var windowWidth = $(window).width();
			// Text element properties (the element that has the tooltip)
			var thisWidth  = $this.outerWidth()
			  , thisHeight = $this.outerHeight()
			  , thisTop  = $this.offset().top
			  , thisLeft = $this.offset().left
			  , thisScreenPos = $this[0].getBoundingClientRect();
			// Tooltip properties
			var tooltipHeight = $tooltip.outerHeight()
			  , tooltipWidth  = $tooltip.outerWidth()
			  , caretWidth = 14 //TODO: Magic number: The width of the referenceTooltips caret, from inspection
			  , caretMarginLeft = 0.5*(tooltipWidth - caretWidth); //TODO: Issue with half-pixels rounding;
			
			/** Apply max-width to tooltip then update tooltip dimensions */
			tooltipWidth = $tooltip
				.css("max-width", (windowWidth < 1.5*tooltipWidth) ? 0.5*windowWidth : 340 ) //TODO: 1.5 and 340 need justification and are magic numbers
				.outerWidth();
			tooltipHeight = $tooltip.outerHeight();
			
			/** Calculate default positions for tooltip (i.e. centered above the element) */
			var pos_left = thisLeft + 0.5*thisWidth - 0.5*tooltipWidth
			  , pos_top  = thisTop - tooltipHeight - bodyMarginTop
			  , screen_pos_left  = thisScreenPos.left + 0.5*thisWidth - 0.5*tooltipWidth
			  , screen_pos_right = screen_pos_left + tooltipWidth
			  , screen_pos_top   = thisScreenPos.top - tooltipHeight
			  , caret_margin_left = caretMarginLeft;
			
			/** Update horizontal position variables if it will stick off the screen */
			// TODO: Currently assumes the tooltip fits screen horizontally
			var horizontal_shift = 0;
			if (screen_pos_left < 0) {
				horizontal_shift = -screen_pos_left + EDGE_BUFFER;
				pos_left += horizontal_shift;
				caret_margin_left -= horizontal_shift;
			} else if (screen_pos_right > windowWidth) {
				horizontal_shift = screen_pos_right - windowWidth + EDGE_BUFFER;
				pos_left -= horizontal_shift;
				caret_margin_left += horizontal_shift;
			}
			
			/** Update vertical position variables if it will stick off the screen */
			if (screen_pos_top < 0) {
				//tooltip appears below element
				pos_top = thisTop + thisHeight - bodyMarginTop;
				$tooltip.addClass("RTflipped");
			}
			
			/** Reposition the tooltip */
			$tooltip.css( { 'left': pos_left, 'top': pos_top } );
			$tooltipCaret.css("margin-left", caret_margin_left); //TODO: Note that this will override the initial "margin: auto" 
			
			/** Display the tooltip */
			$tooltip.animate({ opacity: 1 }, 100);
			
		};
		/** Function to remove the tooltip */
		var remove_tooltip = function() {
			$tooltip.animate({ opacity: 0 }, 100, function() {
				$(this).remove();
			});
			$this.attr("title", tipText);
		};
		
		/** Display the tooltip for the first time */
		display_tooltip();
		
		/** Events on which to update the tooltip */
		$(window).resize(display_tooltip);
		
		/** Events on which to remove the tooltip*/
		$this.bind("mouseleave", remove_tooltip);
		$tooltip.bind("click", remove_tooltip);
		
	});
	
});
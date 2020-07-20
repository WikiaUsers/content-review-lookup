/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Auto-refresh variables */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif'; 
window.ajaxSpecialPages = [
    "RecentChanges", 
    "WikiActivity", 
    "Watchlist",
    "Log/Move",
    "Contributions"
];

// Global Footer Navigation
$(document).ready(function() {
	var newSection = '<div id="footer-nav">' + '</div>';
	$('#WikiaArticle').append(newSection);
	$.getJSON('/api.php?action=parse&text={{Navigation}}&format=json', function(data) {
		var code = data.parse.text['*'];
		$('div#footer-nav').append(code);
 
		// Allow tables to be clickable
		$('table.collapsible').each(function(i, tab) {
			var head = $(tab).find('tr th').first();
			if (!head.length) return;
			head.css('cursor', 'pointer');
			var toggle = function(e) {
				head.closest('tr').parent().children(':not(:first)').toggle();
			};
			head.click(toggle);
		});
	});
});
 
// Grid animation 
$(document).ready(function() {
	$('.animated-grids').each(function() {
		$(this).children().first().addClass('active');
	});
 
	setInterval(function() {
		$('.animated-grids').each(function() {
			var $current = $(this).children('.active');
 
			var $next = $current.nextAll(':not(.skip):first');
			if (!$next.length) {
				$next = $(this).children(':not(.skip):first');
			}
			$current.removeClass('active');
			$next.addClass('active');
		});
	}, 2000);
 
 
	$('.animated-text').each(function() {
		$(this).children().first().addClass('active');
	});
 
	setInterval(function() {
		$('.animated-text').each(function() {
			var $current = $(this).children('.active');
 
			var $next = $current.nextAll(':not(.skip):first');
			if (!$next.length) {
				$next = $(this).children(':not(.skip):first');
			}
			$current.removeClass('active');
			$next.addClass('active');
		});
	}, 5000);
});
 
/******************************************
 * Tooltip Generator                      *
 *****************************************/
$(function() {
	var selector = '.tooltip, .a1';
	$('#tooltip-display').remove();
	var mc_tooltip = function() {
		// Check to see if we've already created the div
		if (!$('#tooltip-display').length) {
			$('body').append($('<div id="tooltip-display">')
				.hide());
		}
		return $('#tooltip-display');
	};
	$("body").on('mouseenter', selector, function(e) {
			var $me = $(this);
			// Make sure this isn't a link to upload a new file
			if ($me.find('.new').length > 0) {
				// This isn't one we want to show a tooltip for
				return;
			}
 
			// Try to get the title
			var title = $me.data('tooltip');
 
			// See if we can find a title elsewhere
			// Check this element or its child
			if (title === undefined) {
				title = $me.attr('title') || $me.children(':first').attr('title') || $me.find('img:first').attr('alt');
 
				// Check if we found anything
				if (title) {
					// Save it for later
					$me.data('tooltip', title);
				} else {
					// Didn't find anything, no sense continuing
					return;
				}
			}
 
			// Remove any title elements to avoid the default tooltip
			$me.add('*', $me).filter('[title]').removeAttr('title');
 
			//Old methods of turning \ into <br/>
			/*title = title.replace('Grid',"").replace('.png',"").replace("\\","<br/><span style=\"color: #AAAAAA;text-shadow: #2A2A2A 2px 2px 0px;display: block;margin-top: 0.25em;\">").trim() + "</span>";
			title = title.replace("\\","<br/><span style=\"color: #AAAAAA;text-shadow: #2A2A2A 2px 2px 0px;display: block;margin-top: 0.25em;\">").trim() + "</span>";*/
			var stitle = title.split("\\");
			title = stitle[0];
			if (stitle.length > 1) {
				title += "<br/>";
				for (var i = 1; i < stitle.length; i++) {
					title += "<span style=\"color: #AAAAAA;text-shadow: #2A2A2A 2px 2px 0px;display: block;margin-top: 0.25em;\">" + stitle[i].trim() + "</span>";
				}
			}
 
			// Add the text to the tooltip
			mc_tooltip().html(title.replace(/_/g, " "));
 
			// Need to update the position to the cursor position
			$me.trigger('mousemove', e);
		})
		.on('mousemove', selector, function(e) {
			// Check if the element exists already, create it if it doesn't
			if (!$('#tooltip-display').length) {
				$(this).trigger('mouseenter');
				return;
			}
 
			// Get dimensions for bounds checking
			var top = e.pageY - 30,
				height = mc_tooltip().outerHeight(true),
				left = e.pageX + 15,
				width = mc_tooltip().outerWidth(true);
 
			// Get window dimensions
			var $w = $(window),
				win_width = $w.width(),
				win_height = $w.height();
 
 
			// If going off the right of the screen, go to the left of the cursor
			if (left + width > win_width) {
				left -= width + 36;
			}
 
			// If now going off to the left of the screen, resort to going above the cursor
			if (left < 0) {
				left = 0;
				top -= height - 22;
				// Go below the cursor if too high
				if (top < 0) {
					top += height + 47;
				}
 
				// Don't go off the top of the screen
			} else if (top < 0) {
				top = 0;
			}
			/*
						// Don't go off the bottom of the screen
						} else if ( top + height > win_height ) {
							top = win_height - height;
						}*/
 
			// Apply the position
			mc_tooltip().css({
				top: top,
				left: left
			}).show();
		})
		.on('mouseleave', selector, function(e) {
			mc_tooltip().hide();
		});
});

/******************************************
 * Infobox Collapser                      *
 *****************************************/
$( ".infoboxBlockImage img" ).each( function() {
    var width = parseInt( $( this ).attr( "width" ), 10);
    if ( width > 240 ) {
        $( this ).attr( "height", "" );
        $( this ).attr( "width", "240" );
    }
});
 
$( ".infobox:not(.infoboxNoCollapse) td" ).each( function() {
    if (( $( this ).html().match( /{{{[^}]+}}}/ ) || $( this ).html() === "\n") && !$( this ).parent( "tr" ).hasClass( "infoboxSubsectionBreak")) {
        $( this ).parent( "tr" ).hide();
    }
});

$( ".infobox:not(.infoboxNoCollapse) tr.infoboxSectionHeader" ).each( function() //.infobox:not(.infoboxNoCollapse) .infoboxSubsectionBreak, 
{
    var flag = true,
    next = $( this ).next();
    //console.log("\nNew Section\n");
    var line = false;
    var draw_line = null;
    while ( next && next !== undefined && next.html() !== undefined && !next.hasClass( "infoboxSectionHeader") ) // && !next.hasClass( "infoboxSubsectionBreak" ) &&
    {
		if (next.hasClass( "infoboxSubsectionBreak" )) {
			//console.log("Next Line Break:");
			//console.log(next);
			line = false;
			draw_line = next;
        }
        if ( next.css( "display" ) != "none" && !next.hasClass( "infoboxSubsectionBreak" ) ) {
            flag = false;
            line = true;
        }
        next = next.next();
    }
    if ( flag ) {
        $( this ).hide();
    }
    if ( !line && draw_line !== null ) {
        try{draw_line.style.display = "none";}catch(TypeError){} //I think it has issues with the first object
    }
});
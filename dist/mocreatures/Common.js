/**
 * Scripts placed here are loaded for all skins on the desktop view
 * 
 * Global scripts which should be loaded on both desktop and mobile should go in
 * [[MediaWiki:Gadget-site.js]]
 * Mobile-only scripts should go in [[MediaWiki:FandomMobile.js]]
 */

mw.hook('wikipage.content').add(function() {
	'use strict';
	/**
	 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
	 *
	 * This is so people have a chance to look at the image and click on pages they want to view.
	 */
	$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
		$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
	} );
	
	
	/**
	 * Creates minecraft style tooltips
	 *
	 * Replaces normal tooltips. Supports minecraft [[mcw:formatting codes]] (except k), and a description with line breaks (/).
	 */
	( function() {
		var escapeChars = { '\\&': '&#38;', '<': '&#60;', '>': '&#62;' };
		var escape = function( text ) {
			// "\" must be escaped first
			return text.replace( /\\\\/g, '&#92;' )
				.replace( /\\&|[<>]/g, function( char ) { return escapeChars[char]; } );
		};
		var $tooltip = $();
		var $win = $( window ), winWidth, winHeight, width, height;
		
		$( '#mw-content-text' ).on( {
			'mouseenter.minetip': function( e ) {
				$tooltip.remove();
				
				var $elem = $( this ), title = $elem.attr( 'data-minetip-title' );
				if ( title === undefined ) {
					title = $elem.attr( 'title' );
					if ( title !== undefined ) {
						title = $.trim( title.replace( /&/g, '\\&' ) );
						$elem.attr( 'data-minetip-title', title );
					}
				}
				
				// No title or title only contains formatting codes
				if ( title === undefined || title !== '' && title.replace( /&([0-9a-fl-or])/g, '' ) === '' ) {
					// Find deepest child title
					var childElem = $elem[0], childTitle;
					do {
						if ( childElem.hasAttribute( 'title' ) ) {
							childTitle = childElem.title;
						}
						childElem = childElem.firstChild;
					} while( childElem && childElem.nodeType === 1 );
					if ( childTitle === undefined ) {
						return;
					}
					
					// Append child title as title may contain formatting codes
					if ( !title ) {
						title = '';
					}
					title += $.trim( childTitle.replace( /&/g, '\\&' ) );
					
					// Set the retrieved title as data for future use
					$elem.attr( 'data-minetip-title', title );
				}
				
				if ( !$elem.data( 'minetip-ready' ) ) {
					// Remove title attributes so the native tooltip doesn't get in the way
					$elem.find( '[title]' ).addBack().removeAttr( 'title' );
					$elem.data( 'minetip-ready', true );
				}
				
				if ( title === '' ) {
					return;
				}
				
				var content = '<span class="minetip-title">' + escape( title ) + '&r</span>';
				
				var description = $.trim( $elem.attr( 'data-minetip-text' ) );
				if ( description ) {
					// Apply normal escaping plus "/"
					description = escape( description ).replace( /\\\//g, '&#47;' );
					content += '<span class="minetip-description">' + description.replace( /\//g, '<br>' ) + '&r</span>';
				}
				
				// Add classes for minecraft formatting codes
				while ( content.search( /&[0-9a-fl-o]/ ) > -1 ) {
					content = content.replace( /&([0-9a-fl-o])(.*?)(&r|$)/g, '<span class="format-$1">$2</span>&r' );
				}
				// Remove reset formatting
				content = content.replace( /&r/g, '' );
				
				$tooltip = $( '<div id="minetip-tooltip">' );
				$tooltip.html( content ).appendTo( 'body' );
				
				// Cache current window and tooltip size
				winWidth = $win.width();
				winHeight = $win.height();
				width = $tooltip.outerWidth( true );
				height = $tooltip.outerHeight( true );
				
				// Trigger a mouse movement to position the tooltip
				$elem.trigger( 'mousemove', e );
			},
			'mousemove.minetip': function( e, trigger ) {
				if ( !$tooltip.length ) {
					$( this ).trigger( 'mouseenter' );
					return;
				}
				
				// Get event data from remote trigger
				e = trigger || e;
				
				// Get mouse position and add default offsets
				var top = e.clientY - 34;
				var left = e.clientX + 14;
				
				// If going off the right of the screen, go to the left of the cursor
				if ( left + width > winWidth ) {
					left -= width + 36;
				}
				
				// If now going off to the left of the screen, resort to going above the cursor
				if ( left < 0 ) {
					left = 0;
					top -= height - 22;
					
					// Go below the cursor if too high
					if ( top < 0 ) {
						top += height + 47;
					}
				// Don't go off the top of the screen
				} else if ( top < 0 ) {
					top = 0;
				// Don't go off the bottom of the screen
				} else if ( top + height > winHeight ) {
					top = winHeight - height;
				}
				
				// Apply the positions
				$tooltip.css( { top: top, left: left } );
			},
			'mouseleave.minetip': function() {
				if ( !$tooltip.length ) {
					return;
				}
				
				$tooltip.remove();
				$tooltip = $();
			}
		}, '.minetip, .invslot-item' );
	}() );
});
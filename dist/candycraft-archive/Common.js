/* Any JavaScript here will be loaded for all users on every page load. */

InactiveUsers = 
{ 
    months: 1,
    gone: ['FlaeBae', 'Valentin4311', 'CandyPuffz', 'AnonymousSorcerer'],
    text: 'user on the new wiki (see main page for link) [inactive!]'
};

importScriptPage('InactiveUsers/code.js', 'dev');
/**
 * Creates minecraft style tooltips
 *
 * Replaces normal tooltips. Supports minecraft [[formatting codes]] (except k), and a description with line breaks (/).
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
			if ( title === undefined || title !== '' && title.replace( /&([0-9a-fl-pr])/g, '' ) === '' ) {
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
			while ( content.search( /&[0-9a-fl-p]/ ) > -1 ) {
				content = content.replace( /&([0-9a-fl-p])(.*?)(&r|$)/g, '<span class="format-$1">$2</span>&r' );
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

/**
 * Element animator
 *
 * Cycles through a set of elements (or "frames") on a 2 second timer per frame
 * Add the "animated" class to the frame containing the elements to animate.
 * Optionally, add the "animated-active" class to the frame to display first.
 * Optionally, add the "animated-subframe" class to a frame, and the
 * "animated-active" class to a subframe within, in order to designate a set of
 * subframes which will only be cycled every time the parent frame is displayed.
 *
 * Requires some styling from [[MediaWiki:Common.css]].
 */
( function() {
	var $content = $( '#mw-content-text' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	setInterval( function() {
		$content.find( '.animated' ).each( function() {
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );

/**
 * Pause MCUI templates (e.g. [[Template:Grid/Crafting]]) on mouseover
 *
 * This is so people have a chance to look at each image on the cell
 * and click on pages they want to view.
 */
$( '#mw-content-text' ).on( {
	'mouseenter': function() { 
		$( this ).find( '.animated' ).removeClass( 'animated' ).addClass( 'animated-paused' );
	},
	'mouseleave': function() {
		$( this ).find( '.animated-paused' ).removeClass( 'animated-paused' ).addClass( 'animated' );
	}
}, '.mcui' );

/**
 * Collapsible elements
 *
 * Add the "collapsible" class to an element and the child element with class "collapsible-content"
 * (or everything but the header row if a table) will be hidden when the element is collapsed.
 *
 * * Add the class "collapsed" to the element to make it start out collapsed.
 * * Add either "collapsetoggle-left" or "collapsetoggle-inline" to the element to choose the collapse
 *   toggle alignment (defaults to right).
 * * Add an ID in the format of "collapsible-<x>" to the element to make any element with the class
 *  "collapsetoggle-custom" and a matching class in the format of "collapsible-<x>-toggle" control
 *   the collapsing instead of the standard button.
 *   If the custom toggle contains an element with the "jslink" class, only that will be clickable.
 */
( function() {
	var $collapsibles = $wikipageContent.find( '.collapsible' );
	if ( !$collapsibles.length ) {
		return;
	}
	
	var $toggleTemplate = $( '<span>' ).addClass( 'collapsetoggle' ).append(
		'[', $( '<span>' ).addClass( 'jslink' ), ']'
	);
	$collapsibles.each( function() {
		var $collapsible = $( this );
		if ( $collapsible.data( 'made-collapsible' ) ) {
			return true;
		}
		
		var $children = $collapsible.children();
		var showText = $collapsible.data( 'expandtext' ) || i18n.showText;
		var hideText = $collapsible.data( 'collapsetext' ) || i18n.hideText;
		
		// If there is no content area, add it
		if ( !$collapsible.is( 'table' ) && !$children.filter( '.collapsible-content' ).length ) {
			if ( $collapsible.is( 'tr' ) ) {
				$children.addClass( 'collapsible-content' );
			} else {
				$collapsible.wrapInner( '<div class="collapsible-content">' );
			}
		}
		
		var $toggle;
		var id = $collapsible.attr( 'id' );
		if ( id && id.match( /^collapsible-./ ) ) {
			$toggle = $( $wikipageContent[0].getElementsByClassName( id + '-toggle' ) )
				.filter( '.collapsetoggle-custom' ).css( 'visibility', 'visible' );
		}
		
		// Create and insert the toggle button if there is no custom one
		if ( !$toggle || !$toggle.length ) {
			var $toggleContainer;
			if ( $collapsible.is( 'table' ) ) {
				var $rows = $children.filter( 'thead' ).children();
				if ( !$rows.length ) {
					$rows = $children.filter( 'tbody' ).first().children();
					if ( !$rows.length ) {
						$rows = $children.filter( 'tr' );
					}
				}
				$toggleContainer = $rows.first().children().last();
			} else {
				$toggleContainer = $children.first();
				if ( $toggleContainer.hasClass( 'collapsible-content' ) ) {
					$toggleContainer = $collapsible;
				}
			}
			
			$toggle = $toggleTemplate.clone();
			if ( $collapsible.hasClass( 'collapsetoggle-inline' ) || $collapsible.hasClass( 'collapse-button-none' ) ) {
				$toggleContainer.append( $toggle );
			} else {
				$toggleContainer.prepend( $toggle );
			}
		}
		
		var $toggleLink = $toggle.find( '.jslink' );
		if ( !$toggleLink.length ) {
			$toggleLink = $toggle;
		}
		$toggleLink.attr( 'tabindex', 0 ).text( hideText );
		
		// Find max toggle size, and set its min-width to it
		var hideWidth = $toggle.width();
		$toggleLink.text( showText );
		var showWidth = $toggle.width();
		if ( hideWidth !== showWidth ) {
			$toggle.css( 'min-width', hideWidth > showWidth ? hideWidth : showWidth );
		}
		
		// Set the text back to hide if it's not collapsed to begin with
		if ( !$collapsible.hasClass( 'collapsed' ) ) {
			$toggleLink.text( hideText );
		}
		
		$toggleLink.on( 'click keydown', function( e ) {
			// Only trigger on enter press
			if ( e.keyCode && e.keyCode !== 13 ) {
				return;
			}
			
			// Don't toggle when clicking buttons or links inside the toggle
			var $target = $( e.target );
			if ( $target.is( 'button' ) || $target.is( 'a' ) ) {
				return;
			}
			
			$collapsible.toggleClass( 'collapsed' );
			if ( $collapsible.hasClass( 'collapsed' ) ) {
				$toggleLink.text( showText );
			} else {
				$toggleLink.text( hideText );
			}
			
			// Stop table sorting activating when clicking the link
			e.stopPropagation();
		} );
		
		$collapsible.data( 'made-collapsible', true );
	} );
}() );
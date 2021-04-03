/* Any JavaScript here will be loaded for all users on every page load. */
/* copied from the Minecraft wiki */

( function() {
'use strict';

/**
 * Instead of cluttering up the global scope with
 * variables, they should instead be set as a
 * property of this global variable
 *
 * E.g: Instead of
 *   myVar = 'blah';
 * use
 *   wiki.myVar = 'blah';
 */
var wiki = window.wiki = {};


/* Variables for interface text used throughout the script, for ease of translating */
wiki.i18n = {
	// Collapsible tables and page loader
	hideText: 'hide',
	showText: 'show',
	
	// Page loader
	loadErrorTitle: 'An error occurred loading the content',
	
	// File upload
	defaultLicense: 'License'
};

/* Keep track of delegated events on dynamic content */
wiki.events = {};

/* Add extra buttons to the classic toolbar */
if ( mw.user.options.get( 'showtoolbar' ) && !mw.user.options.get( 'usebetatoolbar' ) ) {
	importScript( 'MediaWiki:Toolbar.js' );
}


/* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
mw.hook( 'wikipage.content' ).add( function( $content ) {


/**
 * Collapsible tables
 *
 * Based on http://www.mediawiki.org/wiki/Manual:Collapsible_tables#Common.js_script_.28before_1.18.29
 */
( function() {
	var $tables = $content.find( 'table.collapsible' );
	
	if ( !$tables || !$tables.length ) {
		return false;
	}
	
	var buttonText = ' <span class="collapsible-button">[<span class="jslink">' + wiki.i18n.hideText + '</span>]</span> ';
	
	$tables.each( function() {
		var $table = $( this ), $header, $collapseButton, firstWidth, secondWidth;
		
		// This table is already collapsible
		if ( $table.data( 'collapsible' ) ) {
			return true;
		}
		
		// Use the collapse-button if specified otherwise the first header cell of the first row
		$header = $table.find( 'tr:first .collapse-button' );
		if ( !$header.length ) {
			$header = $table.find( 'tr:first > th:first' );
		}
		
		// No header or the table body is empty
		if ( !$header.length || !$table.find( 'tr:not(tr:first)' ).html().trim().length ) {
			return true;
		}
		
		// For the button to float properly, it has to be /before/ the cell text
		if ( $table.hasClass( 'collapse-button-none' ) ) {
			$header.append( buttonText );
		} else {
			$header.prepend( buttonText );
		}
		
		// Find max button size, and set its min-width to it
		$collapseButton = $table.find( '.collapsible-button' );
		firstWidth = $collapseButton.width();
		$collapseButton.find( '> .jslink' ).text( wiki.i18n.showText );
		secondWidth = $collapseButton.width();
		
		if ( firstWidth != secondWidth ) {
			if ( firstWidth < secondWidth ) {
				$collapseButton.css( 'min-width', secondWidth );
			} else {
				$collapseButton.css( 'min-width', firstWidth );
			}
		}
	
		// Set the text back to hide if it's not collapsed to begin with
		if ( !$table.hasClass( 'collapsed' ) ) {
			$collapseButton.find( '> .jslink' ).text( wiki.i18n.hideText );
		}
		
		$table.data( 'collapsible', true );
	} );
	
	// This is bound directly because sortable tables don't play nice
	$tables.find( '.collapsible-button .jslink' ).click( function( e ) {
		var $table = $( this ).closest( 'table.collapsible' );
		
		// Stop table sorting activating when clicking the link
		e.stopPropagation();
		
		if ( $table.hasClass( 'collapsed' ) ) {
			$table.removeClass( 'collapsed' ).addClass( 'expanded' );
			$( this ).text( wiki.i18n.hideText );
		} else {
			$table.removeClass( 'expanded' ).addClass( 'collapsed' );
			$( this ).text( wiki.i18n.showText );
		}
	} );
}() );


/**
 * Element animator
 *
 * Will cycle the active class on any child elements
 * within an element with the animated class.
 */
( function() {
	if ( !wiki.animate ) {
		wiki.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var $elem = $( this );
				var $current = $elem.children( '.active' );
				var $next = $current.nextAll( ':not(.skip):first' );
				// Loop back to the start
				if ( !$next.length ) {
					$next = $elem.children( ':not(.skip):first' );
				}
				$current.removeClass( 'active' );
				$next.addClass( 'active' );
			} );
		}, 2000 );
	}
}() );


/**
 * Page loader
 *
 * Allows a page to be downloaded and displayed on demand.
 * Use with [[Template:LoadPage]] and [[Template:LoadBox]]
 */
( function() {
	var $loadPage = $content.find( '.load-page' );
	if ( !$loadPage.length ) {
		return;
	}
	
	// We need the spinner to show loading is happening, but we don't want
	// to have a delay while the module downloads, so we'll load this now,
	// regardless of if something is clicked
	mw.loader.load( 'jquery.spinner' );
	
	var $buttonText = $( '<span>' ).addClass( 'mw-editsection-like load-page-button' )
		.append( '[', $( '<span>' ).addClass( 'jslink' ).text( wiki.i18n.hideText ), ']' );
	
	$loadPage.find( '.mw-headline:first' ).each( function() {
		var $body = $( this ).closest( '.load-page' ),
			$button = $buttonText.clone(),
			firstWidth, secondWidth;
		
		// Add the button
		$button.insertAfter( this );
		
		// Move the edit button to the right spot
		$body.find( '.mw-editsection' ).insertAfter( $button );
		
		// Find max button width, and set its min-width to it
		firstWidth = $button.width();
		$button.children( '.jslink' ).text( wiki.i18n.showText );
		secondWidth = $button.width();
		
		if ( firstWidth !== secondWidth ) {
			if ( firstWidth > secondWidth ) {
				$button.css( 'min-width', firstWidth );
			} else {
				$button.css( 'min-width', secondWidth );
			}
		}
	} );
	
	if ( wiki.events.loadPage ) {
		return;
	}
	$( '#mw-content-text' ).on( 'click', '.load-page-button > .jslink', function() {
		var $button = $( this ).parent(),
			$body = $button.closest( '.load-page' ),
			$contentContainer = $body.find( '.load-page-content' );
		
		if ( !$body.data( 'loaded' ) ) {
			var oldButton = $button.html();
			// Just in-case the spinner module is still not ready yet
			mw.loader.using( 'jquery.spinner', function() {
				$button.html( $.createSpinner() );
			} );
			
			new mw.Api().get( {
				action: 'parse',
				prop: 'text',
				title: mw.config.get( 'wgPageName' ),
				text: '{' + '{:' + $body.data( 'page' ) + '}}'
			} ).done( function( data ) {
				$contentContainer.html( data.parse.text['*'] ).removeClass( 'noscript' );
				
				// Fire content hook on the new content, running all this stuff again and more :)
				mw.hook( 'wikipage.content' ).fire( $contentContainer );
				
				$button.html( oldButton ).children( '.jslink' ).text( wiki.i18n.hideText );
				$body.data( 'loaded', true );
			} ).fail( function( _, error ) {
				$button.html( oldButton );
				
				var errorText = '';
				if ( error.textStatus ) {
					errorText = error.textStatus;
				} else if ( error.error ) {
					errorText = error.error.info;
				}
				
				mw.notify( errorText, { title: wiki.i18n.loadErrorTitle, autoHide: false } );
			} );
		} else if ( $( this ).text() === wiki.i18n.showText ) {
			$contentContainer.show();
			$( this ).text( wiki.i18n.hideText );
		} else {
			$contentContainer.hide();
			$( this ).text( wiki.i18n.showText );
		}
	} );
	wiki.events.loadPage = true;
}() );

} );
/* End wiki content hook */


/* Fires when DOM is ready */
$( function() {


/** 
 * Fix edit summary prompt for undo
 *
 * Fixes the fact that the undo function combined with the "no edit summary prompter"
 * causes problems if leaving the edit summary unchanged.
 * Added by [[wikipedia:User:Deskana]], code by [[wikipedia:User:Tra]].
 * See https://bugzilla.wikimedia.org/show_bug.cgi?id=8912
 */
if ( document.location.search.indexOf( "undo=" ) !== -1 && document.getElementsByName( 'wpAutoSummary' )[0] ) {
	document.getElementsByName( 'wpAutoSummary' )[0].value='1';
}


/**
 * Pause grid GUI templates (e.g. [[Template:Grid/Crafting Table]]) on mouseover
 *
 * This is so people have a chance to look at each image on the cell
 * and click on pages they want to view.
 */
$( '#mw-content-text' ).on( {
	'mouseenter': function() { 
		$( this ).find( '.animated' ).removeClass( 'animated' ).addClass( 'paused' );
	},
	'mouseleave': function() {
		$( this ).find( '.paused' ).removeClass( 'paused' ).addClass( 'animated' );
	}
}, '.grid-generic, .grid-Crafting_Table, .grid-Furnace, .grid-Brewing_Stand' );


/**
 * Make simple search suggestions box separately styled
 */
mw.loader.using( 'mediawiki.searchSuggest', function() {
	$( '.suggestions:first' ).addClass( 'searchbar' );
} );


/**
 * Set unlicensed as the default license on file pages
 *
 * That way the file will be categorised so someone can find a license for the file
 */
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
	if ( $( '#wpLicense' ).val() === '' ) {
		$( '#wpLicense' ).val( wiki.i18n.defaultLicense );
	}
	
	mw.loader.using( 'mediawiki.legacy.upload', function() {
		var change = setInterval( function() {
			if ( licenseSelectorCheck ) {
				$( '#wpLicense' ).change();
				clearInterval( change );
			}
		}, 500 );
	} );
}


/**
 * Creates minecraft style tooltips
 *
 * Replaces normal tooltips. Supports minecraft [[formatting codes]] (except k), and a description with line breaks (/).
 * Use wiki.useNativeMinetip = true to use normal tooltips, with the description added
 */
wiki.minetip = {
	// Add normal minetip events, removing legacy tooltip
	create: function() {
		var tooltip;
		
		$( '#mw-content-text' ).on( {
			'mouseenter.minetip': function( e ) {
				var $elem = $( this ),
					title = $elem.data( 'minetip-title' ),
					description = $elem.data( 'minetip-text' );
				
				// No title or title only contains formatting codes
				if ( title === undefined || title && title.replace( /&([0-9a-fl-o])|\s+/g, '' ) === '' ) {
					// Use title attribute of the element or the first link directly under it
					var attrTitle = $elem.attr( 'title' ) || $elem.find( '> a:first' ).attr( 'title' );
					if ( title === undefined ) {
						title = attrTitle;
					} else {
						title += attrTitle;
					}
					
					if ( title ) {
						// Set the retrieved title as data for future use
						$elem.data( 'minetip-title', title );
					} else {
						return;
					}
				}
				
				$elem.add( '*', $elem ).filter( '[title]' ).removeAttr( 'title' );
				
				if ( title === 0 ) {
					return;
				}
				
				var text = '<span class="title">' + title + '&f</span>';
				if ( description ) {
					text += '\n<span class="description">' +
						description.replace( /\\\//g, '&#47;' ).replace( /\//g, '<br>' ) +
						'&f</span>';
				}
				
				if ( !$( '#minetip-tooltip' ).length ) {
					$( 'body' ).append( '<div id="minetip-tooltip"/>' );
				}
				tooltip = $( '#minetip-tooltip' );
				
				// Add classes for minecraft formatting codes
				while ( text.match( /&[0-9a-el-o]/ ) ) {
					text = text.replace( /&([0-9a-el-o])(.*?)(&f|$)/g, '<span class="format-$1">$2</span>&f' );
				}
				// Remove reset formatting
				text = text.replace( /&f/g, '' );
				
				tooltip.html( text );
				
				// Trigger a mouse movement to position the tooltip
				$elem.trigger( 'mousemove', e );
			},
			'mousemove.minetip': function( e, trigger ) {
				if ( !$( '#minetip-tooltip' ).length ) {
					$( this ).trigger( 'mouseenter' );
					return;
				}
				
				// Get event data from remote trigger
				e = trigger || e;
				
				var top = e.clientY - 34,
					left = e.clientX + 14,
					width = tooltip.outerWidth( true ),
					height = tooltip.outerHeight( true ),
					
					$win = $( window ),
					winWidth = $win.width(),
					winHeight = $win.height();
				
				// If going off the right of the screen, go to the left of the cursor
				if ( left + width > winWidth ) {
					left -= width + 36;
				}
				
				// If now going off to the left of the screen, resort to going below the cursor
				if ( left < 0 ) {
					left = 0;
					top += 82;
					
					// Go above the cursor if too low
					if ( top + height > winHeight ) {
						top -= 77 + height;
					}
				// Don't go off the top of the screen
				} else if ( top < 0 ) {
					top = 0;
				// Don't go off the bottom of the screen
				} else if ( top + height > winHeight ) {
					top = winHeight - height;
				}
				
				// Apply the positions
				tooltip.css( {
					top: top,
					left: left
				} );
			},
			'mouseleave.minetip': function() {
				if ( !tooltip ) {
					return;
				}
				
				tooltip.remove();
			}
		}, '.minetip, .grid .image, .grid .item, .grid2 .item' ).off( '.minetipNative' );
	},
	// Remove all events
	destroy: function() {
		$( '#mw-content-text' ).off( '.minetip .minetipNative' );
		$( '#minetip-tooltip' ).remove();
	},
	// Add native browser tooltip events, removing normal minetip
	native: function() {
		$( '#mw-content-text' ).on( 'mouseenter.minetipNative', '.minetip, .grid .image, .grid .item, .grid2 .item', function() {
			var title = $( this ).data( 'minetip-title' ),
				description = $( this ).data( 'minetip-text' ),
				existingTitle = $( this ).attr( 'title' ) || $( this ).find( '> a:first' ).attr( 'title' );
			
			if ( title || title === 0 || $( this ).attr( 'title' ) ) {
				// Remove titles within so they don't interfere
				$( this ).find( '[title]' ).removeAttr( 'title' );
			}
			
			if ( title === 0 ) {
				$( this ).removeAttr( 'title' );
				return;
			} else if ( !title && ( !existingTitle || !description ) ) {
				return;
			} else if ( !title && existingTitle ) {
				$( this ).data( 'minetip-title', existingTitle );
			}
			
			var text = title || existingTitle;
			if ( description ) {
				text += '\n' + description;
			}
			
			// Remove formatting
			text = text.replace( /&([0-9a-fl-o])/g, '' )
				.replace( /\\\//g, '&#47;' )
				.replace( /\//g, '\n' )
				.replace( /&#47;/g, '/' );
			
			$( this ).attr( 'title', text );
		} ).off( '.minetip' );
	}
};

if ( wiki.useNativeMinetip ) {
	wiki.minetip.native();
} else {
	wiki.minetip.create();
}


} );
/* End DOM ready */


}() );
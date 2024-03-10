( function() {
'use strict';

/* Variables for interface text used throughout the script, for ease of translating */
var i18n = {
	// Collapsible elements and page loader
	hideText: 'Einklappen',
	showText: 'Ausklappen',
	
	// Page loader
	loadErrorTitle: 'Beim Laden des Inhalts ist ein unerwarteter Fehler aufgetreten',
	
	// File upload
	defaultLicense: 'Lizenz|Unklar'
};

/**
 * Instead of cluttering up the global scope with
 * variables, they should instead be set as a
 * property of this global variable
 *
 * E.g: Instead of
 *   myVar = 'blah';
 * use
 *   mcw.myVar = 'blah';
 */
var mcw = window.mcw = {};

/* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
mw.hook( 'wikipage.content' ).add( function( $wikipageContent ) {


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


/**
 * Element animator
 *
 * Will cycle the active class on any child elements
 * within an element with the animated class.
 */
( function() {
	if ( !mcw.animate ) {
		mcw.animate = setInterval( function() {
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
	var $loadPage = $wikipageContent.find( '.load-page' );
	if ( !$loadPage.length ) {
		return;
	}
	
	// We need the spinner to show loading is happening, but we don't want
	// to have a delay while the module downloads, so we'll load this now,
	// regardless of if something is clicked
	mw.loader.load( 'jquery.spinner' );
	
	// Create button starting with hide text
	// Will be changed to the show text while calculating the maximum button size
	var $buttonTemplate = $( '<span>' ).addClass( 'mw-editsection-like load-page-button' )
		.append( '[', $( '<span>' ).addClass( 'jslink' ).text( i18n.hideText ), ']' );
	
	var extractList = function( $contentContainer, listClass ) {
		var $content = $contentContainer.find( '> ul > li > ul' ).children( ':not(.nbttree-inherited)' );
		if ( listClass ) {
			$content.addClass( listClass );
		}
		
		return $content;
	};
	
	$loadPage.each( function() {
		var $body = $( this );
		var page = $body.data( 'page' );
		if ( !page ) {
			return;
		}
		
		var template = $body.data( 'template' );
		var treeview = $body.data( 'treeview' );
		var treeviewClass = $body.data( 'treeviewclass' );
		var $heading;
		var $contentContainer;
		var $content;
		var $button = $buttonTemplate.clone();
		var $buttonLink = $button.find( '.jslink' );
		if ( treeview ) {
			$heading = $body;
			$contentContainer = $( '<div>' );
		} else {
			$heading = $body.children().first();
			$contentContainer = $body.find( '.load-page-content' );
		}
		
		// Add the button
		$heading.append( $button );
		
		// Move the edit button to the right spot
		$contentContainer.find( '.mw-editsection, .mw-editsection-like' ).insertAfter( $button );
		
		// Find max button width, and set its min-width to it
		var hideWidth = $button.width();
		$buttonLink.text( i18n.showText );
		var showWidth = $button.width();
		
		if ( hideWidth !== showWidth ) {
			$button.css( 'min-width', hideWidth > showWidth ? hideWidth : showWidth );
		}
		
		$buttonLink.click( function() {
			if ( $body.hasClass( 'pageloader-contentloaded' ) ) {
				if ( $buttonLink.text() === i18n.showText ) {
					if ( treeview ) {
						$content.insertAfter( $body );
					} else {
						$contentContainer.show();
					}
					$buttonLink.text( i18n.hideText );
				} else {
					if ( treeview ) {
						$content.detach();
					} else {
						$contentContainer.hide();
					}
					$buttonLink.text( i18n.showText );
				}
				return;
			}
			
			// See if this was loaded elsewhere before making a request
			var gotContent;
			$( '.pageloader-contentloaded' ).each( function() {
				var $fLoader = $( this );
				if ( $fLoader.data( 'page' ) === page && $fLoader.data( 'pageloader-content' ) ) {
					$contentContainer.html( $fLoader.data( 'pageloader-content' ) ).removeClass( 'noscript' );
					mw.hook( 'wikipage.content' ).fire( $contentContainer );
					
					if ( treeview ) {
						$body.find( '.noscript' ).remove();
						$content = extractList( $contentContainer, treeviewClass );
						$content.insertAfter( $body );
					}
					
					$buttonLink.text( i18n.hideText );
					$body.addClass( 'pageloader-contentloaded' );
					gotContent = true;
					return false;
				}
			} );
			if ( gotContent ) {
				return;
			}
			
			// Just in-case the spinner module is still not ready yet
			var $spinner = $();
			mw.loader.using( 'jquery.spinner', function() {
				// $spinner will be false if the content somehow loaded before the module did
				if ( $spinner ) {
					$spinner = $.createSpinner().addClass( 'mw-editsection-like' )
						.css( 'min-width', $button.css( 'min-width' ) );
					$button.hide().after( $spinner );
				}
			} );
			
			var requestData = {
				action: 'parse',
				prop: 'text|modules|jsconfigvars'
			};
			if ( template ) {
				requestData.page = page;
			} else {
				requestData.title = mw.config.get( 'wgPageName' );
				requestData.text = '{' + '{:' + page + '}}';
			}
			new mw.Api().get( requestData ).done( function( data ) {
				// Add config and modules
				if ( data.parse.jsconfigvars ) {
					mw.config.set( data.parse.jsconfigvars );
				}
				if ( data.parse.modules ) {
					mw.loader.load( data.parse.modules.concat(
						data.parse.modulescripts,
						data.parse.modulestyles
					) );
				}
				
				var html = data.parse.text['*'];
				$contentContainer.html( html ).removeClass( 'noscript' );
				
				// Resolve self-links
				if ( template ) {
					var curPage = '/' + mw.config.get( 'wgPageName' );
					$contentContainer.find( 'a' ).each( function() {
						var $link = $( this );
						if ( $link.attr( 'href' ) === curPage ) {
							$link.replaceWith( $( '<strong>' ).addClass( 'selflink' ).append( $link.contents() ) );
						}
					} );
					html = $contentContainer.html();
				}
				
				$body.data( 'pageloader-content', html );
				
				// Fire content hook on the new content, running all this stuff again and more :)
				mw.hook( 'wikipage.content' ).fire( $contentContainer );
				
				if ( treeview ) {
					$body.find( '.noscript' ).remove();
					$content = extractList( $contentContainer, treeviewClass );
					$content.insertAfter( $body );
				}
				
				$spinner.remove();
				$spinner = false;
				$buttonLink.text( i18n.hideText );
				$button.show();
				$body.addClass( 'pageloader-contentloaded' );
			} ).fail( function( _, error ) {
				$spinner.remove();
				$spinner = false;
				$button.show();
				
				var errorText = '';
				if ( error.textStatus ) {
					errorText = error.textStatus;
				} else if ( error.error ) {
					errorText = error.error.info;
				}
				
				mw.notify( errorText, { title: i18n.loadErrorTitle, autoHide: false } );
			} );
		} );
	} );
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
 * Pause grid GUI templates (e.g. [[Template:Grid/Werkbank]]) on mouseover
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
}, '.grid-Crafting_Table, .grid-Furnace, .grid-Brewing_Stand, .grid-Cell' );


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
		$( '#wpLicense' ).val( mcw.i18n.defaultLicense );
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
 * Use mcw.useNativeMinetip = true to use normal tooltips, with the description added
 */
mcw.minetip = {
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
					$( 'body' ).append( '<div id="minetip-tooltip">' );
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
		}, '.minetip, .grid .item' ).off( '.minetipNative' );
	},
	// Remove all events
	destroy: function() {
		$( '#mw-content-text' ).off( '.minetip .minetipNative' );
		$( '#minetip-tooltip' ).remove();
	},
	// Add native browser tooltip events, removing normal minetip
	native: function() {
		$( '#mw-content-text' ).on( 'mouseenter.minetipNative', '.minetip, .grid .item', function() {
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

if ( mcw.useNativeMinetip ) {
	mcw.minetip.native();
} else {
	mcw.minetip.create();
}


} );
/* End DOM ready */

/**
 * Deselect "Create redirect" checkbox on "Special:Move" automatically if moving a file or a talk page
 */
if ( mw.config.get( 'wgPageName' ).indexOf( 'Spezial:Verschieben/' ) != -1
  && document.querySelector( '.oo-ui-inputWidget-input' )
  && ( document.querySelector ('.oo-ui-inputWidget-input' ).value % 2 == 1 || document.querySelector( '.oo-ui-inputWidget-input' ).value == 6 )
  && document.querySelector( 'input[name="wpLeaveRedirect"]' ) )
{
    document.querySelector( 'input[name="wpLeaveRedirect"]' ).removeAttribute( 'checked' );
}


}() );

// Avoid redirecting for links in categories
$( '.ns-14 .redirect-in-category .mw-redirect' ).each(function( i, e ){
    var link = $( e ).attr( 'href' );
    $( e ).attr( 'href', link + ( link.includes('?') ? '&' : '?' ) + 'redirect=no' );
});
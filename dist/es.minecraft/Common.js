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
 *   mcw.myVar = 'blah';
 */
var mcw = window.mcw = {};


/* Variables for interface text used throughout the script, for ease of translating */
mcw.i18n = {
	// Collapsible tables and page loader
	hideText: 'ocultar',
	showText: 'mostrar',
	
	// Page loader
	loadErrorTitle: 'Ha ocurrido un error al cargar el contenido',
	
	// File upload
	defaultLicense: 'Licencia'
};

/* Keep track of delegated events on dynamic content */
mcw.events = {};

/* Add extra buttons to the classic toolbar */
if ( mw.user.options.get( 'showtoolbar' ) && !mw.user.options.get( 'usebetatoolbar' ) ) {
	importScript( 'MediaWiki:Toolbar.js' );
}


/* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
mw.hook( 'wikipage.content' ).add( function( $content ) {


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
	var $collapsibles = $content.find( '.collapsible' );
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
		var showText = $collapsible.data( 'expandtext' ) || mcw.i18n.showText;
		var hideText = $collapsible.data( 'collapsetext' ) || mcw.i18n.hideText;
		
		// If there is no content area, add it
		if ( !$collapsible.is( 'table' ) && !$children.filter( '.collapsible-content' ).length ) {
			if ( $collapsible.is( 'tr' ) ) {
				$children.addClass( 'collapsible-content' );
			} else {
				$collapsible.wrapInner( '<div class="collapsible-content">' );
				$children = $collapsible.children();
			}
		}
		
		var $toggle;
		var id = $collapsible.attr( 'id' );
		if ( id && id.match( /^collapsible-./ ) ) {
			$toggle = $( $content[0].getElementsByClassName( id + '-toggle' ) )
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
			if (
				$toggleContainer !== $collapsible && (
				$collapsible.hasClass( 'collapsetoggle-inline' ) ||
				$collapsible.hasClass( 'collapse-button-none' )
			) ) {
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
	
	// Create button starting with hide text
	// Will be changed to the show text while calculating the maximum button size
	var $buttonTemplate = $( '<span>' ).addClass( 'mw-editsection-like load-page-button' )
		.append( '[', $( '<span>' ).addClass( 'jslink' ).text( mcw.i18n.hideText ), ']' );
	
	var extractList = function( $contentContainer, listClass ) {
		var $content = $contentContainer.find( '.mw-parser-output > ul > li > ul' ).children( ':not(.nbttree-inherited)' );
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
		$buttonLink.text( mcw.i18n.showText );
		var showWidth = $button.width();
		
		if ( hideWidth !== showWidth ) {
			$button.css( 'min-width', hideWidth > showWidth ? hideWidth : showWidth );
		}
		
		$buttonLink.click( function() {
			if ( $body.hasClass( 'pageloader-contentloaded' ) ) {
				if ( $buttonLink.text() === mcw.i18n.showText ) {
					if ( treeview ) {
						$content.insertAfter( $body );
					} else {
						$contentContainer.show();
					}
					$buttonLink.text( mcw.i18n.hideText );
				} else {
					if ( treeview ) {
						$content.detach();
					} else {
						$contentContainer.hide();
					}
					$buttonLink.text( mcw.i18n.showText );
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
					
					$buttonLink.text( mcw.i18n.hideText );
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
				$buttonLink.text( mcw.i18n.hideText );
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
				
				mw.notify( errorText, { title: mcw.i18n.loadErrorTitle, autoHide: false } );
			} );
		} );
	} );
}() );


/**
 * Set minimum height for animations to prevent moving the page if the frames
 * differ in height
 */
( function() {
	// Set frames to be visible for measuring height
	var $animated = $content.find( '.animated' ).addClass( 'animated-visible' );
	
	// Group frames per animation
	var animateds = [];
	$animated.each( function() {
		animateds.push( {
			$: $( this ).find( '> .animated-subframe' ).addBack()
				.find( '> *:not(.animated-subframe)' ),
		} );
	} );
	
	// Get highest frame for each animation (if heights differ)
	$.each( animateds, function() {
		var minHeight = 0, differentHeights;
		this.$.each( function() {
			var height = this.offsetHeight;
			differentHeights = differentHeights || minHeight && height !== minHeight;
			minHeight = Math.max( height, minHeight );
		} );
		
		if ( differentHeights ) {
			this.height = minHeight;
		}
	} );
	
	// Set animation to be at least as tall as the tallest frame,
	// and set the non-active frames to be hidden again
	$animated.each( function( i ) {
		$( this ).css( 'min-height', animateds[i].height );
	} ).removeClass( 'animated-visible' );
}() );


/**
 * Collapsible details for [[Template:History2]]
 *
 * Allows version history to be split up into snapshots
 */
/*if ( $( '.history2' ).find( 'pre' ).length ) {
	var histExpandText = 'View snapshot history', histCollapseText = 'Hide snapshot history';

	$( '.history2 th:first' ).append( '<span class="toggleHistDetails">[<span class="jslink">' + histExpandText + '</span>]</span>' );

	var histLink = $( '.toggleHistDetails .jslink' );
	histLink.click( function() {
		if ( $( '.history2 .details' ).length ) {
			$( '.history2 .overview' ).toggle();
			$( '.history2 .details' ).toggle();
		} else {
			$( '.history2 tr' ).each( function() {
				if ( !$( this ).find( 'pre' ).length || !$( this ).find( 'th' ).length ) {
					return true;
				}
				
				var header = $( this ), row = header, text = header.find( '> td' ).html() + '</td></tr>',
					rowspan = header.find( '> th' ).prop( 'rowspan' );
				
				row.addClass( 'overview' );
				if ( rowspan > 1 ) {
					for ( var i = 1; i < rowspan; i++ ) {
						row = row.next();
						if ( !row.length ) {
							break;
						}
						row.addClass( 'overview' );
						
						text += '\n<tr><td>' + row.find( '> td' ).html() + '</td></tr>';
					}
				}
				
				var versions = text.split( '<pre>' ), data = [];
				rowspan = 0;
				$.each( versions, function() {
					var parts = this.split( '</' + 'pre>' ), version = parts[0].replace( /\n/g, '' ), text = parts[1];
					
					if ( !version || !text ) {
						return true;
					}
					
					text = text.replace( /<tr>/g, '<tr class="details">' );
					
					if ( text.slice( text.lastIndexOf( '</tr>' ) ).indexOf( '<td>' ) > -1 ) {
						text = text.slice( 0, text.lastIndexOf( '</tr>' ) );
					}
					
					if ( text.slice( text.lastIndexOf( '<td>' ) ).indexOf( '</td>' ) < 0 ) {
						text += '</td></tr>';
					}
					
					if ( version.match( /\d\dw\d\d\w/ ) ) {
						version = '<a title="Version history/Development versions" href="/' + 'Version_history/Development_versions#' + version + '">' + version + '</a>';
					} else {
						version = '<a title="Version history" href="/' + 'Version_history#' + version + '">' + version + '</a>';
					}
					
					var rows;
					if ( text.match( /<td>/g ) ) {
						rows = text.match( /<td>/g ).length + 1;
					} else {
						rows = 1;
					}
					rowspan += rows;
					data.push( '<th rowspan="' + rows + '">' + version + '</th><td>' + text );
				} );
				
				var html = '<tr class="details"><th rowspan="' + rowspan + '">' + header.find( '> th' ).html() + '</th>' + data.join( '<tr class="details">' );
				$( '<table>' + html + '</table>' ).find( 'td > ol' ).each( function() {
					var text = $( this ).html();
					html = html.split( '<ol>' + text + '</ol>' ).join( '<ul>' + text + '</ul>' );
				} );
				
				row.after( html );
			} );
			
			$( '.history2 .overview' ).hide();
		}
		
		if ( histLink.text() === histExpandText) {
			histLink.text( histCollapseText );
		} else {
			histLink.text( histExpandText );
		}
	} );
}*/

/**
 * Issue tracker loader
 */
/**if ( $( '#issue-list' ).length ) {
	var page = $( '#issue-list' ).data( 'name' ) || mw.config.get( 'wgPageName' ),
		amount = $( '#issue-list' ).data( 'num' ) || 20;
	
	if ( $.isArray( page ) ) {
		page = page.join( '" OR summary ~ "' );
	}
	
	var jql = encodeURIComponent( 'project in (MC, MCPE) AND resolution = Unresolved AND ( summary ~ "' + page + '" )' );
		
	
	$.ajax( 
		'https://mojang.atlassian.net/rest/api/latest/search?maxResults=' + amount + '&fields=summary&jql=' + jql
	).done( function( search ) {
		if ( !search.issues.length ) {
			$( '#issue-list' ).text( 'No issues were found.' );
			return false;
		}

		var compIssues = [], pocketIssues = [];
		$.each( search.issues, function() {
			if ( this.key.indexOf( 'MCPE' ) < 0 ) {
				compIssues.push( '<li>[<a href="https://mojang.atlassian.net/browse/' + this.key + '">' + this.key + '</a>] - ' + this.fields.summary + '</li>' );
			} else {
				pocketIssues.push( '<li>[<a href="https://mojang.atlassian.net/browse/' + this.key + '">' + this.key + '</a>] - ' + this.fields.summary + '</li>' );
			}
		} );
		
		var html = '';
		if ( compIssues.length ) {
			html = '<p><b>Computer:</b></p><ul>' + compIssues.join( '\n' ) + '</ul>';
		}
		if ( pocketIssues.length ) {
			html += '\n<p><b>Pocket Edition:</b></p><ul>' + pocketIssues.join( '\n' ) + '</ul>';
		}
		
		if ( search.total > amount ) {
			var extra = search.total - amount;
			html += '\n<p><a href="https://mojang.atlassian.net/issues/?jql=' + jql + '">View ' + extra + ' more result';
			
			if ( extra > 1 ) {
				html += 's';
			}
			
			html += '</a></p>';
		}

		$( '#issue-list' ).html( html );
	} );
}
*/

} );
/* End wiki content hook */


/* Fires when DOM is ready */
$( function() {


/**
 * Element animator
 *
 * Cycles through a set of elements (or "frames") on a 2 second timer per frame
 * Add the "animated" class to the frame containing the elements to animate.
 * Optionally, add the "animated-active" class to the frame to display first.
 * Optionally, add the "animated-subframe" class to a frame, and the
 * "animated-active" class to a subframe within, in order to designate a set of
 * subframes which will only be cycled every time the parent frame is displayed.
 * Animations with the "animated-paused" class will be skipped each interval.
 *
 * Requires some styling from [[MediaWiki:Gadget-site-styles.css]].
 */
( function() {
	var $content = $( '#mw-content-text' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	
	// Set the name of the hidden property
	var hidden; 
	if ( typeof document.hidden !== 'undefined' ) {
		hidden = 'hidden';
	} else if ( typeof document.msHidden !== 'undefined' ) {
		hidden = 'msHidden';
	} else if ( typeof document.webkitHidden !== 'undefined' ) {
		hidden = 'webkitHidden';
	}
	
	setInterval( function() {
		if ( hidden && document[hidden] ) {
			return;
		}
		$content.find( '.animated' ).each( function() {
			if ( $( this ).hasClass( 'animated-paused' ) ) {
				return;
			}
			
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );


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

if ( mcw.useNativeMinetip ) {
	mcw.minetip.native();
} else {
	mcw.minetip.create();
}


} );
/* End DOM ready */


}() );
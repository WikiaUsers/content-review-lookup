/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */

// AJAX tables
function addAjaxDisplayLink() {
	$("table.ajax").each(function (i) {
		var table = $(this).attr("id", "ajaxTable" + i);
		table.find(".nojs-message").remove();
		var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
		var cell = table.find("td").first(), needLink = true;
		cell.parent().show();
		if (cell.hasClass("showLinkHere")) {
			var old = cell.html(), rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
			if (rep != old) {
				cell.html(rep);
				needLink = false;
			}
		}
		if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">show data</a>]');
		table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text('Please wait, the content is being loaded...');
			$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
				if (data) {
					cell.html(data);
					cell.find('.ajaxHide').remove();
					cell.find('.terraria').removeClass('terraria');
					if (cell.find("table.sortable").length) {
						mw.loader.using('jquery.tablesorter', function() {
							cell.find("table.sortable").tablesorter();
						});
					}
					headerLinks.text('[');
					headerLinks.append($('<a>edit</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
					headerLinks.append(document.createTextNode(']\u00A0['));
					var shown = true;
					$("<a href='javascript:;'>hide</a>").click(function() {
						shown = !shown;
						shown ? cell.show() : cell.hide();
						$(this).text(shown ? "hide" : "show");
					}).appendTo(headerLinks);
					headerLinks.append(document.createTextNode(']'));
				}
			}).error(function() {
				cell.text('Unable to load table; the source article for it might not exist.');
			});
		});
	});
}

$(addAjaxDisplayLink);

* Variables for interface text used throughout the script, for ease of translating */
mcw.i18n = {
	// Collapsible tables and page loader
	hideText: 'hide',
	showText: 'show',
	
	// Page loader
	loadErrorTitle: 'An error occurred loading the content',
	
	// File upload
	defaultLicense: 'License'
};

/* Add extra buttons to the classic toolbar */
if ( mw.user.options.get( 'showtoolbar' ) && !mw.user.options.get( 'usebetatoolbar' ) ) {
	importScript( 'MediaWiki:Toolbar.js' );
}


/* Wait for DOMContentLoaded */
$( function() {

/* Variables for interface text used throughout the script, for ease of translating */
mcw.i18n = {
	// Collapsible tables and page loader
	hideText: 'hide',
	showText: 'show',
	
	// Page loader
	loadErrorTitle: 'An error occurred loading the content',
	
	// File upload
	defaultLicense: 'License'
};

/* Add extra buttons to the classic toolbar */
if ( mw.user.options.get( 'showtoolbar' ) && !mw.user.options.get( 'usebetatoolbar' ) ) {
	importScript( 'MediaWiki:Toolbar.js' );
}


/* Wait for DOMContentLoaded */
$( function() {

/**
 * Collapsible tables
 *
 * Based on http://www.mediawiki.org/wiki/Manual:Collapsible_tables#Common.js_script_.28before_1.18.29
 */
mcw.makeCollapsible = function( $content ) {
	if ( $content === undefined ) {
		$content = $( 'table.collapsible' );
	} else {
		$content = $content.find( 'table.collapsible' );
	}
	if ( !$content.length ) {
		return false;
	}
	
	var buttonText = ' <span class="collapsible-button">[<span class="jslink">' + mcw.i18n.hideText + '</span>]</span> ';
	
	$content.each( function() {
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
		if ( !$header.length || !$table.find( 'tr:not(tr:first)' ).text().replace( /\n/g, '' ).length ) {
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
		$collapseButton.find( '> .jslink' ).text( mcw.i18n.showText );
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
			$collapseButton.find( '> .jslink' ).text( mcw.i18n.hideText );
		}
		
		$table.data( 'collapsible', true );
	} );
};

$( '#mw-content-text' ).on( 'click', 'table.collapsible .collapsible-button .jslink', function( e ) {
	var $table = $( this ).closest( 'table.collapsible' );
	
	// Stop table sorting activating when clicking the link
	e.stopPropagation();
	
	if ( $table.hasClass( 'collapsed' ) ) {
		$table.removeClass( 'collapsed' ).addClass( 'expanded' );
		$( this ).text( mcw.i18n.hideText );
	} else {
		$table.removeClass( 'expanded' ).addClass( 'collapsed' );
		$( this ).text( mcw.i18n.showText );
	}
} );
mcw.makeCollapsible();


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
 * Element animator
 *
 * Will cycle the active class on any child elements
 * within an element with the animated class.
 */
mcw.animation = function() {
	if ( mcw.animate === undefined && $( '.animated' ).length ) {
		mcw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var $current = $( this ).children( '.active' ), $next = $current.nextAll( ':not(.skip):first' );
				if ( !$next.length ) {
					$next = $( this ).children( ':not(.skip):first' );
				}
				$current.removeClass( 'active' );
				$next.addClass( 'active' );
			} );
		}, 2000 );
	}
};
mcw.animation();


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
 * Add fake last-child class in navboxes for IE8
 */
if ( $.client.profile().name === 'msie' && $.client.profile().versionBase === '8' ) {
	$( '.navbox-list li:last' ).addClass( 'last-child' );
}


/**
 * Page loader
 *
 * Allows a page to be downloaded and shown within another page.
 * Use with [[Template:LoadPage]]
 */
var $loadPage = $( '.load-page' );
if ( $loadPage.length ) {
	// We need the spinner to show loading is happening, but we don't want
	// to have a delay while the module downloads, so we'll load this now,
	// regardless of if something is clicked
	mw.loader.load( 'jquery.spinner' );
	
	var $buttonText = $( '<span/>' )
		.addClass( 'load-page-button' )
		.css( {
			display: 'inline-block',
			marginLeft: '0.8em',
			fontWeight: 'normal'
		} )
		.html( '[<span class="jslink">' + mcw.i18n.hideText + '</span>]' );
	$loadPage.find( '.mw-headline:first' ).each( function() {
		var $button, firstWidth, secondWidth;
		
		// Add the button
		$( this ).append( $buttonText.clone() );
		
		// Find max button size, and set its min-width to it
		$button = $( this ).find( '> .load-page-button' );
		firstWidth = $button.width();
		$button.find( '> .jslink' ).text( mcw.i18n.showText );
		secondWidth = $button.width();
		
		if ( firstWidth != secondWidth ) {
			if ( firstWidth < secondWidth ) {
				$button.css( 'min-width', secondWidth );
			} else {
				$button.css( 'min-width', firstWidth );
			}
		}
	} );
}

$( '#mw-content-text' ).on( 'click', '.load-page-button > .jslink', function() {
	var $this = $( this ),
		$button = $this.parent(),
		$body = $this.closest( '.load-page' ),
		$content = $body.find( '.load-page-content' );
	
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
			$content.html( data.parse.text['*'] ).show();
			
			$button.html( oldButton ).find( '> .jslink' ).text( mcw.i18n.hideText );
			
			$body.data( 'loaded', true );
			
			// Add Ajax compatible functions here
			// TODO: Use mw.hook once we get MW1.22
			mcw.animation();
			mcw.makeCollapsible( $content );
			if ( $content.find( 'table.sortable' ).length ) {
				mw.loader.using( 'jquery.tablesorter', function() {
					$content.find( 'table.sortable' ).tablesorter();
				} );
			}
		} ).fail( function( _, error ) {
			$button.html( oldButton );
			
			var errorText = '';
			if ( error.textStatus ) {
				errorText = error.textStatus;
			} else if ( error.error ) {
				errorText = error.error.info;
			}
			
			mw.notify( errorText, { title: mcw.i18n.loadErrorTitle, autoHide: false } );
		} );
	} else if ( $this.text() === mcw.i18n.showText ) {
		$content.show();
		$this.text( mcw.i18n.hideText );
	} else {
		$content.hide();
		$this.text( mcw.i18n.showText );
	}
} );

/**
 * Make simple search suggestions box separately styled
 */
mw.loader.using( 'mediawiki.searchSuggest', function() {
	$( '.suggestions:first' ).addClass( 'searchbar' );
} );


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
}
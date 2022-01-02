/* Hide noscript class */
var noscript = document.querySelectorAll(".noscript");
for (var i = 0; i < noscript.length; i++){
	noscript[i].style.display = 'none';
}

!function( $, mw ) {
	'use strict';
	/* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
	mw.hook( 'wikipage.content' ).add( function( $wikipageContent ) {

	/**
	 * Page loader
	 *
	 * Allows a page to be downloaded and displayed on demand.
	 * Use with [[Template:LoadPage]] and [[Template:LoadBox]]
	 */

	/* Variables for interface text used throughout the script, for ease of translating */
	var i18n = {
		// Collapsible elements and page loader
		hideText: 'hide',
		showText: 'show',
		loadErrorTitle: 'An error occurred loading the content'
	};

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
					} else {
						$contentContainer.show();
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
}( this.jQuery, this.mediaWiki );
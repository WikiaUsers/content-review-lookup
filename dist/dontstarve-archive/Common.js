/* ######################################################################### */
/* Any JavaScript here will be loaded for all users on every page load. */
/* ######################################################################### */


/* ######################################################################### */
/* {{Username}} setting */
/* ######################################################################### */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* ######################################################################### */
/* END {{Username}} setting */
/* ######################################################################### */


/* ######################################################################### */
/* PreloadFileDescription */
/* Credit: Nanaki
/* ######################################################################### */

PFD_templates = [{
        label: 'Images',
        desc: '{{File\n| Description = \n| Date = \n| Source = \n| Author = \n| Other versions = \n}}\n[[Category:Images]]',
    },
];
 
PFD_requireLicense = true;

/* ######################################################################### */
/* END PreloadFileDescription */
/* ######################################################################### */

/* <nowiki> */
 
/* ######################################################################## */
/* ### JavaScript here is loaded for all users and all skins.           ### */
/* ######################################################################## */
 
/* ######################################################################## */
/* ### TITLE ICONS (Template:Games)                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Add icons to article title                          ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */
 
function addTitleIcons () {
   var iconBar = $('#topicon');
   var previewBar = $('#topicon-preview');
 
   if (skin != 'hydra') {
      return;
   }
 
   if (iconBar.length > 0 && $('a', previewBar).length > 0) {
      if (skin == 'hydra') {
         var articleDiv = $('div#content');
 
         if (articleDiv.length > 0) {
            iconBar.css('display', 'block').prependTo(articleDiv);
         }
      }  
   }
}

/* ######################################################################### */
/* Display exclusive icons on the top right */
/* Credit: Emberimp
/* ######################################################################### */
$(document).ready(function() {
    //add icons to first heading
    fh = $("#firstHeading");
    style = 'style="display: none; float: right; margin-top: -4px; margin-right: 10px;"';

    //dont starve together
    fh.append('<a id="exclusiveIcon-dst" ' + style + ' href="/Don%27t_Starve_Together" title="This article is about a gameplay element exclusive to Don\'t Starve Together."><img alt="This article is about a gameplay element exclusive to Don\'t Starve Together." src="https://dontstarve.gamepedia.com/media/dontstarve.gamepedia.com/thumb/b/b0/Don%27t_Starve_Together_icon.png/32px-Don%27t_Starve_Together_icon.png?version=899ce69461623e3993fd026707963b78" width="32" height="35" srcset="https://dontstarve.gamepedia.com/media/dontstarve.gamepedia.com/thumb/b/b0/Don%27t_Starve_Together_icon.png/48px-Don%27t_Starve_Together_icon.png?version=899ce69461623e3993fd026707963b78 1.5x, https://dontstarve.gamepedia.com/media/dontstarve.gamepedia.com/thumb/b/b0/Don%27t_Starve_Together_icon.png/64px-Don%27t_Starve_Together_icon.png?version=899ce69461623e3993fd026707963b78 2x"></a>');

    //shipwrecked
    fh.append('<a id="exclusiveIcon-shipwrecked" ' + style + ' href="/Shipwrecked" title="This article is about a gameplay element exclusive to the Shipwrecked DLC."><img alt="This article is about a gameplay element exclusive to the Shipwrecked DLC." src="https://dontstarve.gamepedia.com/media/dontstarve.gamepedia.com/thumb/4/46/Shipwrecked_icon.png/32px-Shipwrecked_icon.png?version=425d84f28f909a1d7cbc33ec7c49869e" width="32" height="35" srcset="https://dontstarve.gamepedia.com/media/dontstarve.gamepedia.com/thumb/4/46/Shipwrecked_icon.png/48px-Shipwrecked_icon.png?version=425d84f28f909a1d7cbc33ec7c49869e 1.5x, https://dontstarve.gamepedia.com/media/dontstarve.gamepedia.com/thumb/4/46/Shipwrecked_icon.png/64px-Shipwrecked_icon.png?version=425d84f28f909a1d7cbc33ec7c49869e 2x"></a>');

    //reign of giants
    fh.append('<a id="exclusiveIcon-rog" ' + style + ' href="/Reign_of_Giants" title="This article is about a gameplay element exclusive to the Reign of Giants DLC."><img alt="This article is about a gameplay element exclusive to the Reign of Giants DLC." src="https://dontstarve.gamepedia.com/media/dontstarve.gamepedia.com/thumb/f/f8/Reign_of_Giants_icon.png/32px-Reign_of_Giants_icon.png?version=047a2190b2879e088ac88acd58491ea3" width="32" height="35" srcset="https://dontstarve.gamepedia.com/media/dontstarve.gamepedia.com/thumb/f/f8/Reign_of_Giants_icon.png/48px-Reign_of_Giants_icon.png?version=047a2190b2879e088ac88acd58491ea3 1.5x, https://dontstarve.gamepedia.com/media/dontstarve.gamepedia.com/thumb/f/f8/Reign_of_Giants_icon.png/64px-Reign_of_Giants_icon.png?version=047a2190b2879e088ac88acd58491ea3 2x"></a>');

    //handle tabs
    exclusiveIcon = function(){
        $("#firstHeading a").hide();
        var exi = $(".exclusiveIcon").filter(":visible").first()
        if(exi.length) {
               $("#exclusiveIcon-" + exi.attr("data-exclusive")).show();
        }
    }

    $(".tabcontainer").click(function() {
        exclusiveIcon();
    });

    $(".tabbernav").click(function() {
        exclusiveIcon();
    });

    //init
    exclusiveIcon();
});


/* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
mw.hook( 'wikipage.content' ).add( function( $wikipageContent ) {

/* Variables for interface text used throughout the script, for ease of translating */
var i18n = {
	// Collapsible elements and page loader
	hideText: 'hide',
	showText: 'show',
	
	// Page loader
	loadErrorTitle: 'An error occurred loading the content'
};

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
 * Page loader
 *
 * Allows a page to be downloaded and displayed on demand.
 * Use with [[Template:LoadPage]]
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
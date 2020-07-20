/*  _____________________________________________________________________________
 * |                                                                             |
 * |                    === WARNING: GLOBAL GADGET FILE ===                      |
 * |                  Changes to this page affect many users.                    |
 * | Please discuss changes on the talk page or on [[WT:Gadget]] before editing. |
 * |_____________________________________________________________________________|
 *
 * Toggle between dropdown menus and tabs.
 *
 * @dependencies jquery.cookie
 * @source en.wikipedia.org/wiki/MediaWiki:Gadget-MenuTabsToggle.js
 * @source imported as of 2011-10-04 from [[User:Edokter/MenuTabsToggle.js]] / [[User:Edokter/MenuTabsToggle.css]]
 * @revision 3.3
 * @author: Edokter ([[User:Edokter]])
 */

$( document ).ready( function() {
	var portlet = [];
	var portletId = [];
	var portletToggle = [];
	var toggleDiv = '<div class="vectorToggle" id="$1"><span><a href="#"></a></span></div>';

	/* Portlets to exclude */
	var excludePortlets = [ 'p-namespaces', 'p-twinkle' ];

	/* MenuToTabs */
	function MenuToTabs( portlet, id ) {
		portlet.removeClass( 'vectorMenu' ).addClass( 'vectorTabs' ).css( 'margin-left', '-1px' )
			.find( 'div.menu > ul' ).unwrap()
			.find( 'li > a' ).wrap( '<span></span>' );
		portlet.find( 'li.icon-collapsed' ).removeClass( 'icon-collapsed' ).addClass( 'icon' );
		$.cookie( 'vector-tabs-' + id, 'tabs', { expires: 30, path: '/' } );
	}

	/* TabsToMenu */
	function TabsToMenu( portlet, id ) {
		portlet.removeClass( 'vectorTabs' ).addClass( 'vectorMenu' ).css( 'margin-left', '' )
			.find( 'ul' ).wrap( '<div class="menu"></div>' )
			.find( 'span > a' ).unwrap();
		portlet.find( 'li.icon' ).removeClass( 'icon' ).addClass( 'icon-collapsed' );
		$.cookie( 'vector-tabs-' + id, 'menu', { expires: 30, path: '/' } );
	}

	/* Initialize */
	if ( !mw.config.get( 'skin' ) == 'vector' ) {
		return;
	}

	// Unbind events from vector.js
	$( 'div.vectorMenu' ).find( 'h3' ).off();

	// Enumerate all portlets
	$( 'div.vectorMenu, div.vectorTabs' ).each( function(i) {
		portlet[i] = $( this );
		portletId[i] = portlet[i].attr( 'id' );

		// Skip excluded portlets
		if ( $.inArray( portletId[i], excludePortlets ) == -1 ) {

			// Disable collapsible tabs
			portlet[i].find( 'li.collapsible' ).removeClass( 'collapsible' );

			portletToggle[i] = $( toggleDiv.replace( '$1', portletId[i] + '-toggle' ) );
			// Left or right?
			if ( portlet[i].parent().attr( 'id' ) == 'left-navigation' ) {
				portletToggle[i]
					.addClass( 'toggle-left' )
					.insertBefore( portlet[i].find( 'ul' ) );
			} else {
				portletToggle[i]
					.addClass( 'toggle-right' )
					.insertAfter( portlet[i].find( 'ul' ) );
			}

			// Menu or Tabs?
			if ( portlet[i].hasClass( 'vectorMenu' ) ) {
				if ( $.cookie( 'vector-tabs-' + portletId[i] ) == 'tabs' ) {
					MenuToTabs( portlet[i], portletId[i] );
				}
			}
			else if ( portlet[i].hasClass( 'vectorTabs' ) ) {
				portlet[i].find( 'h3' )
					.wrapInner( '<span></span>' )
					.append( '<a href="#"></a>' );
				if ( $.cookie( 'vector-tabs-' + portletId[i] ) == 'menu' ) {
					TabsToMenu( portlet[i], portletId[i] );
				}
			}

			// Assign key and mouse events
			portlet[i].delegate( 'h3 a', 'click', function( event ) {
				event.preventDefault();
			} );
			portlet[i].delegate( 'h3 a', 'mousedown', function( event ) {
				if ( event.which != 3 ) {
					var ul = portlet[i].find( 'ul' );
					ul.animate( { height: 'hide' }, 125, function() {
						MenuToTabs( portlet[i], portletId[i] );
						ul.animate( { width: 'show' }, 125 );
					} );
				}
			} );

			portletToggle[i].delegate( 'a', 'click', function( event ) {
				event.preventDefault();
			} );
			portletToggle[i].delegate( 'a', 'mousedown', function( event ) {
				if ( event.which != 3 ) {
					var ul = portlet[i].find( 'ul' );
					ul.animate( { width: 'hide' }, 125, function() {
						TabsToMenu( portlet[i], portletId[i] );
						ul.animate( { height: 'show' }, 125 );
					} );
				}
			} );
		}
	} );
} );
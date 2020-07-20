/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
// Prevent wikisyntax from expanding on-save: <nowiki>
 
/**
 * Add the signature button to namespace 0 (main/default namespace)
 * @author Roan (Catrope)
 */
jQuery( document ).ready( function() {
	if ( !( 'wikiEditor' in jQuery ) || !jQuery.wikiEditor.isSupported( jQuery.wikiEditor.modules.toolbar ) ) {
		return;
	}
 
	jQuery( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		section: 'main',
		group: 'insert',
		tools: {
			'signature-ns0': {
				labelMsg: 'wikieditor-toolbar-tool-signature',
				filters: [ 'body.ns-0' ], // ONLY ns 0
				type: 'button',
				offset: [2, -1872],
				icon: 'insert-signature.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '--~~' + '~~'
					}
				}
			}
		}
	});
} );
 
/**
 * Collapsible tables
 *
 * Allows tables to be collapsed, showing only the header. See [[Wikipedia:NavFrame]].
 * @maintainer [[User:R. Koot]] (on Wikipedia)
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function hasClass( element, className ) {
	var Classes = element.className.split( " " );
	for ( var i = 0; i < Classes.length; i++ ) {
		if ( Classes[i] == className ) {
			return true;
		}
	}
	return false;
}
 
function collapseTable( tableIndex ) {
	var i;
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.getElementsByTagName( 'tr' );
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}
 
function createCollapseButtons() {
	var i;
	var tableIndex = 0;
	var NavigationBoxes = {};
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
			NavigationBoxes[ tableIndex ] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.style.styleFloat = 'right';
			Button.style.cssFloat = 'right';
			Button.style.fontWeight = 'normal';
			Button.style.textAlign = 'right';
			Button.style.width = '6em';
 
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', 'javascript:collapseTable(' + tableIndex + ');' );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			var Header = Tables[i].getElementsByTagName( 'tr' )[0].getElementsByTagName( 'th' )[0];
			/* only add button and increment count if there is a header row to work with */
			if (Header) {
				Header.insertBefore( Button, Header.childNodes[0] );
				tableIndex++;
			}
		}
	}
 
	for ( i = 0; i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		}
	}
}
 
addOnloadHook( createCollapseButtons );
 
 
/**
 * Dynamic Navigation Bars (experimental)
 *
 *  See [[Wikipedia:NavFrame]].
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
// indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
	var NavChild;
	var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar);
	var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar);
 
	if (!NavFrame || !NavToggle) {
		return false;
	}
 
	// if shown now
	if (NavToggle.firstChild.data == NavigationBarHide) {
		for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
			if ( hasClass( NavChild, 'NavPic' ) ) {
				NavChild.style.display = 'none';
			}
			if ( hasClass( NavChild, 'NavContent') ) {
				NavChild.style.display = 'none';
			}
		}
		NavToggle.firstChild.data = NavigationBarShow;
 
	// if hidden now
	} else if (NavToggle.firstChild.data == NavigationBarShow) {
		 for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
			 if (hasClass(NavChild, 'NavPic')) {
				 NavChild.style.display = 'block';
			 }
			 if (hasClass(NavChild, 'NavContent')) {
				 NavChild.style.display = 'block';
			 }
		 }
		 NavToggle.firstChild.data = NavigationBarHide;
	}
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton(){
	var indexNavigationBar = 0;
	// iterate over all < div >-elements
	var divs = document.getElementsByTagName( 'div' );
	for (var i = 0; NavFrame = divs[i]; i++) {
		// if found a navigation bar
		if ( hasClass(NavFrame, 'NavFrame' )) {
 
			indexNavigationBar++;
			var NavToggle = document.createElement('a');
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
			NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
			var NavToggleText = document.createTextNode(NavigationBarHide);
			for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
				if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
					if (NavChild.style.display == 'none') {
						NavToggleText = document.createTextNode(NavigationBarShow);
						break;
					}
				}
			}
 
			NavToggle.appendChild(NavToggleText);
			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for(var j=0; j < NavFrame.childNodes.length; j++) {
				if (hasClass(NavFrame.childNodes[j], 'NavHead')) {
					NavFrame.childNodes[j].appendChild(NavToggle);
				}
			}
			NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
		}
	}
}
 
addOnloadHook( createNavigationBarToggleButton );
 
 
// Shuffle for election candidates
function dshuf() {
	var shufsets = {};
	var rx = new RegExp('dshuf' + '\\s+(dshufset\\d+)', 'i');
	var divs = document.getElementsByTagName('div');
	var i = divs.length;
	while (i--) {
		if (rx.test(divs[i].className)) {
			if (typeof shufsets[RegExp.$1] === 'undefined') {
				shufsets[RegExp.$1] = {};
				shufsets[RegExp.$1].inner = [];
				shufsets[RegExp.$1].member = [];
			}
			shufsets[RegExp.$1].inner.push({
				key: Math.random(),
				html: divs[i].innerHTML
			});
			shufsets[RegExp.$1].member.push(divs[i]);
		}
	}
	for (shufset in shufsets) {
		shufsets[shufset].inner.sort(function(a, b) {
			return a.key - b.key;
		});
		i = shufsets[shufset].member.length;
		while (i--) {
			shufsets[shufset].member[i].innerHTML = shufsets[shufset].inner[i].html;
			shufsets[shufset].member[i].style.display = 'block';
		}
	}
}
$(dshuf);
 
/**
 * AJAX transclusion table [[m:User:Pathoschild/Scripts/AJAX_transclusion_table]]
 * @author [[m:User:Pathoschild]]
 */
function attLoader() {
	if ( getElementsByClassName( document.getElementsByTagName('body')[0], 'table', 'attable' ).length ) {
		importScript( 'User:Pathoschild/Scripts/AJAX_transclusion_table.js' );
	}
}
addOnloadHook(attLoader);
 
/**
 * JSconfig
 *
 * Global configuration options to enable/disable and configure
 * specific script features from [[MediaWiki:Common.js]] and
 * [[MediaWiki:Monobook.js]]
 * This framework adds config options (saved as cookies) to [[Special:Preferences]]
 * For a more permanent change you can override the default settings in your
 * [[Special:Mypage/monobook.js]]
 * for Example: JSconfig.keys[loadAutoInformationTemplate] = false;
 *
 * Maintainer: [[User:Dschwen]]
 */
 
var JSconfig =
{
prefix : 'jsconfig_',
keys : {},
meta : {},
 
//
// Register a new configuration item
//  * name          : String, internal name
//  * default_value : String or Boolean (type determines configuration widget)
//  * description   : String, text appearing next to the widget in the preferences
//  * prefpage      : Integer (optional), section in the preferences to insert the widget:
//                     0 : User profile
//                     1 : Skin
//                     2 : Math
//                     3 : Files
//                     4 : Date and time
//                     5 : Editing
//                     6 : Recent changes
//                     7 : Watchlist
//                     8 : Search
//                     9 : Misc
//
// Access keys through JSconfig.keys[name]
//
registerKey : function( name, default_value, description, prefpage )
{
  if( typeof(JSconfig.keys[name]) === 'undefined' )
   JSconfig.keys[name] = default_value;
  else {
 
   // all cookies are read as strings,
   // convert to the type of the default value
   switch( typeof(default_value) )
   {
    case 'boolean' : JSconfig.keys[name] = ( JSconfig.keys[name] == 'true' ); break;
    case 'number'  : JSconfig.keys[name] = JSconfig.keys[name]/1; break;
   }
 
  }
 
  JSconfig.meta[name] = { 'description' : description, 'page' : prefpage || 0, 'default_value' : default_value };
},
 
readCookies : function()
{
  var cookies = document.cookie.split("; ");
  var p =JSconfig.prefix.length;
  var i;
 
  for( var key in cookies )
  {
   if( cookies[key].substring(0,p) == JSconfig.prefix )
   {
    i = cookies[key].indexOf('=');
    //alert( cookies[key] + ',' + key + ',' + cookies[key].substring(p,i) );
    JSconfig.keys[cookies[key].substring(p,i)] = cookies[key].substring(i+1);
   }
  }
},
 
writeCookies : function()
{
  for( var key in JSconfig.keys )
   document.cookie = JSconfig.prefix + key + '=' + JSconfig.keys[key] + '; path=/; expires=Thu, 2 Aug 2009 10:10:10 UTC';
},
 
evaluateForm : function()
{
  var w_ctrl,wt;
  //alert('about to save JSconfig');
  for( var key in JSconfig.meta ) {
   w_ctrl = document.getElementById( JSconfig.prefix + key );
   if( w_ctrl )
   {
    wt = typeof( JSconfig.meta[key].default_value );
    switch( wt ) {
     case 'boolean' : JSconfig.keys[key] = w_ctrl.checked; break;
     case 'string' : JSconfig.keys[key] = w_ctrl.value; break;
    }
   }
  }
 
  JSconfig.writeCookies();
  return true;
},
 
setUpForm : function()
{
  var key;
  var prefChild = document.getElementById('preferences');
  if( !prefChild ) return;
  prefChild = prefChild.childNodes;
 
  //
  // make a list of all preferences sections
  //
  var tabs = [];
  var len = prefChild.length;
  for( key = 0; key < len; key++ ) {
   if( prefChild[key].tagName &&
       prefChild[key].tagName.toLowerCase() == 'fieldset' )
    tabs.push(prefChild[key]);
  }
 
  //
  // Create Widgets for all registered config keys
  //
  var w_div, w_label, w_ctrl, wt;
  for( key in JSconfig.meta ) {
   w_div = document.createElement( 'DIV' );
 
   w_label = document.createElement( 'LABEL' );
   w_label.appendChild( document.createTextNode( JSconfig.meta[key].description ) );
   w_label.htmlFor = JSconfig.prefix + key;
 
   wt = typeof( JSconfig.meta[key].default_value );
 
   w_ctrl = document.createElement( 'INPUT' );
   w_ctrl.id = JSconfig.prefix + key;
 
   // before insertion into the DOM tree
   switch( wt ) {
    case 'boolean' : w_ctrl.type = 'checkbox'; break;
    case 'string'  : w_ctrl.type = 'text'; break;
   }
 
   w_div.appendChild( w_label );
   w_div.appendChild( w_ctrl );
   tabs[JSconfig.meta[key].page].appendChild( w_div );
 
   // after insertion into the DOM tree
   switch( wt ) {
    case 'boolean' : w_ctrl.defaultChecked = w_ctrl.checked = JSconfig.keys[key]; break;
    case 'string' : w_ctrl.defaultValue = w_ctrl.value = JSconfig.keys[key]; break;
   }
 
  }
  addHandler(document.getElementById('preferences').parentNode, 'submit', JSconfig.evaluateForm );
}
};
 
JSconfig.readCookies();
addOnloadHook(JSconfig.setUpForm);
 
// ability to pull [[MediaWiki:Gadget-rtl.css]] on individual page loads by [[testwiki:User:Splarka]] and [[wm2008:User:Mr.Z-man]]
function importStylesheet(page) {
	if (page.indexOf('http://') === -1 && page.indexOf('https://') === -1 && page.indexOf('//') !== 0 && page.indexOf('file:///') === -1) {
		page = wgScript + '?action=raw&ctype=text/css&smaxage=0&title=' + encodeURIComponent(page.replace(/ /g,'_'));
	}
	return document.createStyleSheet ? document.createStyleSheet(page) : appendCSS('@import "' + page + '";');
}
 
if(document.URL.indexOf('rtl=1') !== -1) {
	importStylesheetURI('//meta.wikimedia.org/w/index.php?title=MediaWiki:Gadget-rtl.css&action=raw&ctype=text/css');
}
 
/**
 * jQuery makeCollapsible
 *
 * This will enable collapsible-functionality on all passed elements.
 * Will prevent binding twice to the same element.
 * Initial state is expanded by default, this can be overriden by adding class
 * "mw-collapsed" to the "mw-collapsible" element.
 * Elements made collapsible have class "mw-made-collapsible".
 * Except for tables and lists, the inner content is wrapped in "mw-collapsible-content".
 *
 * @author Krinkle <krinklemail@gmail.com>
 *
 * Dual license:
 * @license CC-BY 3.0 <http://creativecommons.org/licenses/by/3.0>
 * @license GPL2 <http://www.gnu.org/licenses/old-licenses/gpl-2.0.html>
 */
( function( $, mw ) {

$.fn.makeCollapsible = function() {

	return this.each(function() {
		var _fn = 'jquery.makeCollapsible> ';

		// Define reused variables and functions
		var	$that = $(this).addClass( 'mw-collapsible' ), // case: $( '#myAJAXelement' ).makeCollapsible()
			that = this,
			collapsetext = $(this).attr( 'data-collapsetext' ),
			expandtext = $(this).attr( 'data-expandtext' ),
			toggleElement = function( $collapsible, action, $defaultToggle, instantHide ) {
				// Validate parameters
				if ( !$collapsible.jquery ) { // $collapsible must be an instance of jQuery
					return;
				}
				if ( action != 'expand' && action != 'collapse' ) {
					// action must be string with 'expand' or 'collapse'
					return;
				}
				if ( typeof $defaultToggle == 'undefined' ) {
					$defaultToggle = null;
				}
				if ( $defaultToggle !== null && !($defaultToggle instanceof $) ) {
					// is optional (may be undefined), but if defined it must be an instance of jQuery.
					// If it's not, abort right away.
					// After this $defaultToggle is either null or a valid jQuery instance.
					return;
				}

				var $containers = null;

				if ( action == 'collapse' ) {

					// Collapse the element
					if ( $collapsible.is( 'table' ) ) {
						// Hide all table rows of this table
						// Slide doens't work with tables, but fade does as of jQuery 1.1.3
						// http://stackoverflow.com/questions/467336#920480
						$containers = $collapsible.find( '>tbody>tr' );
						if ( $defaultToggle ) {
							// Exclude tablerow containing togglelink
							$containers.not( $defaultToggle.closest( 'tr' ) ).stop(true, true).fadeOut();
						} else {
							if ( instantHide ) {
								$containers.hide();
							} else {
								$containers.stop( true, true ).fadeOut();
							}
						}

					} else if ( $collapsible.is( 'ul' ) || $collapsible.is( 'ol' ) ) {
						$containers = $collapsible.find( '> li' );
						if ( $defaultToggle ) {
							// Exclude list-item containing togglelink
							$containers.not( $defaultToggle.parent() ).stop( true, true ).slideUp();
						} else {
							if ( instantHide ) {
								$containers.hide();
							} else {
								$containers.stop( true, true ).slideUp();
							}
						}

					} else { // <div>, <p> etc.
						var $collapsibleContent = $collapsible.find( '> .mw-collapsible-content' );

						// If a collapsible-content is defined, collapse it
						if ( $collapsibleContent.length ) {
							if ( instantHide ) {
								$collapsibleContent.hide();
							} else {
								$collapsibleContent.slideUp();
							}

						// Otherwise assume this is a customcollapse with a remote toggle
						// .. and there is no collapsible-content because the entire element should be toggled
						} else {
							if ( $collapsible.is( 'tr' ) || $collapsible.is( 'td' ) || $collapsible.is( 'th' ) ) {
								$collapsible.fadeOut();
							} else {
								$collapsible.slideUp();
							}
						}
					}

				} else {

					// Expand the element
					if ( $collapsible.is( 'table' ) ) {
						$containers = $collapsible.find( '>tbody>tr' );
						if ( $defaultToggle ) {
							// Exclude tablerow containing togglelink
							$containers.not( $defaultToggle.parent().parent() ).stop(true, true).fadeIn();
						} else {
							$containers.stop(true, true).fadeIn();
						}

					} else if ( $collapsible.is( 'ul' ) || $collapsible.is( 'ol' ) ) {
						$containers = $collapsible.find( '> li' );
						if ( $defaultToggle ) {
							// Exclude list-item containing togglelink
							$containers.not( $defaultToggle.parent() ).stop( true, true ).slideDown();
						} else {
							$containers.stop( true, true ).slideDown();
						}

					} else { // <div>, <p> etc.
						var $collapsibleContent = $collapsible.find( '> .mw-collapsible-content' );

						// If a collapsible-content is defined, collapse it
						if ( $collapsibleContent.length ) {
							$collapsibleContent.slideDown();

						// Otherwise assume this is a customcollapse with a remote toggle
						// .. and there is no collapsible-content because the entire element should be toggled
						} else {
							if ( $collapsible.is( 'tr' ) || $collapsible.is( 'td' ) || $collapsible.is( 'th' ) ) {
								$collapsible.fadeIn();
							} else {
								$collapsible.slideDown();
							}
						}
					}
				}
			},
			// Toggles collapsible and togglelink class and updates text label
			toggleLinkDefault = function( that, e ) {
				var	$that = $(that),
					$collapsible = $that.closest( '.mw-collapsible.mw-made-collapsible' ).toggleClass( 'mw-collapsed' );
				e.preventDefault();
				e.stopPropagation();

				// It's expanded right now
				if ( !$that.hasClass( 'mw-collapsible-toggle-collapsed' ) ) {
					// Change link to "Show"
					$that.removeClass( 'mw-collapsible-toggle-expanded' ).addClass( 'mw-collapsible-toggle-collapsed' );
					if ( $that.find( '> a' ).length ) {
						$that.find( '> a' ).text( expandtext );
					} else {
						$that.text( expandtext );
					}
					// Collapse element
					toggleElement( $collapsible, 'collapse', $that );

				// It's collapsed right now
				} else {
					// Change link to "Hide"
					$that.removeClass( 'mw-collapsible-toggle-collapsed' ).addClass( 'mw-collapsible-toggle-expanded' );
					if ( $that.find( '> a' ).length ) {
						$that.find( '> a' ).text( collapsetext );
					} else {
						$that.text( collapsetext );
					}
					// Expand element
					toggleElement( $collapsible, 'expand', $that );
				}
				return;
			},
			// Toggles collapsible and togglelink class
			toggleLinkPremade = function( $that, e ) {
				var	$collapsible = $that.eq(0).closest( '.mw-collapsible.mw-made-collapsible' ).toggleClass( 'mw-collapsed' );
				if ( $(e.target).is('a') ) {
					return true;
				}
				e.preventDefault();
				e.stopPropagation();

				// It's expanded right now
				if ( !$that.hasClass( 'mw-collapsible-toggle-collapsed' ) ) {
					// Change toggle to collapsed
					$that.removeClass( 'mw-collapsible-toggle-expanded' ).addClass( 'mw-collapsible-toggle-collapsed' );
					// Collapse element
					toggleElement( $collapsible, 'collapse', $that );

				// It's collapsed right now
				} else {
					// Change toggle to expanded
					$that.removeClass( 'mw-collapsible-toggle-collapsed' ).addClass( 'mw-collapsible-toggle-expanded' );
					// Expand element
					toggleElement( $collapsible, 'expand', $that );
				}
				return;
			},
			// Toggles customcollapsible
			toggleLinkCustom = function( $that, e, $collapsible ) {
				// For the initial state call of customtogglers there is no event passed
				if (e) {
					e.preventDefault();
				e.stopPropagation();
				}
				// Get current state and toggle to the opposite
				var action = $collapsible.hasClass( 'mw-collapsed' ) ? 'expand' : 'collapse';
				$collapsible.toggleClass( 'mw-collapsed' );
				toggleElement( $collapsible, action, $that );

			};

		// Use custom text or default ?
		if( !collapsetext ) {
			collapsetext = mw.msg( 'collapsible-collapse' );
		}
		if ( !expandtext ) {
			expandtext = mw.msg( 'collapsible-expand' );
		}

		// Create toggle link with a space around the brackets (&nbsp;[text]&nbsp;)
		var $toggleLink =
			$( '<a href="#"></a>' )
				.text( collapsetext )
				.wrap( '<span class="mw-collapsible-toggle"></span>' )
				.parent()
				.prepend( '&nbsp;[' )
				.append( ']&nbsp;' )
				.bind( 'click.mw-collapse', function(e) {
					toggleLinkDefault( this, e );
				} );

		// Return if it has been enabled already.
		if ( $that.hasClass( 'mw-made-collapsible' ) ) {
			return;
		} else {
			$that.addClass( 'mw-made-collapsible' );
		}

		// Check if this element has a custom position for the toggle link
		// (ie. outside the container or deeper inside the tree)
		// Then: Locate the custom toggle link(s) and bind them
		if ( ( $that.attr( 'id' ) || '' ).indexOf( 'mw-customcollapsible-' ) === 0 ) {

			var thatId = $that.attr( 'id' ),
				$customTogglers = $( '.' + thatId.replace( 'mw-customcollapsible', 'mw-customtoggle' ) );
			mw.log( _fn + 'Found custom collapsible: #' + thatId );

			// Double check that there is actually a customtoggle link
			if ( $customTogglers.length ) {
				$customTogglers.bind( 'click.mw-collapse', function( e ) {
					toggleLinkCustom( $(this), e, $that );
				} );
			} else {
				mw.log( _fn + '#' + thatId + ': Missing toggler!' );
			}

			// Initial state
			if ( $that.hasClass( 'mw-collapsed' ) ) {
				$that.removeClass( 'mw-collapsed' );
				toggleLinkCustom( $customTogglers, null, $that );
			}

		// If this is not a custom case, do the default:
		// Wrap the contents add the toggle link
		} else {

			// Elements are treated differently
			if ( $that.is( 'table' ) ) {
				// The toggle-link will be in one the the cells (td or th) of the first row
				var	$firstRowCells = $( 'tr:first th, tr:first td', that ),
					$toggle = $firstRowCells.find( '> .mw-collapsible-toggle' );

				// If theres no toggle link, add it to the last cell
				if ( !$toggle.length ) {
					$firstRowCells.eq(-1).prepend( $toggleLink );
				} else {
					$toggleLink = $toggle.unbind( 'click.mw-collapse' ).bind( 'click.mw-collapse', function( e ) {
						toggleLinkPremade( $toggle, e );
					} );
				}

			} else if ( $that.is( 'ul' ) || $that.is( 'ol' ) ) {
				// The toggle-link will be in the first list-item
				var	$firstItem = $( 'li:first', $that),
					$toggle = $firstItem.find( '> .mw-collapsible-toggle' );

				// If theres no toggle link, add it
				if ( !$toggle.length ) {
					// Make sure the numeral order doesn't get messed up, force the first (soon to be second) item
					// to be "1". Except if the value-attribute is already used.
					// If no value was set WebKit returns "", Mozilla returns '-1', others return null or undefined.
					var firstval = $firstItem.attr( 'value' );
					if ( firstval === undefined || !firstval || firstval == '-1' ) {
						$firstItem.attr( 'value', '1' );
					}
					$that.prepend( $toggleLink.wrap( '<li class="mw-collapsible-toggle-li"></li>' ).parent() );
				} else {
					$toggleLink = $toggle.unbind( 'click.mw-collapse' ).bind( 'click.mw-collapse', function( e ) {
						toggleLinkPremade( $toggle, e );
					} );
				}

			} else { // <div>, <p> etc.

				// The toggle-link will be the first child of the element
				var $toggle = $that.find( '> .mw-collapsible-toggle' );

				// If a direct child .content-wrapper does not exists, create it
				if ( !$that.find( '> .mw-collapsible-content' ).length ) {
					$that.wrapInner( '<div class="mw-collapsible-content"></div>' );
				}

				// If theres no toggle link, add it
				if ( !$toggle.length ) {
					$that.prepend( $toggleLink );
				} else {
					$toggleLink = $toggle.unbind( 'click.mw-collapse' ).bind( 'click.mw-collapse', function( e ) {
						toggleLinkPremade( $toggle, e );
					} );
				}
			}
		}

		// Initial state (only for those that are not custom)
		if ( $that.hasClass( 'mw-collapsed' ) && ( $that.attr( 'id' ) || '').indexOf( 'mw-customcollapsible-' ) !== 0 ) {
			$that.removeClass( 'mw-collapsed' );
			// The collapsible element could have multiple togglers
			// To toggle the initial state only click one of them (ie. the first one, eq(0) )
			// Else it would go like: hide,show,hide,show for each toggle link.
			toggleElement( $that, 'collapse', $toggleLink.eq(0), /* instantHide = */ true );
			$toggleLink.eq(0).click();
		}
	} );
};
} )( jQuery, mediaWiki );

// Import local or interwiki page as script
importedScripts = {};
function importScript(page, lang) {
	page = '?title=' + encodeURIComponent(page.replace(' ','_'));
	if (lang) {
		page = '//' + lang + '.wikipedia.org/w/index.php' + page;
	} else {
		page = wgScript + page;
	}
	if (importedScripts[page]) {
		return;
	}
	importedScripts[page] = true;
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.src = page + '&action=raw&ctype=text/javascript';
	document.getElementsByTagName('head')[0].appendChild(s);
}
 
// Fix links like User:Example@somewiki. Author: VasilievVV, with modifications by Kalan and attempted rewrite by Splarka
if (
	(typeof(disableInterlinkLogs) === 'undefined' || disableInterlinkLogs === false)
	&& (wgCanonicalSpecialPageName === 'Log' || wgCanonicalSpecialPageName === 'Recentchanges')
) {
	importScript('MediaWiki:Common.js/interlinker.js');
}
 
addOnloadHook(function() {
	// Set a default of anon-only global blocks
	// We don't want to override the user's request when they're specifying [?&]wpAnonOnly=[01] in the URL or
	// if we're loading up the block settings for an already-blocked IP (then you can't see whether the block was AO or not)
	if ( wgCanonicalSpecialPageName === 'GlobalBlock' && window.wgUserGroups && wgUserGroups.join(' ').indexOf('steward') !== -1 ) {
		if ( document.getElementById('mw-globalblock-expiry-other') != null ) {
			var expiry = document.getElementById('mw-globalblock-expiry-other').value;
			if ( expiry == '' && document.location.href.indexOf('wpAnonOnly=') === -1){
				document.getElementById('mw-globalblock-anon-only').checked = true;
			}
		}
	}
});
 
// Import language-specific stylesheet, especially useful for languages like German that have (un)usual capitalization rules
importStylesheet('MediaWiki:' + skin + '.css/' + wgUserLanguage);
 
// Multilingual description.js from commons
mw.loader.load('//commons.wikimedia.org/w/index.php?title=MediaWiki:Multilingual_description.js&action=raw&ctype=text/javascript');
 
//Tabs
importScript('MediaWiki:Tabs.js');
 
// Www portal preview script
importScript('User:Splarka/portalpreview.js');
 
// Handle {{InterProject}}
importScript('MediaWiki:InterProject.js');
 
// Help:Diff
if ( mw.config.get( 'wgPageName' ) === 'Help:Diff' ) {
    mw.loader.load( 'mediawiki.action.history.diff' );
}
 
//redundant with global implementation of protocol neutral http:/https:
// Description: Stay on the secure server as much as possible
// Maintainers: [[User:TheDJ]]
// 
//if(wgServer == 'https://secure.wikimedia.org') {
//	importScript( 'MediaWiki:Common.js/secure.js');
//}
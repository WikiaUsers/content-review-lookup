/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/**
 * Keep code in MediaWiki:Common.js to a minimum as it is unconditionally
 * loaded for all users on every wiki page. If possible create a gadget that is
 * enabled by default instead of adding it here (since gadgets are fully
 * optimized ResourceLoader modules with possibility to add dependencies etc.)
 *
 * Since Common.js isn't a gadget, there is no place to declare its
 * dependencies, so we have to lazy load them with mw.loader.using on demand and
 * then execute the rest in the callback. In most cases these dependencies will
 * be loaded (or loading) already and the callback will not be delayed. In case a
 * dependency hasn't arrived yet it'll make sure those are loaded before this.
 */

/* global mw, $ */
/* jshint strict:false, browser:true */

mw.loader.using( ['mediawiki.user', 'mediawiki.util', 'mediawiki.notify'] ).done( function () {
/* Begin of mw.loader.using callback */

/**
 * Main Page layout fixes
 *
 * Description: Adds an additional link to the complete list of languages available.
 * Maintainers: [[User:AzaToth]], [[User:R. Koot]], [[User:Alex Smotrov]]
 */
if ( mw.config.get( 'wgPageName' ) === 'Main_Page' || mw.config.get( 'wgPageName' ) === 'Talk:Main_Page' ) {
	$( function () {
		mw.util.addPortletLink( 'p-lang', '//meta.wikimedia.org/wiki/List_of_Wikipedias',
			'Complete list', 'interwiki-completelist', 'Complete list of Wikipedias' );
	} );
}

/**
 * Redirect User:Name/skin.js and skin.css to the current skin's pages
 * (unless the 'skin' page really exists)
 * @source: http://www.mediawiki.org/wiki/Snippets/Redirect_skin.js
 * @rev: 2
 */
if ( mw.config.get( 'wgArticleId' ) === 0 && mw.config.get( 'wgNamespaceNumber' ) === 2 ) {
	var titleParts = mw.config.get( 'wgPageName' ).split( '/' );
	/* Make sure there was a part before and after the slash
	   and that the latter is 'skin.js' or 'skin.css' */
	if ( titleParts.length == 2 ) {
		var userSkinPage = titleParts.shift() + '/' + mw.config.get( 'skin' );
		if ( titleParts.slice( -1 ) == 'skin.js' ) {
			window.location.href = mw.util.getUrl( userSkinPage + '.js' );
		} else if ( titleParts.slice( -1 ) == 'skin.css' ) {
			window.location.href = mw.util.getUrl( userSkinPage + '.css' );
		}
	}
}

/**
 * Map addPortletLink to mw.util
 * @deprecated: Use mw.util.addPortletLink instead.
 */
mw.log.deprecate( window, 'addPortletLink', mw.util.addPortletLink, 'Use mw.util.addPortletLink instead' );

/**
 * Extract a URL parameter from the current URL
 * @deprecated: Use mw.util.getParamValue with proper escaping
 */
mw.log.deprecate( window, 'getURLParamValue', mw.util.getParamValue, 'Use mw.util.getParamValue instead' );

/**
 * Test if an element has a certain class
 * @deprecated:  Use $(element).hasClass() instead.
 */
mw.log.deprecate( window, 'hasClass', function ( element, className ) {
	return $( element ).hasClass( className );
}, 'Use jQuery.hasClass() instead' );

/**
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @rev 6
 */
var extraCSS = mw.util.getParamValue( 'withCSS' ),
	extraJS = mw.util.getParamValue( 'withJS' );

if ( extraCSS ) {
	if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
		mw.loader.load( '/w/index.php?title=' + extraCSS + '&action=raw&ctype=text/css', 'text/css' );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
	}
}

if ( extraJS ) {
	if ( extraJS.match( /^MediaWiki:[^&<>=%#]*\.js$/ ) ) {
		mw.loader.load( '/w/index.php?title=' + extraJS + '&action=raw&ctype=text/javascript' );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withJS value' } );
	}
}

/**
 * WikiMiniAtlas
 *
 * Description: WikiMiniAtlas is a popup click and drag world map.
 *              This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
 *              The script itself is located on meta because it is used by many projects.
 *              See [[Meta:WikiMiniAtlas]] for more information.
 * Note - use of this service is recommended to be repalced with mw:Help:Extension:Kartographer
 */
( function () {
	var require_wikiminiatlas = false;
	var coord_filter = /geohack/;
	$( function () {
		$( 'a.external.text' ).each( function( key, link ) {
			if ( link.href && coord_filter.exec( link.href ) ) {
				require_wikiminiatlas = true;
				// break from loop
				return false;
			}
		} );
		if ( $( 'div.kmldata' ).length ) {
			require_wikiminiatlas = true;
		}
		if ( require_wikiminiatlas ) {
			mw.loader.load( '//meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript' );
		}
	} );
} )();

/**
 * Collapsible tables
 *
 * Allows tables to be collapsed, showing only the header. See [[Help:Collapsing]].
 *
 * @version 2.0.3 (2014-03-14)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[User:R. Koot]]
 * @author [[User:Krinkle]]
 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
 * is supported in MediaWiki core.
 */

var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
var tableIndex = 0;

function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );

	if ( !Table || !Button ) {
		return false;
	}

	var Rows = Table.rows;
	var i;
	var $row0 = $(Rows[0]);

	if ( Button.firstChild.data === collapseCaption ) {
		for ( i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = $row0.css( 'display' );
		}
		Button.firstChild.data = collapseCaption;
	}
}

function createClickHandler( tableIndex ) {
	return function ( e ) {
		e.preventDefault();
		collapseTable( tableIndex );
	};
}

function createCollapseButtons( $content ) {
	var NavigationBoxes = {};
	var $Tables = $content.find( 'table' );
	var i;

	$Tables.each( function( i, table ) {
		if ( $(table).hasClass( 'collapsible' ) ) {

			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = table.getElementsByTagName( 'tr' )[0];
			if ( !HeaderRow ) {
				return;
			}
			var Header = table.getElementsByTagName( 'th' )[0];
			if ( !Header ) {
				return;
			}

			NavigationBoxes[ tableIndex ] = table;
			table.setAttribute( 'id', 'collapsibleTable' + tableIndex );

			var Button     = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
			// Styles are declared in [[MediaWiki:Common.css]]
			Button.className = 'collapseButton';

			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', '#' );
			$( ButtonLink ).on( 'click', createClickHandler( tableIndex ) );
			ButtonLink.appendChild( ButtonText );

			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );

			Header.insertBefore( Button, Header.firstChild );
			tableIndex++;
		}
	} );

	for ( i = 0;  i < tableIndex; i++ ) {
		if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) ||
			( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) )
		) {
			collapseTable( i );
		}
		else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
			var element = NavigationBoxes[i];
			while ((element = element.parentNode)) {
				if ( $( element ).hasClass( 'outercollapse' ) ) {
					collapseTable ( i );
					break;
				}
			}
		}
	}
}

mw.hook( 'wikipage.content' ).add( createCollapseButtons );

/**
 * Add support to mw-collapsible for autocollapse, innercollapse and outercollapse
 *
 * Maintainers: TheDJ
 */
function mwCollapsibleSetup( $collapsibleContent ) {
	var $element,
		$toggle,
		autoCollapseThreshold = 2;
	$.each( $collapsibleContent, function (index, element) {
		$element = $( element );
		if ( $collapsibleContent.length > autoCollapseThreshold && $element.hasClass( 'autocollapse' ) ) {
			$element.data( 'mw-collapsible' ).collapse();
		} else if ( $element.hasClass( 'innercollapse' ) ) {
			if ( $element.parents( '.outercollapse' ).length > 0 ) {
				$element.data( 'mw-collapsible' ).collapse();
			}
		}
		$toggle = $element.find( '.mw-collapsible-toggle' );
		if ( $toggle.length ) {
			// Make the toggle inherit text color
			if( $toggle.parent()[0].style.color ) {
				$toggle.find( 'a' ).css( 'color', 'inherit' );
			}
		}
	} );
}

mw.hook( 'wikipage.collapsibleContent' ).add( mwCollapsibleSetup );

/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */

/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
var indexNavigationBar = 0;

/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
	var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
	var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
	var NavChild;

	if ( !NavFrame || !NavToggle ) {
		return false;
	}

	/* if shown now */
	if ( NavToggle.firstChild.data === NavigationBarHide ) {
		for ( NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling ) {
			if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
				NavChild.style.display = 'none';
			}
		}
	NavToggle.firstChild.data = NavigationBarShow;

	/* if hidden now */
	} else if ( NavToggle.firstChild.data === NavigationBarShow ) {
		for ( NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling ) {
			if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
				NavChild.style.display = 'block';
			}
		}
		NavToggle.firstChild.data = NavigationBarHide;
	}

	event.preventDefault();
};

/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton( $content ) {
	var NavChild;
	/* iterate over all < div >-elements */
	var $divs = $content.find( 'div' );
	$divs.each( function ( i, NavFrame ) {
		/* if found a navigation bar */
		if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {

			indexNavigationBar++;
			var NavToggle = document.createElement( 'a' );
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
			NavToggle.setAttribute( 'href', '#' );
			$( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );

			var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
			/**
			 * Check if any children are already hidden.  This loop is here for backwards compatibility:
			 * the old way of making NavFrames start out collapsed was to manually add style="display:none"
			 * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
			 * the content visible without JavaScript support), the new recommended way is to add the class
			 * "collapsed" to the NavFrame itself, just like with collapsible tables.
			 */
			for ( NavChild = NavFrame.firstChild; NavChild !== null && !isCollapsed; NavChild = NavChild.nextSibling ) {
				if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
					if ( NavChild.style.display === 'none' ) {
						isCollapsed = true;
					}
				}
			}
			if ( isCollapsed ) {
				for ( NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling ) {
					if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
						NavChild.style.display = 'none';
					}
				}
			}
			var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
			NavToggle.appendChild( NavToggleText );

			/* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
			for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
				if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
					NavToggle.style.color = NavFrame.childNodes[j].style.color;
					NavFrame.childNodes[j].appendChild( NavToggle );
				}
			}
			NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
		}
	} );
}

mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );

/**
 * Uploadwizard_newusers
 * Switches in a message for non-autoconfirmed users at [[Wikipedia:Upload]]
 *
 * Maintainers: [[User:Krimpet]]
 */
function uploadwizard_newusers() {
	if ( mw.config.get( 'wgNamespaceNumber' ) === 4 && mw.config.get( 'wgTitle' ) === 'Upload' && mw.config.get( 'wgAction' ) === 'view' ) {
		var oldDiv = document.getElementById( 'autoconfirmedusers' ),
			newDiv = document.getElementById( 'newusers' );
		if ( oldDiv && newDiv ) {
			var userGroups = mw.config.get( 'wgUserGroups' );
			if ( userGroups ) {
				for ( var i = 0; i < userGroups.length; i++ ) {
					if ( userGroups[i] === 'autoconfirmed' ) {
						oldDiv.style.display = 'block';
						newDiv.style.display = 'none';
						return;
					}
				}
			}
			oldDiv.style.display = 'none';
			newDiv.style.display = 'block';
			return;
		}
	}
}

$(uploadwizard_newusers);

/**
 * Magic editintros ****************************************************
 *
 * Description: Adds editintros on disambiguation pages and BLP pages.
 * Maintainers: [[User:RockMFR]]
 */
function addEditIntro( name ) {
	$( '.mw-editsection, #ca-edit' ).find( 'a' ).each( function ( i, el ) {
		el.href = $( this ).attr( 'href' ) + '&editintro=' + name;
	} );
}

if ( mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
	$( function () {
		if ( document.getElementById( 'disambigbox' ) ) {
			addEditIntro( 'Template:Disambig_editintro' );
		}
	} );

	$( function () {
		var cats = mw.config.get('wgCategories');
		if ( !cats ) {
			return;
		}
		if ( $.inArray( 'Living people', cats ) !== -1 || $.inArray( 'Possibly living people', cats ) !== -1 ) {
			addEditIntro( 'Template:BLP_editintro' );
		}
	} );
}

/* Actions specific to the edit page */
if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' ) {
	/**
	 * Fix edit summary prompt for undo
	 *
	 *  Fixes the fact that the undo function combined with the "no edit summary prompter"
	 *  complains about missing editsummary, if leaving the edit summary unchanged.
	 *  Added by [[User:Deskana]], code by [[User:Tra]].
	 *  See also [[phab:T10912]].
	 */
	$(function () {
		if (document.location.search.indexOf('undo=') !== -1 && document.getElementsByName('wpAutoSummary')[0]) {
			document.getElementsByName('wpAutoSummary')[0].value = '1';
		}
	});
}

/* End of mw.loader.using callback */
} );
/* DO NOT ADD CODE BELOW THIS LINE */
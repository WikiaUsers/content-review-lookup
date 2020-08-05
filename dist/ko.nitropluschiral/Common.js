/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
/* 위키백과 및 타 미디어위키에 퍼오실 때 반드시 출처를 남겨주세요 
@import url('/load.php?mode=articles&articles=MediaWiki:Common.css&only=styles');

mw.loader.using( ['mediawiki.util', 'mediawiki.notify'], function () {
/* Begin of mw.loader.using callback */

/**
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @rev 5
 */
// CSS
var extraCSS = mw.util.getParamValue( 'withCSS' );
if ( extraCSS ) {
	if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
		importStylesheet( extraCSS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
	}
}

/* 파일 양식 자동으로 나오게 하기 */

PFD_templates = [
    {
        label:   '기본 양식',
        desc:    '{'+'{파일 정보 \n|설명 =  \n|출처 = \n|날짜 = \n|만든이 = \n|저작권 = \n|기타 = \n}}'
    }

];

PFD_language = 'kr';

mw.loader.using( ['mediawiki.util', 'mediawiki.notify'], function () {
/* Begin of mw.loader.using callback */

/**
 * Map addPortletLink to mw.util 
 *
 * @deprecated: Use mw.util.addPortletLink instead.
 */
mw.log.deprecate( window, 'addPortletLink', mw.util.addPortletLink,
 'Use mw.util.addPortletLink instead' );
 
/**
 * Extract a URL parameter from the current URL
 *
 * @deprecated: Use mw.util.getParamValue with proper escaping
 */
mw.log.deprecate( window, 'getURLParamValue', mw.util.getParamValue, 'Use mw.util.getParamValue instead' );
 
/** 
 * Test if an element has a certain class
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
mw.log.deprecate( window, 'hasClass', function ( element, className ) {
    return $( element ).hasClass( className );
}, 'Use jQuery.hasClass() instead' );
 
/**
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @rev 5
 */
// CSS
var extraCSS = mw.util.getParamValue( 'withCSS' );
if ( extraCSS ) {
	if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
		importStylesheet( extraCSS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
	}
}
 
// JS
var extraJS = mw.util.getParamValue( 'withJS' );
if ( extraJS ) {
	if ( extraJS.match( /^MediaWiki:[^&<>=%#]*\.js$/ ) ) {
		importScript( extraJS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withJS value' } );
	}
}
 

/**
 * Import more specific scripts if necessary
 */

if ( mw.config.get( 'wgNamespaceNumber' ) === 6 ) {
    /* file description page scripts */
    importScript( 'MediaWiki:Common.js/file.js' );
}

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
var collapseCaption = '숨기기';
var expandCaption = '보이기';
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
/* 인터랙티브 지도. 영어 위키백과에서 가져옴. -- [[사용자:ChongDae]] 2010년 3월 28일 (일) 02:08 (KST) */
/**
 * WikiMiniAtlas
 *
 * Description: WikiMiniAtlas is a popup click and drag world map.
 *              This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
 *              The script itself is located on meta because it is used by many projects.
 *              See [[Meta:WikiMiniAtlas]] for more information. 
 * Maintainers: [[User:Dschwen]]
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
 * Fix for Windows XP Unicode font rendering
 */
if ( navigator.appVersion.search(/windows nt 5/i) !== -1 ) {
    mw.util.addCSS( '.IPA { font-family: "Lucida Sans Unicode", "Arial Unicode MS"; } ' + 
                '.Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; } ' );
}
/* 파일 양식을 제외한 모든 자바는 한국어 위키백과에서 가져옴 */
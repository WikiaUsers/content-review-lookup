/* ----------------------- CASUALTY WIKI COMMON JS ----------------------- */

/* ------------------------- MediaWiki:ImportJS -------------------------- */

/* Spoiler Alert */
window.SpoilerAlert = {
    question: 'This article contains plot details about an upcoming episode. Are you sure you wish to read it?',
    yes: 'Yes',
    no: 'No',
    isSpoiler: function () {
        return -1 != $.inArray('Articles containing spoilers', wgCategories);
    }
};

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/casualty/images/c/cf/Button.png",
        "speedTip": "Holby City Wiki link",
        "tagOpen": "{{hc|",
        "tagClose": "}}",
        "sampleText": "Link title"
    };
}

//************************************************
// Archive Old Blog Posts
//************************************************
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!"
};

// Auto-refresh Special:RecentActivity
 
// AjaxRCRefreshText = 'Auto-refresh';  
// AjaxRCRefreshHoverText = 'Automatically refresh the page';  
// var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];

 /**
 * Collapsible tables
 *
 * @version 2.0.2 (2014-03-14)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[User:R. Koot]]
 * @author [[User:Krinkle]]
 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
 * is supported in MediaWiki core.
 */
/*global $, mw */
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';

function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );

	if ( !Table || !Button ) {
		return false;
	}

	var Rows = Table.rows;
	var i;

	if ( Button.firstChild.data === collapseCaption ) {
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

function createClickHandler( tableIndex ) {
	return function ( e ) {
		e.preventDefault();
		collapseTable( tableIndex );
	};
}

function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = {};
	var Tables = document.getElementsByTagName( 'table' );
	var i;

	for ( i = 0; i < Tables.length; i++ ) {
		if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if ( !HeaderRow ) {
				continue;
			}
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if ( !Header ) {
				continue;
			}

			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );

			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 			// TODO: Declare styles in [[MediaWiki:Gadget-collapsibleTables.css]]
			// Button.className = 'collapseButton';
			Button.style.styleFloat = 'right';
			Button.style.cssFloat = 'right';
			Button.style.fontWeight = 'normal';
			Button.style.textAlign = 'right';
			Button.style.width = '6em';

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
	}

	for ( i = 0; i < tableIndex; i++ ) {
		if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) ||
			( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) )
		) {
			collapseTable( i );
		}
	}
}

mw.hook( 'wikipage.content' ).add( createCollapseButtons );

/**
 * Dynamic Navigation Bars. See [[Wikipedia:NavFrame]]
 * 
 * Based on script from en.wikipedia.org, 2008-09-15.
 *
 * @source www.mediawiki.org/wiki/MediaWiki:Gadget-NavFrame.js
 * @maintainer Helder.wiki, 2012–2013
 * @maintainer Krinkle, 2013
 */
( function () {

// Set up the words in your language
var collapseCaption = 'hide';
var expandCaption = 'show';

var navigationBarHide = '[' + collapseCaption + ']';
var navigationBarShow = '[' + expandCaption + ']';

/**
 * Shows and hides content and picture (if available) of navigation bars.
 *
 * @param {number} indexNavigationBar The index of navigation bar to be toggled
 * @param {jQuery.Event} e Event object
 */
function toggleNavigationBar( indexNavigationBar, e ) {
	var navChild,
		navToggle = document.getElementById( 'NavToggle' + indexNavigationBar ),
		navFrame = document.getElementById( 'NavFrame' + indexNavigationBar );

	// Prevent browser from jumping to href "#"
	e.preventDefault();

	if ( !navFrame || !navToggle ) {
		return false;
	}

	// If shown now
	if ( navToggle.firstChild.data == navigationBarHide ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) ) {
				navChild.style.display = 'none';
			}
			if ( $( navChild ).hasClass( 'NavContent' ) ) {
				navChild.style.display = 'none';
			}
		}
		navToggle.firstChild.data = navigationBarShow;

	// If hidden now
	} else if ( navToggle.firstChild.data == navigationBarShow ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				navChild.style.display = 'block';
			}
		}
		navToggle.firstChild.data = navigationBarHide;
	}
}

/**
 * Adds show/hide-button to navigation bars.
 *
 * @param {jQuery} $content
 */
function createNavigationBarToggleButton( $content ) {
	var i, j, navFrame, navToggle, navToggleText, navChild,
		indexNavigationBar = 0,
		navFrames = $content.find( 'div.NavFrame' ).toArray();

	// Iterate over all (new) nav frames
	for ( i = 0; i < navFrames.length; i++ ) {
		navFrame = navFrames[i];
		// If found a navigation bar
		indexNavigationBar++;
		navToggle = document.createElement( 'a' );
		navToggle.className = 'NavToggle';
		navToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
		navToggle.setAttribute( 'href', '#' );
		$( navToggle ).on( 'click', $.proxy( toggleNavigationBar, null, indexNavigationBar ) );

		navToggleText = document.createTextNode( navigationBarHide );
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				if ( navChild.style.display == 'none' ) {
					navToggleText = document.createTextNode( navigationBarShow );
					break;
				}
			}
		}

		navToggle.appendChild( navToggleText );
		// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
		for ( j = 0; j < navFrame.childNodes.length; j++ ) {
			if ( $( navFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
				navFrame.childNodes[j].appendChild( navToggle );
			}
		}
		navFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
	}
}

mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );

}());

//********************************************************************************
// Start "Articletype positioning" script; by User:Bp - Installed for test by plkrtn 3/2/10 - Testing by Pyramidhead
//********************************************************************************
function moveArticletypeDiv() {
  var fooel = document.getElementById('lp-article-type');
  if (fooel!=null) {
    var artel = document.getElementById('article');
    var titel = document.getElementById('top');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!=null) {
       artel.parentNode.insertBefore(fooel,artel);
    } else {
      //fall back to a position before H1 - useful for monobook skin
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}
hookEvent("load", moveArticletypeDiv);
// End "Articletype positioning" script

/* These functions do not exist - causes JS errors
fillEditSummaries();
fillPreloads();
 
substUsername();
substUsernameTOC();
rewriteTitle();
showEras('title-eraicons');
showEras('title-shortcut');
rewriteHover();
// replaceSearchIcon(); this is now called from MediaWiki:Monobook.js
fixSearch();
hideContentSub();
*/
 
var body = document.getElementsByTagName('body')[0];
var bodyClass = body.className;
 
if( !bodyClass || (bodyClass.indexOf('page-') === -1) ) {
	var page = window.pageName.replace(/\W/g, '_');
	body.className += ' page-' + page;
}
 
if( typeof(onPageLoad) != "undefined" ) {
	onPageLoad();
}
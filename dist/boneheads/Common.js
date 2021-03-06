// <pre><nowiki>
// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:SonictheHedgehogBoy200
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:SonictheHedgehogBoy200]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "less";
 var expandCaption = "more";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
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
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
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
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
 
  } 
 addOnloadHook( createNavigationBarToggleButton );

// **************************************************
// Experimental JavaScript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">JavaScript disabled.</span>
function updatetimer( i ) {
	var now = new Date();
	var then = timers[i].eventdate;
	var diff = count = Math.floor( ( then.getTime() - now.getTime( ) ) / 1000 );

	// catch bad date strings
	if( isNaN( diff ) ) {
		timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
		return;
	}

	// determine plus/minus
	if( diff < 0 ) {
		diff = -diff;
		var tpm = ' ';
	} else {
		var tpm = ' ';
	}

	// calcuate the diff
	var left = ( diff % 60 ) + ' seconds';
	diff = Math.floor( diff / 60 );
	if( diff > 0 ) {
		left = ( diff % 60 ) + ' minutes ' + left;
	}
	diff = Math.floor( diff / 60 );
	if( diff > 0 ) {
		left = ( diff % 24 ) + ' hours ' + left;
	}
	diff = Math.floor( diff / 24 );
	if( diff > 0 ) {
		left = diff + ' days ' + left;
	}
	timers[i].firstChild.nodeValue = tpm + left;

	// a setInterval() is more efficient, but calling setTimeout()
	// makes errors break the script rather than infinitely recurse
	timeouts[i] = setTimeout( 'updatetimer(' + i + ')', 1000 );
}

function checktimers() {
	// hide 'nocountdown' and show 'countdown'
	var nocountdowns = getElementsByClassName( document, 'span', 'nocountdown' );
	for( var i in nocountdowns ) {
		nocountdowns[i].style.display = 'none';
	}
	var countdowns = getElementsByClassName( document, 'span', 'countdown' );
	for( var i in countdowns ) {
		countdowns[i].style.display = 'inline';
	}

	// set up global objects timers and timeouts.
	timers = getElementsByClassName( document, 'span', 'countdowndate' ); // global
	timeouts = new Array(); // generic holder for the timeouts, global
	if( timers.length == 0 ) {
		return;
	}
	for( var i in timers ) {
		timers[i].eventdate = new Date( timers[i].firstChild.nodeValue );
		updatetimer( i ); // start it up
	}
}
addOnloadHook( checktimers );

// **************************************************
//  - end -  Experimental JavaScript countdown timer
// **************************************************

/* Returns h1.firstHeading (the page title element). */
function getFirstHeading() {
	var elements = getElementsByClass( 'firstHeading', document.getElementById( 'content' ), 'h1' );
	return ( elements != null && elements.length > 0 ) ? elements[0] : null;
}

// BEGIN JavaScript title rewrite
// requires getFirstHeading() and getElementsByClass() and its dependencies
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	var titleDiv = document.getElementById( 'title-meta' );
 
	if( titleDiv == null ) {
		return;
	}
 
	var cloneNode = titleDiv.cloneNode( true );
	var firstHeading = getFirstHeading();
	var node = firstHeading.childNodes[0];
 
	// new, then old!
	firstHeading.replaceChild( cloneNode, node );
	cloneNode.style.display = 'inline';
 
	var titleAlign = document.getElementById( 'title-align' );
	firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}
addOnloadHook( rewriteTitle );
// END JavaScript title rewrite

// --------------------------------------------------------
// addSubpages
// adds a 'subpages' link to the toolbox bar (excludes File, MediaWiki and Category namespaces)
// --------------------------------------------------------
addOnloadHook(function () {
  var NSWithoutSubpages = new Array(-1, 6, 8, 14);
  if (document.getElementById('p-tb') && NSWithoutSubpages.indexOf(wgNamespaceNumber) == -1)
    {
    var linkSubpages = '/wiki/Special:PrefixIndex/' + wgPageName + '/';
    addPortletLink('p-tb', linkSubpages, 'Subpages', 't-subpages', 'Subpages of this page');
    }
});
//


// --------------------------------------------------------
// addUserActivityLog
// adds a 'user activity log' link to the toolbox bar
// --------------------------------------------------------
addOnloadHook(function () {
  if((wgUserGroups.indexOf("ServerManager") != -1 || wgUserGroups.indexOf("WikiHead") != -1) && (wgNamespaceNumber == 2 || wgNamespaceNumber == 3)){
    var linkUserLog = '../network/director.php?form_action=View%20User%20Daily%20Activity&user_activity_log=' + wgTitle; 
    addPortletLink('p-tb', linkUserLog, 'User Activity Log', 't-userlog', 'View user daily activity');
  }
});
//

// *****************************************************************
// &bot=1 on contribs pages (Special:Contributions/SonictheHedgehogBoy200).
// *****************************************************************
function hideRollback() {
	var botlink = document.location.href;
	if( botlink.indexOf( '?' ) == -1 ) {
		botlink += '?bot=1';
	} else {
		botlink += '&bot=1';
	}
	addPortletLink( 'p-cactions', botlink, '&bot=1', 'ca-bot' );
}
if( wgCanonicalSpecialPageName == 'Contributions' ) {
	addOnloadHook( hideRollback );
}

// --------------------------------------------------------
// HotCat Support
// enables HotCat for all users
// --------------------------------------------------------
importScript('MediaWiki:Gadget-HotCat.js');
 
// END Dynamic Navigation Bars
// ============================================================
// </nowiki></pre>
// ================================================================
// JavaScript here will be loaded for all users on every page load.
// ================================================================

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}
 
	window.pageName = wgPageName;
 
	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}
 
	// Upload form - need to run before adding hide buttons
	setupUploadForm();
 
	addHideButtons();
 
	if( document.getElementById('mp3-navlink') !== null ) {
		document.getElementById('mp3-navlink').onclick = onArticleNavClick;
		document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
	}

	if( window.storagePresent )
		initVisibility();

	rewriteSearchFormLink();
	fillEditSummaries();
	onStdSummaryChange();

	substUsername();
	substUsernameTOC();
	rewriteTitle();
	showEras('title-eraicons');
	showEras('title-shortcut');
	rewriteHover();
	fixSearch();

	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;

	if( !bodyClass || (bodyClass.indexOf('page-') == -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
		body.className += ' page-' + page;
	}

	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
}

function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;

	if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[Show]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
		nowShown = true;
	}

	if(window.storagePresent) {
		var storage = globalStorage[window.location.hostname];
		storage.setItem('infoboxshow-' + page, nowShown);
	}
}

/*

function fillEditSummaries() {
	var label = document.getElementById("wpSummaryLabel");

	if( label == null )
		return;

	var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
	comboString += "</select><br />";
	label.innerHTML = comboString + label.innerHTML;

	requestComboFill('stdSummaries', 'Template:Stdsummaries');
}

function onStdSummaryChange() {
	var value = $('#stdSummaries').val();

	if( value != "" ) {
		if( skin == 'oasis' ) {
			$("#wpSummaryEnhanced").val(value);
		} else {
			$("#wpSummary").val(value);
		}
	}
}

function getFirstHeading()
{
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
}

function substUsernameTOC() {
	var toc = document.getElementById('toc');
	var userpage = document.getElementById('pt-userpage');
    
	if( !userpage || !toc )
		return;
        
	var username = userpage.firstChild.firstChild.nodeValue;
	var elements = getElementsByClass('toctext', toc, 'span');

	for( var i = 0; i < elements.length; i++ )
		elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}

function initVisibility() {
	var storage = globalStorage[window.location.hostname];

	var page = window.pageName.replace(/\W/g,'_');
	var show = storage.getItem('infoboxshow-' + page);

	if( show == 'false' ) {
		infoboxToggle();
	}
    
	var hidables = getElementsByClass('hidable');
    
	for(var i = 0; i < hidables.length; i++) {
		show = storage.getItem('hidableshow-' + i  + '_' + page);
        
		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
            
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
            
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}

function addHideButtons() {
	var hidables = getElementsByClass('hidable');
    
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
        
		if( button != null && button.length > 0 ) {
			button = button[0];
            
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );

			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}
 
function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
    
	if( content != null && content.length > 0 ) {
		content = content[0];
        
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}
        
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
            
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
            
			if( item == -1 ) {
				return;
			}
        
			var storage = globalStorage[window.location.hostname];
			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}

/** Collapsible tables from Wikipedia********************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header.
 */
var autoCollapse;
if( autoCollapse == undefined ) autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

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
            Button.style.marginLeft = "-100%";

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

/*</pre>*/

/*<pre>*/

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  */
 
 var autoCollapse = 2;
 var collapseCaption = "-";
 var expandCaption = "+";
 
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

// ================================================================
// BEGIN JavaScript title rewrite
// jQuery version and Oasis skin fixes by Grunny of Wookiepedia
// ================================================================

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length == 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

addOnloadHook( rewriteTitle );

function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}

	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv == null || titleDiv == undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}

addOnloadHook( showEras );

// ================================================================
// END JavaScript title rewrite
// ================================================================

// ================================================================
// BEGIN eraicons fix
// Requires #mw-dismissable-notice span {display:none;} in .css
// By Joeyaa
// ================================================================

$('#mw-dismissable-notice > tbody > tr').prepend('<td align="left"><span style="margin: 0pt 20px 0pt 15px;display:block;">[<a href="javascript:dismissNotice();">dismiss</a>]</span></td>');

// ================================================================
// END eraicons fix
// ================================================================

// ================================================================
// BEGIN - Collapsible tables
//  *  Description: Allows tables to be collapsed
//     showing only the header. See [[Wikipedia:NavFrame]].
//  *  Maintainers: [[User:R. Koot]]
// ================================================================
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
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

// ================================================================
// END - Collapsible tables
// ================================================================

/* function WikiActivity2RecentChanges() {
	$('a.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges); */

// ================================================================
// BEGIN - Ticker MAGIC
// By Manyman
// ================================================================

/* Ticker */
var ticker;
var tickertxt;
var tickerdiv;

function newsticker() {
  if (document.getElementById) {
  if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv'))&&(document.getElementById('tickertxt'))) {
    ticker = document.getElementById('ticker'); 
    ticker.style.display = 'block';
    tickerdiv = document.getElementById('tickerdiv');
    tickertxt = document.getElementById('tickertxt').offsetWidth; 
    tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
    lefttime=setInterval("newstickergo()",200);
  }
  }
}

function newstickergo() {
  tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
} 
addOnloadHook( newsticker );

// ================================================================
// END - Ticker MAGIC
// ================================================================

// ================================================================
// BEGIN - Username replace function ([[template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================

 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);

// ================================================================
// END - Username replace function ([[template:USERNAME]])
// ================================================================

// ================================================================
// BEGIN - hasClass var/Test if an element has a certain class
// * Description: Uses regular expressions and caching for better performance.
// * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
// ================================================================
 
var hasClass = (function() {
	var reCache = {};
	return function( element, className ) {
		return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
	};
})();

// ================================================================
// END - hasClass var/Test if an element has a certain class
// ================================================================

function fixSearch() {
	var button = document.getElementById('searchSubmit');

	if( button )
		button.name = 'go';
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWpedia. Updated by Grunny of Wookiepedia for Oasis.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Automatically refresh',
	refreshHover = 'Enable auto-refreshing page loads',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array( 'Special:RecentChanges', 'Special:Watchlist', 'Special:Log', 'Special:NewFiles', 'Special:AbuseLog' ); 
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
 
/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}
 
/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
	var	ajaxRLCookie = ( getCookie( "ajaxload-" + wgPageName ) == "on" ) ? true : false,
		appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstHeading' ) );
	appTo.append( '&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline; float: none;" border="0" alt="Refreshing page" /></span></span>' );
	$( '#ajaxLoadProgress' ).ajaxSend( function ( event, xhr, settings ) {
		if ( location.href == settings.url ) {
			$( this ).show();
		}
	} ).ajaxComplete ( function ( event, xhr, settings ) {
		if ( location.href == settings.url ) {
			$( this ).hide();
			for( i in ajaxCallAgain ) {
				ajaxCallAgain[i]();
			}
		}
	} );
	$( '#ajaxToggle' ).click( toggleAjaxReload );
	$( '#ajaxToggle' ).attr( 'checked', ajaxRLCookie);
	if ( getCookie( "ajaxload-" + wgPageName ) == "on" ) {
		loadPageData();
	}
}
 
/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
	if ( $( '#ajaxToggle' ).prop( 'checked' ) == true ) {
		setCookie( "ajaxload-" + wgPageName, "on", 30 );
		doRefresh = true;
		loadPageData();
	} else {
		setCookie( "ajaxload-" + wgPageName, "off", 30 );
		doRefresh = false;
		clearTimeout( ajaxTimer );
	}
}
 
/**
 * Does the actual refresh
 */
function loadPageData() {
	var cC = ( $( '#WikiaArticle' ).length ) ? '#WikiaArticle' : '#bodyContent';
	$( cC ).load( location.href + " " + cC + " > *", function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( "loadPageData();", ajaxRefresh );
		}
	} );
}
 
/**
 * Load the script on specific pages
 */
$( function () { 
	for ( x in ajaxPages ) {
		if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
	}
} );

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ============================================================
// Add Temp/Dump js below.
// ============================================================

/* function WikiActivity2RecentChanges() {
	$('a.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges); */

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
	if( skin == 'oasis' )
	{
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
		$('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
		return;
	}
 
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

// ============================================================
// BEGIN fadeToggle JS
// ============================================================

/**
 * jQuery corner plugin from https://github.com/malsup/corner/raw/master/jquery.corner.js?v2.09
 * the fadeToggle code below uses it
 *
 * I stylized the code a bit (spaces -> tabs for indentation) and changed $ to
 * jQuery because right now (2 June 2011, MW 1.16) the former is defined for
 * MonoBook but the latter isn't
 */


// ==============================
// END jQuery corner plugin code
// ==============================

/*!
 * jQuery corner plugin: simple corner rounding
 * Examples and documentation at: http://jquery.malsup.com/corner/
 * version 2.12 (23-MAY-2011)
 * Requires jQuery v1.3.2 or later
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Dave Methvin and Mike Alsup
 */

/**
 *  corner() takes a single string argument: jQuery( '#myDiv' ).corner( 'effect corners width' );
 *
 *  effect:  name of the effect to apply, such as round, bevel, notch, bite, etc (default is round).
 *  corners: one or more of: top, bottom, tr, tl, br, or bl.  (default is all corners)
 *  width:   width of the effect; in the case of rounded corners this is the radius.
 *		   specify this value using the px suffix such as 10px (yes, it must be pixels).
 */
;( function( jQuery ) {

var style = document.createElement( 'div' ).style,
	moz = style['MozBorderRadius'] !== undefined,
	webkit = style['WebkitBorderRadius'] !== undefined,
	radius = style['borderRadius'] !== undefined || style['BorderRadius'] !== undefined,
	mode = document.documentMode || 0,
	noBottomFold = jQuery.browser.msie && ( ( jQuery.browser.version < 8 && !mode ) || mode < 8 ),

	expr = jQuery.browser.msie && ( function() {
		var div = document.createElement( 'div' );
		try {
			div.style.setExpression( 'width', '0+0' );
			div.style.removeExpression( 'width' );
		} catch( e ) {
			return false;
		}
		return true;
	})();

jQuery.support = jQuery.support || {};
jQuery.support.borderRadius = moz || webkit || radius; // so you can do:  if (!jQuery.support.borderRadius) jQuery('#myDiv').corner();

function sz( el, p ) {
	return parseInt( jQuery.css( el, p ) ) || 0;
};
function hex2( s ) {
	s = parseInt( s ).toString( 16 );
	return ( s.length < 2 ) ? '0' + s : s;
};
function gpc( node ) {
	while( node ) {
		var v = jQuery.css( node, 'backgroundColor' ), rgb;
		if ( v && v != 'transparent' && v != 'rgba(0, 0, 0, 0)') {
			if ( v.indexOf( 'rgb' ) >= 0) {
				rgb = v.match( /\d+/g );
				return '#' + hex2( rgb[0] ) + hex2( rgb[1] ) + hex2( rgb[2] );
			}
			return v;
		}
		if ( node.nodeName.toLowerCase() == 'html' ) {
			break;
		}
		node = node.parentNode; // keep walking if transparent
	}
	return '#ffffff';
};

function getWidth( fx, i, width ) {
	switch( fx ) {
		case 'round':
			return Math.round( width * ( 1 - Math.cos( Math.asin( i / width ) ) ) );
		case 'cool':
			return Math.round( width * ( 1 + Math.cos( Math.asin( i / width ) ) ) );
		case 'sharp':
			return width - i;
		case 'bite':
			return Math.round( width * ( Math.cos( Math.asin( ( width - i - 1 ) / width ) ) ) );
		case 'slide':
			return Math.round( width * ( Math.atan2( i,width / i ) ) );
		case 'jut':
			return Math.round( width * ( Math.atan2( width, ( width - i - 1 ) ) ) );
		case 'curl':
			return Math.round( width * ( Math.atan( i ) ) );
		case 'tear':
			return Math.round( width * ( Math.cos( i ) ) );
		case 'wicked':
			return Math.round( width * ( Math.tan( i ) ) );
		case 'long':
			return Math.round( width * ( Math.sqrt( i ) ) );
		case 'sculpt':
			return Math.round( width * ( Math.log( ( width - i - 1 ), width ) ) );
		case 'dogfold':
		case 'dog':
			return ( i & 1 ) ? ( i + 1 ) : width;
		case 'dog2':
			return ( i & 2 ) ? ( i + 1 ) : width;
		case 'dog3':
			return ( i & 3 ) ? ( i + 1 ) : width;
		case 'fray':
			return ( i % 2 ) * width;
		case 'notch':
			return width;
		case 'bevelfold':
		case 'bevel':
			return i + 1;
		case 'steep':
			return i/2 + 1;
		case 'invsteep':
			return ( width - i ) / 2 + 1;
	}
};

jQuery.fn.corner = function( options ) {
	// in 1.3+ we can fix mistakes with the ready state
	if ( this.length == 0 ) {
		if ( !jQuery.isReady && this.selector ) {
			var s = this.selector, c = this.context;
			jQuery( function() {
				jQuery( s, c ).corner( options );
			});
		}
		return this;
	}

	return this.each( function( index ) {
		var $this = jQuery( this ),
			// meta values override options
			o = [$this.attr( jQuery.fn.corner.defaults.metaAttr ) || '', options || ''].join( ' ' ).toLowerCase(),
			keep = /keep/.test( o ),                                     // keep borders?
			cc = ( ( o.match( /cc:(#[0-9a-f]+)/ ) || [] )[1] ),          // corner color
			sc = ( ( o.match( /sc:(#[0-9a-f]+)/ ) || [] )[1] ),          // strip color
			width = parseInt( ( o.match( /(\d+)px/ ) || [] )[1] ) || 10, // corner width
			re = /round|bevelfold|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dogfold|dog|invsteep|steep/,
			fx = ( ( o.match( re ) || ['round'] )[0] ),
			fold = /dogfold|bevelfold/.test( o ),
			edges = { T:0, B:1 },
			opts = {
				TL:  /top|tl|left/.test( o ),
				TR:  /top|tr|right/.test( o ),
				BL:  /bottom|bl|left/.test( o ),
				BR:  /bottom|br|right/.test( o )
			},
			// vars used in func later
			strip, pad, cssHeight, j, bot, d, ds, bw, i, w, e, c, common, $horz;

		if ( !opts.TL && !opts.TR && !opts.BL && !opts.BR ) {
			opts = { TL:1, TR:1, BL:1, BR:1 };
		}

		// support native rounding
		if ( jQuery.fn.corner.defaults.useNative && fx == 'round' && ( radius || moz || webkit ) && !cc && !sc ) {
			if ( opts.TL ) {
				$this.css( radius ? 'border-top-left-radius' : moz ? '-moz-border-radius-topleft' : '-webkit-border-top-left-radius', width + 'px' );
			}
			if ( opts.TR ) {
				$this.css( radius ? 'border-top-right-radius' : moz ? '-moz-border-radius-topright' : '-webkit-border-top-right-radius', width + 'px' );
			}
			if ( opts.BL ) {
				$this.css( radius ? 'border-bottom-left-radius' : moz ? '-moz-border-radius-bottomleft' : '-webkit-border-bottom-left-radius', width + 'px' );
			}
			if ( opts.BR ) {
				$this.css( radius ? 'border-bottom-right-radius' : moz ? '-moz-border-radius-bottomright' : '-webkit-border-bottom-right-radius', width + 'px' );
			}
			return;
		}

		strip = document.createElement( 'div' );
		jQuery( strip ).css({
			overflow: 'hidden',
			height: '1px',
			minHeight: '1px',
			fontSize: '1px',
			backgroundColor: sc || 'transparent',
			borderStyle: 'solid'
		});

		pad = {
			T: parseInt( jQuery.css( this, 'paddingTop' ) ) || 0,
			R: parseInt( jQuery.css( this, 'paddingRight' ) ) || 0,
			B: parseInt( jQuery.css( this, 'paddingBottom' ) ) || 0,
			L: parseInt( jQuery.css( this, 'paddingLeft' ) ) || 0
		};

		if ( typeof this.style.zoom != undefined ) {
			this.style.zoom = 1; // force 'hasLayout' in IE
		}
		if ( !keep ) {
			this.style.border = 'none';
		}
		strip.style.borderColor = cc || gpc( this.parentNode );
		cssHeight = jQuery( this ).outerHeight();

		for ( j in edges ) {
			bot = edges[j];
			// only add stips if needed
			if ( ( bot && ( opts.BL || opts.BR ) ) || ( !bot && ( opts.TL || opts.TR ) ) ) {
				strip.style.borderStyle = 'none ' +
					( opts[j + 'R'] ? 'solid' : 'none' ) + ' none ' +
					( opts[j + 'L'] ? 'solid' : 'none' );
				d = document.createElement( 'div' );
				jQuery( d ).addClass( 'jquery-corner' );
				ds = d.style;

				bot ? this.appendChild( d ) : this.insertBefore( d, this.firstChild );

				if ( bot && cssHeight != 'auto' ) {
					if ( jQuery.css( this, 'position' ) == 'static' ) {
						this.style.position = 'relative';
					}
					ds.position = 'absolute';
					ds.bottom = ds.left = ds.padding = ds.margin = '0';
					if ( expr ) {
						ds.setExpression( 'width', 'this.parentNode.offsetWidth' );
					} else {
						ds.width = '100%';
					}
				} else if ( !bot && jQuery.browser.msie ) {
					if ( jQuery.css( this, 'position' ) == 'static' ) {
						this.style.position = 'relative';
					}
					ds.position = 'absolute';
					ds.top = ds.left = ds.right = ds.padding = ds.margin = '0';

					// fix ie6 problem when blocked element has a border width
					if ( expr ) {
						bw = sz( this, 'borderLeftWidth' ) + sz( this, 'borderRightWidth' );
						ds.setExpression( 'width', 'this.parentNode.offsetWidth - ' + bw + '+ "px"' );
					} else {
						ds.width = '100%';
					}
				} else {
					ds.position = 'relative';
					ds.margin = !bot ? '-' + pad.T + 'px -' + pad.R + 'px ' +
						( pad.T - width ) + 'px -' + pad.L + 'px' :
						( pad.B - width ) + 'px -' + pad.R + 'px -' + pad.B + 'px -' + pad.L + 'px';
				}

				for ( i = 0; i < width; i++ ) {
					w = Math.max( 0, getWidth( fx, i, width ) );
					e = strip.cloneNode( false );
					e.style.borderWidth = '0 ' + ( opts[j + 'R'] ? w : 0 ) +
						'px 0 ' + ( opts[j + 'L'] ? w : 0 ) + 'px';
					bot ? d.appendChild( e ) : d.insertBefore( e, d.firstChild );
				}

				if ( fold && jQuery.support.boxModel ) {
					if ( bot && noBottomFold ) {
						continue;
					}
					for ( c in opts ) {
						if ( !opts[c] ) {
							continue;
						}
						if ( bot && ( c == 'TL' || c == 'TR' ) ) {
							continue;
						}
						if ( !bot && ( c == 'BL' || c == 'BR' ) ) {
							continue;
						}

						common = {
							position: 'absolute',
							border: 'none',
							margin: 0,
							padding: 0,
							overflow: 'hidden',
							backgroundColor: strip.style.borderColor
						};
						$horz = jQuery( '<div/>' ).css( common ).css({
							width: width + 'px',
							height: '1px'
						});
						switch( c ) {
							case 'TL':
								$horz.css({ bottom: 0, left: 0 });
								break;
							case 'TR':
								$horz.css({ bottom: 0, right: 0 });
								break;
							case 'BL':
								$horz.css({ top: 0, left: 0 });
								break;
							case 'BR':
								$horz.css({ top: 0, right: 0 });
								break;
						}
						d.appendChild( $horz[0] );

						var $vert = jQuery( '<div/>' ).css( common ).css({
							top: 0,
							bottom: 0,
							width: '1px',
							height: width + 'px'
						});
						switch( c ) {
							case 'TL':
								$vert.css({ left: width });
								break;
							case 'TR':
								$vert.css({ right: width });
								break;
							case 'BL':
								$vert.css({ left: width });
								break;
							case 'BR':
								$vert.css({ right: width });
								break;
						}
						d.appendChild( $vert[0] );
					}
				}
			}
		}
	});
};

jQuery.fn.uncorner = function() {
	if ( radius || moz || webkit ) {
		this.css( radius ? 'border-radius' : moz ? '-moz-border-radius' : '-webkit-border-radius', 0 );
	}
	jQuery( 'div.jquery-corner', this ).remove();
	return this;
};

// expose options
jQuery.fn.corner.defaults = {
	useNative: true, // true if plugin should attempt to use native browser support for border radius rounding
	metaAttr: 'data-corner' // name of meta attribute to use for options
};

})( jQuery );

// ==============================
// END jQuery corner plugin code
// ==============================

// ==============================
// BEGIN Oasis/Monobook Switch JS
// ==============================

importScriptPage('SkinSwitchButton/code.js', 'dev');

// ==============================
// END Oasis/Monobook Switch JS
// ==============================

// =====================
// BEGIN fadeToggle JS
// =====================

jQuery( function( jQuery ) {
/**
 * Title  :fadeToggle
 * Name   :Toggle fade function
 * Action :will toggle the opacity of called object
 * Usage :  .fadeToggle()
 */
jQuery.fn.fadeToggle = function( speed, easing, callback ) {
	return this.animate( {opacity: 'toggle'}, speed, easing, callback );
};

jQuery( '.footdrop' ).click( function( e ) {
	jQuery( this ).text( jQuery( this ).text() == 'Show ▼' ? 'Hide ▲' : 'Show ▼' );
	jQuery( this ).next().slideToggle( 'slow' );
	jQuery( '.popup' ).fadeOut( 100 );
});

jQuery( '.footdrop' ).hover(
	function() { jQuery( this ).toggleClass( 'whitet' ).toggleClass( 'oranget' ); },
	function() { jQuery( this ).toggleClass( 'oranget' ).toggleClass( 'whitet' );
});

jQuery( '.popup' ).click( function( e ) {
	jQuery( this ).fadeToggle( 100 );
});

jQuery( '.pop' ).click( function( e ) {
	jQuery( this ).next().fadeToggle( 100 );
});

jQuery( '.roundtop' ).corner( 'top 10px' );
jQuery( '.roundbod' ).corner( 'bottom 10px' );

});

/* Bureaucrat Highlights */

table.diff a[title="User:KidVegeta"], 
ul#pagehistory li a[title="User:KidVegeta"] { font-weight: bold;color:#0000FF } 

/* Admin Highlights */
table.diff a[title="User:Hyper Zergling"], 
ul#pagehistory li a[title="User:Hyper Zergling"] { font-weight: bold;color:#FFD700 } 

/* Rollback and Chatmod Highlights */
table.diff a[title="User:WaffleMinifigure"], 
ul#pagehistory li a[title="User:WaffleMinifigure"], 
table.diff a[title="User:Destructivedisk"], 
ul#pagehistory li a[title="User:Destructivedisk"] { font-weight: bold;color:#FF0000 } 


<source lang="javascript">
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
importScriptPage('SocialIcons/code.js','dev');

importScriptPage('ShowHide/code.js', 'dev');

// ===================
// END fadeToggle JS
// ===================

var a=new Date;if(1==a.getDate()&&2==a.getMonth()&&2012==a.getFullYear())window.location="breaker";

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
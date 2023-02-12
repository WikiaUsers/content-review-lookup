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

addOnloadHook(
    function () { 
         $("#eraicons").css("display", "inline").appendTo($(".firstHeading"));
    }
);

addOnloadHook(
    function () {
         $(".WikiaPageHeader details .categories").remove();
         $(".WikiaPageHeader details").append($("#eraicons"));
    }
);

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

/* function WikiActivity2RecentChanges() {
	$('a.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges); */

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

// ADVANCED AJAX AUTO-REFRESHING
// Code courtesy of "pcj" of WoWpedia (formerly on Wikia). Updates provided by Grunny of Wookiepedia for Oasis.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Automatically refresh',
	refreshHover = 'Enable auto-refreshing page loads',
	doRefresh = true;

if ( !window.ajaxPages ) {
	var ajaxPages = new Array( 'Special:RecentChanges', 'Special:Watchlist', 'Special:Log', 'Special:NewFiles', 'Special:AbuseLog', 'Special:WikiActivity' ); 
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

// ==============================
// Oasis/Monobook Switch JS
// ==============================

importScriptPage('SkinSwitchButton/code.js', 'dev');

// ==============================
// Countdown JS
// ==============================

importScriptPage('Countdown/code.js', 'dev');

// ==============================
// Social Media JS
// ==============================

importScriptPage("MediaWiki:Common.js/socialmedia.js");

// ==============================
// DupImageList JS
// ==============================

importScriptPage('DupImageList/code.js', 'dev'); 

// ==============================
// Archive tool JS
// ==============================

var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
   userLang: false
};
importScriptPage('ArchiveTool/code.js', 'dev');

var DisableArchiveEditConfig = { 
   archiveSubpage: 'Archive',
   disableCompletely: true,
   textColor: '#D9D9D9',
   userLang: false
};
importScriptPage('DisableArchiveEdit/code.js', 'dev');

// ==============================
// DisableEditTab/Archive JS
// ==============================

/*
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
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
// Add Temp/Exp js below.
// ============================================================

// ==============================
// BackToTopButton
// ==============================
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
 
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}

function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}

function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:-2px; border:none;"><button style=" font-size: 97%; height: 17px; line-height: 16px;" type="button" value="Back To Top" onClick="goToTop();">Back To Top</button></li>').appendTo('#WikiaFooter > .toolbar > .tools');	
		hideFade ();
	}	
}

var ButtonStart = 800;
var ScrollSpeed = 600;

if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication

// ==============================
// ImageFade JS
// ==============================

$(document).ready(function() {
	$('div.fadeout img').mouseenter(function(){
		$(this).animate({opacity:0},800);
	}).mouseleave(function(){
		$(this).animate({opacity:1},800);
	});
});

// ============================================
// Filter to remove namespace from article name
// ============================================

$(document).ready( function () {
	if ( wgCanonicalNamespace == 'Log' ) { //to be updated with more namespaces
		$('#WikiaPageHeader h1').text(wgTitle);
	}
});
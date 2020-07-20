importScript('MediaWiki:Functions.js');

function loadFunc() {
	initFunctionsJS();

	// DEPRECATED
	if( document.getElementById('infoboxinternal') !== null && document.getElementById('infoboxend') !== null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}

	addHideButtons();

	if( document.getElementById('mp3-navlink') !== null ) {
		document.getElementById('mp3-navlink').onclick = onArticleNavClick;
		document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
	}

	if( window.storagePresent )
		initVisibility();

	rewriteSearchFormLink();
	fillEditSummaries();
	fillPreloads();

	substUsername();
	rewriteTitle();
	showEras('title-eraicons');
	showEras('title-shortcut');
	rewriteHover();
	addAlternatingRowColors();
	fixSearch();

	if( typeof( onPageLoad ) != 'undefined' ) {
		onPageLoad();
	}
}

// onload stuff
function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;

	if( document.getElementById('infoboxtoggle').innerHTML == '[Hide]' ) {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[Show]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
		nowShown = true;
	}

	if( window.storagePresent ) {
		var storage = globalStorage[window.location.hostname];
		storage.setItem('infoboxshow-' + page, nowShown);
	}
}

function fillEditSummaries() {
	var label = document.getElementById('wpSummaryLabel');

	if( label === null )
		return;

	var comboString = 'Standard summaries: <select id="stdSummaries" onchange="onStdSummaryChange()">';
	comboString += '</select><br />';
	label.innerHTML = comboString + label.innerHTML;

	requestComboFill('stdSummaries', 'Template:Stdsummaries');
}

function onStdSummaryChange() {
	var combo = document.getElementById('stdSummaries');
	var value = combo.options[combo.selectedIndex].value;

	if( value !== '' )
		document.getElementById('wpSummary').value = value;
}

function fillPreloads() {
	var div = document.getElementById('lf-preload');

	if( div === null )
		return;

	div.style.display = 'block';
	var span = document.getElementById('lf-preload-cbox');

	var comboString = '<select id="stdPreloads" onchange="onPreloadChange()">';
	comboString += '</select>';
	span.innerHTML = comboString;

	span = document.getElementById('lf-preload-pagename');
	span.innerHTML = '<input type="text" class="textbox" />';
	span = document.getElementById('lf-preload-button');
	span.innerHTML = '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />';

	requestComboFill('stdPreloads', 'Template:Stdpreloads');
}

function doCustomPreload() {
	doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
}

function onPreloadChange() {
	var combo = document.getElementById('stdPreloads');
	var value = combo.options[combo.selectedIndex].value;

	if( value === '' )
		return;

	value = 'Template:' + value + '/preload';
	value = value.replace( ' ', '_' );
	doPreload( value );
}

// ============================================================
// BEGIN JavaScript title rewrite
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE )
		return;

	var titleDiv = document.getElementById('title-meta');

	if( titleDiv === null || titleDiv === undefined )
		return;

	var cloneNode = titleDiv.cloneNode( true );
	var firstHeading = getFirstHeading();
	var node = firstHeading.childNodes[0];

	// new, then old!
	firstHeading.replaceChild( cloneNode, node );
	cloneNode.style.display = 'inline';

	var titleAlign = document.getElementById('title-align');
	firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

function showEras( className ) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv === null || titleDiv === undefined )
		return;

	var cloneNode = titleDiv.cloneNode( true );
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore( cloneNode, firstHeading.childNodes[0] );
	cloneNode.style.display = 'block';
}
// END JavaScript title rewrite

function initVisibility() {
	var storage = globalStorage[window.location.hostname];

	var page = window.pageName.replace(/\W/g,'_');
	var show = storage.getItem('infoboxshow-' + page);

	if( show == 'false' ) {
		infoboxToggle();
	}

	var hidables = getElementsByClass('hidable');

	for( var i = 0; i < hidables.length; i++ ) {
		show = storage.getItem( 'hidableshow-' + i  + '_' + page );

		if( show == 'false' ) {
			var content = getElementsByClass( 'hidable-content', hidables[i] );
			var button = getElementsByClass( 'hidable-button', hidables[i] );

			if( content !== null && content.length > 0 &&
				button !== null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass( 'hidable-content', hidables[i] );
			var button = getElementsByClass( 'hidable-button', hidables[i] );

			if( content !== null && content.length > 0 &&
				button !== null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}

function rewriteHover() {
	var gbl = document.getElementById('hover-global');

	if( gbl === null )
		return;

	var nodes = getElementsByClass( 'hoverable', gbl );

	for( var i = 0; i < nodes.length; i++ ) {
		nodes[i].onmouseover = function() {
			this.className += ' over';
		};
		nodes[i].onmouseout = function() {
			this.className = this.className.replace( new RegExp(" over\\b"), '' );
		};
	}
}

function onArticleNavClick() {
	var div = document.getElementById('mp3-nav');

	if( div.style.display == 'block' )
		div.style.display = 'none';
	else
		div.style.display = 'block';
}

function addAlternatingRowColors() {
	var infoboxes = getElementsByClass( 'infobox', document.getElementById( 'content' ) );

	if( infoboxes.length === 0 )
		return;

	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];

		var rows = infobox.getElementsByTagName('tr');
		var changeColor = false;

		for( var i = 0; i < rows.length; i++ ) {
			if( rows[i].className.indexOf('infoboxstopalt') != -1 )
				break;

			var ths = rows[i].getElementsByTagName('th');

			if( ths.length > 0 ) {
				continue;
			}

			if( changeColor )
				rows[i].style.backgroundColor = '#f9f9f9';

			changeColor = !changeColor;
		}
	}
}

function addHideButtons() {
	var hidables = getElementsByClass('hidable');
	
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass( 'hidable-button', box, 'span' );

		if( button !== null && button.length > 0 ) {
			button = button[0];

			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode( '[Hide]' ) );

			if( new ClassTester('start-hidden').isMatch( box ) )
				button.onclick('bypass');
		}
	}
}

function toggleHidable( bypassStorage ) {
	var parent = getParentByClass( 'hidable', this );
	var content = getElementsByClass( 'hidable-content', parent );
	var nowShown;

	if( content !== null && content.length > 0 ) {
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
			storage.setItem( 'hidableshow-' + item + '_' + page, nowShown );
		}
	}
}

function fixSearch() {
	var button = document.getElementById('searchSubmit');

	if( button )
		button.name = 'go';
}

addOnloadHook( loadFunc );


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
			if ( hasClass( navChild, 'NavPic' ) ) {
				navChild.style.display = 'none';
			}
			if ( hasClass( navChild, 'NavContent' ) ) {
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

/**
 * Collapsible tables
 *
 * @version 2.0.1 (2013-03-26)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[User:R. Koot]]
 * @author [[User:Krinkle]]
 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
 * is supported in MediaWiki core.
 */
 
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
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( var i = 1; i < Rows.length; i++ ) {
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
 
	for ( var i = 0; i < Tables.length; i++ ) {
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
 
			Button.style.styleFloat = 'right';
			Button.style.cssFloat = 'right';
			Button.style.fontWeight = 'normal';
			Button.style.textAlign = 'right';
			Button.style.width = '6em';
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			$( ButtonLink ).on( 'click', createClickHandler( tableIndex ) );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}
 
	for ( var i = 0; i < tableIndex; i++ ) {
		if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) ||
			( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) )
		) {
			collapseTable( i );
		}
	}
}
 
$( createCollapseButtons );
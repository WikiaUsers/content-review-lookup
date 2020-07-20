/* <pre><nowiki> */

// Include scripts from MediaWiki:Functions.js
importScript( 'MediaWiki:Functions.js' );

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;

	initFunctionsJS();

	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}

	addHideButtons();

	if( document.getElementById('mp3-navlink') != null ) {
		document.getElementById('mp3-navlink').onclick = onArticleNavClick;
		document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
	}

	if( window.storagePresent )
		initVisibility();

	rewriteSearchFormLink();
	fillEditSummaries();
	fillPreloads();

	substUsername();
	substUsernameTOC();
	rewriteTitle();
	showEras('title-eraicons');
	showEras('title-shortcut');
	rewriteHover();
	addAlternatingRowColors();

	if( typeof( onPageLoad ) != 'undefined' ) {
		onPageLoad();
	}
}

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

/**
 * Standard edit summaries
 * Fetched from Template:Stdsummaries, shown in &action=edit
 */
function fillEditSummaries() {
	var label = document.getElementById('wpSummaryLabel');

	if( label == null )
		return;

	var comboString = 'Standard summaries: <select id="stdSummaries" onchange="onStdSummaryChange()">';
	comboString += '</select><br />';
	label.innerHTML = comboString + label.innerHTML;

	requestComboFill('stdSummaries', 'Template:Stdsummaries');
}

function onStdSummaryChange() {
	var combo = document.getElementById('stdSummaries');
	var value = combo.options[combo.selectedIndex].value;

	if( value != '' ) {
		if( skin == 'monaco' ) {
			document.getElementById('wpSummaryEnhanced').value = value;
		} else {
			document.getElementById('wpSummary').value = value;
		}
	}
}

function fillPreloads() {
	var div = document.getElementById('lf-preload');

	if( div == null )
		return;

	div.style.display = 'block';
	var span = document.getElementById('lf-preload-cbox');

	var comboString = '<select id="stdPreloads" onchange="onPreloadChange()">';
	comboString += '</select>';
	span.innerHTML = comboString;
	
	span = document.getElementById('lf-preload-pagename');
	span.innerHTML = '<input type="text" class="textbox" />';
	span = document.getElementById('lf-preload-button');
	span.innerHTML = '<input type="button" class="button" value="Add" onclick="doCustomPreload()" />';

	requestComboFill('stdPreloads', 'Template:Stdpreloads');
}

function doCustomPreload() {
	doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
}

function onPreloadChange() {
	var combo = document.getElementById('stdPreloads');
	var value = combo.options[combo.selectedIndex].value;

	if( value == '' )
		return;

	value = 'Template:' + value + '/preload';
	value = value.replace(' ', '_');
	doPreload(value);
}

// ============================================================
// BEGIN JavaScript title rewrite
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE )
		return;

	var titleDiv = document.getElementById('title-meta');

	if( titleDiv == null )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	var node = firstHeading.childNodes[0];

	// new, then old!
	firstHeading.replaceChild(cloneNode, node);
	cloneNode.style.display = 'inline';

	var titleAlign = document.getElementById('title-align');
	firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

function showEras( className ) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById(className);

	if( titleDiv == null || titleDiv == undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
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
		show = storage.getItem('hidableshow-' + i  + '_' + page);

		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);

			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' ) {
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);

			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' ) {
				button[0].onclick('bypass');
			}
		}
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

	if( infoboxes.length == 0 )
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
		var button = getElementsByClass('hidable-button', box, 'span');

		if( button != null && button.length > 0 ) {
			button = button[0];

			button.onclick = toggleHidable;
			button.appendChild(document.createTextNode('[Piilota]'));

			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}

function toggleHidable( bypassStorage ) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;

	if( content != null && content.length > 0 ) {
		content = content[0];

		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Piilota]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Näytä]';
			nowShown = false;
		}

		if( window.storagePresent && ( typeof(bypassStorage) == 'undefined' || bypassStorage != 'bypass' ) ) {
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

function substUsernameTOC() {
	var toc = document.getElementById('toc');
	var userpage = document.getElementById('pt-userpage');

	if( !userpage || !toc )
		return;

	var username = userpage.firstChild.firstChild.nodeValue;
	var elements = getElementsByClass('toctext', toc, 'span');

	for(var i = 0; i < elements.length; i++)
		elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}

addOnloadHook( loadFunc );

// VideoSense stuff
// @todo FIXME: wtf is this?
function VSGetPlaylist(){
	return "42726195,42726203,42726205,42726214";
}

importStylesheetURI('http://www.wikia.com/index.php?title=MediaWiki:VSense.css&action=raw&ctype=text/css&dontcountme=s&maxage=0');

function insertAfter( newElement, targetElement ) {
	var parent = targetElement.parentNode;
	if( parent.lastChild == targetElement ) {
		parent.appendChild( newElement );
	} else {
		parent.insertBefore( newElement, targetElement.nextSibling );
	}
}

function insertVideoSenseWidgetDiv() {
	var loggedInWidget = document.getElementById( '11_wg' );
	var loggedOutWidget = document.getElementById( '101_wg' );

	if( loggedInWidget != null ) {
		var communityBox = loggedInWidget;
	} else {
		var communityBox = loggedOutWidget;
	}

	if( communityBox == null ) {
		//alert('no cb');
		if( typeof window.console != 'undefined' ) {
			// Log to error console for browser which support it (FF, IE8+)
			console.log( 'Error in insertVideoSenseWidgetDiv(): no communityBox!' );
		}
		return false;
	}

	var newDiv = document.createElement( 'div' );
	if( newDiv == null ) {
		//alert('no nd');
		if( typeof window.console != 'undefined' ) {
			// Log to error console for browser which support it (FF, IE8+)
			console.log( 'Error in insertVideoSenseWidgetDiv(): no newDiv!' );
		}
		return false;
	}

	insertAfter( newDiv, communityBox );

	newDiv.id = 'VideoSenseWidget';
	YAHOO.util.Dom.addClass(newDiv, 'VideoSense');
}

function indexArr( arr, val ) {
	if( arr === null )
		return null;
	for( var i = 0, l = arr.length; i < l; i++ ) {
		if( arr[i] == val )
			return i;
	}
	return null;
}

function ArrInclude( arr, val ) {
	return indexArr( arr, val ) !== null;
}

function shouldExecute() {
	if( ( skin == 'monaco' ) && wgIsArticle && !ArrInclude( wgUserGroups, 'user' ) ) {
		return true;
	}
	return false;
}

function executeVideoWidget() {
	var videoSeeed = new ThumbSeed('VideoSenseWidget');
	videoSeeed.sid = 163;
	videoSeeed.layout = '205X335';
	videoSeeed.title = 'Related Videos';
	videoSeeed.displayFooter = false;
	if( ( typeof VSGetCategories ) == "function" ) {
		videoSeeed.categories = VSGetCategories();
	}
	if( ( typeof VSGetPlaylist ) == "function" ) {
		videoSeeed.playList = VSGetPlaylist();
	}
	videoSeeed.headerColor = 'Blue';
	videoSeeed.Load();
}

function loadVS() {
	if( shouldExecute() ) {
		insertVideoSenseWidgetDiv();
		importScriptURI('http://www.wikia.com/index.php?title=MediaWiki:VSense.js&action=raw&ctype=text/javascript&dontcountme=s&maxage=0');
	}
}

addOnloadHook(loadVS);

/* </nowiki></pre> */
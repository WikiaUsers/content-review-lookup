/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

// ================================================================
// JavaScript here will be loaded for all users on every page load.
// ================================================================
 
// onload stuff
/*var firstRun = true;
 
function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;
 
	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}
 
	initFunctionsJS();
 
	// Upload form - need to run before adding hide buttons
	setupUploadForm();
 
	addHideButtons();
 
	if( document.getElementById('mp3-navlink') != null ) {
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

/* Import Show-Hide JS */
 
importScriptPage('ShowHide/code.js', 'dev');

/* add history, what links here, and skin change buttons to the menu */
/*
jQuery( document ).ready( function( $ ) { 
    $('section header nav ul li:nth-last-child(2) ul li:first-child').after('<li><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&action=history">History</a></li><li><a href="/wiki/Special:WhatLinksHere/'+ encodeURIComponent(wgPageName) +'">What Links here</a></li>');
    $('section header nav ul li:nth-last-child(2) ul li:nth-last-child(1)').after('<li><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=monobook" title="Change to Monobook">Monobook skin</a></li><li><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=vector" title="Change to Vector">Vector skin</a></li>');
});
*/

/*
 * Redirect User:Name/skin.js and skin.css to the current skin's pages
 * (unless the 'skin' page really exists)
 * @source: http://www.mediawiki.org/wiki/Snippets/Redirect_skin.js
 * @rev: 2
 */
/*
if ( mw.config.get( 'wgArticleId' ) == 0 && mw.config.get( 'wgNamespaceNumber' ) == 2 ) {
    var titleParts = mw.config.get( 'wgPageName' ).split( '/' );
    // Make sure there was a part before and after the slash
    // And that the latter is 'skin.js' or 'skin.css'
    if ( titleParts.length == 2 ) {
        var userSkinPage = titleParts.shift() + '/' + mw.config.get( 'skin' );
        if ( titleParts.slice(-1) == 'skin.js' ) {
            window.location.href = mw.util.wikiGetlink( userSkinPage + '.js' );
        } else if ( titleParts.slice(-1) == 'skin.css' ) {
            window.location.href = mw.util.wikiGetlink( userSkinPage + '.css' );
        }
    }
}
*/

// ================================================================
// END - hasClass var/Test if an element has a certain class
// ================================================================
/* 
function fixSearch() {
	var button = document.getElementById('searchSubmit');
 
	if( button )
		button.name = 'go';
}
*/
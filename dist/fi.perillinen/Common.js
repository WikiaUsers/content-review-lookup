/* <pre><nowiki> */

// Include scripts from MediaWiki:Functions.js
importScript( 'MediaWiki:Functions.js' );

/* Force preview for anons */
/* by Marc Mongenet, 2006, fr.wikipedia */
function forcePreview() {
	if( wgUserName != null || wgAction != 'edit' ) {
		return;
	}
	saveButton = document.getElementById( 'wpSave' );
	if( !saveButton ) {
		return;
	}
	saveButton.disabled = true;
	saveButton.value = 'Tallenna sivu (esikatsele muokkauksiasi ensiksi)';
	saveButton.style.fontWeight = 'normal';
	document.getElementById('wpPreview').style.fontWeight = 'bold';
}
addOnloadHook( forcePreview );
/* End of forcePreview */

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}

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

	if( window.storagePresent ) {
		initVisibility();
	}

	rewriteSearchFormLink();
	fillEditSummaries();
	fillPreloads();

	substUsername();
	substUsernameTOC();
	rewriteTitle();
	showEras( 'title-eraicons' );
	showEras( 'title-shortcut' );
	rewriteHover();
	addAlternatingRowColors();

	if( typeof( onPageLoad ) != 'undefined' ) {
		onPageLoad();
	}
}

function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;

	if( document.getElementById('infoboxtoggle').innerHTML == '[Piilota]' ) {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[N‰yt‰]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Piilota]';
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
	var label = document.getElementById( 'wpSummaryLabel' );

	if( label == null ) {
		return;
	}

	var comboString = 'Yleiset yhteenvedot: <select id="stdSummaries" onchange="onStdSummaryChange()">';
	comboString += '</select><br />';
	label.innerHTML = comboString + label.innerHTML;

	requestComboFill( 'stdSummaries', 'Malline:Yhteenvedot' );
}

function onStdSummaryChange() {
	var combo = document.getElementById( 'stdSummaries' );
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
	var div = document.getElementById( 'lf-preload' );

	if( div == null ) {
		return;
	}

	div.style.display = 'block';
	var span = document.getElementById( 'lf-preload-cbox' );

	var comboString = '<select id="stdPreloads" onchange="onPreloadChange()">';
	comboString += '</select>';
	span.innerHTML = comboString;

	span = document.getElementById('lf-preload-pagename');
	span.innerHTML = '<input type="text" class="textbox" />';
	span = document.getElementById('lf-preload-button');
	span.innerHTML = '<input type="button" class="button" value="Lis‰‰" onclick="doCustomPreload()" />';

	requestComboFill( 'stdPreloads', 'Malline:Stdpreloads' );
}

function doCustomPreload() {
	doPreload( document.getElementById( 'lf-preload-pagename' ).getElementsByTagName('input')[0].value );
}

function onPreloadChange() {
	var combo = document.getElementById('stdPreloads');
	var value = combo.options[combo.selectedIndex].value;

	if( value == '' ) {
		return;
	}

	value = 'Template:' + value + '/preload';
	value = value.replace( ' ', '_' );
	doPreload( value );
}

// ============================================================
// BEGIN JavaScript title rewrite
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

function showEras( className ) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS ) {
		return;
	}

	var titleDiv = document.getElementById( className );

	if( titleDiv == null || titleDiv == undefined ) {
		return;
	}

	var cloneNode = titleDiv.cloneNode( true );
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore( cloneNode, firstHeading.childNodes[0] );
	cloneNode.style.display = 'block';
}
// END JavaScript title rewrite

function initVisibility() {
	var storage = globalStorage[window.location.hostname];

	var page = window.pageName.replace(/\W/g,'_');
	var show = storage.getItem( 'infoboxshow-' + page );

	if( show == 'false' ) {
		infoboxToggle();
	}

	var hidables = getElementsByClass( 'hidable' );

	for( var i = 0; i < hidables.length; i++ ) {
		show = storage.getItem( 'hidableshow-' + i  + '_' + page );

		if( show == 'false' ) {
			var content = getElementsByClass( 'hidable-content', hidables[i] );
			var button = getElementsByClass( 'hidable-button', hidables[i] );

			if(
				content != null && content.length > 0 &&
				button != null && button.length > 0 &&
				content[0].style.display != 'none'
			) {
				button[0].onclick( 'bypass' );
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass( 'hidable-content', hidables[i] );
			var button = getElementsByClass( 'hidable-button', hidables[i] );

			if(
				content != null && content.length > 0 &&
				button != null && button.length > 0 &&
				content[0].style.display == 'none'
			) {
				button[0].onclick( 'bypass' );
			}
		}
	}
}

function onArticleNavClick() {
	var div = document.getElementById( 'mp3-nav' );

	if( div.style.display == 'block' ) {
		div.style.display = 'none';
	} else {
		div.style.display = 'block';
	}
}

function addAlternatingRowColors() {
	var infoboxes = getElementsByClass( 'infobox', document.getElementById( 'content' ) );

	if( infoboxes.length == 0 ) {
		return;
	}

	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];

		var rows = infobox.getElementsByTagName( 'tr' );
		var changeColor = false;

		for( var i = 0; i < rows.length; i++ ) {
			if( rows[i].className.indexOf( 'infoboxstopalt' ) != -1 ) {
				break;
			}

			var ths = rows[i].getElementsByTagName( 'th' );

			if( ths.length > 0 ) {
				continue;
			}

			if( changeColor ) {
				rows[i].style.backgroundColor = '#f9f9f9';
			}

			changeColor = !changeColor;
		}
	}
}

function addHideButtons() {
	var hidables = getElementsByClass( 'hidable' );

	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass( 'hidable-button', box, 'span' );

		if( button != null && button.length > 0 ) {
			button = button[0];

			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode( '[Piilota]' ) );

			if( new ClassTester( 'start-hidden' ).isMatch( box ) ) {
				button.onclick( 'bypass' );
			}
		}
	}
}

function toggleHidable( bypassStorage ) {
	var parent = getParentByClass( 'hidable', this );
	var content = getElementsByClass( 'hidable-content', parent );
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
			this.firstChild.nodeValue = '[N‰yt‰]';
			nowShown = false;
		}

		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass( 'hidable' );
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

function substUsernameTOC() {
	var toc = document.getElementById( 'toc' );
	var userpage = document.getElementById( 'pt-userpage' );

	if( !userpage || !toc ) {
		return;
	}

	var username = userpage.firstChild.firstChild.nodeValue;
	var elements = getElementsByClass( 'toctext', toc, 'span' );

	for( var i = 0; i < elements.length; i++ ) {
		elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace( '<insert name here>', username );
	}
}

addOnloadHook( loadFunc );

addOnloadHook( checkblock );
function checkblock() {
	if( queryString( 'submitblock' ) == 'true' && document.getElementById( 'blockip' ) ) {
		document.getElementById( 'blockip' ).wpBlock.click();
	}
}

function queryString( p ) {
	var re = RegExp('[&?]' + p + '=([^&]*)');
	var matches;
	if( matches = re.exec( document.location ) ) {
		try {
			return decodeURI( matches[1] );
		} catch( e ) {
		}
	}
	return null;
}

/**
 * Adds Template:Tiedot to the information box on Special:Upload
 * @author Jack Phoenix <jack@countervandalism.net>
 * @date January 23, 2010
 */
if( wgCanonicalSpecialPageName == 'Upload' ) {
	addOnloadHook( addInformationToUploadForm );
}

function addInformationToUploadForm() {
	var box = document.getElementById( 'wpUploadDescription' );
	box.value = '{{Tiedot\n|huomio=\n|kuvaus=\n|l‰hde=\n|tekij‰=\n|lisenssi=\n|muut versiot=\n}}';
}

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|]]
 * Removal of new section tab on talk pages added by [[User:Grunny|Grunny]]
 */
function disableOldForumEdit() {
	if ( typeof( wgUserGroups ) != 'undefined' && wgUserGroups.join(' ').indexOf( 'sysop' ) ) {
		return;
	}

	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}

	if(
		!document.getElementById( 'archive-page' ) ||
		!document.getElementById( 'ca-edit' )
	) {
		return;
	}
 
	if( skin == 'monaco' ) {
		editLink = document.getElementById( 'ca-edit' );
	} else if( skin == 'monobook' ) {
		editLink = document.getElementById( 'ca-edit' ).firstChild;
	}
 
	editLink.removeAttribute( 'href', 0 );
	editLink.removeAttribute( 'title', 0 );
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Arkisto';

	appendCSS( '#control_addsection, #ca-addsection { display: none !important; }' );
}
addOnloadHook( disableOldForumEdit );

// **************************************************
// Experimental JavaScript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
function updatetimer( i ) {
	var now = new Date();
	var then = timers[i].eventdate;
	var diff = count = Math.floor( ( then.getTime() - now.getTime() ) / 1000 );

	// catch bad date strings
	if( isNaN( diff ) ) { 
		timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
		return;
	}

	// determine plus/minus
	if( diff < 0 ) {
		diff = -diff;
		var tpm = 'T plus ';
	} else {
		var tpm = 'T minus ';
	}

	// calculate the diff
	var left = (diff%60) + ' sekuntia';
	diff = Math.floor( diff / 60 );
	if( diff > 0 ) {
		left = (diff%60) + ' minuuttia ' + left;
	}
	diff = Math.floor( diff / 60 );
	if( diff > 0 ) {
		left = (diff%24) + ' tuntia ' + left;
	}
	diff = Math.floor( diff / 24 );
	if( diff > 0 ) {
		left = diff + ' p‰iv‰‰ ' + left;
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

/**
 * Konami Code JavaScript from http://snipplr.com/view/15785/jquery-konami-code-listener/
 * Some fixes & MediaWikification by Jack Phoenix <jack@countervandalism.net>
 * @date February 5, 2010
 */
function konamiCode() {
	var kkeys = [],
		// up, up, down, down, left, right, left, right, B, A
		konami = '38,38,40,40,37,39,37,39,66,65';
	addHandler( document, 'keydown', function( e ) {
		kkeys.push( e.keyCode );
		if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			var logoURL = 'https://images.wikia.nocookie.net/darth/images/b/bc/Wiki.png';
			// Hide the current logo...
			appendCSS( '#p-logo a { display: none !important; }' );
			// ...and append the new one!
			appendCSS( '#p-logo {' +
				'background-image: url("' + logoURL + '") !important;' +
				'background-repeat: no-repeat !important;' +
				'background-position: 35% 50% !important;' +
				'display: block !important;' +
			'}' );
		}
	});
}
addOnloadHook( konamiCode );

// </nowiki></pre>
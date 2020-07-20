// <syntaxhighlight lang="JavaScript">

// ==UserScript==
// @name        wikEdDiff
// @version     0.9.39
// @date        October 21, 2014
// @description improved diff with block move detection for comparing article versions
// @homepage    https://en.wikipedia.org/wiki/User:Cacycle/wikEdDiff
// @source      https://en.wikipedia.org/wiki/User:Cacycle/wikEdDiff.js
// @author      Cacycle (https://en.wikipedia.org/wiki/User:Cacycle)
// @license     released into the public domain
// @include     /\b(action=submit|diff=)\b/
// @require     https://en.wikipedia.org/w/index.php?title=User:Cacycle/diff.js&action=raw&ctype=text/javascript
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/*

Features:
* Additions, deletions, and block moves are highlighted by color in the same text
* Block moves and character differences are detected
* Unchanged regions are omitted from the output
* Highly optimized for MediaWiki source texts

wikEdDiff uses the diff.js library (https://en.wikipedia.org/wiki/User:Cacycle/Cacycle/diff) and has been integrated
into wikEd, a full-featured JavaScript in-browser editor (https://en.wikipedia.org/wiki/User:Cacycle/wikEd).
For installation details, please see https://en.wikipedia.org/wiki/User:Cacycle/wikEdDiff.

*/

// JSHint options
/* jshint -W004, -W100, newcap: false, browser: true, jquery: true, sub: true, bitwise: true, curly: false, evil: true, forin: true, freeze: true, globalstrict: true, immed: true, latedef: true, loopfunc: true, quotmark: single, strict: true, undef: true */
/* global GM_getValue, GM_xmlhttpRequest, console */

// turn on ECMAScript 5 strict mode
'use strict';

// define global objects
var wikEd; if ( wikEd === undefined ) { wikEd = {}; }
if ( wikEd.config === undefined ) { wikEd.config = {}; }
var WikEdDiff;
var wikEdConfig;

//
// wikEd.DiffInit: initialize variables
//

wikEd.DiffInit = function () {

//
// user configurable variables
//

	// wikEd code home base URL, also defined in wikEd.js
	if ( wikEd.config.homeBaseUrl === undefined ) { wikEd.config.homeBaseUrl = '//en.wikipedia.org/'; }

	// diff library URL, also defined in wikEd.js
	if ( wikEd.config.diffScriptSrc === undefined ) { wikEd.config.diffScriptSrc = wikEd.config.homeBaseUrl + 'w/index.php?title=User:Cacycle/diff.js&action=raw&ctype=text/javascript'; }

	// wikEdDiff css rules
	if ( wikEd.config.diffCSS === undefined ) { wikEd.config.diffCSS = {}; }
	wikEd.InitObject( wikEd.config.diffCSS, {
		'.wikEdDiffWrapper': 'padding: 0.33em 0.5em;',
		'.wikEdDiffButtonWrapper': 'text-align: center;',
		'.wikEdDiffButtonChecked':
			'padding: 0.1em 0.1em 0.2em; background: #c8c4c0; border: 1px solid; ' +
			'border-color: #555 #e8e8e8 #e8e8e8 #555; border-radius: 0.25em; cursor: pointer;',
		'.wikEdDiffButtonUnchecked':
			'padding: 0.1em 0.1em 0.2em; background: #d8d4d0; border: 1px solid; ' +
			'border-color: #f0f0f0 #666 #666 #f0f0f0; border-radius: 0.25em; cursor: pointer;',
		'.wikEdDiffButtonPressed':
			'padding: 0.1em 0.1em 0.2em; background: #c8c4c0; border: 1px solid; ' +
			'border-color: #666 #f0f0f0 #f0f0f0 #666; border-radius: 0.25em; cursor: wait;',
		'.wikEdDiffDiv': 'margin-top: 0.5em;',
		'.wikEdDiffWorking':
			'background: #fcfcfc; border: 1px #bbb solid; border-radius: 0.5em; line-height: 1.6; ' +
			'box-shadow: 2px 2px 2px #ddd; padding: 0.5em; margin: 1em 0; text-align: center;'
	} );

	// use local copies of images for testing (set to true in local copy of edit page), also defined in wikEd.js
	if ( wikEd.config.localImages === undefined ) { wikEd.config.localImages = false; }

	// path to local wikEd images for testing, also defined in wikEd.js
	if ( wikEd.config.imagePathLocal === undefined ) { wikEd.config.imagePathLocal = 'file:///D:/wikEd/images/'; }

	// path to wikEd images, also defined in wikEd.js
	if ( wikEd.config.imagePath === undefined ) { wikEd.config.imagePath = '//upload.wikimedia.org/wikipedia/commons/'; }

	// wikEd image filenames, also defined in wikEd.js
	if ( wikEd.config.image === undefined ) { wikEd.config.image = {}; }
	wikEd.InitImage( wikEd.config.image, {
		'wikEdDiff': 'c/c6/WikEdDiff.png'
	} );

	// user readable texts, copy changes to http://en.wikipedia.org/wiki/User:Cacycle/wikEd_international_en.js, also defined in wikEd.js
	if ( wikEd.config.text === undefined ) { wikEd.config.text = {}; }
	wikEd.InitObject( wikEd.config.text, {
		'wikEdDiffButtonImg alt': 'wikEdDiff',
		'wikEdDiffButton title':  'Show improved diff view',
		'wikEdDiffLoading':       '...'
	} );

	// expiration time span for permanent cookies in seconds, also defined in wikEd.js
	if ( wikEd.config.cookieExpireSec === undefined ) { wikEd.config.cookieExpireSec = 1 * 30 * 24 * 60 * 60; }

	//
	// end of user configurable variables
	//

	// global dom elements
	wikEd.diffDiv = null;
	wikEd.diffWrapper = null;
	wikEd.diffButtonWrapper = null;
	wikEd.diffButton = null;
	wikEd.diffGetGlobalNode = null;

	// hash of loaded scripts, also defined in wikEd.js
	if ( wikEd.externalScripts === undefined ) { wikEd.externalScripts = null; }
	if ( wikEd.diffPreset === undefined ) { wikEd.diffPreset = false; }
};

// variables needed during startup
wikEd.diffTable = null;
wikEd.diffTableTitle = null;
wikEd.diffColSpan = null;

// diff table element

// customization, also defined in wikEd.js
if ( wikEd.wikEdConfigAdded === undefined ) { wikEd.wikEdConfigAdded = false; }

// detect web storage capability and Greasemonkey related, also defined in wikEd.js
if ( wikEd.webStorage === undefined ) { wikEd.webStorage = null; }
if ( wikEd.greasemonkey === undefined ) { wikEd.greasemonkey = false; }
if ( wikEd.gotGlobalsHook === undefined ) { wikEd.gotGlobalsHook = []; }
if ( wikEd.getGlobalsCounter === undefined ) { wikEd.getGlobalsCounter = 0; }
if ( wikEd.pageOrigin === undefined ) { wikEd.pageOrigin = ''; }
if ( wikEd.head === undefined ) { wikEd.head = null; }
if ( wikEd.diffTableLinkified === undefined ) { wikEd.diffTableLinkified = false; }

// get global MediaWiki settings, also defined in wikEd.js
if ( wikEd.wikiGlobals === undefined ) { wikEd.wikiGlobals = {}; }
if ( wikEd.pageName === undefined ) { wikEd.pageName = null; }


//
// wikEd.DiffStartup: call the setup routine
//

wikEd.DiffStartup = function () {

	// MediaWiki pages always have their title set, filter out Greasemonkey running on created iframes
	if ( document.title === '' ) {
		return;
	}

	// check if wikEdDiff has already started up
	if ( document.getElementsByName( 'wikEdDiffStartupFlag')[0] !== undefined ) {
		return;
	}

	// define current window head
	wikEd.head = document.getElementsByTagName( 'head')[0] || null;

	// set startup flag
	var flag = document.createElement( 'meta' );
	flag.setAttribute( 'name', 'wikEdDiffStartupFlag' );
	wikEd.head.appendChild( flag );

	// get site of origin (window.location.href is about:blank if Firefox during page load)
	var origin = wikEd.head.baseURI;
	if ( origin === undefined ) {
		origin = window.location.toString();
	}
	wikEd.pageOrigin = origin.replace( /^((https?|file):\/\/[^\/?#]*)?.*$/, '$1' );

	// check if this runs under Greasemonkey
	if ( typeof GM_info === 'object' ) {
		wikEd.greasemonkey = true;
	}

	// parse global-context (MediaWiki) variables into hash (for Greasemonkey)
	var globalNames = ['wgServer', 'wgArticlePath', 'wgScriptPath', 'wgCurRevisionId', 'wikEdTypeofLocalStorage', 'wgPageName'];
	if ( wikEd.greasemonkey === true ) {
		globalNames.push( 'wikEdConfig' );
	}

	// copy custom config settings after values have arrived
	var gotGlobalsHook = [
		function () {
			if ( typeof wikEd.wikiGlobals.wikEdConfig === 'object' && wikEd.wikEdConfigAdded === false ) {
				wikEd.AddToObject( wikEd.config, wikEd.wikiGlobals.wikEdConfig );
				wikEd.wikEdConfigAdded = true;
			}

			// get missing wg variables from footer link (code copied to wikEdDiff.js)
			if ( wikEd.wikiGlobals.wgArticlePath === undefined ) {
				var printfooter = document.body.getElementsByClassName( 'printfooter' )[0];
				if ( printfooter !== undefined ) {
					var articleLink = printfooter.getElementsByTagName( 'a' )[0];
					if ( articleLink !== undefined ) {
						var regExpMatch = /^(https?:\/\/[^\/]*)(\/([^\/]*\/)*)([^\/]*)$/.exec( articleLink.href );
						if ( regExpMatch !== null ) {
							wikEd.wikiGlobals.wgServer = regExpMatch[1];
							wikEd.wikiGlobals.wgArticlePath = regExpMatch[1] + regExpMatch[2] + '$1';
							wikEd.wikiGlobals.wgPageName = regExpMatch[4] || '';
							wikEd.wikiGlobals.wgTitle = decodeURIComponent( regExpMatch[4].replace( /_/g, ' ' ) );
						}
					}
				}
			}

			// get current page name
			wikEd.pageName = wikEd.wikiGlobals.wgPageName;
		}
	];

	// linkify standard diff
	gotGlobalsHook.push( wikEd.DiffLinkifyStandard );

	// set listener for GetGlobals messaging
	wikEd.DiffAddEventListener( window, 'message', wikEd.GetGlobalsReceiver, false );

	// parse globals (asynchronous)
	wikEd.GetGlobals( globalNames, gotGlobalsHook );

	// run the setup routine if page has loaded or if loaded dynamically from wikEd
	if ( document.readyState === 'complete' || document.getElementsByName( 'wikEdSetupFlag' )[0] !== undefined ) {
		wikEd.DiffSetup();
	}

	// schedule the setup routine
	else {
		wikEd.DiffAddEventListener( window, 'load', wikEd.DiffSetup, false );
	}
};


//
// wikEd.DiffSetup: create wikEdDiff elements
//

wikEd.DiffSetup = function () {

	// check if wikEdDiff has already set up
	if ( document.getElementsByName( 'wikEdDiffSetupFlag' )[0] !== undefined ) {
		return;
	}

	// set setup flag
	var flag = document.createElement( 'meta' );
	flag.setAttribute( 'name', 'wikEdDiffSetupFlag' );
	wikEd.head.appendChild( flag );

	// import customization
	if ( wikEdConfig !== undefined && wikEd.wikEdConfigAdded === false ) {
		wikEd.AddToObject( wikEd.config, wikEdConfig );
		wikEd.wikEdConfigAdded = true;
	}

	// initialize variables
	wikEd.DiffInit();

	// get diff table title row
	var tdOld = null;
	var tdNew = null;
	var tdArray = document.getElementsByTagName( 'td' );
	for ( var i = 0; i < tdArray.length; i ++ ) {

		// get old title cell
		if ( tdArray[i].className === 'diff-otitle' ) {
			tdOld = tdArray[i];
		}

		// get new title cell
		else if ( tdArray[i].className === 'diff-ntitle' ) {
			tdNew = tdArray[i];
		}

		if ( tdOld !== null && tdNew !== null ) {
			break;
		}
	}

	// get table
	if ( tdOld !== null ) {
		wikEd.diffTableTitle = tdOld.parentNode;
		var node = wikEd.diffTableTitle.parentNode;
		while ( node !== null ) {
			if ( node.nodeName === 'TABLE' ) {
				wikEd.diffTable = node;
				break;
			}
			node = node.parentNode;
		}
	}

	// get number of diff table columns
	if ( tdOld !== null && tdNew !== null ) {
		wikEd.diffColSpan = tdOld.colSpan + tdNew.colSpan;
	}
	if ( isNaN( wikEd.diffColSpan ) === true ) {
		wikEd.diffColSpan = 4;
	}

	// check if this is a diff page
	if ( wikEd.diffTable === null ) {
		return;
	}

	// add stylesheet definitions ( slow method for IE compatibility )
	var diffStyle = new wikEd.DiffStyleSheet();
	for ( var ruleName in wikEd.config.diffCSS ) {
		if ( Object.prototype.hasOwnProperty.call( wikEd.config.diffCSS, ruleName ) === true ) {
			var ruleStyle = wikEd.config.diffCSS[ruleName];
			diffStyle.AddCSSRule( ruleName, ruleStyle );
		}
	}

	// get saved wikEdDiff setting
	var setting = wikEd.GetCookie( 'wikEdDiff' );
	if ( setting === '' && typeof wikEd.config.diffPreset === 'boolean' ) {
		wikEd.diff = wikEd.config.diffPreset;
	}
	else if ( setting === '1' ) {
		wikEd.diff = true;
	}

	// create wikEdDiff wrapper row
	var diffRow = document.createElement( 'tr' );

	// create wikEdDiff wrapper (td)
	wikEd.diffWrapper = document.createElement( 'td' );
	wikEd.diffWrapper.id = 'wikEdDiffWrapper';
	wikEd.diffWrapper.className = 'wikEdDiffWrapper';
	wikEd.diffWrapper.setAttribute( 'colspan', wikEd.diffColSpan );
	diffRow.appendChild( wikEd.diffWrapper );

	// create wikEdDiff button wrapper
	wikEd.diffButtonWrapper = document.createElement( 'div' );
	wikEd.diffButtonWrapper.id = 'wikEdDiffButtonWrapper';
	wikEd.diffButtonWrapper.className = 'wikEdDiffButtonWrapper';
	wikEd.diffWrapper.appendChild( wikEd.diffButtonWrapper );

	// create wikEdDiff button
	wikEd.diffButton = document.createElement( 'button' );
	wikEd.diffButton.id = 'wikEdDiffButton';
	wikEd.diffButton.title = wikEd.config.text['wikEdDiffButton title'];
	if ( wikEd.diff === true ) {
		wikEd.diffButton.className = 'wikEdDiffButtonChecked';
	}
	else {
		wikEd.diffButton.className = 'wikEdDiffButtonUnchecked';
	}
	wikEd.diffButtonWrapper.appendChild( wikEd.diffButton );

	// add button image
	var diffImg = document.createElement( 'img' );
	diffImg.id = 'wikEdDiffButtonImg';
	diffImg.src = wikEd.config.image['wikEdDiff'];
	diffImg.title = wikEd.config.text['wikEdDiffButton title'];
	diffImg.alt = wikEd.config.text['wikEdDiffButtonImg alt'];
	wikEd.diffButton.appendChild( diffImg );

	wikEd.diffDiv = document.createElement( 'div' );
	wikEd.diffDiv.id = 'wikEdDiffDiv';
	wikEd.diffDiv.className = 'wikEdDiffDiv';
	wikEd.diffDiv.style.display = 'none';

	// insert wrapper row after title row
	if ( document.getElementsByName( 'wpTextbox2' )[0] === undefined ) {
		tdOld.parentNode.parentNode.insertBefore( diffRow, tdOld.parentNode.nextSibling );
	}

	// insert wrapper row before title row for edit conflict page
	else {
		tdOld.parentNode.parentNode.insertBefore( diffRow, tdOld.parentNode );
	}
	wikEd.diffWrapper.appendChild( wikEd.diffDiv );

	// add event listener to button
	wikEd.DiffAddEventListener( wikEd.diffButton, 'click', wikEd.DiffButtonHandler );

	// add event listener to button
	wikEd.DiffAddEventListener( wikEd.diffTable, 'dblclick', wikEd.DiffWrapperHandler );

	// detect already loaded external scripts, also in wikEd.js
	if ( wikEd.externalScripts === null ) {
		wikEd.externalScripts = [];
		var pageScripts = document.getElementsByTagName( 'script' );
		for ( var i = 0; i < pageScripts.length; i ++ ) {
			var scriptSrc = pageScripts[i].src;
			var nameMatch = scriptSrc.match( /\btitle=([^&]*)/ );
			if ( nameMatch === null ) {
				nameMatch = scriptSrc.match( /\/([^\/]*?)($|\?)/ );
			}
			if ( nameMatch !== null ) {
				var scriptName = nameMatch[1];
				if ( scriptName !== '' ) {

					// ignore other diff.js scripts
					if ( scriptName === 'diff.js' && scriptSrc !== wikEd.config.diffScriptSrc ) {
						continue;
					}
					wikEd.externalScripts[scriptName] = pageScripts[i];
				}
			}
		}
	}

	// load the external diff script
	if ( wikEd.externalScripts['diff.js'] === undefined ) {
		if ( WikEdDiff === undefined ) {
			var script = document.createElement( 'script' );
			script.type = 'text/javascript';
			script.src = wikEd.config.diffScriptSrc;
			wikEd.head.appendChild( script );
			wikEd.externalScripts['diff.js'] = script;
		}
	}

	// call or schedule wikEd.Diff if enabled
	if ( wikEd.diff === true ) {
		if ( WikEdDiff !== undefined ) {
			wikEd.Diff();
		}
		else {
			var script = wikEd.externalScripts['diff.js'];

			// MS IE 8
			if ( script.onreadystatechange !== undefined ) {
				script.onreadystatechange = function () {
					if ( this.readyState === 'loaded' ) {
						wikEd.Diff();
					}
				};
			}

			// Standards
			else {
				wikEd.DiffAddEventListener( script, 'load', wikEd.Diff, false );
			}
		}
	}

	// linkify standard diff
	wikEd.DiffLinkifyStandard();

	// register links for Lupin's Wikipedia:Tools/Navigation_popups
	if ( typeof window.setupTooltips === 'function' ) {
		window.setupTooltips( wikEd.diffTable );
	}

	return;
};


//
// wikEd.DiffButtonHandler: event handler for diff button: toggle wikEdDiff button and box and set cookie
//

wikEd.DiffButtonHandler = function ( event ) {

	if ( event.preventDefault !== undefined ) {
		event.preventDefault();
	}
	else {
		event.returnValue = false;
	}

	// turn wikEdDiff off
	if ( wikEd.diff === true ) {
		wikEd.diff = false;
		wikEd.diffButton.className = 'wikEdDiffButtonUnchecked';
		wikEd.SetCookie( 'wikEdDiff', '0', 0, '/' );
		if ( typeof wikEd.diffDiv === 'object' ) {
			if ( wikEd.diffDiv !== null ) {
				wikEd.diffDiv.style.display = 'none';
			}
		}
	}

	// turn wikEdDiff on
	else {
		wikEd.diff = true;
		wikEd.diffButton.className = 'wikEdDiffButtonChecked';
		wikEd.SetCookie( 'wikEdDiff', '1', 0, '/' );
		if ( typeof wikEd.diffDiv === 'object' && wikEd.diffDiv !== null ) {
			wikEd.diffDiv.style.display = 'block';
			wikEd.Diff();
		}
	}
	return;
};


//
// wikEd.DiffLinkifyStandard: linkify wikilinks in standard diff text
//

wikEd.DiffLinkifyStandard = function () {

	if ( wikEd.diffTable === null || wikEd.wikiGlobals.wgServer === null || wikEd.diffTableLinkified === true ) {
		return;
	}
	wikEd.diffTableLinkified = true;
	var cells = wikEd.diffTable.getElementsByTagName( 'td' );
	for ( var i = 0; i < cells.length; i ++ ) {
		var cell = cells.item( i );
		if ( /\b(diff-context|diff-deletedline|diff-addedline)\b/.test( cell.className ) === true ) {
			cell.innerHTML = wikEd.DiffLinkify( cell.innerHTML );
		}
	}
};


//
// wikEd.Diff: fetch the old versions using ajax to display a diff
//

wikEd.Diff = function () {

	// check if set tup
	if ( wikEd.diffDiv === null ) {
		return;
	}

	// check if diff.js is loaded
	if ( WikEdDiff === undefined ) {
		return;
	}

	// display diff
	wikEd.diffDiv.style.display = 'block';

	// fetch only once
	if ( wikEd.diffDiv.innerHTML.length > 0 ) {
		return;
	}

	// check if this is a diff page
	if ( wikEd.diffTable === null ) {
		return;
	}

	// set pushed button style
	wikEd.diffButton.className = 'wikEdDiffButtonPressed';

	// display div
	wikEd.diffDiv.innerHTML =
		'<div class="wikEdDiffWorking">' + wikEd.config.text['wikEdDiffLoading'] + '</div>';

	// get diff table and version link cells
	var tdArray = wikEd.diffTable.getElementsByTagName( 'td' );
	var tdOld;
	var tdNew;
	for ( var i = 0; i < tdArray.length; i ++ ) {
		if ( tdArray[i].className === 'diff-otitle' ) {
			tdOld = tdArray[i];
		}
		else if ( tdArray[i].className === 'diff-ntitle' ) {
			tdNew = tdArray[i];
			break;
		}
	}
	if ( tdOld === null || tdNew === null ) {
		return;
	}

	var oldVersion = null;
	var newVersion = null;

	var oldUrl;
	var newUrl;

	// preview pages use textarea and latest article version or second textarea
	if (
		/(\?|&)action=submit\b/.test( window.location.search ) === true ||
		/(\?|&)undoafter=/.test( window.location.search ) === true
	) {

		// get new version from textarea
		var textarea = document.getElementsByName( 'wpTextbox1' )[0];
		if ( textarea === undefined ) {
			return;
		}
		newVersion = textarea.value;
		newVersion = newVersion.replace( /\s+$/g, '' );

		// get old version from second textarea ( edit conflict )
		var textarea2 = document.getElementsByName( 'wpTextbox2' )[0];
		if ( textarea2 !== undefined ) {
			oldVersion = textarea2.value;
			oldVersion = oldVersion.replace( /\s+$/g, '' );

			// calculate diff
			wikEd.diffDiv.innerHTML = wikEd.DiffResponse( oldVersion, newVersion );
			wikEd.diffDiv.style.display = 'block';
			wikEd.diffButton.className = 'wikEdDiffButtonChecked';
			return;
		}

		// generate url from MediaWiki variables or from location url
		var url;
		var server = wikEd.wikiGlobals.wgServer;
		var scriptPath = wikEd.wikiGlobals.wgScriptPath;
		scriptPath = scriptPath.replace( server, '' );
		if ( server !== '' && scriptPath !== '' ) {
			url = server + scriptPath.replace( /\$1/, '' ) + '/index.php';
		}
		else {
			url = window.location.protocol + '//' + window.location.hostname + '/' + window.location.pathname;
		}

		var article;
		var pageName = wikEd.wikiGlobals.wgPageName;
		if ( pageName !== '' ) {
			article = pageName;
		}
		else {
			var articleMatch = window.location.search.match( /(\?|&)title=([^&#]+)/ );
			if ( articleMatch !== null ) {
				article = articleMatch[2];
			}
		}
		url += '?title=' + encodeURIComponent( article ) + '&action=raw&maxage=0';

		var curRevisionId = wikEd.wikiGlobals.wgCurRevisionId;
		if ( curRevisionId !== undefined && curRevisionId !== '' ) {
			oldUrl = url + '&oldid=' + curRevisionId;
		}
		else {
			oldUrl = url;
		}

		// get section for section editing
		var section = document.getElementsByName( 'wpSection' );
		if ( section !== null ) {
			if ( section.length > 0 ) {
				if ( section[0].value !== '' ) {
					oldUrl += '&section=' + section[0].value;
				}
			}
		}
	}

	// diff pages use two different old versions
	else {

		// get revision id numbers from title links in table cells
		var versionMatchOld = tdOld.innerHTML.match( /\bhref="([^#"<>]+?(&(amp;)?|\?)oldid=\d+[^#"<>]*?)"/ );
		var versionMatchNew = tdNew.innerHTML.match( /\bhref="([^#"<>]+?(&(amp;)?|\?)oldid=\d+[^#"<>]*?)"/ );
		if ( versionMatchOld === null || versionMatchNew === null ) {
			return;
		}
		oldUrl = versionMatchOld[1];
		newUrl = versionMatchNew[1];

		oldUrl = oldUrl.replace( /&amp;/g, '&' );
		newUrl = newUrl.replace( /&amp;/g, '&' );

		oldUrl += '&action=raw&maxage=0';
		newUrl += '&action=raw&maxage=0';
	}

	// get the old version using ajax
	var requestMethod = 'GET';
	var requestUrl = oldUrl;
	var postFields = null;
	var overrideMimeType = null;
	wikEd.DiffAjaxRequest( requestMethod, requestUrl, postFields, overrideMimeType, function ( ajax ) {
		oldVersion = ajax.responseText;

		// calculate diff
		if ( newVersion !== null ) {
			wikEd.diffDiv.innerHTML = wikEd.DiffResponse( oldVersion, newVersion );
			wikEd.diffDiv.style.display = 'block';
			wikEd.diffButton.className = 'wikEdDiffButtonChecked';
		}
		return;
	} );

	// get the new version using ajax and linkify
	if ( newUrl !== undefined ) {
		var requestMethod = 'GET';
		var requestUrl = newUrl;
		var postFields = null;
		var overrideMimeType = null;
		wikEd.DiffAjaxRequest( requestMethod, requestUrl, postFields, overrideMimeType, function ( ajax ) {
			newVersion = ajax.responseText;

			// calculate diff
			if ( oldVersion !== null ) {
				wikEd.diffDiv.innerHTML = wikEd.DiffResponse( oldVersion, newVersion );
				wikEd.diffDiv.style.display = 'block';
				wikEd.diffButton.className = 'wikEdDiffButtonChecked';
			}
			return;
		} );
	}
	return;
};


//
// wikEd.DiffResponse: calculate and linkify the diff between two versions ( code copied from wikEd.js )
//

if ( wikEd.DiffResponse === undefined )
wikEd.DiffResponse = function ( oldVersion, newVersion ) {

	// add trailing newline
	if ( oldVersion.substr( oldVersion.length - 1, 1 ) !== '\n' ) {
		oldVersion += '\n';
	}
	if ( newVersion.substr( newVersion.length - 1, 1 ) !== '\n' ) {
		newVersion += '\n';
	}

	// call external diff program
	var wikEdDiff = new WikEdDiff();
	var diffText = wikEdDiff.diff( oldVersion, newVersion );

	// linkify blockwise with breaks at delete and block move tags
	var diffTextLinkified = '';
	var regExp = /<span\b[^>]+?\bclass="wikEdDiff(Delete|Block)"[^>]*>/g;
	var regExpMatch;
	var pos = 0;
	while ( ( regExpMatch = regExp.exec( diffText ) ) !== null ) {
		diffTextLinkified += wikEd.DiffLinkify( diffText.substring( pos, regExpMatch.index ) ) + regExpMatch[0];
		pos = regExp.lastIndex;
	}
	diffTextLinkified += wikEd.DiffLinkify( diffText.substr( pos ) );
	return diffTextLinkified;
};


//
// wikEd.DiffLinkify: linkify external links and wikilinks in diffed text as <a> anchor elements (code copied from wikEd.js)
//

if ( wikEd.DiffLinkify === undefined )
wikEd.DiffLinkify = function ( html ) {

	// &lt; &gt; to \x00 \x01
	html = html.replace( /&lt;/g, '\x00' );
	html = html.replace( /&gt;/g, '\x01' );

	// split into valid html tags and plain text fragments
	var linkified = '';
	var regExp = /(<[^<>]*>)|([^<>]+|<|>)/g;
	var regExpMatch;
	while ( ( regExpMatch = regExp.exec( html) ) !== null ) {
		var tag = regExpMatch[1] || '';
		var plain = regExpMatch[2] || '';

		// process tags
		if ( tag !== '' ) {
			linkified += tag;
		}

		// process plain tags
		else {

			// escape bogus < or >
			plain = plain.replace( />/g, '&gt;' );
			plain = plain.replace( /</g, '&lt;' );

			// external links        123                     3     2              14                                       4  5  6                                               65
			plain = plain.replace(/(((\bhttps?:|\bftp:|\birc:|\bgopher:|)\/\/)|\bnews:|\bmailto:)([^\x00-\x20\s"\[\]\x7f\|\{\}<>]|<[^>]*>)+?(?=([!"().,:;‘-•]*\s|[\x00-\x20\s"\[\]\x7f|{}]|$))/gi,
				function ( p ) {
					var whole = p;

					// remove tags and comments
					var url = whole;
					url = url.replace( /\x00!--.*?--\x01/g, '' );
					url = url.replace( /.*--\x01|\x00!--.*()/g, '' );
					url = url.replace( /<.*?>/g, '' );
					url = url.replace( /^.*>|<.*$/g, '' );
					url = url.replace( /^\s+|\s+$/g, '' );

					// make title as readable as possible
					var title = url;
					title = title.replace( /\+/g, ' ' );

					// decodeURI breaks for invalid UTF-8 escapes
					title = title.replace( /(%[0-9a-f]{2})+/gi,
						function ( p, p1 ) {
							try {
								return decodeURI( p );
							}
							catch ( exception ) {
								return p;
							}
						}
					);
					title = title.replace( /</g, '&lt;' );
					title = title.replace( />/g, '&gt;' );
					title = title.replace( /"/g, '&quot;' );

					// linkify all url text fragments between highlighting <span>s seperately
					var anchorOpen = '<a href = "' + url + '" style="text-decoration: none; color: inherit; color: expression(parentElement.currentStyle.color);" title="' + title + '">';
					var anchorClose = '</a>';
					whole = whole.replace( /(<[^>]*>)/g, anchorClose + '$1' + anchorOpen );
					return anchorOpen + whole + anchorClose;
				}
			);

			// linkify links and templates
			if ( wikEd.wikiGlobals.wgServer !== null && wikEd.wikiGlobals.wgArticlePath !== null ) {

				//                      1 [[ 2title        23 | text       3   ]]1 4 {{ 5title        56                6 4
				plain = plain.replace( /(\[\[([^|\[\]{}\n]+)(\|[^\[\]{}<>]*)?\]\])|(\{\{([^|\[\]{}\n]*)([^\[\]{}<>]*\}\})?)/g,
				function ( p, p1, p2, p3, p4, p5, p6 ) {
						var articleName = p2 || '';
						var templateName = p5 || '';
						var whole = p;

						// extract title
						var title = articleName;
						if ( title === '' ) {
							title = templateName;
						}
						title = title.replace( /\x00!--.*?--\x01/g, '' );
						title = title.replace( /.*--\x01|\x00!--.*()/g, '' );
						title = title.replace( /<.*?>/g, '' );
						title = title.replace( /^.*>|<.*$/g, '' );
						title = title.replace( /^\s+|\s+$/g, '' );

						// [[/subpage]] refers to a subpage of the current page, [[#section]] to a section of the current page
						if ( title.indexOf( '/' ) === 0 || title.indexOf( '#' ) === 0 ) {
							title = wikEd.pageName + title;
						}

						// create url
						var url = wikEd.EncodeTitle( title );
						var articleTitle = title.replace( /"/g, '&quot;' );
						if ( templateName !== '' ) {
							if ( /:/.test( title ) === false ) {
								url = 'Template:' + url;
								articleTitle = 'Template:' + articleTitle;
							}
						}
						url = wikEd.wikiGlobals.wgServer + wikEd.wikiGlobals.wgArticlePath.replace( /\$1/, url );

						// linkify all text fragments between highlighting <span>s seperately
						var anchorOpen = '<a href = "' + url + '" style = "text-decoration: none; color: inherit; color: expression(parentElement.currentStyle.color)" title="' + articleTitle + '">';
						var anchorClose = '</a>';
						whole = whole.replace( /(<[^>]*>)/g, anchorClose + '$1' + anchorOpen );
						return anchorOpen + whole + anchorClose;
					}
				);
			}
			linkified += plain;
		}
	}

	// \x00 and \x01 back to &lt; and &gt;
	linkified = linkified.replace( /\x00/g, '&lt;' );
	linkified = linkified.replace( /\x01/g, '&gt;' );

	return linkified;
};


//
// wikEd.EncodeTitle: encode article title for use in url (code copied from wikEd.js)
//

if ( wikEd.EncodeTitle === undefined )
wikEd.EncodeTitle = function ( title ) {

	if ( title === undefined ) {
		title = wikEd.wikiGlobals.wgTitle;
	}

	// characters not supported
	title = title.replace( /[<>\[\]|{}]/g, '' );

	title = title.replace( / /g, '_' );
	title = encodeURI( title );
	title = title.replace( /%25(\d\d)/g, '%$1' );
	title = title.replace( /&/g, '%26' );
	title = title.replace( /#/g, '%23' );
	title = title.replace( /'/g, '%27' );
	title = title.replace( /\?/g, '%3F' );
	title = title.replace( /\+/g, '%2B' );
	return title;
};


//
// wikEd.InitObject: initialize object, keep pre-defined values ( code copied from wikEd.js )
//

if ( wikEd.InitObject === undefined )
wikEd.InitObject = function ( target, source, showMissing ) {

	if ( typeof target === 'object' ) {
		for ( var key in source ) {
			if ( target[key] === undefined ) {
				target[key] = source[key];

				// show missing array entries
				if ( showMissing === true ) {
					if ( typeof target[key] === 'string' ) {
						wikEd.config.debugStartUp += '\t\t\t\'' + key + '\': \'' + target[key].replace( /\n/g, '\\n' ) + '\',\n';
					}
				}
			}
		}
	}
	return;
};


//
// wikEd.AddToObject: add or replace properties, replace existing values (code copied from wikEd.js)
//

if ( wikEd.AddToObject === undefined )
wikEd.AddToObject = function ( target, source, priority ) {

	if ( priority === undefined ) {
		priority = {};
	}
	if ( typeof target === 'object' ) {
		for ( var key in source ) {
			if ( priority[key] !== undefined ) {
				target[key] = priority[key];
			}
			else {
				target[key] = source[key];
			}
		}
	}
	return;
};


//
// wikEd.InitImage: initialize images, keep pre-defined values (code copied from wikEd.js)
//

if ( wikEd.InitImage === undefined )
wikEd.InitImage = function ( target, source ) {

	var server = window.location.href.replace( /^(\w+:\/\/.*?)\/.*/, '$1' );
	var protocol = server.replace( /^(\w+:)\/\/.*/, '$1' );

	for ( var key in source ) {
		if ( target[key] === undefined ) {

			// remove MediaWiki path prefixes and add local path
			if ( wikEd.config.useLocalImages === true ) {
				target[key] = wikEd.config.imagePathLocal + source[key].replace( /^[0-9a-f]+\/[0-9a-f]+\/()/, '' );
			}

			// add path
			else {
				target[key] = wikEd.config.imagePath + source[key];
			}

			// Chrome 33.0.1750.146 m bug, not displaying frame html background image without complete URL
			if ( /^\/\//.test( target[key] ) === true ) {
				target[key] = protocol + target[key];
			}
			else if ( /^\//.test( target[key] ) === true ) {
				target[key] = server + target[key];
			}
		}
	}
	return;
};


//
// wikEd.DiffStyleSheet: create a new style sheet object
//

wikEd.DiffStyleSheet = function ( contextObj ) {

	if ( contextObj === undefined ) {
		contextObj = document;
	}
	this.styleElement = null;

	// MS IE compatibility
	if ( contextObj.createStyleSheet ) {
		this.styleElement = contextObj.createStyleSheet();
	}

	// standards compliant browsers
	else {
		this.styleElement = contextObj.createElement( 'style' );
		this.styleElement.from = 'text/css';
		var insert = contextObj.getElementsByTagName( 'head' )[0];
		if ( insert !== undefined ) {
			this.styleElement.appendChild( contextObj.createTextNode( '' ) ); // Safari 3 fix
			insert.appendChild( this.styleElement );
		}
	}

//
// wikEd.DiffStyleSheet.AddCSSRule: add one rule at the time using DOM method, very slow
//

	this.AddCSSRule = function ( selector, declaration ) {

		// MS IE compatibility
		if ( this.styleElement.addRule !== undefined ) {
			if ( declaration.length > 0 ) {
				this.styleElement.addRule( selector, declaration );
			}
		}

		// standards compliant browsers
		else {
			if ( this.styleElement.sheet !== undefined ) {
				if ( this.styleElement.sheet.insertRule !== undefined ) {
					this.styleElement.sheet.insertRule( selector + ' { ' + declaration + ' } ', 0 );
				}
			}
		}
	};


//
// wikEd.DiffStyleSheet.AddCSSRules: add or replace all rules at once, much faster
//

	this.AddCSSRules = function ( rules ) {

		// MS IE compatibility
		if ( this.styleElement.innerHTML === null ) {
			this.styleElement.cssText = rules;
		}

		// Safari, Chrome, WebKit
		else if ( wikEd.safari === true || wikEd.chrome === true || wikEd.webkit === true ) {
			if ( this.styleElement.firstChild !== null ) {
				this.styleElement.removeChild( this.styleElement.firstChild );
			}
			this.styleElement.appendChild( contextObj.createTextNode( rules ) );
		}

		// via innerHTML
		else {
			this.styleElement.innerHTML = rules;
		}
		return;
	};
};


//
// wikEd.GetPersistent: get a cookie or a Greasemonkey persistent value (code copied from wikEd.js)
//

if ( wikEd.GetPersistent === undefined )
wikEd.GetPersistent = function ( name ) {

	var getStr;

	// check for web storage
	wikEd.DetectWebStorage();

	// get a value from web storage
	if ( wikEd.webStorage === true ) {
		getStr = window.localStorage.getItem( name );
	}

	// get a Greasemonkey persistent value
	else if ( wikEd.greasemonkey === true ) {
		getStr = GM_getValue( name, '' );
	}

	// get a cookie value
	else {
		getStr = wikEd.GetCookie( name );
	}

	// return string
	if ( typeof getStr !== 'string' ) {
		getStr = '';
	}
	return getStr;
};


//
// wikEd.DetectWebStorage: detect if local storage is available (code copied from wikEd.js)
//

if ( wikEd.DetectWebStorage === undefined )
wikEd.DetectWebStorage = function () {

	if ( wikEd.webStorage === null ) {
		wikEd.webStorage = false;

		// https://bugzilla.mozilla.org/show_bug.cgi?id=748620
		try {
			if ( typeof window.localStorage === 'object' ) {

				// web storage does not persist between local html page loads in firefox
				if ( /^file:\/\//.test( wikEd.pageOrigin ) === false ) {
					wikEd.webStorage = true;
				}
			}
		}
		catch ( exception ) {
		}
	}
	return;
};


//
// wikEd.GetCookie: get a cookie (code copied from wikEd.diff.js)
//

if ( wikEd.GetCookie === undefined )
wikEd.GetCookie = function ( cookieName ) {

	var cookie = ' ' + document.cookie;
	var search = ' ' + cookieName + '=';
	var cookieValue = '';
	var offset = 0;
	var end = 0;
	offset = cookie.indexOf( search );
	if ( offset !== -1 ) {
		offset += search.length;
		end = cookie.indexOf( ';', offset );
		if ( end === -1 ) {
			end = cookie.length;
		}
		cookieValue = cookie.substring( offset, end );
		cookieValue = cookieValue.replace( /\\+/g, ' ' );
		cookieValue = decodeURIComponent( cookieValue );
	}
	return cookieValue;
};


//
// wikEd.SetCookie: set a cookie, deletes a cookie for expire = -1 (code copied from wikEdDiff.js)
//

if ( wikEd.SetCookie === undefined )
wikEd.SetCookie = function ( name, value, expires, path, domain, secure ) {

	var cookie = name + '=' + encodeURIComponent( value );

	if ( expires !== undefined && expires !== null ) {

		// generate a date 1 hour ago to delete the cookie
		if ( expires === -1 ) {
			var cookieExpire = new Date();
			expires = cookieExpire.setTime( cookieExpire.getTime() - 60 * 60 * 1000 );
			expires = cookieExpire.toUTCString();
		}

		// get date from expiration preset
		else if ( expires === 0 ) {
			var cookieExpire = new Date();
			expires = cookieExpire.setTime( cookieExpire.getTime() + wikEd.config.cookieExpireSec * 1000 );
			expires = cookieExpire.toUTCString();
		}
		cookie += '; expires=' + expires;
	}
	if ( typeof path === 'string' ) {
		cookie += '; path=' + path;
	}
	if ( typeof domain === 'string' ) {
		cookie += '; domain=' + domain;
	}
	if ( secure === true ) {
		cookie += '; secure';
	}
	document.cookie = cookie;
	return;
};

//
// wikEd.DiffAjaxRequest: cross browser wrapper for Ajax requests
//

wikEd.DiffAjaxRequest = function ( requestMethod, requestUrl, postFields, overrideMimeType, ResponseHandler ) {

	var request;
	var headers = {};
	var formData;

	// prepare POST request
	if ( requestMethod === 'POST' ) {

		// assemble string body
		if ( typeof FormData !== 'function' ) {

			// create boundary
			var boundary = wikEd.CreateRandomString( 12 );

			// POST header, charset: WebKit workaround http://aautar.digital-radiation.com/blog/?p=1645
			headers['Content-Type'] = 'multipart/form-data; charset=UTF-8; boundary=' + boundary;

			// assemble body data
			formData = '';
			for ( var fieldName in postFields ) {
				if ( Object.prototype.hasOwnProperty.call( postFields, fieldName ) === true ) {
					formData += '--' + boundary + '\r\n';
					formData += 'Content-Disposition: form-data; name="' + fieldName + '"\r\n\r\n' + postFields[fieldName] + '\r\n';
				}
			}
			formData += '--' + boundary + '--\r\n';
		}

		// use FormData object
		else {
			formData = new window.FormData();
			for ( var fieldName in postFields ) {
				if ( Object.prototype.hasOwnProperty.call( postFields, fieldName ) === true ) {
					formData.append( fieldName, postFields[fieldName] );
				}
			}
		}
	}

	// send the request using Greasemonkey GM_xmlhttpRequest
	if ( wikEd.greasemonkey === true ) {
		headers['User-Agent'] = window.navigator.userAgent;

		// workaround for Error: Greasemonkey access violation: unsafeWindow cannot call GM_xmlhttpRequest.
		// see http://wiki.greasespot.net/Greasemonkey_access_violation
		window.setTimeout( function () {
			new GM_xmlhttpRequest( {
				'method':  requestMethod,
				'url':     requestUrl,
				'overrideMimeType': overrideMimeType,
				'headers': headers,
				'data':    formData,
				'onreadystatechange':
					function ( ajax ) {
						if ( ajax.readyState !== 4 ) {
							return;
						}
						ResponseHandler( ajax );
						return;
					}
			} );
		}, 0);
	}

	// use standard XMLHttpRequest
	else {

		// allow ajax request from local copy for testing no longer working, see https://bugzilla.mozilla.org/show_bug.cgi?id=546848

		// create new XMLHttpRequest object
		if ( typeof window.XMLHttpRequest === 'function' || typeof window.XMLHttpRequest === 'object' ) {
			request = new window.XMLHttpRequest();
		}

		// IE
		else if ( typeof window.ActiveXObject === 'object' ) {

			// IE 6
			try {
				request = new window.ActiveXObject( 'Microsoft.XMLHTTP' );
			}

			// IE 5.5
			catch ( exception ) {
				try {
					request = new window.ActiveXObject( 'Msxml2.XMLHTTP' );
				}
				catch ( exceptionInner ) {
					return;
				}
			}
		}
		if ( request === undefined ) {
			return;
		}

		// open the request
		request.open( requestMethod, requestUrl, true );

		// set the headers
		for ( var headerName in headers ) {
			if ( Object.prototype.hasOwnProperty.call( headers, headerName ) === true ) {
				request.setRequestHeader( headerName, headers[headerName] );
			}
		}

		// set the mime type
		if ( request.overrideMimeType !== undefined && overrideMimeType !== null ) {
			request.overrideMimeType( overrideMimeType );
		}

		// send the request, catch security violations Opera 0.9.51
		try {
			request.send( formData );
		}
		catch ( exception ) {
			return;
		}

		// wait for the data
		request.onreadystatechange = function () {
			if ( request.readyState !== 4 ) {
				return;
			}
			ResponseHandler( request );
			return;
		};
	}
	return;
};


//
// wikEd.CreateRandomString: create random string of specified length and character set (code copied from wikEd.js)
//

if ( wikEd.CreateRandomString === undefined )
wikEd.CreateRandomString = function ( strLength, charSet ) {

	if ( charSet === undefined ) {
		charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789';
	}
	var str = '';
	for ( var i = 0; i < strLength; i ++ ) {
		str += charSet.charAt( Math.floor( Math.random() * charSet.length ) );
	}
	return str;
};


//
// wikEd.GetOffsetTop: get element offset relative to window top (code copied from wikEd.js)
//

if ( wikEd.GetOffsetTop === undefined )
wikEd.GetOffsetTop = function ( element ) {

	var offset = 0;
	do {
		offset += element.offsetTop;
	} while ( ( element = element.offsetParent ) !== null );
	return offset;
};


//
// wikEd.GetGlobals: parse global context variables (code copied from wikEd.js)
//   uses postMessage, head script, and JSON encoding for Greasemonkey global to GM context access

if ( wikEd.GetGlobals === undefined )
wikEd.GetGlobals = function ( names, gotGlobalsHook ) {

	if ( gotGlobalsHook !== undefined ) {
		wikEd.gotGlobalsHook.push( gotGlobalsHook );
	}

	// code already running in global context
	if ( wikEd.greasemonkey !== true ) {
		var globalScopeCode = '';
		for ( var i = 0; i < names.length; i ++ ) {
			globalScopeCode += '' +
				'if ( typeof ' + names[i] + ' !== \'undefined\' ) {' +
				'  wikEd.wikiGlobals.' + names[i] + ' = ' + names[i] + ';' +
				'}';
		}
		if ( gotGlobalsHook !== undefined ) {
			globalScopeCode += 'wikEd.ExecuteHook( wikEd.gotGlobalsHook[' + ( wikEd.gotGlobalsHook.length - 1 ) + '], true );';
		}
		eval( globalScopeCode );
		return;
	}

	// prepare code to be executed in global context for Greasemonkey
	if ( window.postMessage === undefined || typeof JSON !== 'object' ) {
		return;
	}
	var globalScopeCode = 'var globalObj = {};';
	if ( gotGlobalsHook !== undefined ) {
		wikEd.gotGlobalsHook.push( gotGlobalsHook );
		globalScopeCode += 'globalObj.hookNumber = ' + ( wikEd.gotGlobalsHook.length - 1 ) + ';';
	}
	globalScopeCode += 'globalObj.scriptId = \'wikEdGetGlobalScript' + wikEd.getGlobalsCounter + '\';';
	globalScopeCode += 'globalObj.wikEdGetGlobals = {};';

	// add global scope variables
	for ( var i = 0; i < names.length; i ++ ) {
		globalScopeCode += '' +
			'if ( typeof ' + names[i] + ' !== \'undefined\' ) {' +
			'  globalObj.wikEdGetGlobals[\'' + names[i] + '\'] = ' + names[i] + ';' +
			'}';
	}
	globalScopeCode += 'var globalObjStr = \'wikEd:\' + JSON.stringify( globalObj );';
	var origin = wikEd.pageOrigin;
	if ( origin === 'file://' ) {
		origin = '*';
	}
	globalScopeCode += 'window.postMessage( globalObjStr, \'' + origin + '\' );';

	// create head script to execute the code
	var script = document.createElement( 'script' );
	script.id = 'wikEdGetGlobalScript' + wikEd.getGlobalsCounter;
	wikEd.getGlobalsCounter ++;
	if ( typeof script.innerText !== 'undefined' ) {
		script.innerText = globalScopeCode;
	}
	else {
		script.textContent = globalScopeCode;
	}
	wikEd.head.appendChild( script );
	return;
};


//
// wikEd.GetGlobalsReceiver: event handler for wikEd.GetGlobals postMessage (code copied from wikEd.js)
//

if ( wikEd.GetGlobalsReceiver === undefined )
wikEd.GetGlobalsReceiver = function ( event ) {

	if ( event.source !== window ) {
		return;
	}
	if ( event.origin !== 'null' && event.origin !== wikEd.pageOrigin ) {
		return;
	}
	if ( event.data !== '' ) {

		// test if sent by wikEd
		if ( /^wikEd:/.test( event.data ) === false ) {
			return;
		}
		event.stopPropagation();
		var data = event.data.replace( /wikEd:/, '' );
		var globalObj = JSON.parse( data );
		var globals = globalObj.wikEdGetGlobals;
		if ( globals !== null ) {
			for ( var key in globals ) {
				if ( Object.prototype.hasOwnProperty.call( globals, key ) === true ) {
					wikEd.wikiGlobals[key] = globals[key];
				}
			}

			// run scheduled functions only once
			if ( globalObj.hookNumber !== undefined && wikEd.gotGlobalsHook[globalObj.hookNumber] !== undefined ) {
				wikEd.ExecuteHook( wikEd.gotGlobalsHook[globalObj.hookNumber], true );
			}

			// clean up head script
			var script = document.getElementById( globalObj.scriptId );
			if ( script !== null ) {
				wikEd.head.removeChild( script );
			}
		}
	}
	return;
};


//
// wikEd.DiffAddEventListener: wrapper for addEventListener (http://ejohn.org/projects/flexible-javascript-events/)
//

wikEd.DiffAddEventListener = function ( domElement, eventType, eventHandler, useCapture ) {

	if ( domElement === undefined ) {
		return;
	}
	if ( typeof domElement.addEventListener === 'function' ) {
		domElement.addEventListener( eventType, eventHandler, useCapture );
	}
	else {
		domElement['wikEd' + eventType + eventHandler] = eventHandler;
		domElement[eventType + eventHandler] = function () {
			var eventRootElement = document;
			if ( document.addEventListener === undefined ) {
				eventRootElement = window;
			}
			domElement['wikEd' + eventType + eventHandler]( eventRootElement.event );
		};
		domElement.attachEvent( 'on' + eventType, domElement[eventType + eventHandler] );
	}
	return;
};


//
// wikEd.ExecuteHook: executes scheduled custom functions from functionsHook array (code copied from wikEd.js)
//

if ( wikEd.ExecuteHook === undefined )
wikEd.ExecuteHook = function ( functionsHook, onlyOnce ) {

	if ( functionsHook === undefined ) {
		return;
	}
	for ( var i = 0; i < functionsHook.length; i ++ ) {
		if ( typeof functionsHook[i] === 'function' ) {
			functionsHook[i]();
		}
	}
	if ( onlyOnce === true ) {
		functionsHook = [];
	}
	return;
};


//
// wikEd.DiffWrapperHandler: event handler for diff table: scroll to edit field (double click) or close (shift/ctrl/alt-double click)
//

wikEd.DiffWrapperHandler = function ( event ) {

	// toggle (shift/ctrl/alt-double click)
	if ( event.shiftKey === true || event.ctrlKey === true || event.altKey === true || event.metaKey === true ) {
		wikEd.DiffButtonHandler();
	}

	// scroll to edit field (double click)
	else {

		// filter out selecting double clicks on text
		if ( window.getSelection !== undefined ) {
			var sel = window.getSelection();

			// explicitOriginalTarget (Firefox)
			var textTarget = event.explicitOriginalTarget;
			if ( textTarget !== undefined ) {
				if ( textTarget.nodeName === '#text' ) {
					return;
				}
			}

			// ignore for non-blank selection
			else if ( sel !== null && /^\s*$/.test( sel.toString() ) === false ) {
				return;
			}
			sel.collapseToEnd();
		}

		// scroll to edit area
		var scrollTo;
		if ( wikEd.inputWrapper !== null ) {
			scrollTo = wikEd.inputWrapper;
		}

		// or article preview
		if ( scrollTo === undefined && window.getElementsByClassName !== undefined ) {
			scrollTo = document.getElementsByClassName( 'diff-currentversion-title' )[0];
		}

		// or divider between diff and preview
		if ( scrollTo === undefined && window.getElementsByClassName !== undefined ) {
			scrollTo = document.getElementsByClassName( 'diff-hr' )[0];
		}

		// or diff table title
		if ( scrollTo === undefined ) {
			if ( wikEd.diffTableTitle !== null ) {
				scrollTo = wikEd.diffTableTitle;
			}
		}

		// scroll
		if ( scrollTo !== undefined ) {
			window.scroll( 0, wikEd.GetOffsetTop( scrollTo ) );
		}
	}
	return;
};


// call startup
wikEd.DiffStartup();

// </syntaxhighlight>
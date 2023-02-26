/* =================
   retrieved from starwars.wikia.com
   ================= */

// onload stuff
var firstRun = true;
 
function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}
 
	window.pageName = wgPageName;
	window.storagePresent = (typeof(localStorage) != 'undefined');
 
	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}
 
	// Upload form - need to run before adding hide buttons
	if ( wgCanonicalSpecialPageName === 'Upload' ) {
		setupUploadForm();
	}
 
	addHideButtons();
 
	if( document.getElementById('mp3-navlink') !== null ) {
		document.getElementById('mp3-navlink').onclick = onArticleNavClick;
		document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
	}
 
	if( window.storagePresent ) {
		initVisibility();
	}
 
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
 
	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;
 
	if( !bodyClass || (bodyClass.indexOf('page-') === -1) ) {
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
		localStorage.setItem('infoboxshow-' + page, nowShown);
	}
}
 
/**
 * jQuery version of Sikon's fillEditSummaries
 * @author Grunny
 */
function fillEditSummaries() {
 
	if ( !$( '#wpSummaryLabel' ).length ) {
		return;
	}
 
	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$summaryOptionsList,
			$summaryLabel = $( '#wpSummaryLabel' ),
			lines = data.split( '\n' ),
			$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standard summaries: ' );
 
		$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).change( function() {
			var editSummary = $( this ).val();
			if ( editSummary !== '' ) {
				$( '#wpSummary' ).val( editSummary );
			}
		} );
 
		for ( var i = 0; i < lines.length; i++ ) {
			var editSummaryText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$summaryOptionsList.append( $( '<option>' ).val( editSummaryText ).text( lines[i] ) );
		}
 
		$summaryLabel.prepend( $wrapper.append( $summaryOptionsList ) );
	} );
 
}
 
/**
 * jQuery version of Sikon's fillPreloads
 * @author Grunny
 */
function fillPreloads() {
 
	if( !$( '#lf-preload' ).length ) {
		return;
	}
 
	$( '#lf-preload' ).attr( 'style', 'display: block' );
 
	$.get( wgScript, { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$preloadOptionsList,
			lines = data.split( '\n' );
 
		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).change( function() {
			var templateName = $( this ).val();
			if ( templateName !== '' ) {
				templateName = 'Template:' + templateName + '/preload';
				templateName = templateName.replace( ' ', '_' );
				$.get( wgScript, { title: templateName, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
					insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
				} );
			}
		} );
 
		for ( var i = 0; i < lines.length; i++ ) {
			var templateText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$preloadOptionsList.append( $( '<option>' ).val( templateText ).text( lines[i] ) );
		}
 
		$( '#lf-preload-cbox' ).html( $preloadOptionsList );
	} );
 
	$( '#lf-preload-pagename' ).html( '<input type="text" class="textbox" />' );
	$( '#lf-preload-button' ).html( '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />' );
 
}
 
function doCustomPreload() {
	var value = $( '#lf-preload-pagename > input' ).val();
	value = value.replace( ' ', '_' );
	$.get( wgScript, { title: value, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}

/************************************************************
 * Functions.js stuff
 ************************************************************/
 
/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();
 
	if(node == null)
		node = document;
 
	if(tag == null)
		tag = '*';
 
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);
 
	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
 
	return classElements;
}
 
function ClassTester(className)
{
	this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
 
ClassTester.prototype.isMatch = function(element)
{
	return this.regex.test(element.className);
}
/*
    end getElementsByClass
*/
 
function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}
 
function getFirstHeading() {
	var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
	return (elements != null && elements.length > 0) ? elements[0] : null;
}
 
/*
    Returns the element's nearest parent that has the specified CSS class.
*/
function getParentByClass(className, element) {
	var tester = new ClassTester(className);
	var node = element.parentNode;
 
	while(node != null && node != document)
	{
		if(tester.isMatch(node))
			return node;
 
		node = node.parentNode;
	}
 
	return null;
}
 
/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
function rewriteHover() {
	var gbl = document.getElementById("hover-global");
 
	if(gbl == null)
		return;
 
	var nodes = getElementsByClass("hoverable", gbl);
 
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].onmouseover = function() {
			this.className += " over";
		}
		nodes[i].onmouseout = function() {
			this.className = this.className.replace(new RegExp(" over\\b"), "");
		}
	}
}
/************************************************************
 * End old Functions.js stuff
 ************************************************************/
// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}

	window.pageName = mw.config.get('wgPageName');
	window.storagePresent = (typeof(localStorage) != 'undefined');

	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}

	// Upload form - need to run before adding hide buttons
	if ( mw.config.get('wgCanonicalSpecialPageName') === 'Upload' ) {
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
	rewriteHover();
	// replaceSearchIcon(); this is now called from MediaWiki:Monobook.js
	fixSearch();
	hideContentSub();
	addTalkheaderPreload();

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

	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$preloadOptionsList,
			lines = data.split( '\n' );

		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).change( function() {
			var templateName = $( this ).val();
			if ( templateName !== '' ) {
				templateName = 'Template:' + templateName + '/preload';
				templateName = templateName.replace( ' ', '_' );
				$.get( mw.config.get( 'wgScript' ), { title: templateName, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
					if ($('.CodeMirror').length > 0) {
						WikiEditorCodeMirror.doc.replaceSelection(data);
						return;
					}
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
	$.get( mw.config.get( 'wgScript' ), { title: value, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		if ($('.CodeMirror').length > 0) {
			WikiEditorCodeMirror.doc.replaceSelection(data);
			return;
		}
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}

// ============================================================
// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length == 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
	$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
}
// END JavaScript title rewrite

function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);

	if( show == 'false' ) {
		infoboxToggle();
	}

	var hidables = getElementsByClass('hidable');

	for(var i = 0; i < hidables.length; i++) {
		show = localStorage.getItem('hidableshow-' + i  + '_' + page);

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

function onArticleNavClick() {
	var div = document.getElementById('mp3-nav');

	if( div.style.display == 'block' )
		div.style.display = 'none';
	else
		div.style.display = 'block';
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

			localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
	if( mw.config.get('wgUserName') ) {
		$('.insertusername').text(mw.config.get('wgUserName'));
	}
}

function substUsernameTOC() {
	var toc = $('#toc');
	var userpage = $('#pt-userpage');

	if( !userpage || !toc )
		return;

	var username = $('#pt-userpage').children(':first-child').text();
	$('span.toctext:not(:has(*)), span.toctext i', toc).each(function()
	{
		$(this).text($(this).text().replace('<insert name here>', username));
	});
}

function fixSearch() {
	var button = document.getElementById('searchSubmit');

	if( button )
		button.name = 'go';
}

/************************************************************
 * Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
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

window.insertAtCursor = function(myField, myValue) {
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
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

$( loadFunc );

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES SETTINGS

///////////////////////////////////////////////////////////////////////////////////////////////////////////

window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxPages = [ 'Special:RecentChanges', 'Special:Watchlist', 'Special:Log', 'Special:NewFiles', 'Special:AbuseLog' ];
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
	'ajaxrc-refresh-text': 'Automatically refresh',
	'ajaxrc-refresh-hover': 'Enable auto-refreshing page loads',
}}}}});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH SETTINGS

///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco and Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 * Removal of section edit buttons and new section tab on talk pages added by [[User:Grunny|Grunny]]
 * User:/User talk: support and styling in new skin by [[User:Grunny|Grunny]]
 * UCP and FandomDesktop support by [[User:01miki10|01miki10]]
 */
function disableOldForumEdit() {
	if ( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	$( '#old-forum-warning-section .mw-editsection' ).remove();
	if ( !document.getElementById( 'old-forum-warning' ) ) {
		return;
	}

	if ( $( '.page-header #ca-addsection' ).length ) {
		$( '.page-header #ca-addsection' ).html( 'Archived' ).removeAttr( 'href' );
		$( '.page-header #ca-edit' ).remove();
		$( '.page-side-tools #ca-addsection' ).remove();
		$( 'span.mw-editsection' ).remove();
		return;
	} else {
		$( '.page-header #ca-edit' ).html( 'Archived' ).removeAttr( 'href' );
		$( '.page-side-tools #ca-edit' ).remove();
		$( 'span.mw-editsection' ).remove();
		return;
	}
}
$( disableOldForumEdit );

//Removes the "Featured on:" line on File pages -- By Grunny
$( function (){
	if ( mw.config.get('wgNamespaceNumber') == 6 && $('#file').length != 0 ) {
		$('#file').html($('#file').html().replace(/Featured on\:(.*?)\<br\>/, ''));
	}
} );

/**
 * Show/hide for media timeline -- Grunny
 **/
$( function () {
	if( !$( '.timeline-toggles' ).length ) {
		return;
	}
	$( '.timeline-toggles' ).find( 'td > a' ).click( function () {
		var	hideBtnClass = $( this ).parent().attr( 'class' ),
			$hideContent = $( 'tr.' + hideBtnClass );
		if( !$hideContent.length ) {
			return;
		}
		$hideContent.toggle($(this).text().includes('show'));
		if ( $( this ).text().indexOf( 'hide' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'hide', 'show' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'show', 'hide' ) );
		}
	} );
} );

// Lazy load SWTOR article appearances list
$( function lazyLoadTorApp() {
	var	pageName = 'Star_Wars:_The_Old_Republic',
		appPageName = encodeURIComponent( pageName + '/Appearances' ),
		$lazyLoadEl = $( '#WookTorLazyload' ),
		includeHtml,
		$editLink;
	if ( mw.config.get('wgPageName') !== pageName || !$lazyLoadEl.length ) {
		return;
	}

	$lazyLoadEl.html( '<img src="https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Loading..." />' );
	$.getJSON( '/api.php?action=parse&page=' + appPageName + '&format=json' )
		.done( function ( data ) {
			if ( data.parse && data.parse.text ) {
				includeHtml = data.parse.text['*'];
				$lazyLoadEl.html( includeHtml );
				addHideButtons();
				$editLink = $lazyLoadEl.prev( 'h2' ).find( '.editsection a' );
				if ( $editLink.length ) {
					$editLink.attr( 'href', '/index.php?title=' + appPageName + '&action=edit' );
				}
			}
		} );
} );

/**
 * Hides the link to parent pages from subpages if {{HideContentSub}} is included
 **/
function hideContentSub() {
	if ( mw.config.get( 'wgNamespaceNumber' ) === 0 || $( '#hideContentSub' ).length > 0 ) {	
		if ($( '.page-header__page-subtitle' ).text().substring(0, 1) === "<") {
            var	$wikiaHeader = $( '.page-header__page-subtitle' ),
                $backToPageLink;
            if ( mw.config.get( 'wgNamespaceNumber' ) % 2 === 1 ) {
                // ugly hack to only leave back to page link on talk pages
                $backToPageLink = $wikiaHeader.find( 'a[accesskey="c"]' );
                $wikiaHeader.html( '' ).append( $backToPageLink );
            } else {
                $wikiaHeader.hide();
            }
        }
	}
}

/**
 * Adds {{Talkheader}} template to preload parameter on new talk page links
 **/
function addTalkheaderPreload() {
	if (mw.config.get('wgNamespaceNumber') === 0) {
		document.querySelector('#ca-talk.new').href += '&preload=Template:Talkheader/preload';
	}
}

// </nowiki></pre>

// Related Categories
$(document).ready( function () {
	if( document.getElementById("related-catlinks") ) {
		document.getElementById("catlinks").appendChild(document.getElementById("related-catlinks"));
	}
} );

/* Disable rollback script */
window.RollbackWikiDisable = true;

/**
 * fillEditSummaries for VisualEditor, based on Grunny's jQuery version of Sikon's original version
 * @author 01miki10
 */

function fillEditSummariesVisualEditor() {
	mw.hook( 've.activationComplete' ).add(function () {
	if ( $( '#stdEditSummaries' ).length ) return;
		$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
			var	$summaryOptionsList,
				$summaryLabel = $( '.ve-ui-summaryPanel' ),
				$summaryInput = $( '.ve-ui-summaryPanel-summaryInputField > input' ),
				lines = data.split( '\n' ),
				$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standard summaries: ' );

			$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).change( function() {
				var editSummary = $( this ).val();
				if ( editSummary !== '' ) {
					$summaryInput.val( editSummary );
				}
			} );

			for ( var i = 0; i < lines.length; i++ ) {
				var editSummaryText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
				$summaryOptionsList.append( $( '<option>' ).val( editSummaryText ).text( lines[i] ) );
			}

			$summaryLabel.prepend( $wrapper.append( $summaryOptionsList ) );
		} );
	} );
}

$( fillEditSummariesVisualEditor );
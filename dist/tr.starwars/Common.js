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
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Gizle]</a>';
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
	hideContentSub();
	addTalkheaderPreload();

	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
}

function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;

	if(document.getElementById('infoboxtoggle').innerHTML == '[Gizle]') {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[Göster]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Gizle]';
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
			$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standart özetler: ' );

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
			button.appendChild( document.createTextNode('[Gizle]') );

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
			this.firstChild.nodeValue = '[Gizle]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Göster]';
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
		$(this).text($(this).text().replace('<isim girin>', username));
	});
}

/**
 * Start upload form customisations
 * @author Green tentacle
 */

function setupUploadForm(){
	// Check if cookie has been set for form style. Overrides URL parameter if set.
	var formstyle = localStorage.getItem("uploadform");

	$("#uploadBasicLinkJS").show();
	$("#uploadTemplateNoJS").hide();

	var wpLicense = $('#wpLicense');

	if ( wpLicense.length && window.location.search.indexOf('wpForReUpload=1') == -1){
		if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)){
			// Add link to basic form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="//starwars.fandom.com/tr/wiki/%C3%96zel:Y%C3%BCkle?basic=true" onclick="javascript:localStorage.setItem(\'uploadform\', \'basic\')">Basit yükleme formuna geç</a></div>');

			// Stretch table to full width
			$('#mw-htmlform-description').css('width', '100%');

			// Bind upload button to verify function
			$('#mw-upload-form').bind('submit', verifySummary);

			// Hide existing rows
			var rows = $('#mw-htmlform-description').find('tr');
			$('tr.mw-htmlform-field-HTMLTextAreaField').hide();
			$('tr.mw-htmlform-field-HTMLTextAreaField').next().detach();

			$('#mw-htmlform-description').addClass('hidable start-hidden');

			// Add new required rows
			rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Kaynak:</td><td class="mw-input"><textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			$('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
			var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
			tbody1.append('<tr><td class="mw-label" style="width: 125px;">Açıklama:</td><td class="mw-input"><textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody1.append('<tr><td colspan="2" style="text-align: center;">İsteğe bağlı alanlar <span class="hidable-button"></span></td></tr>');

			// Add new optional rows
			var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Dikkat:</td><td class="mw-input"><textarea id="attentionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Orijinal tasarımcı / sanatçı:</td><td class="mw-input"><textarea id="artistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Değiştirme / düzenleme / yükleme bilgisi:</td><td class="mw-input"><textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Diğer versiyonlar / kaynak resimler:</td><td class="mw-input"><textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Sanatçı kategorileri:</td><td class="mw-input"><textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Lisans sahibi kategorileri:</td><td class="mw-input"><textarea id="catlicenseeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Konu kategorileri:</td><td class="mw-input"><textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Tür kategorileri:</td><td class="mw-input"><textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
		} else {
			// Old style form just needs Information template in the summary box
			$('#wpUploadDescription').val('{{Bilgi\r\n|attention=\r\n|description=\r\n|source=\r\n|artist=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}');

			// Add link to guided form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="//starwars.fandom.com/tr/index.php?title=Special:Upload" onclick="javascript:localStorage.setItem(\'uploadform\', \'guided\')">Rehberli yükleme formuna geç</a></div>');
			
			$('#mw-upload-form').bind('submit', verifyName);
		}
	}
}

function verifySummary(){
	var wpLicense = document.getElementById('wpLicense');
	var wpDestFile = document.getElementById('wpDestFile');

	// Check for licensing
	if ( wpLicense.value == "" ){
		alert('Lisanslama tamamlanmalı.');
		return false;
	}

	// Check for source
	if ( document.getElementById('sourceBox').value == "" ){
		alert('Kaynak belirtilmeli.');
		return false;
	}

	// Check for duplicated or capitalized file extensions
	if ( wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg\.jpg|png\.png|gif\.gif|svg\.svg)$/)) {
		alert('Lütfen dosya isminde büyük veya çift dosya uzantıları kullanmayın.');
		return false;
	}

	var strBuilder = '{{Bilgi\r\n';
	strBuilder += '|attention=' + document.getElementById('attentionBox').value + '\r\n';
	strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|source=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|artist=' + document.getElementById('artistBox').value + '\r\n';
	strBuilder += '|filespecs=' + document.getElementById('filespecsBox').value + '\r\n';
	strBuilder += '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
	strBuilder += '|other versions=' + document.getElementById('versionsBox').value + '\r\n';
	strBuilder += '|cat artist=' + document.getElementById('catartistBox').value + '\r\n';
	strBuilder += '|cat licensee=' + document.getElementById('catlicenseeBox').value + '\r\n';
	strBuilder += '|cat subject=' + document.getElementById('catsubjectBox').value + '\r\n';
	strBuilder += '|cat type=' + document.getElementById('cattypeBox').value + '\r\n';
	strBuilder += '}}';

	document.getElementById('wpUploadDescription').value = strBuilder;

	wpLicense.selectedIndex = 0;

	return true;
}

function verifyName(){
	var wpDestFile = document.getElementById('wpDestFile');
	var wpLicense = document.getElementById( 'wpLicense' );
	
	// Check for duplicated or capitalized file extensions
	if ( wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg.jpg|png.png|gif.gif|svg.svg)$/)) {
		alert('Lütfen dosya isminde büyük veya çift dosya uzantıları kullanmayın.');
		return false;
	}

	// Check for annoying characters
	if ( wpDestFile.value.match(/(\(|\)|!|\?|,|\+|\'|\’)/)) {
		alert('Lütfen dosya isminde parantez, eğik çizgi, noktalama işaretleri veya alfanümerik olmayan başka bir karakter kullanmayın.');
		return false;
	}
	if ( wpLicense.value != '' ) {
		$( '#wpUploadDescription' ).val(
			$( '#wpUploadDescription' ).val().replace( '|licensing=', '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title )
		);

		wpLicense.selectedIndex = 0;
	}
	return true;
}

/**
 * End upload form customisations
 */

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
	'ajaxrc-refresh-text': 'Otomatik olarak yenile',
	'ajaxrc-refresh-hover': 'Sayfa yüklemelerini otomatik yenilemeyi etkinleştir',
}}}}});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH SETTINGS

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * modified for use in both Monaco and Monobook skins by Sikon
 * Section edit links added by Green tentacle
 * New Wikia skin support by Grunny
 */
function addEditIntro(name) {
	// Top link
	$('.page-header #ca-edit').attr('href', $('.page-header #ca-edit').attr('href') + '&editintro=' + name);
	$('.page-side-tools #ca-edit').attr('href', $('.page-side-tools #ca-edit').attr('href') + '&editintro=' + name);
	$('span.mw-editsection > a').each( function () {
		$(this).attr('href', $(this).attr('href') + '&editintro=' + name);
	} );
}

$( function () {
	if ( mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
		var cats = document.getElementById( 'articleCategories' );
		if ( !cats ) {
			return;
		}
		cats = cats.getElementsByTagName( 'a' );
		for ( var i = 0; i < cats.length; i++ ) {
			if ( cats[i].title === 'Büyük düzenleme geçiren sayfalar' ) {
				addEditIntro( 'Şablon:Kullanımda_giriş' );
				break;
			}
		}
	} else if ( mw.config.get( 'wgPageName' ) === 'Şablon:BiliyorMuydun' ) {
		addEditIntro( 'Şablon:BM_giriş' );
	}
} );
 
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

	if ( $( '#ca-addsection' ).length ) {
		$( '#ca-addsection' ).html( 'Arşivlendi' ).removeAttr( 'href' );
		$( '#ca-edit' ).remove();
		$( '#ca-addsection-side-tool' ).remove();
		$( 'span.mw-editsection' ).remove();
	} else {
		$( '#ca-edit' ).html( 'Arşivlendi' ).removeAttr( 'href' );
		$( '#ca-edit-side-tool' ).remove();
		$( 'span.mw-editsection' ).remove();
	}
}
$( disableOldForumEdit );

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
		$hideContent.toggle($(this).text().includes('göster'));
		if ( $( this ).text().indexOf( 'hide' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'gizle', 'göster' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'göster', 'gizle' ) );
		}
	} );
} );

// Lazy load SWTOR article appearances list
$( function lazyLoadTorApp() {
	var	pageName = 'Star_Wars:_The_Old_Republic',
		appPageName = encodeURIComponent( pageName + '/Görünümler' ),
		$lazyLoadEl = $( '#WookTorLazyload' ),
		includeHtml,
		$editLink;
	if ( mw.config.get('wgPageName') !== pageName || !$lazyLoadEl.length ) {
		return;
	}

	$lazyLoadEl.html( '<img src="https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Yükleniyor..." />' );
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
		$( '.page-header__page-subtitle .subpages' ).remove();
		$( '.page-header__page-subtitle' ).text( function(a,b) { return b.replace(' |', ''); });
    }
}

/**
 * Adds {{Talkheader}} template to preload parameter on new talk page links
 **/
function addTalkheaderPreload() {
	if (mw.config.get('wgNamespaceNumber') === 0 && document.querySelector('#ca-talk.new')) {
		document.querySelector('#ca-talk.new').href += '&preload=Şablon:Tartışma/preload';
	}
}

// </nowiki></pre>

// Related Categories
$(document).ready( function () {
	if( document.getElementById("related-catlinks") ) {
		document.getElementById("articleCategories").appendChild(document.getElementById("related-catlinks"));
	}
} );

/* This script allows the numbers of articles on [[List of Star Wars Wikis in other languages]] to load automatically (current number) */
(function() {
    var stats = ['articles', 'activeusers', 'admins', 'edits', 'images'],
        wikis = [],
        regex = /^[0-9a-z\.-]+$/,
        prefix = 'outwikistats-';
    $(stats.map(function(name) {
        return '.outwikistats-' + name;
    }).join(', ')).each(function() {
        var $this = $(this),
            wiki = $this.text();
        $this.attr({
            'data-attr': $this.attr('class').substring(prefix.length),
            'data-wiki': wiki
        }).html($('<img>', {
            src: 'https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif'
        }));
        if (wikis.indexOf(wiki) === -1) {
            wikis.push(wiki);
        }
    });
    wikis.forEach(function(wiki) {
        if (!wiki.match(regex)) {
            return;
        }
        var url;
        if (wiki.indexOf('.') === -1) {
            url = 'https://' + wiki + '.fandom.com';
        } else {
            var wikiParts = wiki.split('.'),
                wikiLang = wikiParts[0],
                wikiDomain = wikiParts[1];
            url = 'https://' + wikiDomain + '.fandom.com/' + wikiLang;
        }
        $.ajax({
            type: 'GET',
            url: url + '/api.php',
            data: {
                action: 'query',
                meta: 'siteinfo',
                siprop: 'statistics',
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function(data) {
                var stats = data.query.statistics;
                if (!stats) {
                    return;
                }
                $('[data-wiki="' + wiki + '"]').each(function() {
                    var $this = $(this),
                        prop = $this.attr('data-attr'),
                        result = stats[prop];
                    $this.text(result);
                });
            }
        });
    });
})();

/* Disable rollback script */
window.RollbackWikiDisable = true;

/**
 * fillEditSummaries for VisualEditor, based on Grunny's jQuery version of Sikon's original version
 * @author 01miki10
 */

function fillEditSummariesVisualEditor() {
	mw.hook( 've.activationComplete' ).add(function () {
	if ( $( '#stdEditSummaries' ).length ) return;
		$.get( mw.config.get( 'wgScript' ), { title: 'Şablon:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
			var	$summaryOptionsList,
				$summaryLabel = $( '.ve-ui-summaryPanel' ),
				$summaryInput = $( '.ve-ui-summaryPanel-summaryInputField > input' ),
				lines = data.split( '\n' ),
				$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standart özetler: ' );

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

// Copied from https://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIconsOasis() {
    if ( $( '#title-eraicons' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
    	} else {
    	    $( '.page-header__contribution > div' ).first().prepend( $( '#title-eraicons' ).show() );
    	}
    }
} );

if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
	$( '.page-header__actions' ).first().prepend( $( '.eraicons' ).first() );
} else {
	$( '.page-header__contribution > div:first-child' ).append($('.eraicons').first() );
}

/* EN title */
(function() {
    var $ent = document.querySelector('#enTitle'),
        $header = document.querySelector('.page-header__title-wrapper');
    if ($ent && $header && !mw.config.get('wgIsMainPage')) {
        $ent.style.display = 'block';
        $header.appendChild($ent);
    }
})();

// Allowing easier downloading of files in their original format, to avoid webp files
if ( mw.config.get( 'wgCanonicalNamespace' ) == 'Dosya' ) {
	$( '#file a' ).attr( 'href', function( a, b ) {
		return b + '&format=original';
	} );
}
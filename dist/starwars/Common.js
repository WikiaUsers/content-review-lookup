/* <pre><nowiki> */

if (mw.config.get('wgPageName') === 'Wookieepedia:IRC/Cloak_requests') {
    importArticles({
        type: 'script',
        article: 'MediaWiki:AjaxCloakRequest.js'
    });
}

if ((mw.config.get('wgPageName') == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough') ||
    (mw.config.get('wgPageName') == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/ArmoryBox') ||
    (mw.config.get('wgPageName') == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/FactionsBox')) {
        importArticles({
            type: 'style',
            article: 'MediaWiki:SWUWalkthrough.css'
        });
}

if ((mw.config.get('wgPageName').substring(0,mw.config.get('wgPageName').indexOf('/')) == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough') ||
    (mw.config.get('wgPageName').substring(0,61) == 'Wookieepedia:Star Wars: Uprising Super Walkthrough/Abilities/') ||
    (mw.config.get('wgPageName').substring(0,17) == 'Template:Uprising') ||
    (mw.config.get('wgPageName') == 'Template:AbilityList') || 
    (mw.config.get('wgPageName') == 'Template:CurrencyIcon') ||
    (mw.config.get('wgPageName') == 'Template:EquipmentTable') || 
    (mw.config.get('wgPageName') == 'Template:TrainerCard') ||
    (mw.config.get('wgPageName') == 'Template:TrainerCard/Main')) {
        importArticles({
            type: 'style',
            article: 'MediaWiki:SWU_Super_Walkthrough_Fonts.css'
        });
}

if ((mw.config.get('wgPageName') == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Burnin_Konn') || 
    (mw.config.get('wgPageName') == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Components') || 
    (mw.config.get('wgPageName') == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Components/Materials') || 
    (mw.config.get('wgPageName') == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Anoat_sector') || 
    (mw.config.get('wgPageName') == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Components/Crystals') || 
    (mw.config.get('wgPageName') == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/ArmoryBox') || 
    (mw.config.get('wgPageName') == 'Template:UprisingPageFooter') || 
    (mw.config.get('wgPageName') == 'Template:UprisingPageFooter/Components') || 
    (mw.config.get('wgPageName') == 'Template:UprisingPageFooter/Main') || 
    (mw.config.get('wgPageName') == 'Template:UprisingPageFooter/Abilities') || 
    (mw.config.get('wgPageName') == 'Template:UprisingCanonTabs/doc') || 
    (mw.config.get('wgPageName') == 'Template:UprisingCanonTabs') || 
    (mw.config.get('wgPageName') == 'Template:UprisingCanonTabs/Main') || 
    (mw.config.get('wgPageName') == 'Template:UprisingEquipmentInfobox') || 
    (mw.config.get('wgPageName') == 'Template:UprisingEquipmentInfobox/main') || 
    (mw.config.get('wgPageName') == 'Template:UprisingPageFooter/General') || 
    (mw.config.get('wgPageName') == 'Template:UprisingComponentBox') || 
    (mw.config.get('wgPageName') == 'Template:EquipmentProgressionTable') || 
    (mw.config.get('wgPageName') == 'Template:AbilityList') || 
    (mw.config.get('wgPageName') == 'Template:EquipmentTable') || 
    (mw.config.get('wgPageName') == 'Template:UprisingAbilityBox/Main')) {
        importArticles({
            type: 'style',
            article: 'MediaWiki:SWU_Super_Walkthrough_Equipment.css'
        });
}

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
	$.get( wgScript, { title: value, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
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
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="//starwars.wikia.com/index.php?title=Special:Upload&basic=true" onclick="javascript:localStorage.setItem(\'uploadform\', \'basic\')">Switch to basic upload form</a></div>');

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
			rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Source:</td><td class="mw-input"><textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			$('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
			var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
			tbody1.append('<tr><td class="mw-label" style="width: 125px;">Description:</td><td class="mw-input"><textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody1.append('<tr><td colspan="2" style="text-align: center;">Optional fields <span class="hidable-button"></span></td></tr>');

			// Add new optional rows
			var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Attention:</td><td class="mw-input"><textarea id="attentionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Original designer / artist:</td><td class="mw-input"><textarea id="artistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Conversion / editing / upload information:</td><td class="mw-input"><textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Other versions / source images:</td><td class="mw-input"><textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Artist categories:</td><td class="mw-input"><textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Licensee categories:</td><td class="mw-input"><textarea id="catlicenseeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Subject categories:</td><td class="mw-input"><textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Type categories:</td><td class="mw-input"><textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
		} else {
			// Old style form just needs Information template in the summary box
			$('#wpUploadDescription').val('==Summary==\r\n{{Information\r\n|attention=\r\n|description=\r\n|source=\r\n|artist=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}');

			// Add link to guided form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="//starwars.wikia.com/index.php?title=Special:Upload" onclick="javascript:localStorage.setItem(\'uploadform\', \'guided\')">Switch to guided upload form</a></div>');
			
			$('#mw-upload-form').bind('submit', verifyName);
		}
	}
}

function verifySummary(){
	var wpLicense = document.getElementById('wpLicense');
	var wpDestFile = document.getElementById('wpDestFile');

	// Check for licensing
	if ( wpLicense.value == "" ){
		alert('Licensing must be completed.');
		return false;
	}

	// Check for source
	if ( document.getElementById('sourceBox').value == "" ){
		alert('Source must be completed.');
		return false;
	}

	// Check for duplicated or capitalized file extensions
	if ( wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg\.jpg|png\.png|gif\.gif|svg\.svg)$/)) {
		alert('Please do not use capitalized or duplicated file extensions in the filename.');
		return false;
	}

	var strBuilder = '==Summary==\r\n{{Information\r\n';
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
		alert('Please do not use capitalized or duplicated file extensions in the filename.');
		return false;
	}

	// Check for annoying characters
	if ( wpDestFile.value.match(/(\(|\)|!|\?|,|\+|\'|\’)/)) {
		alert('Please do not use parantheses, slashes, punctuation marks, or other non-alphanumeric characters in your filename.');
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

//Link FA

var FA_enabled  = true;

function addfaicon() {
	// if disabled
	if (!FA_enabled) return;
	var pLang = document.getElementById("p-lang");
	if (!pLang) return;
	var lis = pLang.getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		var li = lis[i];
		// only links with a corresponding Link_FA template are interesting
		if (!document.getElementById(li.className + "-fa"))   continue;
		// additional class so the template can be hidden with CSS
		li.className += " FA";
		// change title (mouse over)
		li.title = "This article is rated as featured article.";
	}
}
$(addfaicon);

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
			if ( cats[i].title === 'Category:Wookieepedia Featured articles' ) {
				addEditIntro( 'Template:Featured_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Wookieepedia Good articles' ) {
				addEditIntro( 'Template:Good_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Wookieepedia Comprehensive articles' ) {
				addEditIntro( 'Template:Comprehensive_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Articles undergoing major edits' || cats[i].title === 'Category:Works in progress' ) {
				addEditIntro( 'Template:Inuse_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Legends articles with canon counterparts' ) {
				addEditIntro( 'Template:Legends_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Canon articles with Legends counterparts' ) {
				addEditIntro( 'Template:Canon_editintro' );
				break;
			} else if ( mw.config.get( 'wgPageName' ) === 'Template:DYK editintro' ) {
				addEditIntro( 'Template:Good_editintro' );
				break;
			}
		}
	} else if ( mw.config.get( 'wgPageName' ) === 'Template:DidYouKnow' ) {
		addEditIntro( 'Template:DYK_editintro' );
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
		$hideContent.toggle();
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

// </nowiki></pre>

// Related Categories
$(document).ready( function () {
	if( document.getElementById("related-catlinks") ) {
		document.getElementById("catlinks").appendChild(document.getElementById("related-catlinks"));
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

 /* May the Fourth 2021 fun! */
   $(function () {
        $('#fourth').append("<iframe width='100%'  height='1200px' style='background-color:transparent!important' src='https://gleam.io/Rz3FG/win-stars-wars-day-prizes-with-fanatical'></iframe>");
    });
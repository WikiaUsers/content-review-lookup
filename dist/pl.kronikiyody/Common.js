// {{Username}}
if (wgUserName != 'null') {
        $('.insertusername').html(wgUserName);
}
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

function addMastheadTags() {
    var rights  = {},
        user    = "";
        
    rights["Mustafar29"]    = ["Administrator","Biurokrata"];
    rights["Henio z Tesco"] = ["Administrator","Biurokrata"];
    rights["TerrorDaktyl"]  = ["Administrator","Moderator czatu"];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        user = wgTitle;
    }
 
    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
}

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Summaries.js',
        'u:pl.tes:MediaWiki:Change.js'
    ]
});

$('#page-top').prependTo('#mw-content-text');

/* .username is the same class for the name of the
   user to edit a message wall post. Using this will
   always show the message as being edited as the viewer.

$('.username').text(mw.config.get('wgUserName'));
*/

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/* automatic actualisation of recent changes - [[w:c:dev:AjaxRC]] */
window.AjaxRCRefreshText = 'Automatyczna aktualizacja';
window.AjaxRCRefreshHoverText = 'Automatyczne odświeżenie strony';
window.ajaxPages = ["Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki"];
importScriptPage('AjaxRC/code.js', 'dev');


/*Większość kodu pochodzi od polskich helperów.*/

function moveToHeader(elem) {
    $('#WikiaPageHeader, #firstHeading').append($('#mw-content-text').find(elem));
}
$(function() {
    moveToHeader('#title-eraicons');
});

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny, übernommen aus MediaWiki:Common.js der Wookieepedia
 
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
// END JavaScript title rewrite

/* <pre><nowiki> */

importArticles({
    type: 'script',
    articles: [
        '',
    ]
});

if ((wgPageName == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough') ||
    (wgPageName == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/ArmoryBox') ||
    (wgPageName == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/FactionsBox')) {
        importArticles({
            type: 'style',
            article: 'MediaWiki:SWUWalkthrough.css'
        });
}

if ((wgPageName.substring(0,wgPageName.indexOf('/')) == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough') ||
    (wgPageName.substring(0,61) == 'Wookieepedia:Star Wars: Uprising Super Walkthrough/Abilities/') ||
    (wgPageName.substring(0,17) == 'Template:Uprising') ||
    (wgPageName == 'Template:AbilityList') || 
    (wgPageName == 'Template:CurrencyIcon') ||
    (wgPageName == 'Template:EquipmentTable') || 
    (wgPageName == 'Template:TrainerCard') ||
    (wgPageName == 'Template:TrainerCard/Main')) {
        importArticles({
            type: 'style',
            article: 'MediaWiki:SWU_Super_Walkthrough_Fonts.css'
        });
}

if ((wgPageName == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Burnin_Konn') || 
    (wgPageName == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Components') || 
    (wgPageName == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Components/Materials') || 
    (wgPageName == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Anoat_sector') || 
    (wgPageName == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/Components/Crystals') || 
    (wgPageName == 'Wookieepedia:Star_Wars:_Uprising_Super_Walkthrough/ArmoryBox') || 
    (wgPageName == 'Template:UprisingPageFooter') || 
    (wgPageName == 'Template:UprisingPageFooter/Components') || 
    (wgPageName == 'Template:UprisingPageFooter/Main') || 
    (wgPageName == 'Template:UprisingPageFooter/Abilities') || 
    (wgPageName == 'Template:UprisingCanonTabs/doc') || 
    (wgPageName == 'Template:UprisingCanonTabs') || 
    (wgPageName == 'Template:UprisingCanonTabs/Main') || 
    (wgPageName == 'Template:UprisingEquipmentInfobox') || 
    (wgPageName == 'Template:UprisingEquipmentInfobox/main') || 
    (wgPageName == 'Template:UprisingPageFooter/General') || 
    (wgPageName == 'Template:UprisingComponentBox') || 
    (wgPageName == 'Template:EquipmentProgressionTable') || 
    (wgPageName == 'Template:AbilityList') || 
    (wgPageName == 'Template:EquipmentTable') || 
    (wgPageName == 'Template:UprisingAbilityBox/Main')) {
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

	window.pageName = wgPageName;
	window.storagePresent = (typeof(localStorage) != 'undefined');

	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[−]</a>';
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

	if(document.getElementById('infoboxtoggle').innerHTML == '[−]') {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[+]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[−]';
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
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

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
			button.appendChild( document.createTextNode('[−]') );

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
			this.firstChild.nodeValue = '[−]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[+]';
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
	if( wgUserName ) {
		$('.insertusername').text(wgUserName);
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
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://starwars.wikia.com/index.php?title=Special:Upload&basic=true" onclick="javascript:localStorage.setItem(\'uploadform\', \'basic\')">Switch to basic upload form</a></div>');

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
			$('#wpUploadDescription').val('{{Grafika\r\n| Opis         = \r\n| Źródło       = \r\n| Autor        = \r\n| Licencja     = \r\n| Kategoria 1  = \r\n| Kategoria 2  = \r\n| Kategoria 3  = \r\n| Kategoria 4  = \r\n| Kategoria 5  = \r\n| Kategoria 6  = \r\n}}');

			// Add link to guided form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://starwars.wikia.com/index.php?title=Special:Upload" onclick="javascript:localStorage.setItem(\'uploadform\', \'guided\')">Switch to guided upload form</a></div>');
			
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

	var strBuilder = '{{Information\r\n';
	strBuilder += '|attention=' + document.getElementById('attentionBox').value + '\r\n';
	strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|source=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|artist=' + document.getElementById('artistBox').value + '\r\n';
	strBuilder += '|filespecs=' + document.getElementById('filespecsBox').value + '\r\n';
	strBuilder += '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
	strBuilder += '|other versions=' + document.getElementById('versionsBox').value + '\r\n';
	strBuilder += '|cat artist=' + document.getElementById('catartistBox').value + '\r\n';
	strBuilder += '|cat Licencja=' + document.getElementById('catlicenseeBox').value + '\r\n';
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
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

$( loadFunc );

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code originally by "pcj" of Wowpedia
// Maintenance, cleanup, style and bug fixes by Grunny (http://starwars.wikia.com/wiki/User:Grunny)

///////////////////////////////////////////////////////////////////////////////////////////////////////////

window.ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.AjaxRCRefreshText = 'Automatically refresh';
window.AjaxRCRefreshHoverText = 'Enable auto-refreshing page loads';
window.ajaxPages = [ 'Special:RecentChanges', 'Special:Watchlist', 'Special:Log', 'Special:NewFiles', 'Special:AbuseLog' ];

( function ( window, $, mw, Wikia ) {
	'use strict';

	var config = mw.config.get( [
			'stylepath',
			'wgAction',
			'wgCanonicalSpecialPageName',
			'wgPageName'
		] ),
		// use common file as it's very likely to be already cached by user
		// used in oasis sidebar loading, preview modal, etc.
		ajaxIndicator = window.ajaxIndicator || config.stylepath + '/common/images/ajax.gif',
		ajaxTimer,
		refreshText = typeof window.AjaxRCRefreshText === 'string' ? window.AjaxRCRefreshText : 'AJAX',
		refreshHover = typeof window.AjaxRCRefreshHoverText === 'string' ? window.AjaxRCRefreshHoverText : 'Enable auto-refreshing page loads',
		ajRefresh = window.ajaxRefresh || 60000,
		ajPages = window.ajaxPages || [ 'Special:RecentChanges' ],
		RecentChangesLocal,
		// don't load on these values of wgAction
		// @todo check if markpatrolled should be here
		disallowActions = [
			'delete',
			'edit',
			'protect',
			'revisiondelete'
		];


	function storage( setTo ) {
		if ( localStorage.getItem( 'AjaxRC-refresh' ) === null ) {
			localStorage.setItem( 'AjaxRC-refresh', true );
		}

		if ( setTo === false ) {
			localStorage.setItem( 'AjaxRC-refresh', false );
		} else if ( setTo === true ) {
			localStorage.setItem( 'AjaxRC-refresh', true );
		}

		return JSON.parse( localStorage.getItem( 'AjaxRC-refresh' ) );
	}


	/**
	 * Main function to start the Auto-refresh process
	 */
	function preloadAJAXRL() {
		// monobook
		var $appTo = $( '.firstHeading' ).length ? $( '.firstHeading' ) :
			// most oasis pages
			( $( '#WikiaPageHeader' ).length ? $( '#WikiaPageHeader' ) :
				// most oasis special pages
				( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : false ) ),
			$checkbox = $( '<span id="ajaxRefresh"></span>' )
				.css( { 'font-size': 'xx-small', 'line-height': '100%', 'margin-left': '5px' } )
				.append(
					$( '<label id="ajaxToggleText" for="ajaxToggle"></label>' )
						.css( { 'border-bottom': '1px dotted', 'cursor': 'help' } )
						.attr( 'title', refreshHover ).text( refreshText + ':' ),
					$( '<input type="checkbox" id="ajaxToggle">' ).css( { 'margin-bottom': 0 } ),
					$( '<span id="ajaxLoadProgress"></span>' ).css( 'display', 'none' ).append(
						$( '<img>' ).css( { 'vertical-align': 'baseline', 'float': 'none', 'border': 0 } )
							.attr( 'src', ajaxIndicator ).attr( 'alt', 'Refreshing page' )
					)
				),
			$throbber;

		// fallback for pages with profile masthead
		if ( $appTo === false ) {
			$( '#WikiaArticle' ).prepend( $checkbox );
		} else {
			$appTo.append( $checkbox );
		}

		$throbber = $appTo.find( '#ajaxLoadProgress' );

		$( document ).ajaxSend( function ( event, xhr, settings ) {
			if ( location.href === settings.url ) {
				$throbber.show();
			}
		} ).ajaxComplete ( function ( event, xhr, settings ) {

			var $collapsibleElements = $( '#mw-content-text' ).find( '.mw-collapsible' ),
				ajCallAgain = window.ajaxCallAgain || [],
				i;

			if ( location.href === settings.url ) {
				$throbber.hide();
				if ( $collapsibleElements.length ) {
					$collapsibleElements.makeCollapsible();
				}
				if ( config.wgCanonicalSpecialPageName === 'Recentchanges' ) {
					mw.special.recentchanges.init();
					if ( $( '.mw-recentchanges-table' ).find( '.WikiaDropdown' ).length ) {
						RecentChangesLocal.init();
					}
				}
				if ( config.wgCanonicalSpecialPageName === 'WikiActivity' ) {
					window.WikiActivity.init();
				}
				for ( i = 0; i < ajCallAgain.length; i++ ) {
					ajCallAgain[i]();
				}
			}
		} );
		$( '#ajaxToggle' ).click( toggleAjaxReload );
		$( '#ajaxToggle' ).attr( 'checked', storage() );
		if ( storage() ) {
			loadPageData();
		}
	}

	/**
	 * Turn refresh on and off by toggling the checkbox
	 */
	function toggleAjaxReload() {
		if ( $( '#ajaxToggle' ).prop( 'checked' ) === true ) {
			storage( true );
			loadPageData();
		} else {
			storage( false );
			clearTimeout( ajaxTimer );
		}
	}

	/**
	 * Does the actual refresh
	 */
	function loadPageData() {
		var $temp = $( '<div>' );

		$temp.load( location.href + ' #mw-content-text', function () {
			var $newContent = $temp.children( '#mw-content-text' );

			if ( $newContent.length ) {
				$( '#mw-content-text' ).replaceWith( $newContent );
			}

			ajaxTimer = setTimeout( loadPageData, ajRefresh );
		} );
		$temp.remove();
	}

	/**
	 * Load the script on specific pages
	 * and only on certain values for wgAction (see disallowActions above)
	 */
	$( function () {
		if (
			$.inArray( config.wgPageName, ajPages ) !== -1 && $( '#ajaxToggle' ).length === 0 &&
			$.inArray( config.wgAction, disallowActions ) === -1
		) {
			preloadAJAXRL();
		}
	} );

	/**
	 * Temp Hack: copy the RC filter JS since it can't be accessed
	 * @source <https://github.com/Wikia/app/blob/dev/extensions/wikia/RecentChanges/js/RecentChanges.js>
	 */
	RecentChangesLocal = {
		init: function () {
			this.$table = $( '.mw-recentchanges-table' );
			this.$dropdown = this.$table.find( '.WikiaDropdown' );
			this.$submit = this.$table.find('input[type="submit"]');
			this.$submit.on( 'click.RecentChangesDropdown', $.proxy( this.saveFilters, this ) );
			this.$submit.removeAttr( 'disabled' ); //FF clean
			this.dropdown = new Wikia.MultiSelectDropdown( this.$dropdown );
			this.dropdown.on( 'change', $.proxy( this.onChange, this ) );

		},

		saveFilters: function( event ) {
			var self = this;

			event.preventDefault();

			self.dropdown.disable();
			self.$submit.attr( 'disabled', 'disabled' );

			if ( self.dropdown.getSelectedValues().length === 0 ) {
				self.dropdown.doSelectAll( true );
			}

			$.nirvana.sendRequest( {
				controller: 'RecentChangesController',
				method: 'saveFilters',
				data: {
					filters: self.dropdown.getSelectedValues()
				},
				type: 'POST',
				format: 'json',
				callback: function ( data ) {
					window.location.reload();
				}
			} );
		}
	};

}( this, jQuery, mediaWiki, Wikia ) );

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH

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
addOnloadHook(addfaicon);

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * modified for use in both Monaco and Monobook skins by Sikon
 * Section edit links added by Green tentacle
 * New Wikia skin support by Grunny
 */
function addEditIntro(name) {
	// Top link
	if( skin == 'oasis' ) {
		$('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
		$('span.editsection > a').each( function () {
			$(this).attr('href',$(this).attr('href') + '&editintro=' + name);
		} );
	} else {
		var el = document.getElementById('ca-edit');

		if( typeof(el.href) == 'undefined' ) {
			el = el.getElementsByTagName('a')[0];
		}

		if (el)
			el.href += '&editintro=' + name;

		// Section links
		var spans = document.getElementsByTagName('span');
		for ( var i = 0; i < spans.length; i++ ) {
			el = null;

			if (spans[i].className == 'editsection') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			} else if (spans[i].className == 'editsection-upper') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			}
		}
	}
}

$( function () {
	if ( wgNamespaceNumber === 0 ) {
		var cats = document.getElementById( 'catlinks' );
		if ( !cats ) {
			return;
		}
		cats = cats.getElementsByTagName( 'a' );
		for ( var i = 0; i < cats.length; i++ ) {
			if ( cats[i].title === 'Category:Wookieepedia featured articles' ) {
				addEditIntro( 'Template:Featured_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Wookieepedia good articles' ) {
				addEditIntro( 'Template:Good_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Wookieepedia comprehensive articles' ) {
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
			} else if ( wgPageName === 'Template:DYK editintro' ) {
				addEditIntro( 'Template:Good_editintro' );
				break;
			}
		}
	} else if ( wgPageName === 'Template:DidYouKnow' ) {
		addEditIntro( 'Template:DYK_editintro' );
	}
} );

// [[Main Page]] JS transform. Originally from [[Wikipedia:MediaWiki:Monobook.js]]/[[Wikipedia:MediaWiki:Common.js]] and may be further modified for local use.
function mainPageRenameNamespaceTab() {
	try {
		var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
		if ( Node.textContent ) {      // Per DOM Level 3
			Node.textContent = 'Main Page';
		} else if ( Node.innerText ) { // IE doesn't handle .textContent
			Node.innerText = 'Main Page';
		} else {                       // Fallback
			Node.replaceChild( Node.firstChild, document.createTextNode( 'Main Page' ) ); 
		}
	} catch(e) {
		// bailing out!
	}
}

if ( wgTitle == 'Main Page' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
	addOnloadHook( mainPageRenameNamespaceTab );
} 
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|]]
 * Oasis support by [[User:Uberfuzzy|]]
 * Removal of section edit buttons and new section tab on talk pages added by [[User:Grunny|Grunny]]
 * User:/User talk: support and styling in new skin by [[User:Grunny|Grunny]]
 */
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}

	if( skin == 'oasis' ) {
		if( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) {
			$("#WikiaUserPagesHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
			$('span.editsection').remove();
			return;
		} else {
			$("#WikiaPageHeader .wikia-menu-button a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
			$('span.editsection').remove();
			return;
		}
	}

	if( !document.getElementById('ca-edit') ) {
		return;
	}

	if( skin == 'monaco' ) {
		editLink = document.getElementById('ca-edit');
	} else if( skin == 'monobook' ) {
		editLink = document.getElementById('ca-edit').firstChild;
	} else {
		return;
	}

	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';

	$('span.editsection-upper').remove();
	$('span.editsection').remove();

	appendCSS( '#control_addsection, #ca-addsection { display: none !important; }' );
}
addOnloadHook( disableOldForumEdit );

//Removes the "Featured on:" line on File pages -- By Grunny
addOnloadHook( function (){
	if ( wgNamespaceNumber == 6 && $('#file').length != 0 ) {
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
	if ( mw.config.get( 'wgPageName' ) !== pageName || !$lazyLoadEl.length ) {
		return;
	}

	$lazyLoadEl.html( '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Loading..." />' );
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
		if ( mw.config.get( 'skin' ) === 'oasis' ) {
			if ($( '#WikiaPageHeader h2' ).text().substring(0, 1) === "<") {
				var	$wikiaHeader = $( '#WikiaPageHeader h2' ),
					$backToPageLink;
				if ( mw.config.get( 'wgNamespaceNumber' ) % 2 === 1 ) {
					// ugly hack to only leave back to page link on talk pages
					$backToPageLink = $wikiaHeader.find( 'a[accesskey="c"]' );
					$wikiaHeader.html( '' ).append( $backToPageLink );
				} else {
					$wikiaHeader.hide();
				}
			}
		} else {
			if ( $( '#contentSub span.subpages' ).text().substring(0, 1) === "<" ) {
				$( '#contentSub span.subpages' ).hide();
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

/**
 * Ajax Wookieepedia Cloak Request
 * 
 * Creates a form to submit cloak requests
 *
 * Please let me know of any suggested improvements
 * 
 * @author Grunny
 * @version 0.0.2
 * 
 */
 
( function( $ ) {
 
	// Don't load twice...
	if ( typeof window.AjaxCloakRequestScript !== 'undefined' ) {
		return false;
	}
 
	window.AjaxCloakRequestScript = {
		version: '0.0.1',
 
		/* Initialize the script */
		init: function () {
 
			if ( wgPageName === 'Wookieepedia:IRC/Cloak_requests' || wgPageName === 'User:Darth_Culator/cloaksignupprototype' ) {
 
				$( '<a />' ).text( 'Make Request' ).attr( 'href', '#' ).click( function () {
 
					AjaxCloakRequestScript.createPopUpForm();
 
				} ).appendTo( '#request-button' );
			}
 
		},
 
		/* Create the pop-up form */
		createPopUpForm: function () {
			var popupHTML = '<section style="left: 50%; top: 50px; width: 1000px; z-index: 20000002; margin-left: -520px;" class="modalWrapper">' +
				'<button class="close wikia-chiclet-button" id="acr-closebutt"><img src="/skins/oasis/images/icon_close.png"></button>' +
				'<h1>Wookieepedia Cloak Request</h1>' +
				'<section class="modalContent">' +
				'<div class="AjaxCloakRequestBox" id="AjaxCloakRequestBox">' +
				'<form class="AjaxCloakRequestForm">' +
				'<fieldset>' +
				'<p><label for="acr-abbrusername"><span style="border-bottom: 1px dotted black; cursor: help;" title="If no formatting change is necessary or desired, just repeat your username.">' +
				'Format or abbreviate username as:</span> </label><input type="text" style="width: 20em;" name="acr-abbrusername" id="acr-abbrusername" /></p>' +
				'<p><label for="acr-nick">IRC nick: </label><input type="text" style="width: 20em;" name="acr-nick" id="acr-nick" /></p>' +
				'<p><label for="acr-kor">Existing cloak to be kept or replaced: </label><select id="acr-kor" style="width: 20em;">' +
				'<option value="none">None</option><option value="keep">Keep</option><option value="replace">Replace</option></select></p>' +
				'<p><label for="acr-type">Cloak type: </label><select id="acr-type" style="width: 20em;">' +
				'<option value="plain">Plain</option><option value="administrator">administrator</option><option value="bureaucrat">bureaucrat</option></select></p>' +
				'</fieldset>' +
				'<input type="button" id="acr-startbutton" value="Submit" />' +
				'</form>' +
				'</div>' +
				'</section>' +
				'</section>' +
				'<div class="blackout" style="height: 6702px; z-index: 20000001; opacity: 0.65;"></div>';
			$( 'body' ).append( popupHTML );
			if ( skin !== 'oasis' ) {
				appendCSS( '.modalWrapper { -moz-box-shadow: 0 10px 60px #7F7F7F; background: none repeat scroll 0 0 white; border: 5px solid #BACDD8; padding: 25px 15px; position: absolute; }' +
							'section { display: block; }' +
							'.blackout { background: none repeat scroll 0 0 white; left: 0; opacity: 0.8; position: absolute; top: 0; width: 100%; }' +
							'.modalWrapper .close { float: right; margin: 0 18px 0 0; }' );
			}
			$( '#acr-kor' ).change( function () {
				if ( $( this ).val() === 'keep' || $( this ).val() === 'replace' ) {
					if ( !$( '#acr-oldc' ).length ) {
						$( this ).parent().after( '<p><label for="acr-oldc">Your current cloak: </label><input type="text" style="width: 20em;" id="acr-oldc" /></p>' );
					}
					if ( $( this ).val() === 'replace' && $( '#acr-otherc' ).length ) {
						$( '#acr-otherc' ).parent().remove();
					}
					if ( $( this ).val() === 'keep' && !$( '#acr-otherc' ).length ) {
						$( '#acr-oldc' ).after( '<p><label for="acr-otherc">New cloak format: </label><input type="text" style="width: 20em;" id="acr-otherc" /> (e.g. @wookieepedia/wikipedia.Grunny)</p>' );
					}
				}
			} );
			$( '#acr-closebutt' ).click( function () {
				AjaxCloakRequestScript.closePopUpForm();
			} );
			$( '#acr-startbutton' ).click( function () {
				AjaxCloakRequestScript.getEditToken();
			} );
		},
 
		closePopUpForm: function () {
			$( 'section.modalWrapper' ).remove();
			$( 'div.blackout' ).remove();
		},
 
		/* API Edit functions */
		getEditToken: function () {
			var	nick = $( '#acr-nick' ).val();
			if( !nick ) {
				return;
			}
			var url = wgServer + wgScriptPath + '/api.php?action=query&prop=info|revisions&intoken=edit&titles=Main%20Page&format=json';
			$.getJSON( url, function ( data ) {
				for ( var p in data.query.pages ) {
					break;
				}
				var editToken = data.query.pages[p].edittoken;
				AjaxCloakRequestScript.getPageText( editToken );
			} );
		},
 
		getPageText: function ( editToken ) {
			var	abbrUserName = $( '#acr-abbrusername' ).val(),
				nick = $( '#acr-nick' ).val(),
				keepOrReplace = $( '#acr-kor' ).val(),
				oldCFormat = 'uncloaked',
				newCFormat = '',
				cloakType = $( '#acr-type' ).val(),
				requestText = '',
				summary = 'Requesting Wookieepedia cloak';
 
			if ( keepOrReplace === 'keep' || keepOrReplace === 'replace' ) {
				oldCFormat = $( '#acr-oldc' ).val();
				if ( keepOrReplace === 'keep' ) {
					newCFormat = $( '#acr-otherc' ).val();
				}
			}
 
			requestText = '\n*{{U|' + wgUserName + '}}\n**Format or abbreviate username as: ' + ( ( abbrUserName === '' ) ? wgUserName : abbrUserName ) +
				'\n**IRC nick: ' + nick + '\n***Existing cloak to be ' + ( keepOrReplace === 'keep' ? 'kept' : 'replaced' ) + ': "' + oldCFormat + ( newCFormat !== '' ? '" replace with "' + newCFormat : '"' ) +
				'\n**Cloak type: ' + cloakType + '\n**~~' + '~~';
 
			AjaxCloakRequestScript.makeAPIEdit( summary, requestText, editToken );
		},
 
		makeAPIEdit: function ( summary, content, editToken ) {
			$.ajax( {
				url: wgScriptPath + '/api.php?',
				data: 'action=edit&title=' + encodeURIComponent( wgPageName ) + '&summary=' + encodeURIComponent( summary ) + '&section=1&appendtext=' + encodeURIComponent( content ) + '&format=json&token=' + encodeURIComponent( editToken ),
				dataType: 'json',
				type: 'POST',
				success: function( data ) {
					if ( data.edit.result === "Success" ) {
						window.location.reload(); // reload page if edit was successful
					} else {
						alert( 'Error: Unknown result from API.' );
					}
				},
				error: function( xhr ) {
					alert( 'Error: Edit failed.' );
				}
			} );
		}
 
	};
 
	$(document).ready( AjaxCloakRequestScript.init );
 
} )( jQuery );
licence
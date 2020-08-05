// <pre><nowiki>
/* Any JavaScript here will be loaded for all users on every page load. */

importScript( 'MediaWiki:Functions.js' );

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;

	initFunctionsJS();

	addHideButtons();

	fillPreloads();

	substUsername();
	substUsernameTOC();
	rewriteTitle();
	addAlternatingRowColors();

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

function fillPreloads() {
	var div = document.getElementById("lf-preload");

	if( div == null )
		return;

	div.style.display = 'block';
	var span = document.getElementById('lf-preload-cbox');

	var comboString = "<select id='stdPreloads' onchange='onPreloadChange()'>";
	comboString += "</select>";
	span.innerHTML = comboString;
    
	span = document.getElementById('lf-preload-pagename');
	span.innerHTML = '<input type="text" class="textbox" />';
	span = document.getElementById('lf-preload-button');
	span.innerHTML = '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />';

	requestComboFill('stdPreloads', "Template:Stdpreloads");
}

function doCustomPreload() {
	doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
}

function onPreloadChange() {
	var combo = document.getElementById("stdPreloads");
	var value = combo.options[combo.selectedIndex].value;

	if( value == "" )
		return;

	value = "Template:" + value + "/preload";
	value = value.replace(" ", "_");
	doPreload(value);
}

/** Title rewrite ********************************************************
 * Rewrites the page's title, used by Template:Title
 * By Sikon
 * jQuery version by Grunny
 */

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length == 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
	$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
}

function addAlternatingRowColors() {
	var infoboxes = getElementsByClass('infobox', document.getElementById('content'));

	if( infoboxes.length == 0 )
		return;

	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];

		var rows = infobox.getElementsByTagName('tr');
		var changeColor = false;

		for( var i = 0; i < rows.length; i++ ) {
			if(rows[i].className.indexOf('infoboxstopalt') != -1)
			break;

			var ths = rows[i].getElementsByTagName('th');

			if( ths.length > 0 ) {
				continue;
			}

			if(changeColor)
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

$(loadFunc);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist", "Special:Log");

function setCookie(c_name,value,expiredays) {
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1) { 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}

function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}
getRCDataRO = getXmlHttpRequestObject();
var cr = new RegExp("\r", "gm");
var lf = new RegExp("\n", "gm");
var endText = new RegExp('</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "mi");
var rcTimer;
var rcRefresh = 60000;
function preloadAJAXRC() {
if (skin == "monaco") {
s = 1;
} else {
s = 0;
}
ajaxRCCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
document.getElementsByTagName("h1")[0].innerHTML += ' <span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">Automatically refresh:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
document.getElementById("ajaxRCtoggle").checked = ajaxRCCookie;
if (getCookie("ajaxload-"+wgPageName)=="on") loadRCData();
}

function toggleRC() {
if (document.getElementById("ajaxRCtoggle").checked == true) {
setCookie("ajaxload-"+wgPageName, "on", 30);
loadRCData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
clearTimeout(rcTimer);
}
}

function loadRCData() {
if (getRCDataRO.readyState == 4 || getRCDataRO.readyState == 0) {
if (location.href.indexOf("/wiki/")) {
rcURL = "http://" + location.hostname + "/wiki/" + wgPageName + location.search;
} else {
rcURL = "http://" + location.hostname + "/" + wgPageName + location.search;
}
getRCDataRO.open("GET", rcURL, true);
getRCDataRO.onreadystatechange = parseRCdata;
getRCDataRO.send(null);
}
}

function parseRCdata() {
if (getRCDataRO.readyState == 4) {
textFilter = new RegExp('<div id="bodyContent">.*?</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "i");
rawRCdata = getRCDataRO.responseText.replace(cr, "").replace(lf, "");
filteredRCdata = textFilter.exec(rawRCdata);
updatedText = filteredRCdata[0].replace('<div id="bodyContent">', "").replace(endText, "");
document.getElementById("bodyContent").innerHTML = updatedText;
rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}

for (x in ajaxPages) {
if (wgPageName == ajaxPages[x]) addOnloadHook(preloadAJAXRC);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Magic edit intro */
function addEditIntro(name) {
	// Top link
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

if (wgNamespaceNumber == 0) {
	addOnloadHook(function(){
		var cats = document.getElementById('mw-normal-catlinks');
		if (!cats)
			return;
		cats = cats.getElementsByTagName('a');
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].title == 'Category:Harry Potter Wiki Featured articles') {
				addEditIntro('Template:Featured_editintro');
				break;
			}
		}
	});
}

// [[Main Page]] JS transform. Originally from [[Wikipedia:MediaWiki:Monobook.js]]/[[Wikipedia:MediaWiki:Common.js]]
//and may be further modified for local use.
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
 * Disables the edit tab on old forum topic pages to stop inexperienced users bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|]]
 * Removal of section edit buttons and new section tab on talk pages added by [[User:Grunny|Grunny]]
 */
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
		return;
	if(!document.getElementById('old-forum-warning') ||
		 !document.getElementById('ca-edit') )
		return;

	if( skin == 'monaco' ) {
		editLink = document.getElementById('ca-edit');
	} else if( skin == 'monobook' ) {
		editLink = document.getElementById('ca-edit').firstChild;
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
if ( wgNamespaceNumber == 6 ) {
	addOnloadHook( function (){
		document.getElementById( 'file' ).innerHTML = document.getElementById( 'file' ).innerHTML.replace(/Featured on\: (.*?)\<br\>/, '');
	} );
}

/* Substitute Template:Information into upload page */
$(document).ready(function() {

	if (wgPageName != 'Special:Upload') {
		return;
	}

	$('#wpUploadDescription').text("==Summary==\r\n{{Information\r\n|attention=\r\n|description=\r\n|source=\r\n|author=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|categories=\r\n}}");

});

//edit buttons
if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
    "speedTip": "Redirect",
    "tagOpen": "#REDIRECT [[",
    "tagClose": "]]",
    "sampleText": "Insert page"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"};
}

//</nowiki> </pre>
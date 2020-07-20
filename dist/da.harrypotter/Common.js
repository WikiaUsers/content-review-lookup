/* Javascript inkluderet her vil være aktivt for alle brugere. */
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
 * jQuery version and new wikia skin fixes by Grunny
 */

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

addOnloadHook( loadFunc );

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.
// Bug fixes and maintenance by Grunny

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var indicator = 'https://images.wikia.nocookie.net/__cb20100617113125/dev/images/8/82/Facebook_throbber.gif';
if (!window.ajaxPages) ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:NewFiles");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Automatically refresh';
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
var refreshHover = 'Enable auto-refreshing page loads';
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
var doRefresh = true;
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
 
function preloadAJAXRL() {
ajaxRLCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");
appTo.append(' <span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="AJAX operation in progress" /></span></span>');
$("#ajaxLoadProgress").bind("ajaxSend", function (){
$(this).show();
}).bind("ajaxComplete", function (){
$(this).hide();
});
$("#ajaxToggle").click(toggleAjaxReload);
$("#ajaxToggle").attr("checked", ajaxRLCookie);
if (getCookie("ajaxload-"+wgPageName)=="on") loadPageData();
}
 
function toggleAjaxReload() {
if ($("#ajaxToggle").attr("checked") == true) {
setCookie("ajaxload-"+wgPageName, "on", 30);
doRefresh = true;
loadPageData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
doRefresh = false;
clearTimeout(ajaxTimer);
}
}

function loadPageData() {
var cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
$(cC).load(location.href + " " + cC + " > *", function (data) { 
if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
});
}

$(function () { 
for (x in ajaxPages) {
if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) preloadAJAXRL();
}
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * Modified by [[User:Grunny]] and [[User:Sikon]] for use in both Monobook and Monaco on Wikia
 * Added section edit functionality by [[User:Green tentacle]]
 * Fix for new edit button next to the title by [[User:Grunny]]
 * New Wikia skin support by [[User:Grunny]]
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
			$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
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

/* Substitute Template:Information into upload page */
$(document).ready(function() {

	if (wgPageName != 'Special:Upload') {
		return;
	}

	$('#wpUploadDescription').text("==Summary==\r\n{{Information\r\n|attention=\r\n|description=\r\n|source=\r\n|author=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|categories=\r\n}}");

});

/* Temporary fix for the duration of the giveaway to let others use talk pages 
$( function () {
	if( wgTitle == 'Wizarding World Giveaway' || wgTitle == 'Deathly Hallows Premiere Event' ) {
		return;
	}
	if( wgNamespaceNumber == 0 ) {
		if( skin == 'oasis' ) {
			$('ul.commentslikes > li.comments > a').text('Talk').attr('href','/wiki/Talk:'+ encodeURIComponent (wgPageName));
			$('section#WikiaArticleComments').remove();
		} else {
			$('#p-cactions > .pBody > ul > #ca-nstab-main').after('<li id="ca-talk"><a accesskey="t" title="Discussion about the content page [t]" href="/wiki/Talk:'+ encodeURIComponent (wgPageName) +'">Discussion</a></li>');
			$('div#article-comments-wrapper').remove();
		}
	}
} ); */

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
/******************************************************/
/* Taken from DA-Wiki, except when noted otherwise    */
/******************************************************/

// Wikia's own WikiaScriptLoader isn't automatically included in other skins such as monobook.
// Presumably this is because they no longer support them. This checks to see if WikiaScriptLoader 
// function reference has been declared, and if it has not, it creates it. Backwards compatibility
// for everybody! - Blame User:Tierrie @ DA Wiki if this works. Blame someone else if it breaks.
if(typeof WikiaScriptLoader === 'undefined') {
  var WikiaScriptLoader=WikiaScriptLoader?WikiaScriptLoader:function(){var b=navigator.userAgent.toLowerCase();this.useDOMInjection=b.indexOf("opera")!=-1||b.indexOf("firefox")!=-1&&b.indexOf("/4.0b")==-1;this.isIE=b.indexOf("opera")==-1&&b.indexOf("msie")!=-1;this.headNode=document.getElementsByTagName("HEAD")[0]}; WikiaScriptLoader.prototype={loadScript:function(b,c){this.useDOMInjection?this.loadScriptDOMInjection(b,c):this.loadScriptDocumentWrite(b,c)},loadScriptDOMInjection:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.src=b;var d=function(){a.onloadDone=true;typeof c=="function"&&c()};a.onloadDone=false;a.onload=d;a.onreadystatechange=function(){a.readyState=="loaded"&&!a.onloadDone&&d()};this.headNode.appendChild(a)},loadScriptDocumentWrite:function(b,c){document.write('<script src="'+ b+'" type="text/javascript"><\/script>');var a=function(){typeof c=="function"&&c()};typeof c=="function"&&this.addHandler(window,"load",a)},loadScriptAjax:function(b,c){var a=this,d=this.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText;if(a.isIE)eval(e);else{var f=document.createElement("script");f.type="text/javascript";f.text=e;a.headNode.appendChild(f)}typeof c=="function"&&c()}};d.open("GET",b,true);d.send("")},loadCSS:function(b,c){var a=document.createElement("link"); a.rel="stylesheet";a.type="text/css";a.media=c||"";a.href=b;this.headNode.appendChild(a)},addHandler:function(b,c,a){if(window.addEventListener)window.addEventListener(c,a,false);else window.attachEvent&&window.attachEvent("on"+c,a)},getXHRObject:function(){var b=false;try{b=new XMLHttpRequest}catch(c){for(var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],d=a.length,e=0;e<d;e++){try{b=new ActiveXObject(a[e])}catch(f){continue}break}}return b}};window.wsl=new WikiaScriptLoader;
}

// prototype functions
function $A(a) {
var r = [];
for (var i = 0, len = a.length; i < len; ++i) r.push(a[i]);
return r;
}

Function.prototype.bind = function() {
var __method = this, args = $A(arguments), object = args.shift();
return function() { return __method.apply(object, args.concat($A(arguments))) };
}

/* Test if an element has a certain class **************************************
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/**********************/
/* collapsible script */
/**********************/

importScriptPage('ShowHide/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 3 };

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
		if ( !cats )
			return;
		cats = cats.getElementsByTagName('a');
		for ( var i = 0; i < cats.length; i++ ) {
			if ( cats[i].title == 'Category:Disambiguations' ) {
				addEditIntro('Template:Disambig_editintro');
				break;
			} 
		}
	});
}

/*********************************************/
/* chat module compatibility by User:Tierrie */
/* opens Special:Chat in the same window as  */
/* created by ChatModule regardless of skin  */
/* used                                      */
/*********************************************/
// window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes')
$(function(){
  $('a[href*="http://dragonage.wikia.com/wiki/Special:Chat"]').click(function(event){
    window.open($(this).attr('href'), 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    event.preventDefault();
  });
});


/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});


/****************************/
/* spoilers by User:Tierrie */
/****************************/
importScriptPage('Content/SpoilersToggle.js', 'scripts');

/************************/
/* tooltip: by Kirkburn */
/************************/
//ttBgStyle = "background: transparent url(picture.png);";
var ttBgStyle = "background-color:transparent;";
var ttHTMLStart = '<div style="font-size:1em; width: auto; max-width:20em; ' + ttBgStyle + '">';

// Empty variables to hold the mouse position and the window size
var mousePos = null;
var winSize = null;

function mouseMove(ev) {
  if (ev) {
    if (ev.clientX) var mouseX = ev.clientX;
    if (ev.clientY) var mouseY = ev.clientY;
  } else if (typeof(window.event) != "undefined") {
    var mouseX = window.event.clientX;
    var mouseY = window.event.clientY;
  }
  mousePos = {x:mouseX, y:mouseY};
}

function getDBC() {
  dbc = new Array();
  docBase = document.documentElement || document.body;
  dbc[0] = docBase.clientWidth || 0;
  dbc[1] = docBase.clientHeight || 0;
  return dbc;
}

function getDBS() {
  dbs = new Array();
  docBase = document.documentElement || document.body;
  dbs[0] = docBase.scrollLeft || 0;
  dbs[1] = docBase.scrollTop || 0;
  return dbs;
}

// The windowResize function keeps track of the window size for us
function windowResize() {
  dbC = getDBC();
  winSize = {x:(dbC[0])? dbC[0]:window.innerWidth, y:(dbC[1])? dbC[1]:window.innerHeight}
}
windowResize();

// Set events to catch mouse position and window size
document.onmousemove = mouseMove;
window.onresize = windowResize;

// displays the tooltip
function displayTip() {
  var tip = document.getElementById("simpletfb");
  tip.style.position = "absolute";
  tip.style.visibility = "hidden";
  tip.style.display = "block";
  tip.style.zIndex = "999";
  moveTip();
  tip.style.visibility = "visible";
}

// This function moves the tooltips when our mouse moves
function moveTip() {
  skinAdjust = new Array();
  dbS = getDBS();
  tip = document.getElementById("simpletfb");
  var showTTAtTop   = mousePos.y > (winSize.y / 2);
  var showTTAtLeft  = mousePos.x > (winSize.x / 2);
  var newTop  = mousePos.y + (showTTAtTop  ? - (tip.clientHeight + 20) : 20);
  var newLeft = mousePos.x + (showTTAtLeft ? - (tip.clientWidth  + 20) : 20);
  tip.style.position = 'fixed';
  tip.style.top = newTop + "px";
  tip.style.left = newLeft + "px";
}

// hides the tip
function hideTip() {
  var tip = document.getElementById("simpletfb");
  if (typeof(tip.style) == "undefined") return false;
  $(tip).html("");
  tip.style.display = "none";
}

// quick tooltips
function showTemplateTip(i) {
  var Tip = document.getElementById("tttc" + i);
  tooltip = ttHTMLStart + Tip.innerHTML + '</div>';
  document.getElementById("simpletfb").innerHTML = tooltip;
  displayTip();
}

function performTooltips() {
  var contentstart = document.getElementById("bodyContent") ? document.getElementById("bodyContent") : document.getElementById("WikiaArticle");
  qttfdiv = document.createElement("div");
  qttfdiv.setAttribute("id", "simpletfb");
  contentstart.insertBefore(qttfdiv, contentstart.childNodes[0]);
  var Spans = document.getElementsByTagName("span");
  for (i=0;i<Spans.length;i++) {
    if (hasClass(Spans[i], "ttlink")) {
      Spans[i].nextSibling.setAttribute("id", "tttc" + i);
      Spans[i].firstChild.setAttribute("title", "");
      Spans[i].onmouseover = showTemplateTip.bind(Spans[i],i);
      Spans[i].onmouseout = hideTip;
      Spans[i].onmousemove = moveTip;
    }
  }
}

var tooltips = true;
function loadTooltips() {
if (tooltips) performTooltips();
}
addOnloadHook(loadTooltips);



/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]] and [[User:Monchoman45|Monchoman45]]
 ********************************************************************/
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
	if( skin == 'oasis' )
	{
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
		$('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
		return;
	}
 
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

/******************************/
/* changes the redirect image */
/******************************/
function ChangeRedirectImage() {
	$('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/__cb20100902033555/dragonage/images/b/b5/Redirectltr.png');
}
addOnloadHook(ChangeRedirectImage);

/*****************************************************/
/* Changes the full page title                       */
/* jQuery version and new wikia skin fixes by Grunny */
/*****************************************************/
 
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

addOnloadHook(rewriteTitle);

/*-----------------------------------------------------------/
/--Checks whether user is logged-in--------------------------/
/-----------------------Replaces user's name in {{USERNAME}}-/
/-------------------------Toggles text with {{ifregistered}}-/
/---------------Originally by [[wikia:User:Splarka|Splarka]]-/
/------------------------New version by [[User:Spang|Spang]]-/
/---------------------------------Expanded by JBed of FFWiki-/
/-----------------------------------------------------------*/
 function checkUserLogin() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
    $('span.userregistered').each(function() {
        $(this).css("display", "inline");
    });
    $('span.userunregistered').each(function() {
        $(this).css("display", "none");
    });
 }
 addOnloadHook(checkUserLogin);

/*****************************************************/
/* ReferencePopups                                   */
/*****************************************************/

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/** <pre>
 * YouTube video embedder
 * Injects an iframe, rather than uploading the video to Wikia's video library
 * See http://runescape.wikia.com/wiki/Template:Youtube for further documentation
 */
 
;(function ($, document) {
 
    'use strict';
 
    function injectVideo() {
        var tags = $('.youtube'),
            i,
            contents,
            iframe;
 
        if (tags.length === 0) {
            return;
        }
 
        for (i = 0; i < tags.length; i += 1) {
            contents = $(tags[i]).html().split('|');
 
            // for no arguments in template use
            if (contents[0] === 'ERROR') {
                return;
            }
 
            iframe = document.createElement('iframe');
            iframe.src = 'http://www.youtube.com/embed/' + contents[0];
            iframe.height = contents[1];
            iframe.width = contents[2];
 
            $(tags[i]).html(iframe);
            // reverse the display:none; set in the template
            $(tags[i]).show();
        }
 
        // hide the original link as there's already one in the player
        $('.original-link').hide();
    }
 
    $(function () {
        injectVideo();
    });
 
}(this.jQuery, this.document));
 
/* </pre> */

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// END OF CODE
///////////////////////////////////////////////////////////////////////////////////////////////////////////
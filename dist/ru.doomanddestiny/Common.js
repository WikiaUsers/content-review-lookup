// *****************************************************
 // * Experimental javascript countdown timer (Splarka) *
 // * Version 0.0.3                                     *
 // *****************************************************
 //
 // Usage example:
 //  <span class="countdown" style="display:none;">
 //  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
 //  </span>
 //  <span class="nocountdown">Javascript disabled.</span>
 
 // Добавление к внешним ссылкам автоматическое открытие в новой вкладке
$(function() {
    if ($('.link-external').length) {
        $('.link-external').attr('target','_blank');
    }
});

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ru.elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
$('.factions img').hide(); 	$('.factions img').removeAttr('width').removeAttr('height'); 	var l=$('.factions tr').eq(1).find('td').height(); 	$('.factions tr').eq(1).find('img').css('max-height', l); 	$('.factions img').show(); 	if ($('.factions tr').eq(1).find('td').width()>=$('.factions img').width()) { 		$('.factions tr').eq(1).find('td').width($('.factions img').width()); 	}
  $('.id_upper').each(function() { $(this).html($(this).html().toUpperCase()); });
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
} );
 
 
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

// Template:Hover fix
if ('ontouchstart' in window || 'onmsgesturechange' in window) {
$(document.documentElement).addClass('touchscreen');
}
 
// Template:ExtImg
function ExtImg() { 
    var ExtImg_Link = $(this).data('img');
    $(this).html('<a href="' + ExtImg_Link + '" target="_blank"><img src="' + ExtImg_Link + '" alt="External Image" width="128px" />');
}
 
// Fast Index
if (wgCanonicalSpecialPageName === 'Search') {
var SearchNavTrigger = $('#mw-content-text .search-tabs');
    SearchNavTrigger.append('<li class="normal"><a href="#" id="charindex">Быстрый индекс</a></li>');
    $('#charindex').click(function() {
        $('.results-wrapper').load('/wiki/The_Elder_Scrolls_Wiki:Быстрый_индекс?action=render').css('width','640px');
    });
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
	var storage = globalStorage[window.location.hostname];
 
	var page = window.pageName.replace(/\W/g,'_');
	var show = storage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
	var hidables = getElementsByClass('hidable');
 
	for(var i = 0; i < hidables.length; i++) {
		show = storage.getItem('hidableshow-' + i  + '_' + page);
 
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
				rows[i].style.backgroundColor = '#111111';
			changeColor = !changeColor;
		}
	}
}

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *			   http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'скрыть';
var expandCaption = 'показать';
 
function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.rows;
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}
 
function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
 
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if ( !HeaderRow ) {
				continue;
			}
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if ( !Header ) {
				continue;
			}
 
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}
 
	for ( var i = 0;  i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		} else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
			var element = NavigationBoxes[i];
			while ( element = element.parentNode ) {
				if ( hasClass( element, 'outercollapse' ) ) {
					collapseTable( i );
					break;
				}
			}
		}
	}
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
	var reCache = {};
	return function( element, className ) {
		return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
	};
})();

 // **************************************************
 //  Кнопка "Наверх"
 // **************************************************
 
var Speed = 400;
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('#WikiaBarWrapper .arrow').before('<button id="backtotop" type="button" value="Наверх" onClick="goToTop();" style="position:absolute; right:25px; top:2px; z-index:200;">Наверх</button>');
		hideFade ();
	}	
}
 
var ButtonStart = 500;
var ScrollSpeed = 700;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication
 
importScriptPage('ShowHide/code.js', 'dev');

/****************************************/
/* tables span */
/****************************************/

$(function () {
    $('.collapsible-element-container').each(function () {
        if (!($(this).hasClass('no-collapse'))) {
            $(this).find('.collapsible-element').hide();
        }
        $(this).find('.collapsible-element-trigger').click(function () {
            $(this).parent().find('.collapsible-element').slideToggle(500);
        });
    });
});

/*************************/
/****Warframe code*******/
/***********************/
void(function($) {
	var tabbers;
	if ((tabbers = $('.js-tabber')).length) {
		var exec = function(i, e) {
			e = $(e);
			var tab;
			e.find('.js-tabber-buttons > *').click(function() {
				var button = $(this);
				if (button.hasClass('selected')) {
					return;
				}
				tab = button.attr('data-tabber');
				$('.js-tabber-buttons > *').removeClass('selected');
				button.addClass('selected');
				button.closest('.js-tabber').find('.js-tabber-content > div[data-tabber]').hide();
				button.closest('.js-tabber').find('.js-tabber-content > div[data-tabber="' + tab + '"]').css('display', 'block');
			});
		};
		tabbers.each(exec);
	}
})(jQuery);
void(function($) {
	if (wgArticleId !== 0 && wgAction != 'history' && !($.getUrlVar('diff')) && !($.getUrlVar('oldid'))) {
		$('#WikiaPageHeader').append('<a class="wikia-button purge secondary" style="' + ($('#ShareEntryPoint').length ? 'margin: 2px 10px;' : '') + 'display: none" href="' + wgArticlePath.replace('$1', window.encodeURI(wgPageName) + '?action=purge') + '"><span class="fa fa-refresh"></span></a>');
		$('#WikiaPageHeader > .wikia-button.purge.secondary').fadeIn(250);
	}
})(jQuery);
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});
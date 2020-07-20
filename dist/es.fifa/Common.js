importScriptPage('DupImageList/code.js', 'dev'); 
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special;Statistics","Special:WikiActivity","Special:Contributions","Blog:Recent posts","Blog:News","Blog:Featured blog posts","Blog:Popular blog posts"];
importScriptPage('AjaxRC/code.js', 'dev');

// ================================================================
// JavaScript here will be loaded for all users on every page load.
// ================================================================
 
// onload stuff
var firstRun = true;
 
function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;
 
	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}
 
	initFunctionsJS();
 
	// Upload form - need to run before adding hide buttons
	setupUploadForm();
 
	addHideButtons();
 
	if( document.getElementById('mp3-navlink') != null ) {
		document.getElementById('mp3-navlink').onclick = onArticleNavClick;
		document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
	}
 
	if( window.storagePresent )
		initVisibility();
 
	rewriteSearchFormLink();
	fillEditSummaries();
	onStdSummaryChange();
 
	substUsername();
	substUsernameTOC();
	rewriteTitle();
	showEras('title-eraicons');
	showEras('title-shortcut');
	rewriteHover();
	fixSearch();
 
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
 
function fillEditSummaries() {
	var label = document.getElementById("wpSummaryLabel");
 
	if( label == null )
		return;
 
	var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
	comboString += "</select><br />";
	label.innerHTML = comboString + label.innerHTML;
 
	requestComboFill('stdSummaries', 'Template:Stdsummaries');
}
 
function onStdSummaryChange() {
	var value = $('#stdSummaries').val();
 
	if( value != "" ) {
		if( skin == 'oasis' ) {
			$("#wpSummaryEnhanced").val(value);
		} else {
			$("#wpSummary").val(value);
		}
	}
}
 
function getFirstHeading()
{
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
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
 
// ================================================================
// BEGIN JavaScript title rewrite
// jQuery version and Oasis skin fixes by Grunny of Wookiepedia
// ================================================================
 
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
 
addOnloadHook( rewriteTitle );
 
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
 
addOnloadHook(
    function () { 
         $("#eraicons").css("display", "inline").appendTo($(".firstHeading"));
    }
);
 
addOnloadHook(
    function () {
         $(".WikiaPageHeader details .categories").remove();
         $(".WikiaPageHeader details").append($("#eraicons"));
    }
);
 
// ================================================================
// END JavaScript title rewrite
// ================================================================
 
// ================================================================
// BEGIN eraicons fix
// Requires #mw-dismissable-notice span {display:none;} in .css
// By Joeyaa
// ================================================================
 
$('#mw-dismissable-notice > tbody > tr').prepend('<td align="left"><span style="margin: 0pt 20px 0pt 15px;display:block;">[<a href="javascript:dismissNotice();">dismiss</a>]</span></td>');
 
// ================================================================
// END eraicons fix
// ================================================================
 
// ================================================================
// BEGIN - Collapsible tables
//  *  Description: Allows tables to be collapsed
//     showing only the header. See [[Wikipedia:NavFrame]].
//  *  Maintainers: [[User:R. Koot]]
// ================================================================
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
addOnloadHook( createCollapseButtons );
 
// ================================================================
// END - Collapsible tables
// ================================================================
 
/* function WikiActivity2RecentChanges() {
	$('a.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges); */
 
// ================================================================
// BEGIN - Ticker MAGIC
// By Manyman
// ================================================================
 
/* Ticker */
var ticker;
var tickertxt;
var tickerdiv;
 
function newsticker() {
  if (document.getElementById) {
  if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv'))&&(document.getElementById('tickertxt'))) {
    ticker = document.getElementById('ticker'); 
    ticker.style.display = 'block';
    tickerdiv = document.getElementById('tickerdiv');
    tickertxt = document.getElementById('tickertxt').offsetWidth; 
    tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
    lefttime=setInterval("newstickergo()",200);
  }
  }
}
 
    // *********
    // IRC Login Fixed by Megan (Now stops f***ing loading on every page) - Borrowed with much tanks from the Call of
    // Duty Wikia. We appreciate you, no matter what!
    // *********
    $(document).ready(function() {
        if($('#IRClogin')){
            var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
            $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=#halo-nation&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
        }
        if($('#CVNIRClogin')){
            var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
            $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-halo&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
        }
    });
 
function newstickergo() {
  tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
} 
addOnloadHook( newsticker );
 
// ================================================================
// END - Ticker MAGIC
// ================================================================
 
// ================================================================
// BEGIN - Username replace function ([[template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);
 
// ================================================================
// END - Username replace function ([[template:USERNAME]])
// ================================================================
 
// ================================================================
// BEGIN - hasClass var/Test if an element has a certain class
// * Description: Uses regular expressions and caching for better performance.
// * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
// ================================================================
 
var hasClass = (function() {
	var reCache = {};
	return function( element, className ) {
		return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
	};
})();
 
// ================================================================
// END - hasClass var/Test if an element has a certain class
// ================================================================
 
function fixSearch() {
	var button = document.getElementById('searchSubmit');
 
	if( button )
		button.name = 'go';
}
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWpedia. Updated by Grunny of Wookiepedia for Oasis.
 
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
cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
$(cC).load(location.href + " " + cC, function (data) { 
$(cC).trigger("ajaxPageLoad");
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
 
// ============================================================
// Add Temp/Dump js below.
// ============================================================
 
 
// ================================================================
// BEGIN - Sliders using JQuery by User:Tierrie
// ================================================================
 
//wsl.loadCSS.call(wsl, "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css");
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");

mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
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
 
// ================================================================
// END - Sliders/JQuery
// ================================================================
importScriptPage('AjaxRC/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 2 };

// ================================================================
// Spoiler coding
// ================================================================

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

// ===============================================================
// END
// ===============================================================

// ===============================================================
// "Articletype positioning" script; by [[User:Bp]]
// ===============================================================
 
function moveArticletypeDiv() {
  var fooel = document.getElementById('ma-article-type');
  if (fooel!=null) {
    var artel = document.getElementById('article');
    var wphel = document.getElementById('WikiaPageHeader');
    var titel = document.getElementById('top');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!=null) {
      artel.parentNode.insertBefore(fooel,artel);
    } else if (wphel!=null) {
      wphel.parentNode.insertBefore(fooel,wphel);
    } else {
      //fall back to a position before H1 - useful for monobook skin
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}
 
hookEvent("load", moveArticletypeDiv);

// ===============================================================
// END
// ===============================================================

// ===============================================================
// Halo Nation collapsing by T3CHNOCIDE
// ===============================================================
$('.hn-collapse').click(function() {
  if ( $('.hn-collapsible').is(':hidden') ) {
    $('.hn-collapsible').slideDown();
	$('.hn-collapse').text('[Hide]');
  } else {
    $('.hn-collapsible').slideUp();
	$('.hn-collapse').text('[Show]');
  }
});
// ===============================================================
// END
// ===============================================================
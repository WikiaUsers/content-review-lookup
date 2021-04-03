/* Any JavaScript here will be loaded for all users on every page load. */

/****************************************/
/* sliders using jquery                 */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

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

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
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

importScriptPage('CollapsibleInfobox/code.js', 'dev');

importScriptPage('AjaxRC/code.js', 'dev');
 
// See [[Help:Tooltips]]
// default setting to turn tooltips on
var tooltipsOn = true;
 
// allow users to specify an external db to change links to
var extDB = "http://swtor.wikia.com/";
 
var $tfb;
var $ttfb;
var $htt;
 
// hides the tooltip
function hideTip() {
  $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}
 
// displays the tooltip
function displayTip(e) {
  $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
  moveTip(e);
  $htt.not(":empty").css("visibility","visible");
}
 
// moves the tooltip
function moveTip(e) {
  var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($htt.not(".hidden").innerHeight()+20):20);
  var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($htt.not(".hidden").innerWidth()+20):20);
  $htt.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
// AJAX tooltips
function showTip(e) {
  $t=$(this);
  $p=$t.parent();
  if ($p.hasClass("selflink")==false)
  {
    $t.removeAttr("title");
    $p.removeAttr("title");
    $tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",
    function ()
    {
      if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip-content").css("display","");
      displayTip(e);
    });
  }
}
 
// quick tooltips
function hideTemplateTip() {
  $ttfb.html("").removeClass("tooltip-ready").addClass("hidden"); 
}
 
function showTemplateTip(e) {
  $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
  displayTip(e);
}
 
// add the tooltip calls to the page
function eLink(db,nm) {
  dbs = new Array("http://www.torhead.com/search/","http://db.darthhater.com/search.aspx?search_text=", "http://knotor.com/search?q=");
  dbTs = new Array("TORHead","DARTHHATERDB", "KnoTOR");
  dbHs = new Array("T ","D ","K ");
  el = '<a href="'+ dbs[db]+nm + '" target="_blank" title="'+ dbTs[db] +'">' + dbHs[db] + '</a>';
  return el;
}
 
function bindTT() {
  $t=$(this);
  $p=$t.parent();
  if ($p.hasClass("selflink") == false) {
    $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
    if ($p.hasClass("new")) {
      els = '<sup><span class="plainlinks fromCommon">';
      //y=($t.hasClass("itemlink"))?0:1;
      //z=($t.hasClass("codexlink"))?1:2;
      for (x=0;x<2;x++) els += eLink(x,$t.data("tt").replace("Mission:",""));
      $p.after(els+'</span></sup>');
    }
    if (extDB != "http://swtor.wikia.com/")
    { 
      fullextURL = extDB + $t.data("tt");
      $p.attr("href",fullextURL);
    }
  }
}
 
// check to see if it is active then do it
function ttMouseOver(foo) {
  if (tooltipsOn) {
    $("#WikiaArticle").mouseover(hideTip);
    $("#WikiaArticle").append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
    $tfb = $("#tfb");
    $ttfb = $("#templatetfb");
    $htt = $("#tfb,#templatetfb");
    if(foo==1){
      $("#WikiaArticle span.ajaxttlink").each(bindTT);
    }
    $("#WikiaArticle span.tttemplatelink").mouseover(showTemplateTip).mouseout(hideTemplateTip).mousemove(moveTip);
  }
}
 
$(function(){
  ttMouseOver(1);
});

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


/* Twitter Button */

$(function() {
$('.tweet').html('<a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-via="TOR_Wiki">Tweet</a><script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>');
});

importArticles({
    type: 'script',
    articles: [
        //...
        "MediaWiki:Common.js/mastheads.js"
        //...
    ]
});
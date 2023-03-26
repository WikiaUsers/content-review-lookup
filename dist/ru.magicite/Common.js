/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/****************************************/
/* Import Code                          */
/****************************************/

importArticles({
    type: 'script',
    articles: [
        'w:dev:AjaxRC/code.js',
        'w:dev:PurgeButton/code.js',
        'MediaWiki:Common.js/standardeditsummaries.js',
        'MediaWiki:Common.js/BackToTopButton.js',
        'w:dev:DupImageList/code.js',
        'MediaWiki:Common.js/masthead.js',
        'w:dev:AjaxPatrol/code.js',
        'w:dev:TopEditors/code.js'
    ]
});

/****************************************/
/* Misc                                 */
/****************************************/

var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ru.elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
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

/* <pre> */
function addWikifButton(){
 var toolbar = document.getElementById('toolbar')
 var textbox = document.getElementById('wpTextbox1')
 if (!textbox || !toolbar) return
 var i = document.createElement('img')
 i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
 i.alt = i.title = 'Викификатор'
 i.onclick = Wikify
 i.style.cursor = 'pointer'
 toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit'){
 document.write('<script type="text/javascript" src="http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript"><\/script>')
 addOnloadHook(addWikifButton)
}
/* </pre> */

/** Код для работы шаблона "УЧАСТНИК" **/

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

function addButton() {
  return;
}


/* Конец кода */

// WRITTEN BY User:Rappy_4187
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
// Модераторы
    rights["Nikaose"]              = ["МОДЕРАТОР", "НЕАКТИВНЫЙ УЧАСТНИК"];
    rights["Сабриния"]             = ["МОДЕРАТОР", "НЕАКТИВНЫЙ УЧАСТНИК"];

// Администраторы
    rights["Александрия"]          = ["АДМИНИСТРАТОР"];

// Бюрократы
    rights["Originalbacer"]        = ["БЮРОКРАТ"];

  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS


// START OF TOOLTIP CODE
// This tooltip code was written by Pcj
// Updated to work with Wikia skin by Uberfuzzy
 
article = "";
 
var tooltipsOn = true;
 
var $tfb;
 
var $ttfb;
 
var $htt;
 
var activeHoverLink = null;
 
var tipCache = new Object;

function getCookie( name ) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function hideTip() {
	$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
	activeHoverLink = null;
}
 
function displayTip(e) {
	$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
	moveTip(e);
	$htt.not(":empty").css("visibility", "visible");
	moveTip(e);
}
 
function moveTip(e) {
	$ct = $htt.not(":empty");
	var newTop = e.clientY + (e.clientY > $(window).height() / 2 ? -($ct.innerHeight() + 20) : 20);
	var newLeft = e.clientX + (e.clientX > $(window).width() / 2 ? -($ct.innerWidth() + 20) : 20);
	$ct.css({
		position: "fixed",
		top: newTop + "px",
		left: newLeft + "px"
	});
}
 
function showTip(e) {
	var $t = $(this);
	activeHoverLink = $t;
	$p = $t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.removeAttr("title");
		$p.removeAttr("title");
		var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "&action=render div.tooltip-content";
		if (tipCache[url] != null) {
			$tfb.html(tipCache[url]);
			displayTip(e);
			return;
		}
		$tfb.load(url, function() {
			if ($t != activeHoverLink)
				return;
			if ($tfb.html() == "")
				$tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
			$tfb.find(".tooltip-content").css("display", "");
			tipCache[url] = $tfb.html();
			displayTip(e);
		});
	}
}
 
function hideTemplateTip() {
	$ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}
 
function showTemplateTip(e) {
	$ttfb.html('<div class="tooltip-content">' + $(this).next().html() + "</div>");
	displayTip(e);
}
 
function bindTT() {
	$t = $(this);
	$p = $t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
	}
}
 
function ttMouseOver() {
	if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
		$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
		$tfb = $("#tfb");
		$ttfb = $("#templatetfb");
		$htt = $("#tfb,#templatetfb");
		$(article + " span.ajaxttlink").each(bindTT);
		$(article + " span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip);
	}
}
 
// check to see if it is active then do it
$( function() {
	if(skin=='oasis') {
		article = "#WikiaArticle";
	} else {
		article = "#bodyContent";
	}
 
	ttMouseOver();
});
// END OF TOOLTIP CODE
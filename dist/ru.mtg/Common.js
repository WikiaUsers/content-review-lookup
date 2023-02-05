/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *			   http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
function CreateOverlibs () {
 
var Test = document.getElementsByClassName('test');
var Lib = document.getElementsByClassName('overlib');
 
}
 
 
var autoCollapse = 2;
var collapseCaption = '-';
var expandCaption = '+';
 
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
 
			Button.appendChild( document.createTextNode( ' [' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( '] ' ) );
 
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
 
 
/** name - cookie name, value - 'on' or 'off' or whatever, exdays - expiry of cookie in days */
function setCookie(name, value, exdays) {   // Sets a cookie
  value = name + "=" + escape(value); 
  if (exdays !== null) { var d = new Date(); value += ";expires=" + d.setDate(d.getDate() + exdays).toGMTString(); }
  document.cookie = value;
}
 
/** name - cookie name, @return - cookie or empty string */
function getCookie(name) {    // Gets a cookie
  var c = document.cookie;
  if (c.length > 0) {
    var s = c.indexOf(name + "=");
    if (s !== -1) {
      var e = c.indexOf(";", s = s + name.length + 1);
      return unescape(c.substring(s, (e !== -1) ? e : e = c.length));
    }
  }
  return "";
}
 
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

var tooltips_config = {
    offsetX: 5,
    offsetY: 5,
    waitForImages: true,
    events: ['CustomEvent'],
    noCSS: true,
}

var tooltips_list = [
    {
        classname: 'unit-tooltip',
        parse: '{'+'{<#unit#>|rank=<#rank#>|size=<#size#>|upgrade=<#upgrade#>|upgrades=<#upgrades#>|upgraded=<#upgraded#>|race=<#race#>|tt=<#tt#>|show=no}}',
        //onShow: function() { if ((this).getElementsByClassName('template-unit')[0]) {Unit = (this).getElementsByClassName('template-unit')[0]; console.info("Onshow var =",Unit); processunit (Unit);} },
    }, {
        classname: 'spell-tooltip',
        parse: '{'+'{<#spell#>|magnitude=<#magnitude#>|tt=<#tt#>}}',
    }, {
        classname: 'ability-tooltip',
        parse: '{'+'{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    }, {
        classname: 'structure-tooltip',
        parse: '{'+'{<#structure#>}}',
    }, {
        classname: 'building-tooltip',
        parse: '{'+'{<#building#>}}',
    }, {
        classname: 'damageability-tooltip',
        parse: '{'+'{<#ability#>|physical=<#physical#>|spirit=<#spirit#>|blight=<#blight#>|fire=<#fire#>|frost=<#frost#>|shock=<#shock#>|tt=<#tt#>|show=no}}',
        onShow: function(handle) { a = handle; writeloc = (this).getElementsByClassName('writedamage')[0]; damagesource = a.parentElement; unitloc = damagesource.parentElement.parentElement; damageCalc (writeloc, damagesource, unitloc); },
    }, {
        classname: 'protection-tooltip',
        parse: '{'+'{Prottable|<#magnitude#>|<#element#>}}',
    }, {
        classname: 'weakness-tooltip',
        parse: '{'+'{Weaktable|<#magnitude#>|<#element#>}}',
    }
];
 
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
 
 function updatetimer(i) {
   var now = new Date();
   var then = timers[i].eventdate;
   var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
   // catch bad date strings
   if(isNaN(diff)) { 
     timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
     return;
   }
 
   // determine plus/minus
   if(diff<0) {
     diff = -diff;
     var tpm = '';''
   } else {
     var tpm = '';''
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дней, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
   // a setInterval() is more efficient, but calling setTimeout()
   // makes errors break the script rather than infinitely recurse
   timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
 }
 
 function checktimers() {
   //hide 'nocountdown' and show 'countdown'
   var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
   for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
   var countdowns = getElementsByClassName(document, 'span', 'countdown');
   for(var i in countdowns) countdowns[i].style.display = 'inline'
 
   //set up global objects timers and timeouts.
   timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
   timeouts = new Array(); // generic holder for the timeouts, global
   if(timers.length == 0) return;
   for(var i in timers) {
     timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
     updatetimer(i);  //start it up
   }
 }
 addOnloadHook(checktimers);

 // **************************************************
 //  - end -  Experimental javascript countdown timer
 // **************************************************
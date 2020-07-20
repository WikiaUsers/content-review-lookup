console.log('Common.js 1');
/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
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
 
    var Rows = Table.rows;
 
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
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
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
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        }
    }
}
 
addOnloadHook( createCollapseButtons );
 
importScriptPage('AjaxRC/i18n.code.js', 'dev');
 
/** Username replace function *******************************
  * Inserts user name into <span class="insertusername"></span>
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    var n = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span', document.getElementById('bodyContent'));
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);
 
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
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
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
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
 
/* =============
   Title rewrite 
   jQuery version and new wikia skin fixes by Grunny
   ==============
   This is what powers 
   [[Template:title]],
   principally allowing
   for italic page titles
   ============== */
 
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

	var realTitleBanner = document.getElementById("RealTitleBanner");
	if (realTitleBanner)
		realTitleBanner.style.display = "none";
}
 
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('DisplayClock/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');
 
var ArchiveToolConfig = { 
   archiveListTemplate: 'ArchCat',
   archivePageTemplate: 'ArchPage',
   archiveSubpage: 'Archive',
   userLang: true
}; 
importScriptPage('ArchiveTool/code.js', 'dev');
 
/*  ================
    addOnloadHook area
    ================
    Necessary for calling to life functions
    specified elsewehre in this document.
    ================= */
 
addOnloadHook( rewriteTitle );
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* Pulsanti della pagina principale */
function getElementsByClass(searchClass, tagName) {
	// Fonte: http://www.anyexample.com/webdev/javascript/javascript_getelementsbyclass_function.xml
	if (tagName == null)
		tagName = '*';
	var el = new Array();
	var tags = document.getElementsByTagName(tagName);
	var tcl = searchClass;
	for(i = 0, j = 0; i < tags.length; i++)
		if (tags[i].className.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	return el;
}

function cambiaTestoPaginaPrincipale(id) {
	var i = (id == 0) ? 1 : 0;
	var riquadro = document.getElementById("riquadroPaginaPrincipale" + i);
	while (riquadro != null) {
		if (i != id)
			riquadro.style.display = "none";
		i++;
		riquadro = document.getElementById("riquadroPaginaPrincipale" + i);
	}
	
	riquadro = document.getElementById("riquadroPaginaPrincipale" + id);
	riquadro.style.display = "inherit";

	var pulsantiPaginaPrincipale = getElementsByClass("pulsantePaginaPrincipale", "td");
	if (pulsantiPaginaPrincipale.length != 0) {
		pulsantiPaginaPrincipale[id].style.backgroundColor = "white";
		pulsantiPaginaPrincipale[id].style.color = "black";
		pulsantiPaginaPrincipale[id].style.borderStyle = "none";

		var j;
		for (i = 0; i < pulsantiPaginaPrincipale.length; i++) {
			if (i != id) {
				pulsantiPaginaPrincipale[i].style.color = "white";
				pulsantiPaginaPrincipale[i].style.borderStyle = "solid";
				j = i + 4;
				pulsantiPaginaPrincipale[i].style.backgroundColor = "#00" + j.toString(16) + "000";
			}
		}
	}
}

var pulsantiPaginaPrincipale_globale = getElementsByClass("pulsantePaginaPrincipale", "td");
if (pulsantiPaginaPrincipale_globale.length != 0) {
	for (var i = 0; i < pulsantiPaginaPrincipale_globale.length; i++)
		pulsantiPaginaPrincipale_globale[i].setAttribute("onmouseover", "javascript:cambiaTestoPaginaPrincipale(" + i + ");");
	cambiaTestoPaginaPrincipale(0);
}
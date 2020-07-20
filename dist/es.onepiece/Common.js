

// Autoactualización Cambios recientes y Wikiactividad
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];

// =====================================
//                Imports
// =====================================
 
// See MediaWiki:ImportJS

/* Botones extras */

if (typeof(mwCustomEditButtons) != 'undefined') {

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Insertar plantilla",
        "tagOpen": "{" + "{",
        "tagClose": "}}",
        "sampleText": "Plantilla"
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirigir",
		"tagOpen": "#REDIRECCIÓN [[",
		"tagClose": "]]",
		"sampleText": "Nombre del artículo"
	};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
        "speedTip": "Enlace a usuario",
        "tagOpen": "[[user:",
        "tagClose": "|]]",
        "sampleText": "Usuario"
    };
}

/*****************/
/* NOMBREUSUARIO */
/*****************/

$(function UserNameReplace() {
    if (wgUserName) {
        var spans = getElementsByClassName(document, "span", "insertusername");
  
        for (var i = 0; i < spans.length; i++){
            spans[i].textContent = wgUserName;
        }
    }
});

/* Para Plegable/Desplegable */
var ShowHideConfig = { linkBefore:true };
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName === undefined || tagName === null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = [];
	var i = 0;
	for (i in list) {
		if ($(list[i]).hasClass(className))
			array.push(list[i]);
    }
	return array;
}
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};

function getElementsByName (name, root) {
    if (root === undefined) root = document;
    var e = root.getElementsByTagName('*');
    var r = [];
    for (var i = 0; i < e.length; i++) {
        if (e[i].getAttribute('name') == name) r[r.length] = e[i];
    }
    return r;
}

function getText (e) {
    if (e.textContent) return e.textContent;
	else if (e.innerText) return e.innerText;
	else return null;
 }
 
function setText (e, t) {
	if (e.textContent) e.textContent = t;
	else if (e.innerText) e.innerText = t;
	else { e.textContent = t; e.innerText = t; } // entrambi nulli, non si può discriminare
	return;
}

function appendText (e, t) {
	if (e.textContent) e.textContent += t;
	else if (e.innerText) e.innerText += t;
	else { e.textContent = t; e.innerText = t; }
	return;
}
  
/* **************************************************
 * Tablas colapsibles (De Wikipedia - en)
 *
 *  Permite ver solo el encabezado de las tablas, dejando el contenido oculto
 *               Ver [[wikipedia:Wikipedia:NavFrame]].
 */
 
var autoCollapse = 2;
var collapseCaption = "ocultar";
var expandCaption = "mostrar";
 
function collapseTable(tableIndex) {
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) { return false; }
 
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
 
$(function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( $(Tables[i]).hasClass( "collapsible" ) ) {
 
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
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
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
        if ( $( NavigationBoxes[i] ).hasClass( "collapsed" ) || ( tableIndex >= autoCollapse && $(NavigationBoxes[i]).hasClass( "autocollapse" ) ) ) {
            collapseTable( i );
        } 
        else if ( $(NavigationBoxes[i]).hasClass( "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( $(element).hasClass( "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
});

//InterlanguageFlags
importArticles({
type: "style",
articles: [
"w:c:dev:InterlanguageFlags/code.css"
]
});
//================================
//          jQuery Slider
//================================

// Code from http://dragonage.wikia.com/wiki/MediaWiki:Common.js created by "Tierrie"
// see also http://onepiece.wikia.com/wiki/MediaWiki:Common.js/slider.js

mw.loader.using(["jquery.cookie"]);

mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");

  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });

  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
  });
});
// ==================================================
//              Countdown Timer (by Splarka)
//                  Versió 0.0.3 
// ==================================================
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
    var now = new Date(),
        then = timers[i].eventdate,
        diff = count = Math.floor((then.getTime() - now.getTime()) / 1000),
        tpm;
 
    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }
 
    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        tpm = '';
    } else {
        tpm = '';
    }
 
    // calcuate the diff
    var left = (diff % 60) + ' segons';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minuts ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hores ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' dies ' + left;
    timers[i].firstChild.nodeValue = tpm + left;
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = []; // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});
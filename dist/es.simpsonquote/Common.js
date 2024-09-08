/** Execute function on page load *********************************************
  *
  *  Description: Wrapper around addOnloadHook() for backwards compatibility.
  *               Will be removed in the near future.
  *  Maintainers: [[User:R. Koot]]
  */
 
 function addLoadEvent( f ) { addOnloadHook( f ); }


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

 /** Internet Explorer bug fix **************************************************
  *
  *  Description: UNDOCUMENTED
  *  Maintainers: [[User:Tom-]]?
  */
 
 if (window.showModalDialog && document.compatMode)
 {
   var oldWidth;
   var docEl = document.documentElement;
 
   function fixIEScroll()
   {
     if (!oldWidth || docEl.clientWidth > oldWidth)
       doFixIEScroll();
     else
       setTimeout(doFixIEScroll, 1);
   
     oldWidth = docEl.clientWidth;
   }
 
   function doFixIEScroll() {
     docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
   }
   try {
     document.attachEvent("onreadystatechange", fixIEScroll);
     attachEvent("onresize", fixIEScroll);
   }
   catch(e) { }
 }

 /** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "ocultar";
var expandCaption = "mostrar";

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

 //fix edit summary prompt for undo
 //this code fixes the fact that the undo function combined with the "no edit summary prompter" causes problems if leaving the
 //edit summary unchanged
 //this was added by [[User:Deskana]], code by [[User:Tra]]
 addOnloadHook(function () {
   if (document.location.search.indexOf("undo=") != -1
   && document.getElementsByName('wpAutoSummary')[0]) {
     document.getElementsByName('wpAutoSummary')[0].value='';
   }
 })

/*</pre>
== Búsqueda especial extendida (specialsearch) ==
Añade a la página [[Special:Search]] enlaces a buscadores externos como Yahoo, Google, MSN Live y Exalead.

Trabaja en conjunto con el módulo [[MediaWiki:SpecialSearch.js]] y está basado en [[w:fr:MediaWiki:Monobook.js]].
<pre><nowiki> */

document.write('<script type="text/javascript" src="' 
+ '/w/index.php?title=MediaWiki:SpecialSearch.js'
+ '&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600"></script>');

/*</nowiki></pre>
== Cerrar mensajes ==
Ver ejemplo en [[Usuario:Chabacano/Fírmalo]], por [[Usuario:Platonides]].
<pre><nowiki> */

 addOnloadHook( function() {

 if (document.getElementById("cierraPadre")) {
      document.getElementById("cierraPadre").childNodes[0].onclick= function () { 
      document.getElementById("cierraPadre").style.cursor = 'pointer';
      document.getElementById("cierraPadre").parentNode.style.display = 'none';
      return false; /*no seguir el href*/} 
   }
 });


/*</nowiki></pre>
== Texto sólo para biblios ==
<pre><nowiki> */

function userInGroup(group) {
  return (wgUserGroups && (('|' + wgUserGroups.join('|') + '|').indexOf('|' + group + '|') != -1));
}

addOnloadHook ( function() {
  if ( userInGroup('sysop') ) {
     if (document.styleSheets[0].cssRules) {
        for (i=document.styleSheets.length-1; i >= 0; i--) {
             try {
                 //Añadir al final (Gecko)
                 document.styleSheets[i].insertRule('.para_biblios { display: inline; }', document.styleSheets[i].cssRules.length);
                 break;
             } catch(e) {
                 //Ignorar el error y probar con la hoja de estilos anterior. 
                 //Así, por ejemplo [[Usuario:Axxgreazz/Monobook-Suite/popups.js]] carga una hoja de estilos desde en.wikipedia.org, lo que provoca un error 'Access to URI denied' (NS_ERROR_DOM_BAD_URI).
             }
        }
     } else if (document.styleSheets[0].rules) { //IE
        document.styleSheets[document.styleSheets.length-1].addRule('.para_biblios', 'display: inline');
     }
  }
} );

/*</pre>
== Wikimedia Player ==
Añade reproductor en la misma página.
<pre><nowiki> */

document.write('<script type="text/javascript" src="' 
+ '/w/index.php?title=MediaWiki:Wikimediaplayer.js'
+ '&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600"></script>');


/** WikiMiniAtlas *******************************************************
  *
  *  Description: WikiMiniAtlas is a popup click and drag world map.
  *               This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
  *               The script itself is located on meta because it is used by many projects.
  *               See [[Meta:WikiMiniAtlas]] for more information. 
  *  Created by: [[User:Dschwen]]
  */
 
document.write('<script type="text/javascript" src="' 
+ 'http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js' 
+ '&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400"></script>');

/*</pre>
== Mejoras de diseño de la Portada ==
<pre><nowiki> */

/** Mejoras de diseño de la Portada *********************************************************
  *
  *  Descripción:        Varias mejoras de diseño para la portada, incluyendo un
  *                      enlace adicional a la lista completa de idiomas disponibles
  *                      y renombrar 'artículo' a 'portada'.
  *  Adaptado de [[en:MediaWiki:Common.js]]
  */
 
 function mainPageAppendCompleteListLink() {
     try {
         var node = document.getElementById( "p-lang" )
                            .getElementsByTagName('div')[0]
                            .getElementsByTagName('ul')[0];
 
         var aNode = document.createElement( 'a' );
         var liNode = document.createElement( 'li' );
 
         aNode.appendChild( document.createTextNode( 'Lista completa' ) );
         aNode.setAttribute( 'href' , 'http://meta.wikimedia.org/wiki/Lista_de_Wikipedias' );
         liNode.appendChild( aNode );
         liNode.style.fontWeight = 'bold';
         node.appendChild( liNode );
      } catch(e) {
        // lets just ignore what's happened
        return;
     }
 }

 if ( wgPageName == "Simpson_Wiki_en_Español:Portada" ) {
        addOnloadHook( mainPageAppendCompleteListLink );
 }
/*</nowiki></pre>

== Redefinición de ordenación de tablas "sortable" ==

Traido de la Inclopedia. Ordena nombres de meses en español y cambia puntos por comas.

<pre><nowiki>*/

function ts_dateToSortKey(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	if (date.length == 11) {
		switch (date.substr(3,3).toLowerCase()) {
			case "ene": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "abr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "ago": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dic": var month = "12"; break;
			// default: var month = "00";
		}
		return date.substr(7,4)+month+date.substr(0,2);
	} else if (date.length == 10) {
		if (ts_europeandate == false) {
			return date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
		} else {
			return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (ts_europeandate == true) {
			return yr+date.substr(3,2)+date.substr(0,2);
		} else {
			return yr+date.substr(0,2)+date.substr(3,2);
		}
	}
	return "00000000";
}

function ts_parseFloat(num) {
        if (!num) return 0;
        num = num.replace(/\./g, "");
        num = num.replace(/,/, ".");
        num = parseFloat(num);
        return (isNaN(num) ? 0 : num);
}

function ts_sort_caseinsensitive(a,b) {
var aa = a[1].toLowerCase();
var bb = b[1].toLowerCase();
return(aa.localeCompare(bb));
}


addOnloadHook ( function() {
     var n = Math.round(Math.random() * 9); //10 opciones
     if (document.styleSheets[0].cssRules) {
        for (i=document.styleSheets.length-1; i >= 0; i--) {
             try {
                 //Añadir al final (Gecko)
                 document.styleSheets[i].insertRule('.rotate_0 { display: none }', document.styleSheets[i].cssRules.length);
                 document.styleSheets[i].insertRule('.rotate_' + n + ' { display: block; }', document.styleSheets[i].cssRules.length);
                 break;
             } catch(e) {
                 //Ignorar el error y probar con la hoja de estilos anterior. 
                 //Así, por ejemplo [[Usuario:Axxgreazz/Monobook-Suite/popups.js]] carga una hoja de estilos desde en.wikipedia.org, lo que provoca un error 'Access to URI denied' (NS_ERROR_DOM_BAD_URI).
             }
        }
     } else if (document.styleSheets[0].rules) { //IE
        document.styleSheets[document.styleSheets.length-1].addRule('.rotate_0', 'display: none');
        document.styleSheets[document.styleSheets.length-1].addRule('.rotate_' + n, 'display: block');
     }
 } );

/**
 * Desactivar el botón guardar en la primera vez a los anónimos
 * Copyright Marc Mongenet, 2006 (fr.wikipedia.org)
 * Plyd 05/2007: add "after preview" in the button to prevent misunderstanding from beginners
 * Platonides 5/2008: Traído a es.wikipedia
 */
function forcePreview() {
  if (wgUserName != null || wgAction != "edit") return;
  saveButton = document.getElementById("wpSave");
  if (!saveButton) return;
  saveButton.disabled = true;
  saveButton.value += " (previsualizar antes)";
  saveButton.style.fontWeight = "normal";
  document.getElementById("wpPreview").style.fontWeight = "bold";
}
 
addOnloadHook(forcePreview);

var wma_settings =
{
buttonImage: "http://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Erioll_world.svg/15px-Erioll_world.svg.png"
}
//</nowiki></pre>

// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================

addOnloadHook(foldingTabsMulti);
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length==0) return

  for(var i=0;i<ftsets.length;i++) {  
    ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
    ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
    ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

    if(ftsets[i].links.length < ftsets[i].boxen.length) {
      len = ftsets[i].boxen.length;
    } else {
      len = ftsets[i].links.length;
    }

    for(var j=0;j<len;j++) {
      ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
      ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
    }
    showmultitab(i,'0');
    ftsets[i].head.style.display = 'block';
  }
}

function showmultitab(set,num) {
  for(var j=0;j<ftsets[set].boxen.length;j++) {
    if(j==num) {
      ftsets[set].boxen[j].style.display = 'block';
    } else {
      ftsets[set].boxen[j].style.display = 'none';
    }
  }
  for(var j=0;j<ftsets[set].links.length;j++) {
    if(j==num) {
      ftsets[set].links[j].className = 'selected';
      ftsets[set].links[j].blur();
    } else {
      ftsets[set].links[j].className = '';
    }
  }
}

// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});
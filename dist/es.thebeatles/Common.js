window.hitos = [];
function hito(nombre) {
  window.hitos.push([nombre, new Date().getTime()]);
}

hito("C Common.js");

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
    hito("C createCollapseButtons");
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
    hito("F createCollapseButtons");
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

addOnloadHook( function() {
if ((wgCanonicalNamespace == "Special") && (wgCanonicalSpecialPageName == "Search"))
   importScript('MediaWiki:SpecialSearch.js');
} );

/*</nowiki></pre>
== Cerrar mensajes ==
Ver ejemplo en [[Usuario:Chabacano/Fírmalo]], por [[Usuario:Platonides]].
<pre><nowiki> */

 addOnloadHook( function() {
 hito("C cerrar mensajes");
 if (document.getElementById("cierraPadre")) {
      document.getElementById("cierraPadre").childNodes[0].onclick= function () { 
      document.getElementById("cierraPadre").style.cursor = 'pointer';
      document.getElementById("cierraPadre").parentNode.style.display = 'none';
      return false; /*no seguir el href*/} 
   }
 hito("F cerrar mensajes");
 });


/*</nowiki></pre>
== Scripts sólo para biblios ==
<pre><nowiki> */

function userInGroup(group) {
  return (wgUserGroups && (('|' + wgUserGroups.join('|') + '|').indexOf('|' + group + '|') != -1));
}

if ( userInGroup('sysop') ) 
    importScript( "MediaWiki:Sysop.js" );

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
  *                      enlace adicional a la lista completa de idiomas disponibles.
  *  Adaptado de [[en:MediaWiki:Common.js]]
  */
 
 function mainPageAppendCompleteListLink() {
     hito("C mainPageAppendCompleteListLink");
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
        //return;
     }
     hito("F mainPageAppendCompleteListLink");
 }

 if ( wgPageName == "Wikipedia:Portada" ) {
        addOnloadHook( mainPageAppendCompleteListLink );
 }
/*</nowiki></pre>

== Redefinición de ordenación de tablas "sortable" ==

Traido de la Inclopedia. Ordena nombres de meses en español y cambia puntos por comas.

<pre><nowiki>*/

function ts_resortTable(lnk) {
	// get the span
	var span = lnk.getElementsByTagName('span')[0];

	var td = lnk.parentNode;
	var tr = td.parentNode;
	var column = td.cellIndex;

	var table = tr.parentNode;
	while (table && !(table.tagName && table.tagName.toLowerCase() == 'table'))
		table = table.parentNode;
	if (!table) return;

	if (table.rows.length <= 1) return;

	// Generate the number transform table if it's not done already
	if (ts_number_transform_table == null) {
		ts_initTransformTable();
	}

	// Work out a type for the column
	// Skip the first row if that's where the headings are
	var rowStart = (table.tHead && table.tHead.rows.length > 0 ? 0 : 1);

	var itm = "";
	for (var i = rowStart; i < table.rows.length; i++) {
		if (table.rows[i].cells.length > column) {
			itm = ts_getInnerText(table.rows[i].cells[column]);
			itm = itm.replace(/^[\s\xa0]+/, "").replace(/[\s\xa0]+$/, "");
			if (itm != "") break;
		}
	}

	// TODO: bug 8226, localised date formats
	var sortfn = ts_sort_generic;
	var preprocessor = ts_toLowerCase;
	if (/\d\d? de [a-zA-Z]+ de \d+$/.test(itm)) {
		preprocessor = ts_dateToSortKey;
	} else if (/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/.test(itm)) {
		preprocessor = ts_dateToSortKey;
	} else if (/^\d\d[\/.-]\d\d[\/.-]\d\d$/.test(itm)) {
		preprocessor = ts_dateToSortKey;
	// pound dollar euro yen currency cents
	} else if (/(^[\u00a3$\u20ac\u00a4\u00a5]|\u00a2$)/.test(itm)) {
		preprocessor = ts_currencyToSortKey;
	} else if (ts_number_regex.test(itm)) {
		preprocessor = ts_parseFloat;
	}

	var reverse = (span.getAttribute("sortdir") == 'down');

	var newRows = new Array();
	var staticRows = new Array();
	for (var j = rowStart; j < table.rows.length; j++) {
		var row = table.rows[j];
		if((" "+row.className+" ").indexOf(" unsortable ") < 0) {
			var keyText = ts_getInnerText(row.cells[column]);
			var oldIndex = (reverse ? -j : j);
			var preprocessed = preprocessor( keyText );

			newRows[newRows.length] = new Array(row, preprocessed, oldIndex);
		} else staticRows[staticRows.length] = new Array(row, false, j-rowStart);
	}

	newRows.sort(sortfn);

	var arrowHTML;
	if (reverse) {
		arrowHTML = '<img src="'+ ts_image_path + ts_image_down + '" alt="&darr;"/>';
		newRows.reverse();
		span.setAttribute('sortdir','up');
	} else {
		arrowHTML = '<img src="'+ ts_image_path + ts_image_up + '" alt="&uarr;"/>';
		span.setAttribute('sortdir','down');
	}

	for (var i = 0; i < staticRows.length; i++) {
		var row = staticRows[i];
		newRows.splice(row[2], 0, row);
	}

	// We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
	// don't do sortbottom rows
	for (var i = 0; i < newRows.length; i++) {
		if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") == -1)
			table.tBodies[0].appendChild(newRows[i][0]);
	}
	// do sortbottom rows only
	for (var i = 0; i < newRows.length; i++) {
		if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") != -1)
			table.tBodies[0].appendChild(newRows[i][0]);
	}

	// Delete any other arrows there may be showing
	var spans = getElementsByClassName(tr, "span", "sortarrow");
	for (var i = 0; i < spans.length; i++) {
		spans[i].innerHTML = '<img src="'+ ts_image_path + ts_image_none + '" alt="&darr;"/>';
	}
	span.innerHTML = arrowHTML;

	if (ts_alternate_row_colors) {
		ts_alternate(table);
	}
}

function ts_dateToSortKey(date) {	
	if (date.length > 14) {
		date = date.toLowerCase();
		if (date.charAt(1) == " " || date.charAt(1) == "-") {
			var dia = '0' + date.charAt(0);
		} else {
			var dia = date.substr(0, 2);
		}
		var iniciomes = date.indexOf(" de ") + 4;
		var finmes = date.lastIndexOf(" de ");
		var longmes = finmes - iniciomes;
		
		switch (date.substr(iniciomes, longmes)) {
			case "enero": var mes = "01"; break;
			case "febrero": var mes = "02"; break;
			case "marzo": var mes = "03"; break;
			case "abril": var mes = "04"; break;
			case "mayo": var mes = "05"; break;
			case "junio": var mes = "06"; break;
			case "julio": var mes = "07"; break;
			case "agosto": var mes = "08"; break;
			case "septiembre": var mes = "09"; break;
			case "octubre": var mes = "10"; break;
			case "noviembre": var mes = "11"; break;
			case "diciembre": var mes = "12"; break;
		}

		for (var anno = date.substr(finmes + 4); anno.length < 4; anno = '0' + anno);
		return anno + mes + dia;
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

function ts_sort_generic(a,b) {
  if ( (typeof a[1] == "string") && (typeof b[1] == "string") ) {
    /* Don't do this if it's eg. 'number'. We don't want that and number doesn't have .toLowerCase() */
    var aa = a[1].toLowerCase();
    var bb = b[1].toLowerCase();
    return(aa.localeCompare(bb));
  } else {
    return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : a[2] - b[2]; //Original ts_sort_generic
  }
}


addOnloadHook ( function() {
     hito("C función extraña");
     var n = Math.round(Math.random() * 9); //10 opciones

       for (i=0; i < document.styleSheets.length; i++) {
         if (document.styleSheets[0].href.substring(0, wgServer.length) == wgServer) { //NS_ERROR_DOM_SECURITY_ERR: http://permalink.gmane.org/gmane.science.linguistics.wikipedia.technical/40588

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
             break;
        }
  }
  hito("F función extraña");
} );

var wma_settings =
{
buttonImage: "http://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Erioll_world.svg/15px-Erioll_world.svg.png"
}







// == Código del plegado/desplegado de plantillas ==

var NavigationBarHide = 'Plegar';
var NavigationBarShow = 'Desplegar';

var NavigationBarShowDefault = 0;

document.write('<script type="text/javascript" ' +
  'src="/w/index.php?title=MediaWiki:NavigationBar.js' +
  '&amp;action=raw&amp;smaxage=3600&amp;ctype=text/javascript&amp;dontcountme=s"></scr' +
  'ipt>');

// == Código para artículos destacados ==
		
function LinkFA() 
{
   hito("C LinkFA");
   // iterate over all <span>-elements
   for (var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a FA span
      if(a.className == "destacado") {
         // iterate over all <li>-elements
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            // if found a FA link
            if (b.className == "interwiki-" + a.id) {
               b.className += " destacado";
               b.title = "Este es un artículo destacado en esta Wikipedia.";
            }
         }
      }
   }
   hito("F LinkFA");
}

addOnloadHook(LinkFA);

function LinkAB() 
{
   hito("C LinkAB");
   // iterate over all <span>-elements
   for (var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      if(a.className == "bueno") {
         // iterate over all <li>-elements
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            // if found a AB link
            if (b.className == "interwiki-" + a.id) {
               b.className += " bueno";
               b.title = "Este es un artículo bueno en esta Wikipedia.";
            }
         }
      }
   }
   hito("F LinkAB");
}

addOnloadHook(LinkAB);

function addLoadEvent(func) {
   if (window.addEventListener) {
       window.addEventListener("load", func, false);
   } else if (window.attachEvent) {
       window.attachEvent("onload", func);
   }
}

hito("F Common.js");
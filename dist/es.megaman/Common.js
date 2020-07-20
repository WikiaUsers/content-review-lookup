/*Nota, el contenido del Common.js se encuentra en [[MediaWiki:Common.js/Code.js]] <pre>*/
function loadTrueCommonJS() {
	// Hash para evitar que puedan usar URLs que afecten a cómo se ve la página
	var jsHashKey = window.wgStyleVersion;
	var reloadjs = false;
	var debug = false;
	var skipCommon = false;
	var skipSkinjs = false;
	var urlAppend = '';
	var curLocation = window.location.href;
	if (curLocation.indexOf('jsHashKey='+jsHashKey) != -1) {
		reloadjs = (curLocation.indexOf('reloadjs=true') != -1);
		debug = (curLocation.indexOf('debug=true') != -1);
		skipCommon = (curLocation.indexOf('skipCommon=true') != -1);
		skipSkinjs = (curLocation.indexOf('skipSkinjs=true') != -1);
	}
	if (reloadjs) {
		var d = new Date();
		urlAppend += '&t='+d.getTime();
	}
	if (!skipCommon) {
		var code = (debug ? 'Debug' : 'Code');
		importScriptURI(wgServer+wgScriptPath+wgScript+'?title=MediaWiki:Common.js/'+code+'.js&action=raw&ctype=text/javascript&templates=expand'+urlAppend);
	}
	if (skipSkinjs) {
		throw 'skipSkinjs especificado. Aborting...';
	}

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
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
  *  Taken from Wikipedia's Common.js.
  */
 
 var autoCollapse = 2;
 var collapseCaption = "Ocultar";
 var expandCaption = "Mostrar";
 
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
}

/* Para el spoiler */
function Spoiler() {
  var Spoiler_vorhanden = document.getElementById("WikiaArticle").getElementsByTagName("div");
  for (i=0; i < Spoiler_vorhanden.length; i ++){
    if (Spoiler_vorhanden[i].className.toLowerCase() == "spoiler")
      return true;
 }
  return false;
}
 
if (Spoiler()) {
  var article = $('div#WikiaArticle');
	$('<div id="blackout">' + '</div>').appendTo(article).css({
		position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, backgroundColor: '#FFFFFF', opacity: 1
	  });
  var r = confirm("Esta página contiene muchos spoilers.\nHaz click en OK para ver el artículo con los spoilers. Haciendo clic en Cancelar te llevará de nuevo a la página principal.");
  if (r != true) 
    window.location.href = "http://es.megaman.wikia.com/";
  else 
    $('#blackout').fadeOut(500, function () { });
}
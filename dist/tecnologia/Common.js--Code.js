/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

/* <pre> v218 */
 
/* IRC Chat */
function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=#ssbb-es" width="990" height="550"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;
 
  }
  //alert(document.getElementById("chat").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
/* Fin IRC Chat */
 
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
 var collapseCaption = "ocultar";
 var expandCaption = "mostrar";
 
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
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );
 
if (typeof(mwCustomEditButtons) != 'undefined') {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Insertar Plantilla",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Nombre de la plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlace a usuario",
     "tagOpen": "[[Usuario:",
     "tagClose": "|]]",
     "sampleText": "Nombre"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
     "speedTip": "Categor�a",
     "tagOpen": "[[Category:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nombre categor�a"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
     "speedTip": "Insertar tabla",
     "tagOpen": '{| {' + '{tablabonita|alineacion=col1izq col2cen col3der|}}\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "!| encabezado 1\n!| encabezado 2\n!| encabezado 3\n|-\n|| fila 1, columna 1\n|| fila 1, columna 2\n|| fila 1, columna 3\n|-\n|| fila 2, columna 1\n|| fila 2, columna 2\n|| fila 2, columna 3"};
 
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "Proponer el art�culo para ser borrado",
     "tagOpen": "\{\{Borrar|",
     "tagClose": "\}\}",
     "sampleText": "Motivo"};
 
 }
 
/* === Extensiones en min�scula al subir archivos === */
function adaptUploadFilename(){
	var ff = $G('mw-upload-form').wpDestFile;
	var fn = ff.value;
	if (fn.length < 4) return;
	var fe = fn.substr(fn.length-4,4);
	if (fe != fe.toLowerCase())
		ff.value = ff.value.substr(0,fn.length-4)+fe.toLowerCase();
}
 
$(function(){
	var uf = $G('mw-upload-form');
	if (uf && uf.wpDestFile) $UT.addHandler(uf,'submit',adaptUploadFilename);
});
 
// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (window.skin != 'oasis' && window.wgAction == 'view' &&
		(window.wgNamespaceNumber == 0 || window.wgNamespaceNumber == 6 || window.wgNamespaceNumber == 14) &&
		window.location.toString().indexOf('diff=') == -1) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			if ($('#catlinks').length == 0) {
				$('#'+(window.bodyContentId||'bodyContent')).children('div.printfooter').after('<div id="catlinks" class="catlinks"></div>');
			}
			if ($('#mw-normal-catlinks').length == 0) {
				$('#catlinks').prepend('<div id="mw-normal-catlinks"><a title="Especial:Categor�as" href="'+wgArticlePath.replace('$1', 'Especial:Categor�as')+'">Categor�as</a></div>');
			}
			$('#mw-normal-catlinks').children('a').eq(0).after('<span class="noprint">&nbsp;<span>(<a style="cursor: pointer;" title="Modificar categor�as"><span>+<sup>+</sup></span></a>)</span></span>').next().find('a').click(function() {
				$(this).unbind().parents('span.noprint').eq(0).remove();
				importScript('MediaWiki:Common.js/Gadget-HotCat.js');
				return false;
			});
			$('#catlinks').removeClass('catlinks-allhidden');
		}
	});
} else if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Upload') {
	importScript('MediaWiki:Common.js/Gadget-HotCat.js');
}

//</pre>
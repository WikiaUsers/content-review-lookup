/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

//<pre>
/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
var pagina =''; var mot=''; var sep="|";
 
/* Toma de datos */
pagina=encodeURI(wgPageName);
if (pagina.match("&"))
{
pagina=pagina.replace("&","%26");
}
 
addOnloadHook(function ()
{
if (location.href.indexOf('printable=yes')==-1 && location.href.indexOf('&action=')==-1 && wgCanonicalNamespace=="")
{
addPortletLink("p-cactions", "http://es.vikidia.org/wiki/index.php?title=Vikidia:Reportes&action=edit&section=new&preload=Vikidia:Reportes/TextoReporte&editintro=Vikidia:Reportes/Intro&reporta="+pagina, "Reportar problemas", "Reportar", "Reportar problemas en la página actual");
} 
 
if (location.href.match("reporta=")) 
{
	mot=location.href.substring(location.href.indexOf('reporta=')+8, location.href.length);
	document.editform.wpSummary.value = '[[' + decodeURI(mot) + ']]';
}
 
});
 
//============================================================
//
// Load functions
//
//============================================================
 
/**
 * Install a new function at onload (handling structure)
 * aOnloadFunctions[aOnloadFunctions.length] = function_name;
 */
if (!window.aOnloadFunctions) { 
  var aOnloadFunctions = new Array(); 
}
 
window.onload = function() 
{
  if (window.aOnloadFunctions) {
    for (var _i=0; _i<aOnloadFunctions.length; _i++) {
      aOnloadFunctions[_i]();
    }
  }
}
 
 
/**
 * Add a new function at page load
 */ 
function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent)
    window.attachEvent("onload", func);
}
 
/*
 * insertAfter : insert an element into a page
 */
 
function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}
 
//============================================================
// Nuevos botones en la barra de herramientas
//============================================================
 
//Remplit la variable mwCustomEditButtons (voir /skins-1.5/commons/wikibits.js) pour ajouter des boutons à la barre d'outils
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/8/88/Btn_toolbar_enum.png','Hacer una lista numerada',"<!-->Para hacer una lista numerada escribe los elementos de la misma con un signo numeral (#) delante, por ejemplo: # ASÍ. Ponlos uno debajo del otro presionando la tecla Enter al terminar cada oración y luego, al presionar el botón Guardar la página, los signos numerales se convertirán en los números correspondientes.<!-->","",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/1/11/Btn_toolbar_liste.png','Hacer una lista con viñetas',"<!-->Para hacer una lista con viñetas escribe los elementos de la misma con un signo asterisco (*) delante, por ejemplo: * ASÍ. Ponlos uno debajo del otro presionando la tecla Enter al terminar cada oración y luego, al presionar el botón Guardar la página, los signos asteriscos se convertirán en viñetas en forma de cuadritos pequeños de color azul claro.<!-->","",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png','Hacer que cuando alguien entre a esta página vaya a otra',"#REDIRECT [[","]]",'ESCRIBE AQUÍ EL NOMBRE DEL ARTÍCULO AL QUE QUIERES QUE SEAN REDIRIGIDOS LOS USUARIOS DESDE ESTA PÁGINA');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png','Categorizar el artículo',"[[Categoría:","]]",'ESCRIBE AQUÍ EL NOMBRE DE LA CATEGORÍA EN LA QUE QUIERES PONER A ESTE ARTÍCULO');

importScript("Mediawiki:HotCat.js");
//</pre>
/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

//<pre>
/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
 
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
addPortletLink("p-cactions", "http://es.vikidia.org/wiki/index.php?title=Vikidia:Reportes&action=edit&section=new&preload=Vikidia:Reportes/TextoReporte&editintro=Vikidia:Reportes/Intro&reporta="+pagina, "Reportar problemas", "Reportar", "Reportar problemas en la p�gina actual");
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
 
//Remplit la variable mwCustomEditButtons (voir /skins-1.5/commons/wikibits.js) pour ajouter des boutons � la barre d'outils
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/8/88/Btn_toolbar_enum.png','Hacer una lista numerada',"<!-->Para hacer una lista numerada escribe los elementos de la misma con un signo numeral (#) delante, por ejemplo: # AS�. Ponlos uno debajo del otro presionando la tecla Enter al terminar cada oraci�n y luego, al presionar el bot�n Guardar la p�gina, los signos numerales se convertir�n en los n�meros correspondientes.<!-->","",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/1/11/Btn_toolbar_liste.png','Hacer una lista con vi�etas',"<!-->Para hacer una lista con vi�etas escribe los elementos de la misma con un signo asterisco (*) delante, por ejemplo: * AS�. Ponlos uno debajo del otro presionando la tecla Enter al terminar cada oraci�n y luego, al presionar el bot�n Guardar la p�gina, los signos asteriscos se convertir�n en vi�etas en forma de cuadritos peque�os de color azul claro.<!-->","",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png','Hacer que cuando alguien entre a esta p�gina vaya a otra',"#REDIRECT [[","]]",'ESCRIBE AQU� EL NOMBRE DEL ART�CULO AL QUE QUIERES QUE SEAN REDIRIGIDOS LOS USUARIOS DESDE ESTA P�GINA');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png','Categorizar el art�culo',"[[Categor�a:","]]",'ESCRIBE AQU� EL NOMBRE DE LA CATEGOR�A EN LA QUE QUIERES PONER A ESTE ART�CULO');

importScript("Mediawiki:HotCat.js");
//</pre>
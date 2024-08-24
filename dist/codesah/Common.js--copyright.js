/* <pre> */
/* Create a section on the WikiaRail to display the copyright notice. */
if ( wgNamespaceNumber != undefined && !window.rswCopy ) {
        addOnloadHook( addRSWCopy );
}
 
var rswCopy = true;
 
function addRSWCopy () {
    $('<section class="CopyrightNotice module"><h1 style="margin-top:0px; margin-bottom:10px;">CoDeSaH Wiki Copyright</h1><div><p>A excepción de que se especifique de otro modo, el texto en esta wiki está autorizado bajo el Creative Commons Attribution-Share Alike License 3.0 (Unported) (CC-BY-SA).<br style="margin-bottom: 10px;"/> &bull; <a href="http://creativecommons.org/licenses/by-sa/3.0/" target="_blank">Leer el resumen de la licencia</a>.<br />&bull; <a href="http://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank">Leer el código legal completo de la licencia</a>.</p></div></section>').insertBefore('.LatestPhotosModule');
}
/* </pre> */
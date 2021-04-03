/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */
 
// Modulo personalizzato nella WikiaRail
// http://runescape.wikia.com/
if ( wgNamespaceNumber != undefined && !window.rswCopy ) {
        addOnloadHook( addCustomModule );
}
 
var customModule = true;
 
function addCustomModule () {
    $('<section class="CustomModule module"><h1 style="margin-top:0px; margin-bottom:10px;">TITOLO DEL MODULO</h1><div>CONTENUTO DEL MODULO</div></section>').insertBefore('.LatestPhotosModule');
}
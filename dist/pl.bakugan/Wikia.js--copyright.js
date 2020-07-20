//<source lang="JavaScript">
 
// Create a section on the WikiaRail to display the copyright notice.
 
if ( wgNamespaceNumber != undefined && !window.spCopy ) {
        addOnloadHook( addSPCopy );
}
 
var spCopy = true;
 
function addSPCopy () {
    $('<section class="CopyrightNotice module"><h1 style="margin-top:0px; margin-bottom:10px;">Prawa autorskie</h1><div><p style="text-align:justify;">Treść projektu Bakugan Wiki jest udostępniana w oparciu o licencję Creative Commons-Attribution-Share Alike License 3.0. Udziela się zezwolenia do kopiowania, rozpowszechniania i/lub tworzenia treści zależnych od artykułów tej Wikii zgodnie z zasadami Creative Commons-Attribution-Share Alike License 3.0 lub dowolnej późniejszej opublikowanej przez organizację Creative Commons.</p></div></section>').insertAfter('.ChatModule');
}
 
// </source>
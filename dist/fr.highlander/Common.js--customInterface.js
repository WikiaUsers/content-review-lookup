//==========================================
//    Personalizzazioni dell'interfaccia
//==========================================

//================================
//         Link liste DPL
//================================
/* Correzione colore link in    */
/* liste DPL per la pagina      */
/* visualizzata                 */
$(function() {
	$('.navbar a[title="' + wgTitle + '"]').css({'color' : 'inherit', 'font-weight' : 'bold'});
});
// END Link liste DPL

//======================================
//    Cronologia capitoli ed episodi
//======================================
/* Sposta la posizione della barra di */
/* scorrimento alla pagina corrente   */
$(function() {
   var container = $('.crono-container').parent().width();
   var current = $('.crono-container strong.selflink').position();

   // Se la posizione corrente non viene trovata, annulla
   if (!current) return;

   // Imposta la larghezza del contenitore alla massima disponibile
   $('.crono-container').width(container);
   // Sposta la barra di scorrimento
   $('.crono-container').scrollLeft(Math.round(current.left - container/2));
});
/* Cambia lo stile della cella della pagina corrente */
$(function() {
	$('.crono-nav .selflink').parent().css({'background-color' : '#000000', 'background-image' : 'none', 'color' : '#FFFFFF', 'font-weight' : 'bold'});
});
// END Cronologia capitoli ed episodi

//=================================
//       Gallerie Personaggi
//=================================
/* Ridimensiona le didascalie    */
/* nei template galleria con la  */
/* massima altezza della serie   */
$(function() {
    $('table.galleria-main tr')
    .has('table.galleria-cella')
    .each(function () {
        var maxHeight = 0;
        $(this).find('.galleria-didascalia')
        .each(function () {
            maxHeight = Math.max(maxHeight, $(this).outerHeight());
        })
        .each(function () {
            $(this).css('height', maxHeight);
        });
    });
});
// END Gallerie Personaggi

//===================================
//       Personalizzazioni CSS
//===================================
/* Ultime modifiche */
if ( wgCanonicalSpecialPageName === 'WikiActivity' || wgCanonicalSpecialPageName === 'Recentchanges' ) {
 	importStylesheetPage('MediaWiki:Common.css/ultimemodifiche.css', 'it.onepiece');
}
// END Personalizzazioni CSS

//=====================================
//        Sezioni "Navigazione"
//=====================================
/* Aggiunge 'clear:both;' alla sezione 'Navigazione' */
$(function() {
   $('span#Navigazione').parent().css('clear', 'both');
});
// END Sezioni "Navigazione"
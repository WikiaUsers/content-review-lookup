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
 	importStylesheetPage('MediaWiki:Common.css/ultimeModifiche.css', 'it.onepiecefanon');
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
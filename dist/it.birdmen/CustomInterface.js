//   Tratto da https://onepiece.fandom.com/it
//==========================================
//    Personalizzazioni dell'interfaccia
//==========================================

//================================
//         Link liste DPL
//================================
// Correzione colore link in liste DPL
// per la pagina visualizzata

$(function() {
    $('.navbar a[title="' + wgTitle + '"]').css({'color' : 'inherit', 'font-weight' : 'bold'});
});
// END Link liste DPL

//======================================
//    Cronologia capitoli
//======================================
// Sposta la posizione della barra di
// scorrimento alla pagina corrente

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

// Cambia lo stile della cella della pagina corrente
$(function() {
	$('.crono-nav .selflink').parent().css({'background-color' : '#000000', 'background-image' : 'none', 'color' : '#FFFFFF', 'font-weight' : 'bold'});
});
// END Cronologia capitoli ed episodi

//=================================
//       Gallerie Personaggi
//=================================
// Aggiunge un link al file
// nei template galleria 

$(function() {
    $(".galleria .wikia-gallery .gallery-image-wrapper")
    .each(function () {
        var $fileURL = $(this).find("img").attr("data-image-key");
		var $fileName = $(this).find("img").attr("data-image-name");
		var $fileLink = '<div class="immagine-info"><a href="/it/wiki/File:' + $fileURL + '" title="' + $fileName + '"><span class="sprite details magnify"></span></a></div>';

		$(this).append($fileLink);
    });
});
// END Gallerie Personaggi

//=====================================
//        Sezioni "Navigazione"
//=====================================
// Aggiunge 'clear:both;' alla sezione 'Navigazione'
$(function() {
    $('span#Navigazione').parent().css('clear', 'both');
});
// END Sezioni "Navigazione"

//==================================
//       Strumenti aggiuntivi
//==================================
// Aggiunta link aggiuntivi
// nel menu di modifica (oasis)

$(function () {
    var $button = $('.UserProfileActionButton .WikiaMenuElement');
    
    if(!$button.exists()) {
        $button = $('.page-header__contribution-buttons .wds-list');
    }
    
    $button.append(
        '<li><a href="/it/wiki/' + wgPageName + '?useskin=mercury" title="Vedi nella skin Mobile">Vedi come su Mobile</a></li>' +
        '<li><a href="/it/wiki/Speciale:PuntanoQui/' + wgPageName + '" title="Puntano qui">Puntano qui</a></li>' +
        '<li><a href="/it/wiki/Speciale:Prefissi/' + wgPageName + '" title="Sottopagine">Sottopagine</a></li>'
    );
});
// END Strumenti aggiuntivi

//==================================
//      Avviso su WikiActivity
//==================================
$(function () {
    var avvisoRC = '<div class="avviso-rc">Vuoi tenere d\'occhio l\'attività completa della wiki? Vai su <a href="/it/wiki/Speciale:UltimeModifiche">Speciale:UltimeModifiche</a>!</div>';
    $('.mw-special-WikiActivity #WikiaArticle').before( avvisoRC );
});
// END Avviso su WikiActivity

//==================================
//    Default tab su pagine file
//==================================
/*
$(function () {
    $('.tabs li[data-tab=history]').removeClass('selected');
    $('div[data-tab-body=history').removeClass('selected');
 
    $('.tabs li[data-tab=about]').addClass('selected');
    $('div[data-tab-body=about').addClass('selected');
});
// END Default tab su pagine file
*/

//=====================================
//               Altro
//=====================================
// Correzione sovrapposizione tra i profili e la tabella personaggi
// vedere: http://community.wikia.com/wiki/Thread:1216988

$(function () {
    $( '.TabellaPersonaggi' ).wrap( '<div class="TabellaPersonaggi-container"></div>' );
});


// Cambio stile pulsanti nella barra laterale
$(function () {
    $("#WikiaRail .community-page-rail-module .wds-button, #WikiaRail .chat-module .wds-button, #WikiaRail .photo-module .photo-stats .wds-button").removeClass("wds-is-secondary");
});
// END Altro
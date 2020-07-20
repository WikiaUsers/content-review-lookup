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
//    Cronologia capitoli ed episodi
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

//====================================
//          Immagine casuale
//====================================
// Mostra un'immagine casuale nella
// barra laterale (Oasis)

$(function () {
    // Lista immagini
    var WikiaRailImageArray = [
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/onepiece/images/2/20/Rail-Image_1.png/revision/latest/scale-to-width-down/300?cb=20171013194451&path-prefix=it" alt="Monkey D. Rufy">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/onepiece/images/a/ae/Rail-Image_2.png/revision/latest/scale-to-width-down/300?cb=20171013194904&path-prefix=it" alt="Roronoa Zoro">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/onepiece/images/b/b7/Rail-Image_3.png/revision/latest/scale-to-width-down/300?cb=20171013194836&path-prefix=it" alt="Nami">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/onepiece/images/2/2a/Rail-Image_4.png/revision/latest/scale-to-width-down/300?cb=20171013194932&path-prefix=it" alt="Usop">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/onepiece/images/8/85/Rail-Image_5.png/revision/latest/scale-to-width-down/300?cb=20171013195004&path-prefix=it" alt="Sanji">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/onepiece/images/9/9f/Rail-Image_6.png/revision/latest/scale-to-width-down/300?cb=20171013195718&path-prefix=it" alt="TonyTony Chopper">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/onepiece/images/c/cc/Rail-Image_7.png/revision/latest/scale-to-width-down/300?cb=20171013195031&path-prefix=it" alt="Nico Robin">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/onepiece/images/8/82/Rail-Image_8.png/revision/latest/scale-to-width-down/300?cb=20171013195057&path-prefix=it" alt="Franky">'
        ];

    // Scelta immagine
    var chosenWikiaRailImage = Math.round(Math.random() * (WikiaRailImageArray.length - 1));

    // Aggiunta immagine
    $('#WikiaRail').append(WikiaRailImageArray[chosenWikiaRailImage]);
});
// END Immagine casuale


//==================================
//       Strumenti aggiuntivi
//==================================
// Aggiunta link aggiuntivi
// nel menù di modifica (oasis)

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

//=================================
//      Barra social networks
//=================================
$(function () {
    if ( (wgPageName != 'One_Piece_Wiki_Italia') && ( wgNamespaceNumber === 0 || wgNamespaceNumber === 4 || wgNamespaceNumber === 6 || wgNamespaceNumber === 14 || wgNamespaceNumber === 112 || wgNamespaceNumber === 114 || wgNamespaceNumber === 500 || wgNamespaceNumber === 1201) ) { 
        $('#WikiaPage #WikiaFooter').before(
            '<footer id="social-footer">' +
                '<table>' +
                    '<tr>' +
                        '<th>Condividi su:</th>' +
                        '<td><div class="fb-like" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="true"></div></td>' +
                        '<td><a href="https://twitter.com/share" class="twitter-share-button" data-text="Leggendo si impara su @OnePieceWiki_it!" data-related="getfandom,fandom_italy" data-lang="it" data-show-count="false">Tweet</a></td>' +
                        '<th>Seguici su:</th>' +
                        '<td><div class="fb-like" data-width="" data-href="https://www.facebook.com/OnePieceWiki.it" data-layout="button_count" data-action="like" data-size="small" data-share="true" data-show-faces="true"></div></td>' +
                        '<td><a href="https://twitter.com/OnePieceWiki_it" class="twitter-follow-button" data-size="small" data-lang="it" data-show-count="false">Follow @OnePieceWiki_it</a></td>' +
                    '</tr>' +
                '</table>' +
            '</footer>'
        );
    }
});
// END Barra social networks

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
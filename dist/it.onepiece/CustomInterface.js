//==========================================
//    Personalizzazioni dell'interfaccia
//==========================================

//======================================
//    Cronologia capitoli ed episodi
//======================================
// Sposta la posizione della barra di
// scorrimento alla pagina corrente

$(function() {
	var container = $('.crono-container').parent().width();
	var current = $('.crono-container .selflink').parent().position();

	// Se la posizione corrente non viene trovata, annulla
	if (!current) return;

	// Imposta la larghezza del contenitore alla massima disponibile
	$('.crono-container').width(container);
	
	// Sposta la barra di scorrimento
	$('.crono-container').scrollLeft(Math.round(current.left - container/2));
});

// Cambia lo stile della cella della pagina corrente
$(function() {
	$('.crono-nav .selflink').parent().addClass('crono-selected');
});
// END Cronologia capitoli ed episodi


//=================================
//       Gallerie Personaggi
//=================================
// Aggiunge un link al file
// nei template galleria 

$(function() {
	$(".galleria .gallery .gallerybox .thumb")
	.each(function () {
		var $fileURL = $(this).find("img").attr("data-image-key");
		var $fileName = $(this).find("img").attr("data-image-name");
		var $fileLink = '<div class="immagine-info"><a href="/it/wiki/File:' + $fileURL + '" title="' + $fileName + '"><div class="immagine-info-icon"></div></a></div>';

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
// Mostra un'immagine casuale nella barra laterale
// Richiede CSS aggiuntivo per ".wikia-rail-inner" impostato
// su MediaWiki:Interfaccia.css nella sezione specifica 

$(function () {
	// Lista immagini
	var RailImageArray = [
		'url("/it/wiki/Special:FilePath/Rail-Image_1.png")',
		'url("/it/wiki/Special:FilePath/Rail-Image_2.png")',
		'url("/it/wiki/Special:FilePath/Rail-Image_3.png")',
		'url("/it/wiki/Special:FilePath/Rail-Image_4.png")',
		'url("/it/wiki/Special:FilePath/Rail-Image_5.png")',
		'url("/it/wiki/Special:FilePath/Rail-Image_6.png")',
		'url("/it/wiki/Special:FilePath/Rail-Image_7.png")',
		'url("/it/wiki/Special:FilePath/Rail-Image_8.png")'
	];

	// Scelta immagine
	var chosenRailImage = Math.round(Math.random() * (RailImageArray.length - 1));

	// Aggiunta immagine
	$('.page__right-rail').css("background-image", RailImageArray[chosenRailImage]);
});
// END Immagine casuale


//==================================
//       Strumenti aggiuntivi
//==================================
// Aggiunta link aggiuntivi
// nel menù di modifica (oasis)

$(function () {
	var $button = $('.wds-button-group .wds-dropdown .wds-list');
	
	$button.append(
		'<li><a href="/it/wiki/' + mw.config.get("wgPageName") + '?useskin=mercury" title="Vedi nella skin Mobile">Vedi come su Mobile</a></li>' +
		'<li><a href="/it/wiki/Speciale:PuntanoQui/' + mw.config.get("wgPageName") + '" title="Puntano qui">Puntano qui</a></li>' +
		'<li><a href="/it/wiki/Speciale:Prefissi/' + mw.config.get("wgPageName") + '" title="Sottopagine">Sottopagine</a></li>'
	);
});
// END Strumenti aggiuntivi


//=====================================
//               Altro
//=====================================
// Correzione sovrapposizione tra i profili e la tabella personaggi
// vedere: http://community.wikia.com/wiki/Thread:1216988
/*
$(function () {
	$( '.TabellaPersonaggi' ).wrap( '<div class="TabellaPersonaggi-container"></div>' );
});
*/
// END Altro
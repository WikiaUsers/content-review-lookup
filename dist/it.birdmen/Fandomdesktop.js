/********   tratto parzialmente da https://onepiece.fandom.com/it ********/
// cambia le etichette dell'utente
UserTagsJS.modules.custom = {
    'KuroUrufu': ['sysop'],
};

UserTagsJS.modules.inactive = 28; // sei inattivo se non fai alcunché per 28 giorni
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 14, // sei nuovo fino alla seconda settimana
	edits: 100, // sei nuovo fino alla centesima modifica
	namespace: 0 // contano solo le modifiche agli articoli
};

// External links opened in a new window
$(function() {
   $('a.external:not([href$="wpForReUpload=1"]), a.extiw, .WikiaArticleInterlang a, #p-lang a')
   .attr('target', '_blank');
});

// DPL lists links (show the current page)
$(function() {
    $('.navbar a[title="' + wgTitle + '"]').css({'color' : 'inherit', 'font-weight' : 'bold'});
});

// Characters Gallery (link to page)
$(function() {
    $(".galleria .gallery .gallerybox .thumb")
    .each(function () {
        var $fileURL = $(this).find("img").attr("data-image-key");
		var $fileName = $(this).find("img").attr("data-image-name");
		var $fileLink = '<div class="immagine-info"><a href="/it/wiki/File:' + $fileURL + '" title="' + $fileName + '"><div class="immagine-info-icon"></div></a></div>';

		$(this).append($fileLink);
    });
});

// NavBar section (clear line)
$(function() {
    $('span#Navigazione').parent().css('clear', 'both');
});

// DropDown List (adds links)
$(function () {
    var $button = $('.wds-button-group .wds-dropdown .wds-list');
    
    $button.append(
        '<li><a href="/it/wiki/' + mw.config.get("wgPageName") + '?useskin=fandommobile" title="Vedi nella skin Mobile">Vedi come su Mobile</a></li>' +
        '<li><a href="/it/wiki/Speciale:PuntanoQui/' + mw.config.get("wgPageName") + '" title="Puntano qui">Puntano qui</a></li>' +
        '<li><a href="/it/wiki/Speciale:Prefissi/' + mw.config.get("wgPageName") + '" title="Sottopagine">Sottopagine</a></li>'
    );
});

// TabellaPersonaggi (previene sovrapposizioni)
$(function () {
    $( '.TabellaPersonaggi' ).wrap( '<div class="TabellaPersonaggi-container"></div>' );
});
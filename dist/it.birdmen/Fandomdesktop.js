//   Tratto parzialmente da https://onepiece.fandom.com/it
//=======================================
// Ajax auto-refresh
ajaxPages = ["Speciale:UltimeModifiche", "Speciale:OsservatiSpeciali", "Speciale:ImmaginiRecenti", "Speciale:Registri", "Speciale:AbuseLog"];
AjaxRCRefreshText = "Aggiornamento automatico";
AjaxRCRefreshHoverText = "Abilita l'aggiornamento automatico della pagina";

// Display Clock
window.DisplayClockJS = {
    format: "%d %B %Y, %2H:%2M:%2S (UTC)",
    hoverText: "Clicca per aggiornare la cache"
};

// Add custom groups to several users
UserTagsJS.modules.custom = {
    'KuroUrufu': ['helper', 'sysop'],
};

UserTagsJS.modules.inactive = 28; // Inactive if no edits in 28 days
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 14, // Must have been on the Wiki for 14 days
	edits: 100, // And have at least 100 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.mwGroups = ["bureaucrat", "patroller", "rollback", "sysop", "bot", "bot-global", "staff", "helper", "vstf"];
UserTagsJS.modules.metafilter = {
	sysop: ["bureaucrat", "founder"],
	bureaucrat: ["founder"]
};

// SignatureCheck
window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: "Ci potrebbero essere dei problemi con la tua modifica:\n\n",
	epilogue: "\nSei sicuro di postare questo comunque?",
	noForumheader: "Manca il template d'intestazione per le pagine forum. Senza quello, il forum non verrà elencato nella lista dei forum.\n",
	noSignature: "Sembra che tu ti sia dimenticato di firmarti. Fallo digitando ~~" + "~~ o usando il tasto apposito.\nPer aiuto sulle firme, leggi Aiuto:Firma.\n",
 
	// Other
	forumheader: "Forum", // The name of the Forumheader template, can be set to an empty string or false to disable
	checkSignature: true // Enable the signature check function
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

// Installments Chronology
$(function() {
   var container = $('.crono-container').parent().width();
   var current = $('.crono-container .selflink').parent().position();

   // nullify if not findable
   if (!current) return;
   // max width
   $('.crono-container').width(container);
   // move scroll
   $('.crono-container').scrollLeft(Math.round(current.left - container/2));
});

//// changes current page cell
$(function() {
	$('.crono-nav .selflink').parent().addClass('crono-selected');
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
        '<li><a href="/it/wiki/' + mw.config.get("wgPageName") + '?useskin=mercury" title="Vedi nella skin Mobile">Vedi come su Mobile</a></li>' +
        '<li><a href="/it/wiki/Speciale:PuntanoQui/' + mw.config.get("wgPageName") + '" title="Puntano qui">Puntano qui</a></li>' +
        '<li><a href="/it/wiki/Speciale:Prefissi/' + mw.config.get("wgPageName") + '" title="Sottopagine">Sottopagine</a></li>'
    );
});

// TabellaPersonaggi (prevents overlap)
$(function () {
    $( '.TabellaPersonaggi' ).wrap( '<div class="TabellaPersonaggi-container"></div>' );
});

// WikiaRail (changes buttons style)
$(function () {
    $("#WikiaRail .community-page-rail-module .wds-button, #WikiaRail .chat-module .wds-button, #WikiaRail .photo-module .photo-stats .wds-button").removeClass("wds-is-secondary");
});

// Preload File Description
PFD_discourageEditorFileUpload = true;
PFD_templates = [
    "Immagini da Birdmen",
    {
        label:   "Immagine di personaggio",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n{{Fair use}}\n\n[[Categoria:Immagini di personaggi]]",
        tip: "Immagine che rappresenta un personaggio. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di gruppo",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n{{Fair use}}\n\n[[Categoria:Immagini di gruppi]]",
        tip: "Immagine che rappresenta un gruppo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di luogo",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n{{Fair use}}\n\n[[Categoria:Immagini di luoghi]]",
        tip: "Immagine che rappresenta un luogo. Per favore, completa la fonte."
    },
    {
        label:   "Primo piano",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n{{Fair use}}\n\n[[Categoria:Ritratti]]",
        tip: "Immagine usata in template galleria e infobox. Per favore, completa la fonte."
    },
    "Manga",
    {
        label:   "Cover",
        desc:    "== Fonte ==\nCover del [[capitolo #]].\n\n{{Fair use}}\n\n[[Categoria:Cover]]",
        tip: "Cover di un capitolo. Per favore, completa la fonte."
    },
    {
        label:   "Cover volume",
        desc:    "== Fonte ==\nCover del [[volume #]].\n\n{{Fair use}}\n\n[[Categoria:Cover di Volumi]]",
        tip: "Cover di un volume. Per favore, completa la fonte."
    },
    "Altro",
    {
        label:   "Immagine di servizio",
        desc:    "== Fonte ==\nImmagine tratta da *.\n\n{{Fair use}}\n\n[[Categoria:Immagini di servizio]]",
        tip: "Immagine usata per il sito. Per favore, completa le informazioni."
    },
    {
        label:   "Immagine da un'altra wiki",
        desc:    "== Fonte ==\nImmagine tratta da *.\n\n{{Fair use}}\n[[Categoria:Immagini di servizio]]\n\n[[Categoria:Immagini da altre wiki]]",
        tip: "Immagine prese da altre wiki. Per favore, completa le informazioni."
    },
];
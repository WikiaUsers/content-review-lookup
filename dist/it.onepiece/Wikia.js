//=======================================
//       Variabili per le funzioni
//=======================================
// Ajax auto-refresh
ajaxPages = ["Speciale:UltimeModifiche", "Speciale:OsservatiSpeciali", "Speciale:WikiActivity", "Speciale:ImmaginiRecenti", "Speciale:Registri", "Speciale:AbuseLog"];
AjaxRCRefreshText = "Aggiornamento automatico";
AjaxRCRefreshHoverText = "Abilita l'aggiornamento automatico della pagina";

// Display Clock
window.DisplayClockJS = {
    format: "%d %B %Y, %2H:%2M:%2S (UTC)",
    hoverText: "Clicca per aggiornare la cache"
};

// User Tags
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ["bureaucrat", "chatmoderator", "patroller", "rollback", "sysop", "bannedfromchat", "bot", "bot-global", "staff", "helper", "vstf"];
UserTagsJS.modules.metafilter = {
	sysop: ["bureaucrat", "founder"],
	bureaucrat: ["founder"],
	chatmoderator: ["sysop", "bureaucrat"]
};

// SignatureCheck
window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: "Ci potrebbero essere dei problemi con la tua modifica:\n\n",
	epilogue: "\nSei sicuro di postare questo comunque?",
	noForumheader: "Manca il template d'intestazione per le pagine forum. Senza quello, il forum non verrà elencato nella lista dei forum.\n",
	noSignature: "Sembra che tu ti sia dimenticato di firmarti. Fallo digitando ~~" + "~~ o usando il tasto apposito.\nPer aiuto sulle firme, leggi Aiuto:Firma.\n",
 
	// Other stuff
	forumheader: "Forum", // The name of the Forumheader template, can be set to an empty string or false to disable
	checkSignature: true // Enable the signature check function
};

// QuickDelete
window.category = "Candidati per la rimozione";
window.reason = "Manutenzione";

// Preload Templates
preloadTemplates_subpage = "case-by-case";

// Preload File Description
// <nowiki> -- per evitare che il codice MediaWiki di seguito agisca su questa pagina --
PFD_discourageEditorFileUpload = true;
PFD_templates = [
    "Immagini generiche",
    {
        label:   "Immagine sconosciuta",
        desc:    "== Fonte ==\n{{Senza fonte}}\n\n== Licenza ==\n{{Senza licenza}}",
        tip: "Per favore, aggiungi fonte, licenza e categoria o seleziona un altro modello nel menù qui sopra."
    },
    {
        label:   "Immagine di curiosità",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di curiosità]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini di curiosità]]",
        tip: "Immagine di una curiosità. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di servizio",
        desc:    "== Fonte ==\nImmagine tratta da *.\n\n== Licenza ==\n{{Senza licenza}}\n[[Categoria:Immagini di servizio]]",
        tip: "Immagine usata per il sito. Per favore, completa le informazioni."
    },
    "Immagini da One Piece",
    {
        label:   "Immagine di un personaggio",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di personaggi]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini di personaggi]]",
        tip: "Immagine rappresentativa di un personaggio o usata per l\"aspettto. Per favore, completa la fonte."
    },
    {
        label:   "Immagine della storia",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini della storia]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini della storia]]",
        tip: "Immagine usata per la sezione storia. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di luogo",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di luoghi]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini di luoghi]]",
        tip: "Immagine di un luogo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di frutto del diavolo",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di frutti del diavolo]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini di frutti del diavolo]]",
        tip: "Immagine usata per mostrare i poteri di un frutto del diavolo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di azione",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di azioni]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini di azioni]]",
        tip: "Immagine usata per mostrare una tecnica o abilità. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di arma o oggetto",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di armi e oggetti]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini di armi e oggetti]]",
        tip: "Immagine di un\"arma o oggetto. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di veicolo",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di veicoli]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini di veicoli]]",
        tip: "Immagine di un veicolo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di nave",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di navi]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini di navi]]",
        tip: "Immagine di una nave. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di taglia",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di taglie]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Immagini di taglie]]",
        tip: "Immagine di una taglia. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di un simbolo",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Simboli]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Simboli]]",
        tip: "Immagine di un simbolo come ad esempio un Jolly Roger. Per favore, completa la fonte."
    },
    {
        label:   "Primo piano",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Primi piani]]",
        altdesc: "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n[[Categoria:Primi piani]]",
        tip: "Immagine usata nei template galleria. Per favore, completa la fonte."
    },
    "Cover",
    {
        label:   "Cover capitolo generico",
        desc:    "== Fonte ==\nCover del [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina}}\n[[Categoria:Cover]]",
        tip: "Cover di un capitolo generico. Per favore, completa la fonte."
    },
    {
        label:   "Cover capitolo di animali",
        desc:    "== Fonte ==\nCover del [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina}}\n[[Categoria:Cover di animali]]",
        tip: "Cover capitolo della serie degli animali. Per favore, completa la fonte."
    },
    {
        label:   "Cover capitolo di animali su richiesta",
        desc:    "== Fonte ==\nCover del [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina}}\n[[Categoria:Cover di animali]]\n[[Categoria:Cover su richiesta]]",
        tip: "Cover capitolo della serie degli animali su richiesta. Per favore, completa la fonte."
    },
    {
        label:   "Cover capitolo a colori",
        desc:    "== Fonte ==\nCover del [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina}}\n[[Categoria:Cover a colori]]",
        tip: "Cover capitolo a colori. Per favore, completa la fonte."
    },
    {
        label:   "Cover volume originale",
        desc:    "== Fonte ==\nCover del [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina}}\n[[Categoria:Cover volumi giapponesi]]",
        tip: "Cover di un volume originale giapponese. Per favore, completa la fonte."
    },
    {
        label:   "Cover volume Star Comics",
        desc:    "== Fonte ==\nCover del [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Cover volumi Star Comics]]",
        tip: "Cover di un volume italiano Star Comics. Per favore, completa la fonte."
    },
    {
        label:   "Cover volume New Edition",
        desc:    "== Fonte ==\nCover del [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Cover volumi New Edition]]",
        tip: "Cover di un volume italiano Star Comics New Edition. Per favore, completa la fonte."
    },
    {
        label:   "Cover volume edizione RCS",
        desc:    "== Fonte ==\nCover del [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Cover volumi edizione RCS]]",
        tip: "Cover di un volume italiano edizione Gazzetta-RCS. Per favore, completa la fonte."
    },
    {
        label:   "Sottocopertina",
        desc:    "== Fonte ==\nImmagine tratta dal [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Sottocopertine dei volumi]]",
        tip: "Sottocopertina del volume. Per favore, completa la fonte."
    },
    "Anime",
    {
        label:   "Immagine profilo episodio",
        desc:    "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n\n== Licenza ==\n{{Screenshot}}\n{{Ordina}}\n[[Categoria:Immagini di episodi]]",
        tip: "Immagine usata nei profili delle pagine degli episodi. Per favore, completa la fonte."
    },
    {
        label:   "Immagine profilo film",
        desc:    "== Fonte ==\nImmagine promozionale del [[film #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina}}\n[[Categoria:Immagini di film]]",
        tip: "Immagine usata nei profili delle pagine dei film. Per favore, completa la fonte."
    },
    {
        label:   "Immagine profilo sigla",
        desc:    "== Fonte ==\nImmagine tratta da *.\n\n== Licenza ==\n{{Screenshot}}\n{{Ordina}}\n[[Categoria:Immagini di sigle]]",
        tip: "Immagine usata nei profili delle sigle. Per favore, completa la fonte."
    },
    "Immagini dai volumi",
    {
        label:   "Immagine extra generica",
        desc:    "== Fonte ==\nImmagine tratta dal [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Immagini extra dei volumi]]",
        tip: "Immagine extra dal volume. Per favore, completa la fonte."
    },
    {
        label:   "Illustrazione del volume",
        desc:    "== Fonte ==\nImmagine tratta dal [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Illustrazioni dei volumi]]",
        tip: "L'immagine illustrativa di apertura di un volume. Per favore, completa la fonte."
    },
    {
        label:   "Nota dell'autore",
        desc:    "== Fonte ==\nImmagine tratta dal [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Immagini delle note dell'autore]]",
        tip: "L'immagine della nota dell'autore in un volume. Per favore, completa la fonte."
    },
    {
        label:   "Immagine dalle SBS",
        desc:    "== Fonte ==\nImmagine tratta dal [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini dalle SBS]]",
        tip: "Immagine dalle SBS. Per favore, completa la fonte."
    },
    {
        label:   "Intestazione delle SBS",
        desc:    "== Fonte ==\nImmagine tratta dal [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Intestazioni delle SBS]]",
        tip: "Intestazione delle SBS. Per favore, completa la fonte."
    },
    {
        label:   "Immagine delle gallerie Usop",
        desc:    "== Fonte ==\nImmagine tratta dal [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Immagini delle gallerie Usop]]",
        tip: "Immagine delle gallerie Usop. Per favore, completa la fonte."
    },
    {
        label:   "Intestazione delle gallerie Usop",
        desc:    "== Fonte ==\nImmagine tratta dal [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n{{Ordina|1}}\n[[Categoria:Intestazioni delle gallerie Usop]]",
        tip: "Intestazione delle gallerie Usop. Per favore, completa la fonte."
    }
];
PFD_messages = {
                    "it": {
                            "basic-version": "Manga",
                            "alternative-version": "Anime"
                    },
                    "en": {
                            "basic-version": "Manga",
                            "alternative-version": "Anime"
                    }
};
// </nowiki>
// END variabili

//===================================
//       Importazioni funzioni
//===================================

// Vedere "MediaWiki:ImportJS"

// END Importazioni
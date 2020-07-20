//   Tratto da https://onepiece.fandom.com/it
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

// Add custom groups to several users
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 40, // And have at least 40 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
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

// Preload File Description
// <nowiki> -- per evitare che il codice MediaWiki di seguito agisca su questa pagina --
PFD_discourageEditorFileUpload = true;
PFD_templates = [
    "Immagini dal manga",
    {
        label:   "Immagine di personaggio",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n{{Fair use}}\n\n[[Categoria:Immagini di personaggi]]",
        tip: "Immagine che rappresenta un personaggio. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di gruppo",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n{{Fair use}}\n\n[[Categoria:Immagini di gruppi]]",
        tip: "Immagine che rappresenta un gruppo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di luogo",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n{{Fair use}}\n\n[[Categoria:Immagini di luoghi]]",
        tip: "Immagine che rappresenta un luogo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di abilità",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n{{Fair use}}\n\n[[Categoria:Immagini di abilità]]",
        tip: "Immagine che rappresenta un'abilità. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di personalità",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n{{Fair use}}\n\n[[Categoria:Immagini di personalità]]",
        tip: "Immagine che rappresenta la personalità di un personaggio. Per favore, completa la fonte."
    },
    {
        label:   "Primo piano",
        desc:    "== Fonte ==\nImmagine tratta dal [[capitolo #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Ritratti]]",
        tip: "Immagine usata in template galleria e infobox. Per favore, completa la fonte."
    },
    {
        label:   "Cover",
        desc:    "== Fonte ==\nCover del [[capitolo #]].\n\n{{Fair use}}\n[[Categoria:Cover]]",
        tip: "Cover di un capitolo. Per favore, completa la fonte."
    },
    {
        label:   "Cover volume",
        desc:    "== Fonte ==\nCover del [[volume #]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Cover di Volumi]]",
        tip: "Cover di un volume. Per favore, completa la fonte."
    },
    "Immagini dall'anime",
    {
        label:   "Immagine di personaggio",
        desc:    "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n{{Screenshot}}\n\n[[Categoria:Immagini di personaggi]]",
        tip: "Immagine che rappresenta un personaggio. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di gruppo",
        desc:    "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n{{Screenshot}}\n\n[[Categoria:Immagini di gruppi]]",
        tip: "Immagine che rappresenta un gruppo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di luogo",
        desc:    "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n{{Screenshot}}\n\n[[Categoria:Immagini di luoghi]]",
        tip: "Immagine che rappresenta un luogo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di abilità",
        desc:    "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n{{Screenshot}}\n\n[[Categoria:Immagini di abilità]]",
        tip: "Immagine che rappresenta un'abilità. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di personalità",
        desc:    "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n{{Screenshot}}\n\n[[Categoria:Immagini di personalità]]",
        tip: "Immagine che rappresenta la personalità di un personaggio. Per favore, completa la fonte."
    },
    {
        label:   "Primo piano",
        desc:    "== Fonte ==\nImmagine tratta dall'[[episodio #]].\n{{Screenshot}}\n[[Categoria:Ritratti]]",
        tip: "Immagine usata in template galleria e infobox. Per favore, completa la fonte."
    },
    {
        label:   "Capture episodio",
        desc:    "== Fonte ==\n[[Episodio #]].\n\n{{Screenshot}}\n[[Categoria:Capture]]",
        tip: "Capture di un episodio. Per favore, completa la fonte."
    },
    "Altro",
    {
        label:   "Immagine di servizio",
        desc:    "== Fonte ==\nImmagine tratta da *.\n\n{{Senza licenza}}\n[[Categoria:Immagini di servizio]]",
        tip: "Immagine usata per il sito. Per favore, completa le informazioni."
    },
    {
        label:   "Immagine da un'altra wiki",
        desc:    "== Fonte ==\nImmagine tratta da *.\n\n{{Senza licenza}}\n[[Categoria:Immagini di servizio]]\n[[Categoria:Immagini da altre wiki]]",
        tip: "Immagine prese da altre wiki. Per favore, completa le informazioni."
    },
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
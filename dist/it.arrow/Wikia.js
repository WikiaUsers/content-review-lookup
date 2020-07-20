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
UserTagsJS.modules.custom = {
    'KuroUrufu': ['helper', 'sysop'],
};

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
    "Immagini da Arrowverse",
    {
        label:   "Immagine di personaggio",
        desc:    "== Fonte ==\nImmagine tratta da [[FONTE]].\n{{Fair use}}\n\n[[Categoria:Immagini di personaggi]]",
        tip: "Immagine che rappresenta un personaggio. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di gruppo",
        desc:    "== Fonte ==\nImmagine tratta da [[FONTE]].\n{{Fair use}}\n[[Categoria:Immagini di gruppi]]",
        tip: "Immagine che rappresenta un gruppo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di luogo",
        desc:    "== Fonte ==\nImmagine tratta da [[FONTE]].\n{{Fair use}}\n[[Categoria:Immagini di luoghi]]",
        tip: "Immagine che rappresenta un luogo. Per favore, completa la fonte."
    },
    {
        label:   "Immagine di oggetto",
        desc:    "== Fonte ==\nImmagine tratta da [[FONTE]].\n{{Fair use}}\n[[Categoria:Immagini di oggetti]]",
        tip: "Immagine che rappresenta un oggetto. Per favore, completa la fonte."
    },
    {
        label:   "Primo piano",
        desc:    "== Fonte ==\nImmagine tratta da [[FONTE]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Ritratti]]",
        tip: "Immagine usata in template galleria e infobox. Per favore, completa la fonte."
    },
    "Episodi",
    {
        label:   "Immagine profilo episodio",
        desc:    "== Fonte ==\nImmagine tratta da [[FONTE]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di episodi]]",
        tip: "Immagine usata nei profili delle pagine degli episodi. Per favore, completa la fonte."
    },
    {
        label:   "Immagine profilo film",
        desc:    "== Fonte ==\nImmagine tratta da [[FONTE]].\n\n== Licenza ==\n{{Fair use}}\n[[Categoria:Immagini di film]]",
        tip: "Immagine usata nei profili delle pagine dei film. Per favore, completa la fonte."
    },
    "Altro",
    {
        label:   "Immagine di servizio",
        desc:    "== Fonte ==\nImmagine tratta da [FONTE].\n\n{{Senza licenza}}\n[[Categoria:Immagini di servizio]]",
        tip: "Immagine usata per il sito. Per favore, completa le informazioni."
    },
    {
        label:   "Immagine da un'altra wiki",
        desc:    "== Fonte ==\nImmagine tratta da [FONTE].\n\n{{Senza licenza}}\n[[Categoria:Immagini di servizio]]\n[[Categoria:Immagini da altre wiki]]",
        tip: "Immagine prese da altre wiki. Per favore, completa le informazioni."
    },
];
PFD_messages = {
                    "it": {
                            "basic-version": "serie",
                            "alternative-version": "serie"
                    },
                    "en": {
                            "basic-version": "serie",
                            "alternative-version": "serie"
                    }
};
// </nowiki>
// END variabili

//===================================
//       Importazioni funzioni
//===================================

// Vedere "MediaWiki:ImportJS"

// END Importazioni
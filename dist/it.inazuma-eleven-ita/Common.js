//=======================================
//       Variabili per le funzioni
//=======================================
// Ajax auto-refresh
ajaxPages = ['Speciale:UltimeModifiche', 'Speciale:OsservatiSpeciali', 'Speciale:WikiActivity', 'Speciale:ImmaginiRecenti', 'Speciale:Registri', 'Speciale:AbuseLog'];
AjaxRCRefreshText = 'Aggiornamento automatico';
AjaxRCRefreshHoverText = 'Abilita l&#39;aggiornamento automatico della pagina';

// Display Clock
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Clicca per aggiornare la cache'
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
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'staff', 'helper', 'vstf'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};

// SignatureCheck
window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: 'Ci potrebbero essere dei problemi con la tua modifica:\n\n',
	epilogue: '\nSei sicuro di postare questo comunque?',
	noForumheader: 'There is no forum header on this forum page. You should not create forum pages without the header since they will not actually show up in the forum list.\n',
	noSignature: 'Sembra che tu ti sia dimenticato di firmarti. Fallo digitando ~~' + '~~ o usando il tasto apposito.\nPer aiuto sulle firme, leggi Aiuto:Firma.\n',
 
	// Other stuff
	forumheader: 'Forumheader', // The name of the Forumheader template, can be set to an empty string or false to disable
	checkSignature: true // Enable the signature check function
};
// END variabili

//===================================
//       Importazioni funzioni
//===================================
importArticles({
    type: 'script',
    articles: [
        // Test if an Element has a Certain Class
        'MediaWiki:Common.js/elementClass.js',
        // Funzioni accessorie per Cookie
        'MediaWiki:Common.js/cookie.js',
        // Togglers (toggles the display of elements on a page)
        'MediaWiki:Common.js/togglers.js',
        // Ajax auto-refresh
        'w:dev:AjaxRC/code.js',
        // Elenchi random
        'MediaWiki:Common.js/elenchiRandom.js',
        // Wikia Skin Chat
        'MediaWiki:Common.js/wikiaSkinChat.js',
        // Link in uscita
        'MediaWiki:Common.js/links.js',
        // Upload
        'MediaWiki:Common.js/upload.js',
        // MiniComplete
        'w:dev:MiniComplete/code.js',
        // FixWantedFiles
        'w:dev:FixWantedFiles/code.js',
        // SignatureCheck
        'w:dev:SignatureCheck/code.js',
        // SearchSuggest
        'w:dev:SearchSuggest/code.js',
        // Custom preload templates
        'MediaWiki:Common.js/preloadTemplates.js',
        // Note dinamiche
        'MediaWiki:Common.js/dynamicNotes.js',
        // Display Clock
        'w:dev:DisplayClock/code.js',
        // Personalizzazione dell'interfaccia
        'MediaWiki:Common.js/customInterface.js',
        // User Tags
        'w:dev:UserTags/code.js',
        // Codici asincroni socials
        'MediaWiki:Common.js/async.js',
    ]
});
// END Importazioni
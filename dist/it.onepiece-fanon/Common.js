//=======================================
//       Variabili per le funzioni
//=======================================
// Ajax auto-refresh
ajaxPages = ['Speciale:UltimeModifiche', 'Speciale:OsservatiSpeciali', 'Speciale:WikiActivity', 'Speciale:ImmaginiRecenti', 'Speciale:Registri'];
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
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
// END variabili

//===================================
//       Importazioni funzioni
//===================================
importArticles({
    type: 'script',
    articles: [
        //==========================================
        //       Funzioni di utilità generale
        //==========================================
        // Test if an Element has a Certain Class
        'w:itonepiece:MediaWiki:Common.js/elementClass.js',
        // Funzioni accessorie per Cookie
        'w:itonepiece:MediaWiki:Common.js/cookie.js',
        //========================================
        //          Funzioni applicative
        //========================================
        // Togglers (toggles the display of elements on a page)
        'w:itonepiece:MediaWiki:Common.js/togglers.js',
        // Ajax auto-refresh
        'w:dev:AjaxRC/code.js',
        // Wikia Skin Chat
        'w:itonepiece:MediaWiki:Common.js/wikiaSkinChat.js',
        // Link in uscita
        'w:itonepiece:MediaWiki:Common.js/links.js',
        // Upload
        'MediaWiki:Common.js/upload.js',
        // MiniComplete
        'w:dev:MiniComplete/code.js',
        // FixWantedFiles
        'w:dev:FixWantedFiles/code.js',
        // Anti-directional marks in script pages
        'w:dev:AntiUnicruft/code.js',
        // Statistiche del sito
        'MediaWiki:Common.js/statistiche.js',
        //============================================
        //     Personalizzazione dell'interfaccia     
        //============================================
        // SearchSuggest
        'w:dev:SearchSuggest/code.js',
        // Display Clock
        'w:dev:DisplayClock/code.js',
        // WallGreetingButton
        'w:dev:WallGreetingButton/code.js',
        // Personalizzazione dell'interfaccia
        'MediaWiki:Common.js/customInterface.js‎',
        // Custom preload templates
        'w:itonepiece:MediaWiki:Common.js/preloadTemplates.js',
        // User Tags
        'w:dev:UserTags/code.js'
    ]
});
// END Importazioni


//==========================================================
// Per i codici originali, controllare 
// http://it.onepiece.wikia.com/wiki/MediaWiki:Common.js o 
// http://dev.wikia.com/
//==========================================================
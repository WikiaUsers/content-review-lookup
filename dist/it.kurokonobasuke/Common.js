/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */
//===================================
//       Importazioni funzioni
//===================================
/* importScriptPages-start */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Toggler.js',
        'u:dantest:MediaWiki:Search_Fix.js',
        'u:dev:Countdown/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:DisplayClock/code.js',
    ]
});
/* importScriptPages-end */

//=======================================
//       Variabili per le funzioni
//=======================================
// Ajax auto-refresh
ajaxPages = [
    'Speciale:UltimeModifiche',
    'Speciale:OsservatiSpeciali',
    'Speciale:WikiActivity',
    'Speciale:ImmaginiRecenti',
    'Speciale:Registri',
    'Speciale:AbuseLog'
];
AjaxRCRefreshText = 'Aggiornamento automatico';
AjaxRCRefreshHoverText = 'Abilita l&#39;aggiornamento automatico della pagina';

// Display Clock
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Clicca per aggiornare la cache'
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */
// END variabili
/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */
// Tabelle espandibili
var ShowHideConfig = { autoCollapse: 0 };
importScriptPage('ShowHide/code.js', 'dev');
// END Tabelle espandibili
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

ajaxPages = ["Special:RecentChanges","Speciale:UltimeModifiche","Special:NewPages","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-aggiorna';
AjaxRCRefreshHoverText = 'Aggiorna automaticamente questa pagina';
importScriptPage('AjaxRC/code.js', 'dev');

/* End of auto updating */

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

// End of RevealAnonIP

// Pulsante aggiorna

PurgeButtonText = 'Aggiorna';
importScriptPage('PurgeButton/code.js', 'dev');

// Fine pulsante aggiorna
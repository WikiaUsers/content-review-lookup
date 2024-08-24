importScriptPage('MediaWiki:Common.js/Tabber.js');
importScriptPage('MediaWiki:YoutubePlayer/code.js', 'dev');

/* Atualizando automaticamente mudanças recentes
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

/* Adiciona o label "inativo" nos perfis de quem não edita há no máximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Automaticamente abre o menu de contexto no botão "editar" da pag */
importScriptPage('AutoEditDropdown/code.js', 'dev');


/* Bloqueia blogs com no máximo 50 dias de não atividade */
window.LockOldBlogs = {
    expiryDays: 50,
    expiryMessage: "Este blog não recebeu comentários nos últimos 50 dias. Não há razão para comentar novamente. Caso seja algum blog importante avise aos administradores da wiki.",
    nonexpiryCategory: "Comentários Desbloqueados"
};

/* Player do YouTube */ 
ImportArticles({  
type: 'script',  
articles: [  
'u:dev:YoutubePlayer/code.js'  
] 
 });
 
// Add CANCEL Button for new RTE
importScript('MediaWiki:Wikia.js/cancelButton.js');
// END Add CANCEL Button for new RTE

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

//Show/hide
importScriptPage( 'ShowHide/code.js', 'dev' )

//Import some scripts
importArticles({
        type: "script",
        articles: [
                "w:c:dev:SignatureCheck/code.js",
                "w:c:dev:View_Source/code.js",
                "w:c:dev:ListAdmins/code.js",
                "u:dev:SearchSuggest/code.js",
                "w:c:dev:RevealAnonIP/code.js",
                "MediaWiki:Common.js/Usertags.js",
        ]
});

/* Mensagem para usuários não registrados. */
if (wgUserName === null)
    var WikiaNotificationMessage = "<a href='/wiki/Especial:UserSignup'>Não é registrado? Se registre agora clicando aqui, é grátis!</a>"; 
    // Mensagem
    importArticles({
        type: "script",
        articles: [
            "w:dev:WikiaNotification/code.js", // Notificação Wikia
        ]
    });

/*** Slider ***/
importArticle({
  type: 'script',
  article: 'u:dev:ResponsiveSlider/code.js'
});

/*** Relógio ***/
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Click to purge the cache'
};
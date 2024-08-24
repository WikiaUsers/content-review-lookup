/* Spoiler - @author: [[User:BlackZetsu]] */
importScript('MediaWiki:Wikia.js/Spoiler.js');

/* títulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* Adiciona o label "inativo" nos perfis de quem não edita há no máximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Adiciona um botão para ver o código da página, apenas o código */
importScriptPage('View_Source/code.js', 'dev'); 

/* Adiciona sugestão de pesquisa na especial:busca */
importScriptPage('SearchSuggest/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do anônimo */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Automaticamente abre o menu de contexto no botão "editar" da pag */
importScriptPage('AutoEditDropdown/code.js', 'dev');

/* Gadget de referências */
importScriptPage('ReferencePopups/code.js', 'dev');
/* Bloqueia blogs com no máximo 30 dias de não atividade */ 
importScriptPage('LockOldBlogs/code.js', 'dev');
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog não recebeu comentários nos últimos 30 dias, portanto está bloqueado para novos comentários.",
    nonexpiryCategory: "Comentários Desbloqueados"
};

/* Top editors */
importScriptPage('TopEditors/code.js', 'dev');

/* Replaces {{UsuárioNome}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
/* Spoiler - @author: [[User:BlackZetsu]] */
importScript('MediaWiki:Wikia.js/Spoiler.js');

/* t�tulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* Adiciona o label "inativo" nos perfis de quem n�o edita h� no m�ximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Adiciona um bot�o para ver o c�digo da p�gina, apenas o c�digo */
importScriptPage('View_Source/code.js', 'dev'); 

/* Adiciona sugest�o de pesquisa na especial:busca */
importScriptPage('SearchSuggest/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do an�nimo */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Automaticamente abre o menu de contexto no bot�o "editar" da pag */
importScriptPage('AutoEditDropdown/code.js', 'dev');

/* Gadget de refer�ncias */
importScriptPage('ReferencePopups/code.js', 'dev');
/* Bloqueia blogs com no m�ximo 30 dias de n�o atividade */ 
importScriptPage('LockOldBlogs/code.js', 'dev');
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog n�o recebeu coment�rios nos �ltimos 30 dias, portanto est� bloqueado para novos coment�rios.",
    nonexpiryCategory: "Coment�rios Desbloqueados"
};

/* Top editors */
importScriptPage('TopEditors/code.js', 'dev');

/* Replaces {{Usu�rioNome}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
/* t�tulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* Adiciona o label "inativo" nos perfis de quem n�o edita h� no m�ximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');


/* Adiciona sugest�o de pesquisa na especial:busca */
importScriptPage('SearchSuggest/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do an�nimo */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Automaticamente abre o menu de contexto no bot�o "editar" da pag */
importScriptPage('AutoEditDropdown/code.js', 'dev');

/* Gadget de refer�ncias */
importScriptPage('ReferencePopups/code.js', 'dev');

/* Top editors */
importScriptPage('TopEditors/code.js', 'dev');

/* Replaces {{Usu�rioNome}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* F�cil edi��o da sauda��o no Mural de Mensagens */
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/* Bloqueio de t�picos antigos no F�rum */
window.LockForums = {
    expiryDays: 50,
    expiryMessage: "Este t�pico foi arquivado porque n�o houve nenhum coment�rio novo em <expiryDays> dias. N�o adicione novos coment�rios a este t�pico!",
    forumName: "F�rum do Trailer"

importScript('MediaWiki:Wikia.js/userRightsIcons.js');
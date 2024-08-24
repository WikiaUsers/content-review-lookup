/* títulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* Adiciona o label "inativo" nos perfis de quem não edita há no máximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');


/* Adiciona sugestão de pesquisa na especial:busca */
importScriptPage('SearchSuggest/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do anônimo */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Automaticamente abre o menu de contexto no botão "editar" da pag */
importScriptPage('AutoEditDropdown/code.js', 'dev');

/* Gadget de referências */
importScriptPage('ReferencePopups/code.js', 'dev');

/* Top editors */
importScriptPage('TopEditors/code.js', 'dev');

/* Replaces {{UsuárioNome}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* Fácil edição da saudação no Mural de Mensagens */
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/* Bloqueio de tópicos antigos no Fórum */
window.LockForums = {
    expiryDays: 50,
    expiryMessage: "Este tópico foi arquivado porque não houve nenhum comentário novo em <expiryDays> dias. Não adicione novos comentários a este tópico!",
    forumName: "Fórum do Trailer"

importScript('MediaWiki:Wikia.js/userRightsIcons.js');
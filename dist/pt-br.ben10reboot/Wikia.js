/* Adiciona o label "inativo" nos perfis de quem não edita há no máximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('MediaWiki:InactiveUsers/code.js', 'dev');

/* Adiciona um botão para ver o código da página, apenas o código */
importScriptPage('MediaWiki:View_Source/code.js', 'dev'); 

/* Adiciona sugestão de pesquisa na especial:busca */
importScriptPage('MediaWiki:SearchSuggest/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do anônimo */
importScriptPage('MediaWiki:RevealAnonIP/code.js', 'dev');

/* Automaticamente abre o menu de contexto no botão "editar" da pag */
importScriptPage('MediaWiki:AutoEditDropdown/code.js', 'dev');

/* Gadget de referências */
importScriptPage('MediaWiki:ReferencePopups/code.js', 'dev');

/* Top editores */
importScriptPage('MediaWiki:TopEditors/code.js', 'dev');

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
$(UserNameReplace);
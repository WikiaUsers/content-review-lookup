/* Adiciona o label "inativo" nos perfis de quem n�o edita h� no m�ximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('MediaWiki:InactiveUsers/code.js', 'dev');

/* Adiciona um bot�o para ver o c�digo da p�gina, apenas o c�digo */
importScriptPage('MediaWiki:View_Source/code.js', 'dev'); 

/* Adiciona sugest�o de pesquisa na especial:busca */
importScriptPage('MediaWiki:SearchSuggest/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do an�nimo */
importScriptPage('MediaWiki:RevealAnonIP/code.js', 'dev');

/* Automaticamente abre o menu de contexto no bot�o "editar" da pag */
importScriptPage('MediaWiki:AutoEditDropdown/code.js', 'dev');

/* Gadget de refer�ncias */
importScriptPage('MediaWiki:ReferencePopups/code.js', 'dev');

/* Top editores */
importScriptPage('MediaWiki:TopEditors/code.js', 'dev');

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
$(UserNameReplace);
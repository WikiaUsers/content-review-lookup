
/* títulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

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

/* Replaces {{UsuárioNome}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

window.onload = function() {
    var categorias = document.getElementsByClassName('category normal');
    var categoria = 'Os Sábados Secretos';
    for(var i = 0, len = categorias.length; i < len; i++) {
    if(categorias[i].getAttribute('data-name') == categoria) { 
// Se a página atual tiver a categoria 'Os Sábados Secretos' irá fazer isso:
document.body.style.background = 'green';
}
}
};
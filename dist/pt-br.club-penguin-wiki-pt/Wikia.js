/* títulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
 
/* Adiciona o label "inativo" nos perfis de quem não edita há no máximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'Inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');
 
/* Adiciona um botão para ver o código da página, apenas o código */
importScriptPage('View_Source/code.js', 'dev'); 
 
/* Adiciona sugestão de pesquisa na especial:busca */
importScriptPage('SearchSuggest/code.js', 'dev');
 
/* Substitui o "Um contribuidor da Wikia" pelo IP do anônimo */
importScriptPage('RevealAnonIP/code.js', 'dev');
 
/* Automaticamente abre o menu de contexto no botão "editar" da página */
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

 
/*wikia adiciona link com cor nos rollbacks e patrulhadores */
 
if (mw.config.get("wgUserGroups").indexOf("rollback") > -1 || mw.config.get("wgUserGroups").indexOf("patrulhador") > -1) {
	$('header#WikiaHeader #AccountNavigation a[accesskey="."]').attr("style", "color: #ffffff !important;");
}
 
 
/* wiki votos da logo - adiciona a palavra "vote" template */
/* update via [[MediaWiki:Logo-vote-thread]] */
 
if (
	mw.config.get("wgNamespaceNumber") == 1201 && // this is a thread
	$(".SpeechBubble").first().children(".deleteorremove-infobox").length == 0 // thread is not closed
) {
	$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:Logo-vote-thread&rvprop=content&cb=" + new Date().getTime(), function(data) {
		var a = data.query.pages;
		for (var pageid in a) {
			var b = a[pageid].revisions[0]["*"];
			if (mw.config.get("wgTitle") == /%\d+%/.exec(b)[0].replace(/%/g,"")) {
				$(".MiniEditorWrapper .toolbar").last().append('<a href="#" class="button" id="insert-logo-vote">Vote</a>');
				$("a#insert-logo-vote").click(function(event) {
					event.preventDefault();
					var c = $("textarea.new-message")[0];
					c.value += (c.value.length > 0 ? "\n" : "") + '{{WV|' + mw.config.get("wgUserName") + '|vote_id}}';
				});
			}
		}
	});
}
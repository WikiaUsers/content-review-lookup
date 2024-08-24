/* t�tulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
 
/* Adiciona o label "inativo" nos perfis de quem n�o edita h� no m�ximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'Inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');
 
/* Adiciona um bot�o para ver o c�digo da p�gina, apenas o c�digo */
importScriptPage('View_Source/code.js', 'dev'); 
 
/* Adiciona sugest�o de pesquisa na especial:busca */
importScriptPage('SearchSuggest/code.js', 'dev');
 
/* Substitui o "Um contribuidor da Wikia" pelo IP do an�nimo */
importScriptPage('RevealAnonIP/code.js', 'dev');
 
/* Automaticamente abre o menu de contexto no bot�o "editar" da p�gina */
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
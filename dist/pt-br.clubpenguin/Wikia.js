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

/* Top editors */
importScriptPage('TopEditors/code.js', 'dev');

/* Replaces {{UsuárioNome}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

var SocialMediaButtons = {  
position: "bottom", 
colorScheme: "light", 
buttonSize: "50px", 
wikiTwitterAccount: "wikia_es" 
}; 
importScriptPage('SocialIcons/code.js','dev');

$(function() {
 $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary" href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook">Monobook</a>');
 });

//User Page Tabs
mediaWiki.loader.using('mediawiki.util', function() {
"use strict";
jQuery(function($) {
    var $tabs = $('#WikiaUserPagesHeader ul.tabs');
    if (!$tabs.length) return;
    var newTabs = {
        'Sandbox': '/Sandbox',
};
    var name = $('#UserProfileMasthead .masthead-info hgroup > h1');
    if (!name.length) return;
    name = name.text();
    var tabs = document.createDocumentFragment(), li, a;
    for (var tab in newTabs) {
        li = document.createElement('li');
        a = document.createElement('a');
        a.title = 'User:' + name + newTabs[tab];
        a.href = mw.util.wikiGetlink(a.title);
        a.appendChild(document.createTextNode(tab));
        li.appendChild(a);
        tabs.appendChild(li);
    }
    $tabs.append(tabs);
});
});
 
if (mw.config.get('wgCanonicalNamespace') == 'Thread') {
	if ($('.msg-title > a').text().indexOf('[Vote]') > -1) {
		var s= $('<div class="votebutton"><input type="button" value="Support" onclick="vote(1)"/></div>');
		var n= $('<div class="votebutton"><input type="button" value="Neutral" onclick="vote(2)"/></div>');
		var o= $('<div class="votebutton"><input type="button" value="Oppose" onclick="vote(3)"/></div>');
		$(".speech-bubble-buttons").prepend(s);
		$(".speech-bubble-buttons").prepend(n);
		$(".speech-bubble-buttons").prepend(o);
	}
}
 
function vote(result) {
	$(".replyBody").click();
	var response;
	switch (result) {
        case 1:
            response = "support";
            break;
        case 2:
            response = "neutral";
            break;
        case 3:
            response = "oppose";
            break;
	}
	$('.new-message').val("{{"+response+"}}");
	$('.replyButton').prop('disabled', false);
}
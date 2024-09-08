var autoCollapse = 2;
var collapseCaption = "ocultar";
var expandCaption = "expandir";
 
function collapseTable( tableIndex ){
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$("#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
 
 
// ***************
// Chat appearance
// ***************
 
// Change chat description
if ($('section.ChatModule').length > 0){
	$.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result){
		if ($('p.chat-name').length > 0){
			$('p.chat-name').html(result);
		}else{
			var chatDescInt = setInterval(function() {
				if ($('p.chat-name').length > 0){
					$('p.chat-name').html(result);
					clearInterval(chatDescInt);
				}
			}, 50);
		}
	});
}
 
 
// Alert contributors that they are editing with their bot flag set
if (mediaWiki.config.get("wgAction") == "edit" && mediaWiki.config.get("wgUserGroups").indexOf("bot") != -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: red; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set.</div>')
}
 
/*** Disable comments in Old Blogs ***/
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este Post de Blog não pode ser comentado porque tem mais de um mês que foi criado.",
    expiryCategories : "Auto-arquivado"
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});
 
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['user']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
 
//Add a "view source" button when the Edit button goes to Special:SignUp
$(document).ready(function() {
    var $a = $('a[data-id="edit"]');
    if ($a.length && $a.attr('href').indexOf('Special:SignUp') !== -1) {
        $a.parent().children('ul.WikiaMenuElement').prepend(
            '<li><a href="/wiki/' + mw.config.get('wgPageName') + 
            '?action=edit">View source</a></li>'
        );
    }
});
 
// Message wall icons
setInterval(function () {
    "use strict";
    $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
      if ($user.match(/Onmitrix 10|Pederix ou Pedro|TennysonXD|Álvaro 10|Cipó Selvagem/g)) {
             $(this).addClass('admin');
        }
if ($user.match(/Anodita Suprema|Entidade Sombria|AliciaSilva|Tomatendo|Gummyadventure/g)) {
             $(this).addClass('chat-mod');
        }
    });
}, 1);

}
 
 
addOnloadHook(toggleInit);
 
// </syntax>
 
/* Adiciona o label "inativo" nos perfis de quem não edita há no máximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');
/* Adiciona o botão "atualizar" no menu de controle das páginas */
PurgeButtonText = 'Atualizar';
importScriptPage('PurgeButton/code.js', 'dev');
 
/* Adiciona um botão para ver o código da página, apenas o código */
importScriptPage('View_Source/code.js', 'dev'); 
 
/* Adiciona sugestão de pesquisa na especial:busca */
importScriptPage('SearchSuggest/code.js', 'dev');
 
/* Substitui o "Um contribuidor da Wikia" pelo IP do anônimo */
importScriptPage('RevealAnonIP/code.js', 'dev');
 
/* Automaticamente abre o menu de contexto no botão "editar" da pag */
importScriptPage('AutoEditDropdown/code.js', 'dev');
/* Atualização automática mudanças recentes opt-in
 * Veja w:c:dev:AjaxRC para informação & atribuição
 */
AjaxRCRefreshText = 'Auto-atualização';
AjaxRCRefreshHoverText = 'Atualiza a página automaticamente';
ajaxPages = ["Especial:RecentChanges","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/* Scripts importados */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ShowHide/code.js', /* Tabelas recolhíveis (agora inútil, apresenta por padrão com "mw-collapsible") */
        'u:dev:Countdown/code.js', /* Contagem regressiva */
        'u:dev:ExternalImageLoader/code.js', /* Predefinição ImagemExterna */
        'u:dev:WallGreetingButton/code.js', /* Botão para as WallGreetings */
        'u:dev:ReferencePopups/code.js' /* Referências em pop-up */
    ]
});

/* Substitui {{Visitante}} com o nome do usuário que visitar a página. Requer a cópia: Predefinição:NOMEDOUSUÁRIO. */  
function UserNameReplace() { 
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) 
        return; $("span.insertusername").html(wgUserName); 
} 
    addOnloadHook(UserNameReplace);  

/* Fim da substituição {{Visitante}} */

/* Títulos no Perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* Usuários Inativos */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Ver Código da Página */
importScriptPage('View_Source/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do anônimo */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Menções legais no final da página */
$(function(){
     $('#WikiaPage .WikiaPageContentWrapper').append('<div style="width:100%; font-size:x-small; text-align:center; padding:5px;">Este site não é recomendado ou afiliado com a Electronic Arts ou seus licenciadores.<br>Todas as marcas pertencem a seus respectivos proprietários.</div>');
});
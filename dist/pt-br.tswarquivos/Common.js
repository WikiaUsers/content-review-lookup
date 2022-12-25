/* Novos botões na barra de ferramentas */
 
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}
 
/* Atualização automática mudanças recentes opt-in
 * Veja w:c:dev:AjaxRC para informação & atribuição
 */
 
AjaxRCRefreshText = 'Auto-atualização';
AjaxRCRefreshHoverText = 'Atualiza a página automaticamente';
ajaxPages = ["Especial:RecentChanges","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/** Botão Redirecionamento **/
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Redirecionamento',
 '#REDIRECIONAMENTO [[',
 ']]',
 'nome do destino',
 'mw-editbutton-redirect');
 
/** Botão Usuário **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/2/21/Bot%C3%A3o_Sim1.png','Sim1','{{','}}','Usuário\n|cabeçalho     = {{PAGENAME}}\n|imagem        = \n|nome completo = \n|nome popular  = \n|sexo          = \n|entrada       = \n|status        = \n|afetos        = \n|desafetos     = \n|qualidades    = \n|cargo1        = \n|cargo2        = \n|cargo3        = \n|cargo4        = \n|cargo5        = \n','');
 
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
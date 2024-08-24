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
 
/** Botão Personagem **/
addCustomButton('https://images.wikia.nocookie.net/chavesdooito/pt-br/images/a/a5/Bot%C3%A3o_Personagem.png','Personagem','{{','}}','Personagem\n|imagem            = \n|nome              = \n|morada            = \n|color             = Orange\n|dublagem          = \n|primeira aparição = \n|última aparição   = \n|ator              = \n','');
 
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

/* Tabelas recolhíveis (agora inútil, apresenta por padrão com "mw-collapsible" */
importScriptPage('ShowHide/code.js', 'dev');

/* Contagem regressiva */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
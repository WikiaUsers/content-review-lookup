/* Novos bot�es na barra de ferramentas */
 
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}
 
/* Atualiza��o autom�tica mudan�as recentes opt-in
 * Veja w:c:dev:AjaxRC para informa��o & atribui��o
 */
 
AjaxRCRefreshText = 'Auto-atualiza��o';
AjaxRCRefreshHoverText = 'Atualiza a p�gina automaticamente';
ajaxPages = ["Especial:RecentChanges","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/** Bot�o Redirecionamento **/
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Redirecionamento',
 '#REDIRECIONAMENTO [[',
 ']]',
 'nome do destino',
 'mw-editbutton-redirect');
 
/** Bot�o Personagem **/
addCustomButton('https://images.wikia.nocookie.net/chavesdooito/pt-br/images/a/a5/Bot%C3%A3o_Personagem.png','Personagem','{{','}}','Personagem\n|imagem            = \n|nome              = \n|morada            = \n|color             = Orange\n|dublagem          = \n|primeira apari��o = \n|�ltima apari��o   = \n|ator              = \n','');
 
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

/* Tabelas recolh�veis (agora in�til, apresenta por padr�o com "mw-collapsible" */
importScriptPage('ShowHide/code.js', 'dev');

/* Contagem regressiva */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
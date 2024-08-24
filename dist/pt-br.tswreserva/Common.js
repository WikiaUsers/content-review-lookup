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
 
/** Bot�o Sim1 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/2/21/Bot%C3%A3o_Sim1.png','Sim1','{{','}}','Sim1\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|fam�lia      = \n|pais         = \n|irm�os       = \n|c�njuge      = \n|estado       = \n|filhos       = \n|casa         = \n|colegas      = \n|animais      = \n|esp�cie      = \n|pele         = \n|peso         = \n|f�sica       = \n|cabelo       = \n|olhos        = \n|signo        = \n|apari��o     = \n|jogabilidade = \n|morte        = \n|vizinhan�a   = \n','');
 
/** Bot�o Sim2 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/3/32/Bot%C3%A3o_Sim2.png','Sim2','{{','}}','Sim2\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|fam�lia      = \n|pais         = \n|irm�os       = \n|c�njuge      = \n|estado       = \n|filhos       = \n|outros       = \n|casa         = \n|colegas      = \n|animais      = \n|esp�cie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aspira��o    = \n|apari��o     = \n|jogabilidade = \n|morte        = \n|vizinhan�a   = \n','');
 
/** Bot�o Sim3 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/7/7e/Bot%C3%A3o_Sim3.png','Sim3','{{','}}','Sim3\n|imagem       = \n|biografia    = \n|nome         = \n|sexo         = \n|idade        = \n|celebridade  = \n|fam�lia      = \n|pais         = \n|irm�os       = \n|c�njuge      = \n|estado       = \n|filhos       = \n|outros       = \n|casa         = \n|colegas      = \n|animais      = \n|esp�cie      = \n|pele         = \n|peso         = \n|f�sica       = \n|cabelo       = \n|olhos        = \n|signo        = \n|tra�o1       = \n|tra�o2       = \n|tra�o3       = \n|tra�o4       = \n|tra�o5       = \n|desejo       = \n|m�sica       = \n|comida       = \n|cor          = \n|apari��o     = \n|jogabilidade = \n|morte        = \n|vizinhan�a   = \n','');
 
/** Bot�o Simbio-come�o **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/c/ce/Bot%C3%A3o_Simbio-come%C3%A7o.png','Simbio-come�o','{{','}}','Simbio-come�o\n|imagem  = \n|nome    = \n|sexo    = \n|fam�lia = \n|pais    = \n|irm�os  = \n|c�njuge = \n|filhos  = \n|outros  = \n','');
 
/** Bot�o Simbio1 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/a/a7/Bot%C3%A3o_Simbio1.png','Simbio1','{{','}}','Simbio1\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|esp�cie      = \n|pele         = \n|peso         = \n|f�sica       = \n|cabelo       = \n|olhos        = \n|signo        = \n|apari��o     = \n|jogabilidade = \n|morte        = \n|vizinhan�a   = \n','');
 
/** Bot�o Simbio2 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/e/e4/Bot%C3%A3o_Simbio2.png','Simbio2','{{','}}','Simbio2\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|esp�cie      = \n|pele         = \n|peso         = \n|cabelo       = \n|olhos        = \n|signo        = \n|aspira��o    = \n|apari��o     = \n|jogabilidade = \n|morte        = \n|vizinhan�a   = \n','');
 
/** Bot�o Simbio3 **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/8/88/Bot%C3%A3o_Simbio3.png','Simbio3','{{','}}','Simbio3\n|imagem       = \n|biografia    = \n|nome         = \n|idade        = \n|estado       = \n|esp�cie      = \n|pele         = \n|peso         = \n|f�sica       = \n|cabelo       = \n|olhos        = \n|signo        = \n|tra�o1       = \n|tra�o2       = \n|tra�o3       = \n|tra�o4       = \n|tra�o5       = \n|desejo       = \n|m�sica       = \n|comida       = \n|cor          = \n|apari��o     = \n|jogabilidade = \n|morte        = \n|vizinhan�a   = \n','');
 
/** Bot�o Simbio-fim **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/3/35/Bot%C3%A3o_Simbio-fim.png','Simbio-fim','{{','}}','Simbio-fim','');
 
/** Bot�o DEFAULTSORT **/
addCustomButton('https://images.wikia.nocookie.net/simswiki/pt-br/images/9/99/Bot%C3%A3o_Defaultsort.png','Simbio-fim','{{','}}','DEFAULTSORT:sobrenome, nome','');
 
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
        'u:dev:ShowHide/code.js', /* Tabelas recolh�veis (agora in�til, apresenta por padr�o com "mw-collapsible") */
        'u:dev:Countdown/code.js', /* Contagem regressiva */
        'u:dev:ExternalImageLoader/code.js', /* Predefini��o ImagemExterna */
        'u:dev:WallGreetingButton/code.js', /* Bot�o para as WallGreetings */
        'u:dev:ReferencePopups/code.js' /* Refer�ncias em pop-up */
    ]
});

/* Substitui {{Visitante}} com o nome do usu�rio que visitar a p�gina. Requer a c�pia: Predefini��o:NOMEDOUSU�RIO. */  

function UserNameReplace() { if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; $("span.insertusername").html(wgUserName); } addOnloadHook(UserNameReplace);  

/* Fim da substitui��o {{Visitante}} */
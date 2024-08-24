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

/** Bot�o Usu�rio **/
addCustomButton('https://vignette.wikia.nocookie.net/guia-wikia/images/1/14/Bot%C3%A3o_Usu%C3%A1rio.png/revision/latest?cb=20150215000026&path-prefix=pt-br','Usu�rio','{{','}}','Usu�rio\n|Cabe�alho       = {{PAGENAME}}\n|Imagem          = \n|Nome            = \n|Apelidos        = \n|idade           = \n|Anivers�rio     = \n|G�nero          = \n|Qualidades      = \n|Status          = \n|Entrada         = \n|Principal       = \n|Outras          = \n|Edi��esp        = \n|Edi��esW        = \n|Afetos          = \n|Desafetos       = \n|Fam�lia wikiana = \n|Fundador        = \n|Burocrata       = \n|Administrador   = \n|Rollback        = \n|ModeradorC      = \n|ModeradorF      = \n|Casos           = \n|Eventos         = \n','');

/** Bot�o Comunidade **/
addCustomButton('https://vignette.wikia.nocookie.net/guia-wikia/images/c/c3/Bot%C3%A3o_Comunidade.png/revision/latest?cb=20150215000057&path-prefix=pt-br','Comunidade','{{','}}','Comunidade\n|Cabe�alho       = {{PAGENAME}}\n|Imagem          = \n|G�nero          = \n|Funda��o        = \n|Fundador        = \n|imagens         = \n|p�ginas         = \n|Link            = \n|Burocratas      = \n|Administradores = \n|Rollbackers     = \n|ModeradoresC    = \n|ModeradoresD    = \n','');
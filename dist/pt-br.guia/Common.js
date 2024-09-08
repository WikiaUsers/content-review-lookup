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
addCustomButton('https://vignette.wikia.nocookie.net/guia-wikia/images/1/14/Bot%C3%A3o_Usu%C3%A1rio.png/revision/latest?cb=20150215000026&path-prefix=pt-br','Usuário','{{','}}','Usuário\n|Cabeçalho       = {{PAGENAME}}\n|Imagem          = \n|Nome            = \n|Apelidos        = \n|idade           = \n|Aniversário     = \n|Gênero          = \n|Qualidades      = \n|Status          = \n|Entrada         = \n|Principal       = \n|Outras          = \n|Ediçõesp        = \n|EdiçõesW        = \n|Afetos          = \n|Desafetos       = \n|Família wikiana = \n|Fundador        = \n|Burocrata       = \n|Administrador   = \n|Rollback        = \n|ModeradorC      = \n|ModeradorF      = \n|Casos           = \n|Eventos         = \n','');

/** Botão Comunidade **/
addCustomButton('https://vignette.wikia.nocookie.net/guia-wikia/images/c/c3/Bot%C3%A3o_Comunidade.png/revision/latest?cb=20150215000057&path-prefix=pt-br','Comunidade','{{','}}','Comunidade\n|Cabeçalho       = {{PAGENAME}}\n|Imagem          = \n|Gênero          = \n|Fundação        = \n|Fundador        = \n|imagens         = \n|páginas         = \n|Link            = \n|Burocratas      = \n|Administradores = \n|Rollbackers     = \n|ModeradoresC    = \n|ModeradoresD    = \n','');
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
 
/** Botão Redirecionamento **/
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Redirecionamento',
 '#REDIRECIONAMENTO [[',
 ']]',
 'nome do destino',
 'mw-editbutton-redirect');
 
/** Botão Infobox **/
addCustomButton('https://images.wikia.nocookie.net/pou-brasil/pt-br/images/archive/7/76/20131126161424%21Bot%C3%A3o_Infobox.png','Infobox','{{','}}','Infobox\n|imagem    = \n|descrição = \n','');
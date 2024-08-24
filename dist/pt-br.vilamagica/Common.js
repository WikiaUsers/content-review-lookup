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

/** Bot�o Redirecionamento **/
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Redirecionamento',
 '#REDIRECIONAMENTO [[',
 ']]',
 'nome do destino',
 'mw-editbutton-redirect');
 
/** Bot�o Objeto **/
addCustomButton('https://images.wikia.nocookie.net/vilamagica/pt-br/images/7/78/Bot%C3%A3o_Objeto.png','Objeto','{{','}}','Objeto\n|imagem = \n|pre�o  = \n|loja   = \n','');
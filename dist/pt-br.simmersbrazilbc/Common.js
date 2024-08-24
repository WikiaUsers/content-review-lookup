/* Novos bot�es na barra de ferramentas */
 function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText
    };
}

/** Bot�o Redirecionamento **/
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Redirecionamento',
 '#REDIRECIONAMENTO [[',
 ']]',
 'nome do destino',
 'mw-editbutton-redirect');

/** Bot�o Epis�dio **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/9/93/Bot%C3%A3o_Epis%C3%B3dio.png/revision/latest?cb=20181103121614&format=original&path-prefix=pt-br','Epis�dio','{{','}}','Epis�dio\n|title1            = \n|image1            = \n|temporada         = \n|epis�dio          = \n|desafio           = \n|vencedor(es)      = \n|perdedor          = \n|epis�dio_anterior = \n|pr�ximo_epis�dio  = \n','');

/** Bot�o Equipe **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/5/5d/Bot%C3%A3o_Equipe.png/revision/latest?cb=20181103121613&format=original&path-prefix=pt-br','Equipe','{{','}}','Equipe\n|imagem  = \n|membros = \n','');

/** Bot�o Personagem **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/a/a5/Bot%C3%A3o_Personagem.png/revision/latest?cb=20181103121614&format=original&path-prefix=pt-br','Personagem','{{','}}','Personagem\n|imagem          = \n|g�nero          = \n|cidade          = \n|cabelo          = \n|olhos           = \n|personalidade   = \n|equipes         = \n|coloca��o       = \n|relacionamentos = \n','');

/** Bot�o S�rie **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/e/e2/Bot%C3%A3o_S%C3%A9rie.png/revision/latest?cb=20181110232551&path-prefix=pt-br','S�rie','{{','}}','S�rie\n|title1             = \n|image1             = \n|tema               = \n|temporadas         = \n|n�_de_epis�dios    = \n|spin-offs          = \n|escritor(es)       = \n|data_de_lan�amento = \n|encerramento       = \n','');

/** Bot�o Temporada **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/e/e6/Bot%C3%A3o_Temporada.png/revision/latest?cb=20181103121614&format=original&path-prefix=pt-br','Temporada','{{','}}','Temporada\n|imagem         = \n|temporada      = \n|epis�dios      = \n|apresentadores = \n|participantes  = \n|equipes        = \n|precedido      = \n|sucedido       = \n','');
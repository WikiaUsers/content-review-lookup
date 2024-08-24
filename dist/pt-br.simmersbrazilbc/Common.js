/* Novos botões na barra de ferramentas */
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

/** Botão Redirecionamento **/
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Redirecionamento',
 '#REDIRECIONAMENTO [[',
 ']]',
 'nome do destino',
 'mw-editbutton-redirect');

/** Botão Episódio **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/9/93/Bot%C3%A3o_Epis%C3%B3dio.png/revision/latest?cb=20181103121614&format=original&path-prefix=pt-br','Episódio','{{','}}','Episódio\n|title1            = \n|image1            = \n|temporada         = \n|episódio          = \n|desafio           = \n|vencedor(es)      = \n|perdedor          = \n|episódio_anterior = \n|próximo_episódio  = \n','');

/** Botão Equipe **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/5/5d/Bot%C3%A3o_Equipe.png/revision/latest?cb=20181103121613&format=original&path-prefix=pt-br','Equipe','{{','}}','Equipe\n|imagem  = \n|membros = \n','');

/** Botão Personagem **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/a/a5/Bot%C3%A3o_Personagem.png/revision/latest?cb=20181103121614&format=original&path-prefix=pt-br','Personagem','{{','}}','Personagem\n|imagem          = \n|gênero          = \n|cidade          = \n|cabelo          = \n|olhos           = \n|personalidade   = \n|equipes         = \n|colocação       = \n|relacionamentos = \n','');

/** Botão Série **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/e/e2/Bot%C3%A3o_S%C3%A9rie.png/revision/latest?cb=20181110232551&path-prefix=pt-br','Série','{{','}}','Série\n|title1             = \n|image1             = \n|tema               = \n|temporadas         = \n|nº_de_episódios    = \n|spin-offs          = \n|escritor(es)       = \n|data_de_lançamento = \n|encerramento       = \n','');

/** Botão Temporada **/
addCustomButton('https://vignette.wikia.nocookie.net/dramatotalfanon/images/e/e6/Bot%C3%A3o_Temporada.png/revision/latest?cb=20181103121614&format=original&path-prefix=pt-br','Temporada','{{','}}','Temporada\n|imagem         = \n|temporada      = \n|episódios      = \n|apresentadores = \n|participantes  = \n|equipes        = \n|precedido      = \n|sucedido       = \n','');
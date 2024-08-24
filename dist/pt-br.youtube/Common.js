/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* Atualização Automática */
window.ajaxPages = ["Especial:WikiActivity","Especial:Mudanças_recentes","Especial:Páginas_vigiadas","Especial:Registro","Especial:Contribuições","Especial:Imagens"];
window.AjaxRCRefreshText = 'Atualização automática';
window.AjaxRCRefreshHoverText = 'Atualiza a página automaticamente';

/* WikiaNotification */
var WikiaNotificationMessage = ""; // Adicione o avsio aqui
var WikiaNotificationexpiry = 0; // Em quanto tempo o aviso irá expirar? (Dias)

/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:WikiaNotification/code.js',
        'u:dev:YouTubeModal/code.js',
        'u:dev:YoutubePlayer/code.js',
        'u:dev:YouTubeButton/code.js'
    ]
});

/* Botões de edição personalizados */
if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ultragustavo25/images/a/a8/YouTuber_button.png/revision/latest?cb=20160925144522&path-prefix=pt-br",
		"speedTip": "Adicionar a predefinição Youtuber",
		"tagOpen": "{{Youtuber\n|Nome = \n|Imagem = \n|Link do Canal = \n|Nome do Canal = \n|Twitter = \n|Facebook = \n|Nome da Página = \n|Instagram = \n|Link do Google+ = \n|Google+ = \n|Outras Mídias = \n|Estilo = \n|Data de Inscrição = \n|Primeiro Vídeo = \n|Horário dos Vídeos = \n|Status = \n|Vídeos = \n|Trailer do Canal = \n|Vídeo Mais Visto = }}",
		"tagClose": "",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ultragustavo25/images/8/87/V%C3%ADdeo_button.png/revision/latest?cb=20160925144622&path-prefix=pt-br",
		"speedTip": "Adicionar a predefinição Vídeo",
		"tagOpen": "{{Vídeo\n|Nome = \n|Imagem = \n|Link do vídeo = \n|Nome do video = \n|Canal responsável = \n|Categoria = \n|Licença = \n|Data de publicação = \n|Visualizações = \n|Likes = \n|Dislikes = \n|Comentários = }}",
		"tagClose": "",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ultragustavo25/images/9/91/Cita%C3%A7%C3%A3o_button.png/revision/latest?cb=20160925144754&path-prefix=pt-br",
		"speedTip": "Adicionar a predefinição Citação",
		"tagOpen": "{{Citação|",
		"tagClose": "}}",
		"sampleText": "frase|quem|onde/quando/para"
	};
}
/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */

/* Atualiza��o Autom�tica */
window.ajaxPages = ["Especial:WikiActivity","Especial:Mudan�as_recentes","Especial:P�ginas_vigiadas","Especial:Registro","Especial:Contribui��es","Especial:Imagens"];
window.AjaxRCRefreshText = 'Atualiza��o autom�tica';
window.AjaxRCRefreshHoverText = 'Atualiza a p�gina automaticamente';

/* WikiaNotification */
var WikiaNotificationMessage = ""; // Adicione o avsio aqui
var WikiaNotificationexpiry = 0; // Em quanto tempo o aviso ir� expirar? (Dias)

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

/* Bot�es de edi��o personalizados */
if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ultragustavo25/images/a/a8/YouTuber_button.png/revision/latest?cb=20160925144522&path-prefix=pt-br",
		"speedTip": "Adicionar a predefini��o Youtuber",
		"tagOpen": "{{Youtuber\n|Nome = \n|Imagem = \n|Link do Canal = \n|Nome do Canal = \n|Twitter = \n|Facebook = \n|Nome da P�gina = \n|Instagram = \n|Link do Google+ = \n|Google+ = \n|Outras M�dias = \n|Estilo = \n|Data de Inscri��o = \n|Primeiro V�deo = \n|Hor�rio dos V�deos = \n|Status = \n|V�deos = \n|Trailer do Canal = \n|V�deo Mais Visto = }}",
		"tagClose": "",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ultragustavo25/images/8/87/V%C3%ADdeo_button.png/revision/latest?cb=20160925144622&path-prefix=pt-br",
		"speedTip": "Adicionar a predefini��o V�deo",
		"tagOpen": "{{V�deo\n|Nome = \n|Imagem = \n|Link do v�deo = \n|Nome do video = \n|Canal respons�vel = \n|Categoria = \n|Licen�a = \n|Data de publica��o = \n|Visualiza��es = \n|Likes = \n|Dislikes = \n|Coment�rios = }}",
		"tagClose": "",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ultragustavo25/images/9/91/Cita%C3%A7%C3%A3o_button.png/revision/latest?cb=20160925144754&path-prefix=pt-br",
		"speedTip": "Adicionar a predefini��o Cita��o",
		"tagOpen": "{{Cita��o|",
		"tagClose": "}}",
		"sampleText": "frase|quem|onde/quando/para"
	};
}
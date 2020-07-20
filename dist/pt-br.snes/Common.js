/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
    ]
});

if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/snes/images/e/ee/C.png/revision/latest?cb=20170504213401&path-prefix=pt-br",
		"speedTip": "Insere a infobox de console",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": "{{Infobox_Console}}"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/snes/images/5/51/J.png/revision/latest?cb=20160902002743&path-prefix=pt-br",
		"speedTip": "Insere a infobox de jogos",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": "{{Infobox_Jogos}}"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/snes/images/3/3d/F.png/revision/latest?cb=20170504213907&path-prefix=pt-br",
		"speedTip": "Insere a infobox de fases",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": "{{Infobox_Fases}}"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/snes/images/3/36/P.png/revision/latest?cb=20160902002723&path-prefix=pt-br",
		"speedTip": "Insere a infobox de personagens",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": "{{Infobox_Personagens}}"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/snes/images/a/a2/H.png/revision/latest?cb=20160902002753&path-prefix=pt-br",
		"speedTip": "Insere a infobox de habilidades",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": "{{Infobox_Habilidades}}"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/snes/images/f/fa/E.png/revision/latest?cb=20160902002804&path-prefix=pt-br",
		"speedTip": "Insere a infobox de equipamentos",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": "{{Infobox_Equipamentos}}"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/snes/images/d/dd/It.png/revision/latest?cb=20170504214425&path-prefix=pt-br",
		"speedTip": "Insere a infobox de itens",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": "{{Infobox_Itens}}"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/snes/images/b/ba/Im.png/revision/latest?cb=20170504214916&path-prefix=pt-br",
		"speedTip": "Insere a infobox de imagens",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": "{{Infobox_Imagens}}"
	};
}
/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
importArticles({
    type: "script",
    articles: [
        'u:dev:ReferencePopups/code.js', // Referências
        'u:dev:ReferencePopups/custom.js', // Customização de Referências
        'u:dev:ExternalImageLoader/code.js', // Imagem Externa
        'u:dev:DisplayTimer/code.js', // Horário
        'u:dev:RevealAnonIP/code.js', // IP
        'u:dev:ShowHide/code.js', // Ocultar e Mostrar
        'u:dev:View_Source/code.js', // Código Fonte
        'u:dev:WallGreetingButton/code.js', // Saudações em Murais
        'u:dev:Less/code.2.js', // Less
        'MediaWiki:Medalhas.js', // Medalhas
        'u:dev:YoutubePlayer/code.js' // Youtube
    ]
});
// Personalização de Botões
if (mwCustomEditButtons) {
 
    // Botão ū 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
        "speedTip": "Adicionar o caractere ū",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };
 
    // Botão ō
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
        "speedTip": "Adicionar o caractere ō",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };
 
    // Botão de Referência
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
        "speedTip": "Adicionar referência",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Digite o Conteúdo da referencia"
    };
}
// Botão SlideshowInInfobox
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://i.imgur.com/P5uOlcm.png",
    "speedTip": "Adicionar slideshow na Infobox",
    "tagOpen": '<gallery type="slideshow" widths="300" crop="false" position="center" hideaddbutton="true">',
    "tagClose": '</gallery>',
    "sampleText": ""
};

// Botão de Redirecionamento
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://i.imgur.com/IVLDN3o.png",
    "speedTip": "Adicionar um Redirecionamento",
    "tagOpen": "[[",
    "tagClose": "]]",
    "sampleText": "Digite o Link Desejado"
};
//Botão de Predefinição Personagens
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://i.imgur.com/cXG4jMY.png",
    "speedTip": "Adicionar a predefinição de Personagens",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Personagens\n|nome = \n|imagem = \n|Nome Japonês = \n|Nome Romanizado = \n|Nome Português = \n|Afiliações: = \n|Família = \n|Terra Natal = \n|Ocupação = \n|Nome Real \n|Alcunha = \n|Aniversário = \n|Altura = \n|Peso = \n|Idade = \n|Doriki = \n|Chave da CP9 = \n|Número de Zumbi \n|Número de Gladiador = \n|Recompensa = \n|Dublador Japonês = \n|status = \n"
};
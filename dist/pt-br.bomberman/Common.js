/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Automaticamente recarregar a p�gina a cada 60segs';
AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
ajaxPages = ["Especial:Mudan�as_recentes","Especial:WikiActivity", "Especial:P�ginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:P�ginas_novas", "Especial:Contribui��es"];
importScriptPage('AjaxRC/code.js', 'dev');

// Importar conte�do
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ReferencePopups/code.js",      // Refer�ncias Wikip�dia
        "w:c:dev:ReferencePopups/custom.js",    // Popups
        "w:c:dev:ExternalImageLoader/code.js",  // Imagem Externa
        "w:c:dev:DisplayTimer/code.js",         // Timer
        "w:c:dev:RevealAnonIP/code.js",         // IP de usu�rios an�nimos
        "w:c:dev:ShowHide/code.js",             // Bot�o de Mostrar - Esconder
        "w:c:dev:View_Source/code.js",          // Ver c�digo-fonte (bot�o-editar)
        "w:c:dev:WallGreetingButton/code.js",   // Editar sauda��o Message Wall
        "w:c:dev:AjaxRC/code.js",               // Atualizar Recent Changes
        "w:dev:SocialIcons/code.js",            // �cones de redes sociais
    ]
});

/* Custom Edit buttons - http://en.wikipedia.org/wiki/User:MarkS/Extra_edit_buttons */
 if (mwCustomEditButtons) {

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
     "speedTip": "Add a Chapter Reference",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": "''Bomberman"};
  }
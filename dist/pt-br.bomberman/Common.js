/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Automaticamente recarregar a página a cada 60segs';
AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity", "Especial:Páginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:Páginas_novas", "Especial:Contribuições"];
importScriptPage('AjaxRC/code.js', 'dev');

// Importar conteúdo
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ReferencePopups/code.js",      // Referências Wikipédia
        "w:c:dev:ReferencePopups/custom.js",    // Popups
        "w:c:dev:ExternalImageLoader/code.js",  // Imagem Externa
        "w:c:dev:DisplayTimer/code.js",         // Timer
        "w:c:dev:RevealAnonIP/code.js",         // IP de usuários anônimos
        "w:c:dev:ShowHide/code.js",             // Botão de Mostrar - Esconder
        "w:c:dev:View_Source/code.js",          // Ver código-fonte (botão-editar)
        "w:c:dev:WallGreetingButton/code.js",   // Editar saudação Message Wall
        "w:c:dev:AjaxRC/code.js",               // Atualizar Recent Changes
        "w:dev:SocialIcons/code.js",            // Ícones de redes sociais
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
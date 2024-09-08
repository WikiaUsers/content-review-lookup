/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Automaticamente recarregar a página a cada 60segs';
AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity", "Especial:Páginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:Páginas_novas", "Especial:Contribuições"];
importScriptPage('AjaxRC/code.js', 'dev');
/****************************************/ /* Etiqueta personalizada para usuários */ /****************************************/ function addMastheadTags() { var rights = {};  rights["João Gabriel"] = ["Dr. Zomboss"];  if (wgCanonicalSpecialPageName == "Contributions") { var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," "); } else { var user = wgTitle; }  if (typeof rights[user] != "undefined") {  $('.UserProfileMasthead .masthead-info span.tag').remove();  for( var i=0, len=rights[user].length; i < len; i++) {  $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup'); } } };  $(function() { if ($('#UserProfileMasthead')) { addMastheadTags(); } });

// Importar conteúdo
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ReferencePopups/code.js",      // Referências Wikipédia
        "w:c:dev:ReferencePopups/custom.js",    // Popups
        "w:c:dev:ExternalImageLoader/code.js",  // Imagem Externa
        "w:c:dev:RevealAnonIP/code.js",         // IP de usuários anônimos
        "w:c:dev:ShowHide/code.js",             // Botão de Mostrar - Esconder
        "w:c:dev:View_Source/code.js",          // Ver código-fonte (botão-editar)
        "w:c:dev:WallGreetingButton/code.js",   // Editar saudação Message Wall
        "w:c:dev:AjaxRC/code.js",               // Atualizar Recent Changes
    ]
});
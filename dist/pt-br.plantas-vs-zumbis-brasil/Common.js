/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Automaticamente recarregar a p�gina a cada 60segs';
AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
ajaxPages = ["Especial:Mudan�as_recentes","Especial:WikiActivity", "Especial:P�ginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:P�ginas_novas", "Especial:Contribui��es"];
importScriptPage('AjaxRC/code.js', 'dev');
/****************************************/ /* Etiqueta personalizada para usu�rios */ /****************************************/ function addMastheadTags() { var rights = {};  rights["Jo�o Gabriel"] = ["Dr. Zomboss"];  if (wgCanonicalSpecialPageName == "Contributions") { var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," "); } else { var user = wgTitle; }  if (typeof rights[user] != "undefined") {  $('.UserProfileMasthead .masthead-info span.tag').remove();  for( var i=0, len=rights[user].length; i < len; i++) {  $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup'); } } };  $(function() { if ($('#UserProfileMasthead')) { addMastheadTags(); } });

// Importar conte�do
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ReferencePopups/code.js",      // Refer�ncias Wikip�dia
        "w:c:dev:ReferencePopups/custom.js",    // Popups
        "w:c:dev:ExternalImageLoader/code.js",  // Imagem Externa
        "w:c:dev:RevealAnonIP/code.js",         // IP de usu�rios an�nimos
        "w:c:dev:ShowHide/code.js",             // Bot�o de Mostrar - Esconder
        "w:c:dev:View_Source/code.js",          // Ver c�digo-fonte (bot�o-editar)
        "w:c:dev:WallGreetingButton/code.js",   // Editar sauda��o Message Wall
        "w:c:dev:AjaxRC/code.js",               // Atualizar Recent Changes
    ]
});
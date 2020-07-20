/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Importes
importArticles({
    type: 'script',
    articles: [
        'u:dev:AddRailModule/code.js',
        'u:dev:MediaWiki:YouTubeModal/code.js',
        'u:dev:AjaxRC/code.js',
    ]
});

/***** Actualizar los cambios recientes de la wikiactividad *****/
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Los cambios más recientes serán vistos sin la necesidad de refrescar la página manualmente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
;

/* Cambio de título */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});
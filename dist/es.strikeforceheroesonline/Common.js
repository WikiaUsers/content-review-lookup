/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importArticle({ type:'script',  article:'w:c:dev:SexyUserPage_2/code.js' });
 
// 1. AutoRefreshing RecentChanges and WikiActivity
 
var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxRefresh = 20000;
importScriptPage('AjaxRC/code.js', 'dev');

// *************************************************
// 
// Reescribir título, usada por Plantilla:Titulo
// 
// *************************************************
 
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:DisplayClock/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:MessageWallUserTags/code.js'
    ]
});
/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

importArticle({ type:'script',  article:'w:c:dev:SexyUserPage_2/code.js' });
 
// 1. AutoRefreshing RecentChanges and WikiActivity
 
var AjaxRCRefreshText = 'Act. autom�t.';
var AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxRefresh = 20000;
importScriptPage('AjaxRC/code.js', 'dev');

// *************************************************
// 
// Reescribir t�tulo, usada por Plantilla:Titulo
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
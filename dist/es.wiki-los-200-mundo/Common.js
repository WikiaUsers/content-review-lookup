/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Auto-refrescar WikiActividad (Club Penguin Wiki) */
 
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/clubpenguin/images/6/68/D_CP_MEM_Loader_34.gif/revision/latest?cb=20120915200111';
window.ajaxRefresh = 10000;

/* Cambio de título (Créditos a Un Show Más,MPLWiki y The Loud House Wiki) */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});

/**Hora UTC del Wiki sacado de SkullGirls Wiki**/
window.DisplayClockJS = '%2I:%2M:%2S %p|%2d de %{Ene;Feb;Mar;Abr;May;Jun;Jul;Ago;Sep;Oct;Nov;Dic}m de %Y (UTC)';
/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
importScriptPage('AjaxRC/code.js', 'dev');
 
importArticles({
   type: 'script',
   articles: [
       'u:dev:AjaxRC/code.js',
       'u:dev:YoutubePlayer/code.js',
   ]
});
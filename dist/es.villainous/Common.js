/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
AjaxRCRefreshText = 'Act. autom�t.';
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
importScriptPage('AjaxRC/code.js', 'dev');
 
importArticles({
   type: 'script',
   articles: [
       'u:dev:AjaxRC/code.js',
       'u:dev:YoutubePlayer/code.js',
   ]
});
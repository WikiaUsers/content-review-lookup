/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

 
/*** Añadir botón para editar el mensaje de bienvenida del muro ***/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
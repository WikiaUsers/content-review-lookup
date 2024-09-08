//* Más niveles en la barra de navegación. Conseguido de: dev.wikia.com/wiki/ExtendedNavigation*\\
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
});

/* Nieve */
/* importScriptPage('MediaWiki:Snow.js','community'); */

/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Entradas de Blog</a></li>');
}
$(subeEnlacesUtiles);
 
// Etiqueta para usuarios inactivos por más de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
 
// Etiquetas de permisos adicionales 
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
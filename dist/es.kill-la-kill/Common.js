/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

/* AJAX */

window.AjaxRCRefreshText = 'Actualizaci�n automatica'; 
window.AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente'; 
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];

/* Parallax */

importArticles({ 
    type: 'script', 
    articles: [ 
        'w:c:dev:SocialIcons/code.js', 'MediaWiki:Parallax.js' 
    ] 
});
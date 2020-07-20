/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* AJAX */

window.AjaxRCRefreshText = 'Actualización automatica'; 
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente'; 
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];

/* Parallax */

importArticles({ 
    type: 'script', 
    articles: [ 
        'w:c:dev:SocialIcons/code.js', 'MediaWiki:Parallax.js' 
    ] 
});
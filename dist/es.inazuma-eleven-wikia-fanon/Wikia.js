AjaxRCRefreshText = 'Actualización automatica';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
 
//Etiqueta para usuarios inactivos
InactiveUsers = { text: 'Retirado' };
 
//Etiqueta para usuarios baneados del chat
Bannedfromchat = { text: 'Lesionado' };
 
// Actualizar página
PurgeButtonText = 'Actualizar página';

importScript('MediaWiki:Medals/es.js');
importScriptPage('AjaxRC/code.js', 'dev');
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});
AjaxRCRefreshText = 'Actualizaci�n automatica';
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
 
//Etiqueta para usuarios inactivos
InactiveUsers = { text: 'Retirado' };
 
//Etiqueta para usuarios baneados del chat
Bannedfromchat = { text: 'Lesionado' };
 
// Actualizar p�gina
PurgeButtonText = 'Actualizar p�gina';

importScript('MediaWiki:Medals/es.js');
importScriptPage('AjaxRC/code.js', 'dev');
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});
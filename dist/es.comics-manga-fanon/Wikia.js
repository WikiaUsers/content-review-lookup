// Refrescar Actividad reciente
 
window.AjaxRCRefreshText = 'Auto-ref';
window.AjaxRCRefreshHoverText = 'Refrescar la actividad autom�ticamente.';
window.ajaxPages = ["Especial:WikiActivity","Especial:CambiosRecientes"];
 
// Guardar art�culos mientras con CTRL+S
 
importScriptPage('SaveKey/code.js', 'dev');
 
//Deshabilitar mensajes para bots
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:DisableBotMessageWalls/code.js'
    ]
});
 
window.ChatStatus = {
	statuses: {
		ausente: "Asuente",
		editando: "Editando",
		leyendo: "Leyendo"
	},
	debug: false
};
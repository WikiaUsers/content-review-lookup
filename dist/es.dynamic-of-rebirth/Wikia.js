// Nuevo módulo del rail
 /*
$(function(){
    $('<section class="module RailModule"></section>')
    .appendTo('#WikiaRail')
    .load('/index.php?title=Plantilla:Modulo1&action=render');
}); */

// Refrescar Actividad reciente
window.AjaxRCRefreshText = 'Auto-ref';
window.AjaxRCRefreshHoverText = 'Refrescar la actividad automáticamente.';
window.ajaxPages = ["Especial:WikiActivity","Especial:CambiosRecientes"];
 
window.ChatStatus = {
	statuses: {
		ausente: "Asuente",
		editando: "Editando",
		leyendo: "Leyendo"
	},
	debug: false
};
 
// DisplayTitle
 
importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});
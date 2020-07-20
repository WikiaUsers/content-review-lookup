/* Enlaces en la navegación de la cuenta 
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');}addOnloadHook(subeEnlacesUtiles);

$(function() {
	if ( document.location.href.indexOf('?action=edit&preload=Ben_10_fanon_Wiki:Preload_') > -1 ) {
		alert("¡Después del ''='' escribe lo que corresponde en cada una de las línea de la plantilla!");
	}
});
*/

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
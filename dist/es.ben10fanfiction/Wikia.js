/* Enlaces en la navegaci�n de la cuenta 
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');}addOnloadHook(subeEnlacesUtiles);

$(function() {
	if ( document.location.href.indexOf('?action=edit&preload=Ben_10_fanon_Wiki:Preload_') > -1 ) {
		alert("�Despu�s del ''='' escribe lo que corresponde en cada una de las l�nea de la plantilla!");
	}
});
*/

// Refrescar Actividad reciente
window.AjaxRCRefreshText = 'Auto-ref';
window.AjaxRCRefreshHoverText = 'Refrescar la actividad autom�ticamente.';
window.ajaxPages = ["Especial:WikiActivity","Especial:CambiosRecientes"];
 
window.ChatStatus = {
	statuses: {
		ausente: "Asuente",
		editando: "Editando",
		leyendo: "Leyendo"
	},
	debug: false
};
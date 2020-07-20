/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

window.SpoilerAlertJS = {
    question: 'Esta sección contiene spoilers. ¿Aún así quieres seguir leyendo?',
    yes: 'Si',
    no: 'No',
    fadeDelay: 1600
};

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});
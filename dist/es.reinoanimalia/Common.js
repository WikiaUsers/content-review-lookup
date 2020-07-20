/* Icons to the right of the title (Avatar Wiki) */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});
// Etiqueta Inactivo
InactiveUsers = { text: 'Fosilizado' };
importScriptPage('InactiveUsers/code.js', 'dev');
// PowerPageMaker
importScriptPage('PowerPageMaker/code.js', 'dev');
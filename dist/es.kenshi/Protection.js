/*
	Añade el ícono generado por {{Protection}} junto al botón de editar.
*/

function addProtectionBanner() {
   var elem = $('div.protection-image').get(0);
   if (typeof elem === 'undefined') {
      return;
   }
   // Relocate it and make it appear 
   var selector;
   if ( mw.config.get('skin') === 'fandomdesktop' ) {
      selector = '.page-header__actions'
   } else {
   	  selector = '.page-header__contribution-buttons .wds-button-group'
   }
   var parent = $(selector).get(0);
   if (typeof parent !== 'undefined') {
      $(parent).prepend(elem);
      $(elem).addClass('protection-image-visible');
   }
}
$(document).ready(function() {
   addProtectionBanner();
});
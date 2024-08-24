/*
	A�ade el �cono generado por {{Protection}} junto al bot�n de editar.
	Tomado de la comunidad inglesa de Clash of Clans [[w:c:clashofclans:MediaWiki:Common.js/Protection.js]]
	----
	Appends the icon created by {{Protection}} next to the edit button.
	Taken from the English Clash of Clans community [[w:c:clashofclans:MediaWiki:Common.js/Protection.js]]
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
{{:MediaWiki:Common.js/Debug.js}}
/* MediaWiki:Monobook.js v2.9 <pre> */

/*
* © 2014 José Conrado Jaramillo Vargas ([[User:Conradho]])
*/

//Traduce los enlaces del pie de página y añade 'disclaminer' sobre Pokémon
function TraducirFooter() {
	$('#about').children().eq(0).text('Sobre Wikia');
	$('#contact').children().eq(0).text('Contactar con Wikia');
	$('#disclaimer').children().eq(0).text('Términos de uso');
	$('#privacy').children().eq(0).text('Privacidad');
	$('#hosting').append('<br />©PhonePedia <small>2013/14</small> Todos los derehos reservados. <br /> Todo el contenido de este wiki está disponible bajo la Licencia Creative Commons Atribución Compartir Igual 3.0 <br /> Imágenes, audio y vídeo se utilizan de acuerdo a los términos del Fair Use.');
}
if (window.wgUserLanguage == 'es') {
	$(TraducirFooter);
}
 
/* </pre> */
{{:MediaWiki:Common.js/Debug.js}}
/* MediaWiki:Monobook.js v2.9 <pre> */

/*
* � 2014 Jos� Conrado Jaramillo Vargas ([[User:Conradho]])
*/

//Traduce los enlaces del pie de p�gina y a�ade 'disclaminer' sobre Pok�mon
function TraducirFooter() {
	$('#about').children().eq(0).text('Sobre Wikia');
	$('#contact').children().eq(0).text('Contactar con Wikia');
	$('#disclaimer').children().eq(0).text('T�rminos de uso');
	$('#privacy').children().eq(0).text('Privacidad');
	$('#hosting').append('<br />�PhonePedia <small>2013/14</small> Todos los derehos reservados. <br /> Todo el contenido de este wiki est� disponible bajo la Licencia Creative Commons Atribuci�n Compartir Igual 3.0 <br /> Im�genes, audio y v�deo se utilizan de acuerdo a los t�rminos del Fair Use.');
}
if (window.wgUserLanguage == 'es') {
	$(TraducirFooter);
}
 
/* </pre> */
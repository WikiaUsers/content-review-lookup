/* Any JavaScript here will be loaded for all users on every page load. */
 $('div.busca-contenido').replaceWith( '<marquee class="busca-contenido" id="marquesina" behavior="scroll" scrollamount="4" direction="left" >' + $('div.busca-contenido').text() + '</marquee>' );

$('div.busca-boton1').replaceWith( '<input id="busca-boton1" type="button" value="Stop" onClick=' + "document.getElementById('marquesina').stop();" + '>' );

$('div.busca-boton2').replaceWith( '<input id="busca-boton2" type="button" value="Start" onClick=' + "document.getElementById('marquesina').start();" + '>' );

$('div.busca-sonido').replaceWith( '<embed src="http://www.youtube.com/v/___shQiFjOY?version=3&amp;hl=es_ES&amp;rel=0" type="application/x-shockwave-flash" width="0" height="0" allowscriptaccess="always" allowfullscreen="false" autostart="true" loop="false" hidden="true"></embed>' );
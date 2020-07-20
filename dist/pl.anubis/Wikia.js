// **************************************************
//       Grand Theft Encyclopedia - Versión 7.0
//          Creado por User:bola - CC-BY-SA
//          Created by User:bola - CC-BY-SA
// --------------------------------------------------
// ATENCIÓN: La mayor parte de los códigos incluídos
// aquí han sido creados específicamente para es.gta
// por user:bola, si estás interesado en hacer alguna
// modificación o usarlos en tu wiki, avisa al autor
// para evitar añadir algo que pueda romper los TdU.
//                                           Gracias,
// **************************************************
 
 
// **************************************************
// Importa diferentes códigos extra
// **************************************************
 
// **************************************************
// Primera parte - 4 backgrounds durante el día
// **************************************************
$(function () {
 var d = new Date();
 if (d.getHours() < 5) {
  document.body.className += ' BG4';
  document.getElementById('WikiaPage').className += ' BG4-page';
 } 
 else if (d.getHours() < 9) {
  document.body.className += ' BG3';
  document.getElementById('WikiaPage').className += ' BG3-page';
 } 
 else if (d.getHours() < 18) {
  document.body.className += ' BG1';
  document.getElementById('WikiaPage').className += ' BG1-page';
 } 
 else if (d.getHours() < 22) {
  document.body.className += ' BG2';
  document.getElementById('WikiaPage').className += ' BG2-page';
 } 
 else if (d.getHours() < 24) {
  document.body.className += ' BG4';
  document.getElementById('WikiaPage').className += ' BG4-page';
 } 
});
 
 
// **************************************************
// Segunda parte - Añade un contenedor extra para background
// **************************************************
$('#WikiaPageBackground').append('<div class="WikiaPageBackgroundSub" id="WikiaPageBackgroundSub"></div>');
 
 
// **************************************************
// Crea clase e id para cinta adhesiva en thumbs
// **************************************************
$('.thumb').append('<div class="plantilla-cinta-cinta" id="plantilla-cinta-cinta"></div>');
 
 
// **************************************************
// Añade en las noticias un header especial - prueba
// **************************************************
$('body.ns-116 .WikiHeader .wordmark.graphic ').bind('click.cabecera', function(){ window.location.href = 'http://es.gta.wikia.com/wiki/Noticias:Índice'; return false; });
 
 
// **************************************************
// SOPA Popup (De callofduty.wikia.com/)
// **************************************************
 
/*** Para el recuerdo ***/
/***
var SOPAMessage = '<div align="center" style="text-align:left;color:black"><div style="text-align:center"><span style="font-size:200%;"><a href="https://twitter.com/#!/search?q=%23SOPABlackout">#SOPABlackout</a> / <a href="https://twitter.com/#!/search?q=%23PIPABlackout">#PIPABlackout</a></span></div><br /><div align="center"><img src="https://images.wikia.nocookie.net/es.gta/images/b/bc/Wiki.png"/></div><span style="font-size:100%;">Este wiki se creó hace 6 años con el objetivo de reunir toda la información acerca de la saga Grand Theft Auto y compartirla con toda la comunidad de Internet, pero lamentablemente todo podría llegar a su fin.</span><br /><br /><span style="font-size:100%;">En EEUU se han redactado dos leyes, <a href="http://es.wikipedia.org/wiki/Stop_Online_Piracy_Act">SOPA (Stop Online Piracy Act)</a> y <a href="http://en.wikipedia.org/wiki/PROTECT_IP_Act">PIPA (Protect-IP Act)</a> que pronto serán votadas y que pueden terminar con la libertad de expresión en Internet y provocar el cierre de muchos sitios web por reclamaciones de violaciones de derechos de autor sin juicio previo.</span><br /><br /><span style="font-size:100%; font-weight: bold;">¿Qué hacen estas leyes?</span><br /><span style="font-size:100%;">Según estas leyes, este wiki podría ser cerrado simplemente por contener información acerca de la saga Grand Theft Auto. Sus dueños serán demandados y posiblemente encarcelados y todo el trabajo que hasta ahora se hizo aquí, sería borrado.</span><br /><br /><span style="font-size:100%;">El objetivo por el que se crearon estas leyes fue para combatir la piratería, sin embargo están tan mal redactadas que afectarían incluso a las webs que respeten los derechos de autor y solo quieran informar, como ocurre con este wiki o como podría ocurrir con Wikipedia.</span><br /><br /><span style="font-size:100%;font-weight: bold;">¿Qué pasa si no estoy en Estados Unidos?</span><br /><span style="font-size:100%;">Esta ley afecta a todos por igual. La mayoría de los servidores de las páginas webs (donde estas páginas se alojan para que podamos visitarlas) se encuentran en EEUU, por lo que todos nos veríamos afectados, pero además de esto, Google estará obligada a borrar de su registro las páginas webs que sean denunciadas, por tanto si se aprueba esta ley, podrán borrar todo rastro de cualquier web en cualquier parte del mundo ya que todos los buscadores dejarán de enlazarla.</span><br /><br /><span style="font-size:100%;font-weight: bold;">¿Qué sitios están en peligro?</span><br /><span style="font-size:100%;">Google, Facebook, Twitter, Tumblr, Wikipedia, Wikia, YouTube, Webs de noticias, los wikis en general... cualquier página donde los usuarios puedan participar será objetivo de esta ley.</span><br /><br /><br /><div align="center"><iframe width="640" height="360" src="http://www.youtube.com/embed/5fvwoHKj6cs" frameborder="0" allowfullscreen></iframe></div><br /><br /><span style="font-size:100%; font-weight: bold;">Relacionado:</span><ul><li>- <a href="http://es.wikia.com/wiki/Usuario_Blog:Bola/Wikia_mueve_nuestros_m%C3%A1s_de_500_dominios_de_GoDaddy_por_su_apoyo_a_la_SOPA ">Wikia mueve nuestros más de 500 dominios de GoDaddy por su apoyo a la SOPA</a></li><li>- <a href="http://es.wikia.com/wiki/Usuario_Blog:Bola/Por_qu%C3%A9_se_opone_Wikia_a_la_ley_SOPA">Por qué se opone Wikia a la ley SOPA</a></li><li>- <a href="http://es.wikia.com/wiki/Usuario_Blog:Bola/Resumen_de_la_situaci%C3%B3n_de_las_leyes_SOPA_y_PIPA">Resumen de la situación de las leyes SOPA y PIPA</a></li></ul><br /><br /><span style="font-size:85%; font-weight: bold;">Atención: </span><span style="font-size:85%;">Este bloqueo durará solamente 24 horas, el Jueves a las 5:00 UTC la página volverá a su estado habitual, por favor, tened paciencia y sed conscientes de que si estas leyes se aprueban esta página desaparecerá para siempre junto con otras muchas, ¡lucha por tu libertad y defiende tus derechos!</span></div>';
$(function displayPopup() {
    $('body').html('<div class="SOPAMessage" align="center">'+SOPAMessage+'</div>');
});
***/

mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            var num = this.className.replace("portal_sliderlink_", "").replace(" jump", "");
            $tabs.tabs('select', num);
            $('.jump').text('·');
            $('.portal_sliderlink_' + num + '.jump').text('•');
            return false;
        });
        $('#portal_next').click(function() {
            var num = ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1;
            $tabs.tabs('select', num); // switch to next tab
            $('.jump').text('·');
            $('.portal_sliderlink_' + (num + 1) + '.jump').text('•');
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            var num = ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1;
            $tabs.tabs('select', num); // switch to previous tab
            $('.jump').text('·');
            $('.portal_sliderlink_' + (num + 1) + '.jump').text('•');
            return false;
        });
    });
});
/* Contador de visitas */
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li>  <img style="padding-top:2px;" title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=1566657&counter=24" />  </li>').appendTo('#GlobalNavigation');
    else
        $('#p-navigation ul').append('<li> <img title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=1566657&counter=24" /></li></li>');
});
/* fin codigo contador */

/* Curiosidades (w:c:es.ben10) */

$(function() {
  $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary photogallery" href="/wiki/Curiosidades:'+ encodeURIComponent(wgPageName) +'" title="Ver las curiosidades"><img src="https://images.wikia.nocookie.net/__cb20140309184036/pintorsmeargle/images/thumb/3/31/Signo_de_interrogaci%C3%B3n_verde.png/20px-Signo_de_interrogaci%C3%B3n_verde.png" style="height:20px; vertical-align:middle;" /> Curiosidades</a>');
  $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary articlegallery" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Volver al artículo original"><img src="https://images.wikia.nocookie.net/ben10/es/images/4/4f/Volver.gif" style="height:20px; vertical-align:middle;" /> Volver</a>');
});
/* Contador de visitas */
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li>  <img style="padding-top:2px;" title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=1560199&counter=24" />  </li>').appendTo('#GlobalNavigation');
    else
        $('#p-navigation ul').append('<li> <img title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=1560199&counter=24" /></li></li>');
});
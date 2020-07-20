/* Contador de visitas, idea original de Giovi (Benfutbol10) */
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li>  <img style="padding-top:2px;" title="Visits since 2009" src="http://contador-de-visitas.com/hit.php?id=1557956&counter=24" />  </li>').appendTo('#GlobalNavigation');
    else
        $('#p-navigation ul').append('<li> <img title="visits since 2009" src="http://contador-de-visitas.com/hit.php?id=1557847&counter=24" /></li></li>');
});
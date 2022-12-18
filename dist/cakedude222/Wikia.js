/* Number of visits */
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li>  <img style="padding-top:2px;" title=" Visits" src="http://contador-de-visitas.com/hit.php?id=1557956&counter=24" />  </li>').appendTo('#GlobalNavigation');
    else
        $('#p-navigation ul').append('<li> <img title="visits" src="http://contador-de-visitas.com/hit.php?id=1557847&counter=24" /></li></li>');
});
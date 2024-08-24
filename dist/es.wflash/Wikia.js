// **************************************************
// Añade el tagline de forma manual - Gracias Bola
// **************************************************
$(function(){
     if ($('#WikiaPageHeader').length ) {
            $('#WikiaPageHeader').append('<div id="siteSub"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20140621190136/wflash/es/images/a/a9/Skyrim_simbolo.png"> <span style="font-weight:bold;">Cuidadín muchacho:</span> Los artículos pueden mostrar detalles importantes de la trama y dejarte to loco de la cabeza.</div>');
     }
});

/* Contador de visitas */
$(document).ready(function() { 
if (skin == 'oasis') 
$('<li> <img style="padding-top:2px;" title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=1954663&counter=24" /> </li>').appendTo('#GlobalNavigation'); 
else 
$('#p-navigation ul').append('<li> <img title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=1954663&counter=24" /></li></li>'); 
});

/* Sugerencia de búsquedas */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});
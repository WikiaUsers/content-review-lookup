// Tag de usuario inactivo por mas de 2 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
// Extender barra de navegacion
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
        ]
});
// Desactiva votaciones cuando un hilo este cerrado
$(function() {
    if ($(".deleteorremove-infobox").is('*')) {
        $('input[name="wpVote"]').attr('disabled','disabled')
        .attr('value','Votaci�n finalizada');
    }
});
/* N�mero de im�genes en la galer�a */
$(function(){
    $.ajax({
        'dataType': 'text',
        'data': {
            'title': 'Galer�a:' + wgPageName,
            'action': 'raw',
            'ctype': 'text/plain'
        },
        'url': wgScript,
        'success': function (data) {
            var pattern = /(?:\.jpg|\.png|\.bmp|\.gif|\.jpeg)/img;
            $('body.ns-0 #cantidadimagenes').text(data.match(pattern).length);
        }
    });
});
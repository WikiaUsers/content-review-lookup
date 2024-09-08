// import

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});

 
// Desactivar votaciones cuando el hilo esté cerrado
$(function() {
    if ($(".deleteorremove-infobox").is('*')) {
        $('input[name="wpVote"]').attr('disabled','disabled')
                                 .attr('value','Votación finalizada');
    }
});
 
/* Número de imágenes en la galeria
$(function(){
    $.ajax({
        'dataType': 'text',
        'data': {
            'title': 'Galeria:' + wgPageName,
            'action': 'raw',
            'ctype': 'text/plain'
        },
        'url': wgScript,
        'success': function (data) {
            var pattern = /(?:\.jpg|\.png|\.bmp|\.gif|\.jpeg)/img;
            $('body.ns-0 #cantidadimagenes').text(data.match(pattern).length);
        }
    });
});  */
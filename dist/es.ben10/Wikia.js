importScriptPage('MediaWiki:ReporteErrores.js');

/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav > li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');}addOnloadHook(subeEnlacesUtiles);

$(function() {
 $('.WikiHeader > nav li:first-child > .subnav-2 > li:last-child').after('<li><a href="http://es.ben10.wikia.com/d/f?sort=latest" class="subnav-2a">Discusiones</a></li>');
 $('body.page-Usuario_Botfutbol10 .tag').text('Bot');
 $('p.chat-name').html('<a href="/wiki/Ben_10_Wiki:Reglas#Chat">Normas de uso</a>');
 // Galería de imágenes
 if(mw.config.get('wgNamespaceNumber') === 0) {
     if(mw.config.get('wgIsMainPage')) {
         return;
     }
    $('.WikiaPageHeader h1').after('<a href="/wiki/Galería:' + mw.config.get('wgPageName') + '"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAq1BMVEUAAAAAAAA/Pz9mZmZfX19VVVVMTExNTU1SUlJQUFBOTk5OTk5RUVFPT09PT09RUVFRUVFPT09SUlJRUVFPT09SUlJQUFBPT09RUVFQUFBRUVFRUVFQUFBRUVFRUVFPT09RUVFRUVFRUVFRUVFQUFBQUFBQUFBRUVFPT09RUVFRUVFRUVFQUFBRUVFPT09RUVFRUVFPT09RUVFRUVFPT09PT09RUVFPT09RUVE2gtoLAAAAOHRSTlMAAQQFCAwUJCUmJyosLTA1OEBBQkNETFBeX2RnaHF0doaNk5eosbvIzc/Z3OTo6uvs8PH19/n7/V4Q8BoAAACjSURBVCjPndLHEoJAFETRRhQDZlSMCEbMEej//zIXhmGG0YV3e6reousB37PrmWwA6FCTA8Dl/aCU0AXgcqEe37/B8K87Rwc9kidTAxOStAAgL0PxRq4AIDhaEqAWTAsAGglnMjzLbci4ogGPJJcKeNu5H5EkWxIMxRqhkYJunNqpL8C6pAcMBZiDsWjU/MB5rRS9QNN/4OigDQDlaqbSj995AKqWPlK7gZsJAAAAAElFTkSuQmCC" title="Visitar galería de imágenes de ' + mw.config.get('wgTitle') + '" /></a>');
 } else {
     if(mw.config.get('wgNamespaceNumber') == 112) {
        $('.WikiaPageHeader h1').html('<strong>Galería:</strong>' + mw.config.get('wgTitle')).after('<h2><a href="/wiki/' + mw.config.get('wgPageName').replace('Galería:','') + '">Volver a la página</a></h2>');
     }
 }
});

// Desactivar votaciones cuando el hilo esté cerrado
$(function() {
    if ($(".deleteorremove-infobox").is('*')) {
        $('input[name="wpVote"]').attr('disabled','disabled')
                                 .attr('value','Votación finalizada');
    }
});

/* Número de imágenes en la galería
$(function(){
    $.ajax({
        'dataType': 'text',
        'data': {
            'title': 'Galería:' + wgPageName,
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

/* Invertir orden de pestañas en infoboxes */
/* Tabber abajo */
var tabberOptions = {
    'onLoad': function() {
       $('.infobox').each(function() {
            ul = $('.infobox ul.tabbernav');
            ul.children().each(function(i,li){ul.prepend(li)})
            $('.tabbernav').addClass('infoboxtab');
       });
    }
};
// Wikis Aliadas
$(function(){
    $('#WikiaFooter').prepend('<section id="comunidadesaliadas"><div class="header-container"><h1>Comunidades aliadas (<a href="http://es.ben10.wikia.com/wiki/Subforo:Pol%C3%ADticas_y_propuestas">agrega tu wikia</a>)</h1></div><ul></ul></section>');
        // es.television
        $('<li data-wiki="Wikivisión"><a href="http://es.television.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
        // es.sao
        $('<li data-wiki="Wiki Sword Art Online"><a href="http://es.sao.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
        // es.stargate
        $('<li data-wiki="ComandoSG"><a href="http://es.stargate.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
        // es.kungfupanda
        $('<li data-wiki="Kung Fu Panda Wiki"><a href="http://es.kungfupanda.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
        // es.dragonball
        $('<li data-wiki="Dragon Ball Wiki"><a href="http://es.dragonball.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
        // es.fusionfallcn
        $('<li data-wiki="Fusion Fall Wiki"><a href="http://es.fusionfallcn.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
        // es.horadeaventura
        $('<li data-wiki="Hora de aventura Wiki"><a href="http://es.horadeaventura.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
        // es.sailormoon
        $('<li data-wiki="Sailor Moon Wiki"><a href="http://es.sailormoon.wikia.com"></a></li>').appendTo('#comunidadesaliadas ul');
});
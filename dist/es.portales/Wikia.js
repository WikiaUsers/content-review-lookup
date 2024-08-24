$('.reproductor-cancion').prependTo('.WikiaSearch');
// Barra flotante (es.ben10)
importScriptPage('MediaWiki:Ratings.js');
$(function() {
    if ($("body").hasClass("ns-0")) {
		$.ajax({
			'dataType': 'xml',
			'url': '/api.php?action=query&prop=revisions&titles=' + wgPageName + '&rvprop=user&rvlimit=1&rvdir=newer&format=xml',
			success: function(xml) {
				$(xml).find('page').each(function(){
					var $entrada = $(this);
					var usuario = $entrada.find('rev').attr('user');
 
                                        if(usuario != undefined) { 
					$(".WikiaPageHeader").addClass("cargado");
					$(".WikiaPageHeader").append("<div class='divcreadorarticulo'><strong>Creador del artículo</strong>: <a id='creador-userlink' class='creadordelarticulo' href='/wiki/Usuario:" + usuario + "'>" + usuario + "</a></div>");
					$('<style type="text/css">.SpeechBubble[data-user="' + usuario + '"] blockquote { background:#FFFFAA !important; } .SpeechBubble[data-user="' + usuario + '"] .speech-bubble-message:after { border-color:transparent #FFFFAA #FFFFAA transparent; }</style>').appendTo('head');
                                        }
				})
			}
		});
	}
});
 
function barraFlotante() {
    $('.WikiaPage').after('<div class="navegador WikiaHeader"><div class="wikia-header-mask"><div class="page-width-container"><ul class="elementos"><li class="logo"></li><li class="titulo">Estás leyendo...<br /></li><li class="creador">Creador<br /><h1></h1></li><li class="facebook"><iframe src="//www.facebook.com/plugins/like.php?href=' + $(location).attr('href') + '&amp;width=100&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe></li><li class="twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-via="VocaloidWiki" data-lang="es" data-related="VocaloidWiki" data-hashtags="vocaloidwiki">Twittear</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script></li><li class="ratingbar"></li></ul></div></div></div>');
    $('.WikiaPageHeader h1').clone().appendTo('li.titulo');
    $('h1.wordmark').clone().appendTo('li.logo');
    $('li.creador h1').text($('.creadordelarticulo').text());
 
    var offset = $('.divcreadorarticulo').offset();
    var altura = $('.divcreadorarticulo').height();
    var posicion = offset.top;
    var distancia = posicion + altura;
    $(window).scroll(function() {
        if ($(window).scrollTop() > distancia) {
            $('.navegador').fadeIn();
            $('#ratingBody').appendTo('.ratingbar');
        }
        else {
            $('.navegador').fadeOut('30');
            $('#ratingBody').appendTo('#votacion');
        }
    });
 
}
 
if (mw.config.get("wgNamespaceNumber") == "0") {
		addOnloadHook(barraFlotante);
 
}
// Tagline (categorymatch by Benfutbol10)
$(function() {
    var categorymatch = $.inArray('Contenido Fuerte', wgCategories) > -1;
 
    if(categorymatch) {
        $('#WikiaPageHeader').after('<div id="siteSub" class="fuerte"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Advertencia:</span> El contenido en este artículo no es apto para personas menores de edad o personas sensibles.</div>');
    }
});
$(function() {
    var categorymatch = $.inArray('Contenido Cuestionable', wgCategories) > -1;
 
    if(categorymatch) {
        $('#WikiaPageHeader').after('<div id="siteSub" class="cuestionable"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Advertencia:</span> La descripción de este articulo contiene información cuestionable que no está confirmado por el autor, pero está basado en el punto de vista de uno o varios usuarios.</div>');
    }
});
$(function() {
  var categorymatch = $.inArray('Contenido de Wikia Aliada', wgCategories) > -1;
  var interwiki = ($('.interwikidata').data('interwiki') || 'es.theevilliouschronicles');
  var wiki = ($('.interwikidata').data('wiki') || 'Wiki The Evillious Chronicles');
  if(categorymatch) {
    $('#WikiaPageHeader').after('<div id="siteSub" class="interwiki"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Atención:</span> Este artículo contiene información extraída de una de nuestras wikias aliadas<br/><div style="width: 100%; border-top: 1px solid #000;"> Visita <a href="/wiki/w:c:' + interwiki + '">' + wiki + '</a> para más información.</div></div>');
  }
});
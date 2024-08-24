$(function() {
    if ($("body").hasClass("ns-0") && !$("body").hasClass("mainpage")) {
		$.ajax({
			'dataType': 'xml',
			'url': '/api.php?action=query&prop=revisions&titles=' + wgPageName + '&rvprop=user&rvlimit=1&rvdir=newer&format=xml',
			success: function(xml) {
				$(xml).find('page').each(function(){
					var $entrada = $(this);
					var usuario = $entrada.find('rev').attr('user');
 
                                        if(usuario != undefined) { 
					$(".WikiaPageHeader").addClass("cargado");
					$(".WikiaPageHeader").append("<h2 class='divcreadorarticulo'><strong>Creador del artículo</strong>: <a id='creador-userlink' class='creadordelarticulo' href='/wiki/Usuario:" + usuario + "'><span itemprop='author' itemscope itemtype='http://schema.org/Person'>" + usuario + "</span></a> (<a id='creador-murolink' href='/wiki/Muro:" + usuario + "'>muro</a> | <a id='creador-contriblink' href='/wiki/Especial:Contribuciones/" + usuario + "'>contribuciones</a><span class='admin'> | <a id='creador-bloquearlink' href='/wiki/Especial:Bloquear/" + usuario + "'>bloquear</a> | <a id='creador-registrolink' href='/wiki/Especial:Registro?user=" + usuario + "'>registro</a> | <a id='creador-delcontriblink' href='/wiki/Especial:ContribucionesBorradas/" + usuario + "'>contrib. borradas</a></span>)</h2>");
                                        }
				})
			}
		});
	}
});
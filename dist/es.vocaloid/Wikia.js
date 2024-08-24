$('.reproductor-cancion').appendTo('.WikiaRail');

// Tagline (categorymatch by Benfutbol10)
$(function() {
    if($.inArray('Contenido Fuerte', wgCategories) > -1) {
        $('#WikiaPageHeader').after('<div id="siteSub" class="fuerte"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Advertencia:</span> El contenido en este artículo no es apto para personas menores de edad o personas sensibles.</div>');
    } else if ($.inArray('Contenido Cuestionable', wgCategories) > -1) {
        $('#WikiaPageHeader').after('<div id="siteSub" class="cuestionable"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Advertencia:</span> La descripción de este articulo contiene información cuestionable que no está confirmado por el autor, pero está basado en el punto de vista de uno o varios usuarios.</div>');
    } else if ($.inArray('Contenido de Wikia Aliada', wgCategories) > -1) {
        var interwiki = ($('.interwikidata').data('interwiki') || 'es.theevilliouschronicles');
        var wiki = ($('.interwikidata').data('wiki') || 'Wiki The Evillious Chronicles');
        $('#WikiaPageHeader').after('<div id="siteSub" class="interwiki"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Atención:</span> Este artículo contiene información extraída de una de nuestras wikias aliadas<br/><div style="width: 100%; border-top: 1px solid #000;"> Visita <a href="/wiki/w:c:' + interwiki + '">' + wiki + '</a> para más información.</div></div>');
    }
});
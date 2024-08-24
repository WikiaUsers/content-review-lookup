$('.reproductor-cancion').appendTo('.WikiaRail');

// Tagline (categorymatch by Benfutbol10)
$(function() {
    if($.inArray('Contenido Fuerte', wgCategories) > -1) {
        $('#WikiaPageHeader').after('<div id="siteSub" class="fuerte"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Advertencia:</span> El contenido en este art�culo no es apto para personas menores de edad o personas sensibles.</div>');
    } else if ($.inArray('Contenido Cuestionable', wgCategories) > -1) {
        $('#WikiaPageHeader').after('<div id="siteSub" class="cuestionable"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Advertencia:</span> La descripci�n de este articulo contiene informaci�n cuestionable que no est� confirmado por el autor, pero est� basado en el punto de vista de uno o varios usuarios.</div>');
    } else if ($.inArray('Contenido de Wikia Aliada', wgCategories) > -1) {
        var interwiki = ($('.interwikidata').data('interwiki') || 'es.theevilliouschronicles');
        var wiki = ($('.interwikidata').data('wiki') || 'Wiki The Evillious Chronicles');
        $('#WikiaPageHeader').after('<div id="siteSub" class="interwiki"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Atenci�n:</span> Este art�culo contiene informaci�n extra�da de una de nuestras wikias aliadas<br/><div style="width: 100%; border-top: 1px solid #000;"> Visita <a href="/wiki/w:c:' + interwiki + '">' + wiki + '</a> para m�s informaci�n.</div></div>');
    }
});
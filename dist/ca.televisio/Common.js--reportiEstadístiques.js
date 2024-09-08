/** <pre>
 * Special page report
 * For those of us too lazy to check the actual pages.
 * 
 * by [[User:Cåm]].
 * Thanks to [[w:User:Mathmagician]] for tips and help.
 */
 
;(function ($, mw) {
 
    function apiQuery() {
        var pages = [
            'BrokenRedirects',
            'DoubleRedirects',
            'Unusedcategories',
            'Unusedimages',
            'Wantedcategories',
            'Wantedfiles',
            'Wantedpages',
            'Wantedtemplates',
            'Uncategorizedcategories',
            'Uncategorizedimages',
            'Uncategorizedpages',
            'Uncategorizedtemplates'
        ],
        i;
 
        // Search for '* list=querypage (qp) *'
        // Will return a maximum of 500 results
 
        for (i = 0; i < pages.length; i++) {
            (function (i) {
                $.getJSON('/api.php?action=query&list=querypage&qppage=' + pages[i] + '&qplimit=500&format=json', function (data) {
                    $('#' + pages[i]).text(data.query.querypage.results.length);
                });
            }(i));
        }
    }
 
    $(function () {
 
        // Will also run elsewhere, see page for implementation
        if (document.getElementsByClassName('specialMaintenance').length) {
            apiQuery();
        }
 
        // Run on Especial:PáginasEspeciales too
        // per request - rs.wikia.com/?diff=8052917
        if (mw.config.get('wgCanonicalSpecialPageName') === 'PáginasEspeciales') {
            $('#mw-content-text').before('<div id="spreport">' +
                '<div><a href="/wiki/Especial:RedireccionesRotas" title ="Especial:RedireccionesRotas" target="_blank">Redirecciones rotas (<span id="BrokenRedirects"></span>)</a> &bull; <a href="/wiki/Especial:RedireccionesDobles" title ="Especial:RedireccionesDobles" target="_blank">Redirecciones dobles (<span id="DoubleRedirects"></span>)</a> &bull; <a href="/wiki/Especial:CategoríasSinUso" title ="Especial:CategoríasSinUso" target="_blank">Categorías sin uso (<span id="Unusedcategories"></span>)</a> &bull; <a href="/wiki/Especial:ImágenesSinUso" title ="ImágenesSinUso" target="_blank">Imágenes sin uso (<span id="Unusedimages"></span>)</div>' +
                '<div><a href="/wiki/Especial:CategoríasRequeridas" title ="Especial:CategoríasRequeridas" target="_blank">Categorías requeridas (<span id="Wantedcategories"></span>)</a> &bull; <a href="/wiki/Especial:ArchivosRequeridos" title ="Especial:ArchivosRequeridos" target="_blank">Archivos requeridos (<span id="Wantedfiles"></span>)</a> &bull; <a href="/wiki/Especial:PáginasRequeridas" title ="Especial:PáginasRequeridas" target="_blank">Páginas requeridas (<span id="Wantedpages"></span>)</a> &bull; <a href="/wiki/Especial:PlantillasRequeridas" title ="Especial:PlantillasRequeridas" target="_blank">Plantillas requeridas (<span id="Wantedtemplates"></span>)</a></div>' +
            '</div>');
            apiQuery();
        }
 
        if (mw.config.get('wgCanonicalSpecialPageName') === 'AdminDashboard') {
            $('#mw-content-text').before('<div id="spreport">' +
                '<div><a href="/wiki/Especial:RedireccionesRotas" title ="Especial:RedireccionesRotas" target="_blank">Redirecciones rotas (<span id="BrokenRedirects"></span>)</a> &bull; <a href="/wiki/Especial:RedireccionesDobles" title ="Especial:RedireccionesDobles" target="_blank">Redirecciones dobles (<span id="DoubleRedirects"></span>)</a> &bull; <a href="/wiki/Especial:CategoríasSinUso" title ="Especial:CategoríasSinUso" target="_blank">Categorías sin uso (<span id="Unusedcategories"></span>)</a> &bull; <a href="/wiki/Especial:ImágenesSinUso" title ="ImágenesSinUso" target="_blank">Imágenes sin uso (<span id="Unusedimages"></span>)</div>' +
                '<div><a href="/wiki/Especial:CategoríasRequeridas" title ="Especial:CategoríasRequeridas" target="_blank">Categorías requeridas (<span id="Wantedcategories"></span>)</a> &bull; <a href="/wiki/Especial:ArchivosRequeridos" title ="Especial:ArchivosRequeridos" target="_blank">Archivos requeridos (<span id="Wantedfiles"></span>)</a> &bull; <a href="/wiki/Especial:PáginasRequeridas" title ="Especial:PáginasRequeridas" target="_blank">Páginas requeridas (<span id="Wantedpages"></span>)</a> &bull; <a href="/wiki/Especial:PlantillasRequeridas" title ="Especial:PlantillasRequeridas" target="_blank">Plantillas requeridas (<span id="Wantedtemplates"></span>)</a></div>' +
            '</div>');
            apiQuery();
        }
    });
 
}(jQuery, mediaWiki));
 
/* </pre> */
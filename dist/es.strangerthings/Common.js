/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
mw.loader.using('mediawiki.util').then(function() {
    mw.hook('discussionsModule.added').add(function() {
        // Module addition
        if ($('.insights-module').exists()) {
            $('#WikiaRail .discussions-rail-theme').insertBefore('.insights-module');
        } else {
            $('#WikiaRail .discussions-rail-theme').appendTo('#WikiaRail');
        }
    });
});

//Configuraciones para pagePreview
window.pPreview = {
    defimage: 'https://vignette.wikia.nocookie.net/strangerthings/images/3/33/2017_10_05_03_15_57.gif/revision/latest?cb=20171005064737&path-prefix=es',
    noimage: 'https://vignette.wikia.nocookie.net/strangerthings/images/8/89/Wiki-wordmark.png/revision/latest?cb=20161006182334&path-prefix=es',
};
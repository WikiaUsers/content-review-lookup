require([
    'wikia.window',
    'wikia.document',
    'jquery',
    'mw'
], function(window, document, $, mw){
    const $TOC = $('#toc');
    if (window.tocLoaded || $TOC.length) return;
    window.tocLoaded = true;
    
    const $PAGE = $('#WikiaPage');
    const $RAIL = $('#WikiaRail')
});
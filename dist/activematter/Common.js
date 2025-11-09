mw.loader.using('jquery.makeCollapsible', function () {
    $('.customaccordion-toggle').on('click', function () {
        var thisId = $(this).attr('class').match(/mw-customtoggle-(\S+)/)[1];
        // Ukryj zawartość każdej sekcji
        $('.customaccordion-collapsible').find('.mw-collapsible-content').hide();
        // -> ZAWSZE pokaż wybraną
        $('#mw-customcollapsible-' + thisId).find('.mw-collapsible-content').show();
    });
});
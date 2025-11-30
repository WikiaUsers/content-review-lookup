mw.loader.using('jquery', function () {
    $('.portable-infobox .collapsible-stats .collapsible-header')
        .on('click', function () {
            $(this).closest('.collapsible-stats').toggleClass('collapsed');
        });
});
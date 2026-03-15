mw.hook('wikipage.content').add(function ($content) {

    $content.find('.EmulatorFrame:not(.loaded)').each(function () {

        $(this)
            .addClass('loaded')
            .html('<iframe src="https://vik22.altervista.org/WS_Builds/index.php"></iframe>');

    });

});
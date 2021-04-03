mw.hook('wikipage.content').add(function($content) {
    $content.find('.EmulatorFrame:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 850,
                scrolling: 'no',
                src: 'https://www.maprunner.info/michigan/black-river',
                width: 850
            })
        ).addClass('loaded');
    });
});
//Original source for a base of the script https://dev.fandom.com/wiki/Thread:17210 by user KockaAdmiralac
//testing for integration MapRunner site functions into wiki made by DeviousD
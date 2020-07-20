mw.hook('wikipage.content').add(function($content) {
    $content.find('.IFrame:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 540,
                scrolling: 'no',
                src: 'https://brawlstats.com',
                width: 720
            })
        ).addClass('loaded');
    });
});
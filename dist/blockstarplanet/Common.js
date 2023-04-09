/* Any JavaScript here will be loaded for all users on every page load. */
/* iFrame */
mw.hook('wikipage.content').add(function($content) {
    $content.find('.EmulatorFrame:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 540,
                scrolling: 'no',
                src: 'static.arcadespot.com/embed/wwf-no-mercy/',
                width: 720
            })
        ).addClass('loaded');
    });
});
/* iFrame END */
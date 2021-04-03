/*
 Adapted from StrawpollIntegrator: https://dev.fandom.com/wiki/StrawpollIntegrator
 Thanks Manuel de la Fuente!
*/
 
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.poll-maker').each(function() {
        var $this = $(this),
            id = $this.attr('data-poll-id'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://www.poll-maker.com/frame' + id,
                css: css,
                seamless: 'seamless',
                frameborder: 'no'
            })
        );
    });
});
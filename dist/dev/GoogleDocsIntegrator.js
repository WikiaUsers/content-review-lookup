//Based on VideoIntegrator's JS code, modified for google docs support.
//Google slides integrator will be made in the future as separate JS.
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('[data-widget-id]:not(.loaded)').each(function() {
        var $this = $(this),
            id = encodeURIComponent($this.attr('data-widget-id')),
            css = {
                width: 'inherit',
                height: 'inherit',
                marginheight: '0px',
                marginwidth: '0px'
            };
        switch($this.attr('class')) {
            case 'EmbeddedGoogleDoc':
                $this.html(
                    $('<iframe>', {
                        src: 'https://docs.google.com/document' + '/d/e/' + id + '/pub?embedded=true',
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        allowfullscreen: true
                    })
                );
                break;
        }
        $this.addClass('loaded');
    });
});
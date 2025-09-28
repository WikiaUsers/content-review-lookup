//Based on VideoIntegrator's JS code, modified for scratch support.
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('[data-widget-id]:not(.loaded)').each(function() {
        var $this = $(this),
            id = encodeURIComponent($this.attr('data-widget-id')),
            css = {
                width: 'inherit',
                height: 'inherit'
            };
        switch($this.attr('class')) {
            case 'ScratchEmbeddedProject':
                $this.html(
                    $('<iframe>', {
                        src: 'https://scratch.mit' + '.edu/projects/' + id +'/embed',
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        allowfullscreen: true
                    })
                );
                break;
            case 'TurbowarpEmbeddedProject':
                $this.html(
                    $('<iframe>', {
                        src: 'https://turbowarp' + '.org/' + id +'/embed?settings-button&addons=pause',
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
mw.hook('wikipage.content').add(function($content) {
    if (!$content || !$content.length) {
        return;
    }
    $content.find('[data-widget-id]:not(.loaded)').each(function() {
        var $this = $(this),
            id = encodeURIComponent($this.attr('data-widget-id')),
            dark = mw.config.get('isDarkTheme'),
            css = {
                width: 'inherit',
                height: 'inherit'
            };
        switch($this.attr('class')) {
            // Refused to frame 'https://media.myspace.com/' because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'self'".
            // case 'MyspaceMusic':
            //     $this.html(
            //         $('<iframe>', {
            //             src: 'https://media.myspace.com/play/song/' + id,
            //             css: css,
            //             frameborder: 0,
            //             allowfullscreen: true
            //         })
            //     );
            //     break;
            case 'Vocaroo':
                $this.html(
                    $('<iframe>', {
                        css: css,
                        src: 'https://vocaroo.com/embed/' + id + '?autoplay=0',
                        frameborder: 0
                    })
                );
                break;
            case 'Simplecast':
                $this.html(
                    $('<iframe>', {
                        src: 'https://player.simplecast.com/' + id + (dark ? '?dark=true' : ''),
                        css: css,
                    })
                );
                break;
            }
        $this.addClass('loaded');
    });
});
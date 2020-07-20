// <nowiki>
mw.hook('wikipage.content').add(function($content) {
    if (!$content || !$content.length) {
        return;
    }
    $content.find('[data-widget-id]:not(.loaded)').each(function() {
        var $this = $(this),
            id = encodeURIComponent($this.attr('data-widget-id')),
            dark = $this.attr('data-widget-dark'),
            css = {
                width: 'inherit',
                height: 'inherit'
            };
        switch($this.attr('class')) {
            case 'MyspaceMusic':
                $this.html(
                    $('<iframe>', {
                        src: 'https://media.myspace.com/play/song/' + id,
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'Vocaroo':
                var url = 'https://vocaroo.com/player.swf?playMediaID=' + id + '&autoplay=0';
                $this.html(
                    $('<object>', {
                        css: css
                    }).append(
                        $('<param>', {
                            name: 'movie',
                            value: url
                        }),
                        $('<param>', {
                            name: 'wmode',
                            value: 'transparent'
                        }),
                        $('<embed>', {
                            src: url,
                            css: css,
                            wmode: 'transparent',
                            type: 'application/x-shockwave-flash'
                        })
                    )
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
//Based on VideoIntegrator's JS code, modified for desmos support.
//The Alt of EmbeddedDesmosGraph will not have the menu thingy off to the side, I couldn't figure out how to remove this for 3D and Geom.
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
            case 'EmbeddedDesmosGraphMain':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.desmos' + '.com/calculator/' + id,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        allowfullscreen: true
                    })
                );
                break;
            case 'EmbeddedDesmosGraphAlt':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.desmos' + '.com/calculator/' + id + '?embed',
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        allowfullscreen: true
                    })
                );
                break;
            case 'EmbeddedDesmosGeometry':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.desmos.com' + '/geometry/' + id,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        allowfullscreen: true
                    })
                );
                break;
            case 'EmbeddedDesmos3D':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.desmos.com' + '/3d/' + id,
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
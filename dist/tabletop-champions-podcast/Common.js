/* Any JavaScript here will be loaded for all users on every page load. */
/* This code is originally from dev.fandom.com 
   It is a modified version of the Audiointegrator
   https://dev.fandom.com/wiki/MediaWiki:AudioIntegrator/AudioIntegrator.js
   The goal here is to integrate the Simplecast player which is used by the Tabletop Champions website */

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
            case 'MyspaceMusic':
                $this.html(
                    $('<iframe>', {
                        src: 'https://media.myspace.com/play/song/' + id,
                        css: css,
                        frameborder: 0,
                        allowfullscreen: false
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
                        src: 'https://player.simplecast.com/' + id + '?dark=true',
                        css: css,
                    })
                );
        }
        $this.addClass('loaded');
    });
});
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
            case 'Crackle':
                $this.html(
                    $('<iframe>', {
                        // Phalanx block #430446
                        src: 'https://www.crack' + 'le.com/embed/' + id,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        allowfullscreen: true
                    })
                );
                break;
            case 'Facebook':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.facebook.com/video/embed?video_id=' + id,
                        frameboder: 0,
                        width: $this.attr('data-width') || 1280,
                        height: $this.attr('data-height') || 720
                    })
                 );
                break;
            case 'myvi':
                $this.html(
                    $('<iframe>', {
                        src: 'https://myvi.ru/player/embed/html/' + id,
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                   );
                break;
            case 'fembed':
                $this.html(
                    $('<iframe>', {
                        src: 'https://femax20.com/v/' + id,
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                    break;
            case 'ok.ru':
                $this.html(
                    $('<iframe>', {
                        src: 'https://ok.ru/videoembed/' + id,
                         frameborder: 0,
                        css: css
                    }) 
                );
                break;
            case 'afreeca':
                $this.html(
                    $('<iframe>', {
                        src: 'https://play.afreecatv.com/' + id + '/embed',
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'internetArchive':
                $this.html(
                    $('<iframe>', {
                        src: 'https://archive.org/embed/' + id,
                        css: css,
                        frameboder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'web.tv':
                $this.html(
                    $('<iframe>', {
                        src: 'https://fandomcntr.web.tv/embed/' + id,
                         frameborder: 0,
                        css: css,
                        autoplay: 0,
                        allowfullscreen: true

                    })
                );
                break;
            case 'YahooTV':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.yahoo.com/tv/v/' + id + '?format=embed',
                        css: css,
                        allowfullscreen: true,
                        allowtransparency: true
                    })
                );
              break;
            case 'YoutubePlaylist':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.youtube.com/embed/' + id + '?list=' + encodeURIComponent($this.attr('data-list-id')),
                        css: css,
                        frameboder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'WikimediaCommons':
                $this.html(
                    $('<iframe>', {
                        src: 'https://commons.wikimedia.org/wiki/File%3A' + id + '?embedplayer=yes',
                        css: css,
                        frameborder: 0
                    })
                           );
                break;
            case 'Sibnet':
                $this.html(
                    $('<iframe>', {
                        src: 'https://video.sibnet.ru/shell.php?videoid=' + id + '&share=0',
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'funnyordie':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.funnyordie.com/embed/' + id,
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                 break;
            case 'viloud':
                $this.html(
                    $('<iframe>', {
                        src:'//app.viloud.tv/player/embed/video/' + id,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        height: '100%',
                        width: '100%'
                    })
                );
                break;
            case 'TwitchStream':
                $this.html(
                    $('<iframe>', {
                        src: 'https://player.twitch.tv/?channel=' + id + '&parent=' + window.location.hostname,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        height: 378,
                        width: 620
                    })
                );
                break;
            case 'ellenTube':
                $this.html(
                    $('<iframe>', {
                        src: 'https://widgets.ellentube.com/videos/' + id + '/',
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'fandom':
                // TODO: FANDOM has switched to JWPlayer instead of Ooyala and there's a <jwplayer> parser tag
                $this.html(
                    $('<iframe>', {
                        src: 'https://player.ooyala.com/iframe.html' + id + '&docUrl=' + encodeURIComponent(window.location.href),
                        css: css,
                        allowfullscreen: true
                    })
                );
                break;
            case 'logo':
                $this.html(
                    $('<iframe>', {
                        src: 'https://media.mtvnservices.com/embed/mgid:arc:video:logotv.com:' + id,
                        frameborder: 0,
                        allowfullscreen: true,
                        css: {
                            width: '520px',
                            height: '288px'
                        }
                    })
                );
                break;
            case 'niconico':
                $this.html(
                    $('<iframe>', {
                        src: 'https://embed.nicovideo.jp/watch/' + id,
                        frameborder: 0,
                        allowfullscreen: true,
                        scrolling: 'no',
                        css: $.extend(css, {
                            border:'solid 1px #ccc'
                        })
                    })
                );
                break;
            case 'periscope':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.periscope.tv/' + id,
                        css: css
                    })
                );
                break;
        }
        $this.addClass('loaded');
    });
});
(function() {
    if (window.YouTubeModalLoaded) {
        return;
    }
    window.YouTubeModalLoaded = true;
    var data = [
        {
            find: 'youtu.be',
            base: 'https://www.youtube.com/embed/',
            id: {
                prefix: '.be/',
                suffix: '?'
            }
        },
        {
            find: 'youtube.com/watch',
            base: 'https://www.youtube.com/embed/',
            id: {
                prefix: '?v=',
                suffix: '&'
            }
        },
        {
            find: 'dai.ly',
            base: 'https://www.dailymotion.com/embed/video/',
            id: {
                prefix: '.ly/',
                suffix: '?'
            }
        },
        {
            find: 'dailymotion.com/video',
            base: 'https://www.dailymotion.com/embed/video/',
            id: {
                prefix: 'video/',
                suffix: '?'
            }
        },
        {
            find: 'vimeo.com',
            base: 'https://player.vimeo.com/video/',
            id: {
                prefix: '.com/',
                suffix: '?'
            }
        }
    ];
    function isPartOfLink(link) {
        return function(val) {
            return link.indexOf(val.find) >= 0;
        };
    }
    function close() {
        $('.yt-cinema-greyout, .yt-cinema-container').remove();
        $('body').removeClass('yt-cinema-playing');
    }
    function click(e) {
        if (e.ctrlKey || e.shiftKey || e.metaKey) {
            return;
        }
        var link = $(e.target).attr('href');
        if (!link || !data.some(isPartOfLink(link))) {
            return;
        }
        var urlParts = data.filter(isPartOfLink(link))[0],
            url = urlParts.base +
                  link.split(urlParts.id.prefix)[1].split(urlParts.id.suffix)[0] +
                  '?autoplay=1';
        e.preventDefault();
        $('body').prepend(
            $('<div>', {
                'class': 'yt-cinema-greyout',
                click: close
            }).append(
                $('<span>', {
                    'class': 'yt-cinema-close',
                    text: '✕'
                })
            ),
            $('<div>', {
                'class': 'yt-cinema-container'
            }).append(
                $('<iframe>', {
                    src: url
                })
            )
        ).addClass('yt-cinema-playing');
    }
    $('body').on('click', 'a', click);
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:YouTubeModal.css'
    });
})();
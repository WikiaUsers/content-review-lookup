(function() {
    if (window.VideoModalLoaded) {
        return;
    }
    window.VideoModalLoaded = true;
    
    function close() {
        $('.video-cinema-greyout, .video-cinema-container').remove();
        $('body').removeClass('video-cinema-playing');
    }

    function showModal(url) {
        $('body').prepend(
            $('<div>', {
                'class': 'video-cinema-greyout',
                click: close
            }).append(
                $('<span>', {
                    'class': 'video-cinema-close',
                    text: '✕'
                })
            ),
            $('<div>', {
                'class': 'video-cinema-container'
            }).append(
                $('<iframe>', {
                    src: url
                })
            )
        ).addClass('video-cinema-playing');
    }

    function handleClick(e) {
        if (e.ctrlKey || e.shiftKey || e.metaKey) {
            return;
        }
        var $target = $(e.target);
        var $container = $target.closest('.video-link');
        if (!$container.length) return;

        var videoId, url;
        
        // Handle NicoVideo
        if ($container.hasClass('nnd-link')) {
            videoId = $container.data('nnd-id');
            if (!videoId) return;
            url = 'https://embed.nicovideo.jp/watch/' + videoId + '?autoplay=1';
        }
        // Handle YouTube
        else if ($container.hasClass('yt-link')) {
            videoId = $container.data('yt-id');
            if (!videoId) return;
            url = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=1';
        }
        else {
            return;
        }

        e.preventDefault();
        showModal(url);
    }

    function initVideoLinks() {
        // Init NicoVideo links
        $('a[href*="nicovideo.jp/watch/"]').each(function() {
            var $link = $(this);
            if ($link.hasClass('video-processed')) return;
            
            var href = $link.attr('href');
            var match = href.match(/watch\/(sm\d+)/);
            if (match) {
                $link.addClass('video-processed')
                     .wrap('<span class="video-link nnd-link" data-nnd-id="' + match[1] + '"></span>');
            }
        });

        // Init YouTube links
        $('a[href*="youtube.com/watch"], a[href*="youtu.be/"]').each(function() {
            var $link = $(this);
            if ($link.hasClass('video-processed')) return;
            
            var href = $link.attr('href');
            var match = href.match(/(?:v=|be\/)([a-zA-Z0-9_-]+)/);
            if (match) {
                $link.addClass('video-processed')
                     .wrap('<span class="video-link yt-link" data-yt-id="' + match[1] + '"></span>');
            }
        });
    }

    $('body').on('click', '.video-link', handleClick);
    
    $(document).ready(initVideoLinks);
    
    mw.hook('wikipage.content').add(initVideoLinks);

    importArticle({
        type: 'style',
        article: 'MediaWiki:Css/NvBox.css'
    });
})();
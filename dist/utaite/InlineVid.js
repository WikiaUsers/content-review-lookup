(function() {
    if (window.VideoModalLoaded) {
        return;
    }
    window.VideoModalLoaded = true;
    
    function close() {
        $('.video-container').remove();
        $('body').removeClass('video-playing');
    }

    function showVideo(url, $targetLink) {
        // Close any existing video
        close();
        
        // Create container after the link's parent paragraph or div
        var $container = $targetLink.closest('p, div');
        $container.after(
            $('<div>', {
                'class': 'video-container'
            }).append(
                $('<div>', {
                    'class': 'video-header'
                }).append(
                    $('<span>', {
                        'class': 'video-close',
                        text: '✕',
                        click: close
                    })
                ),
                $('<iframe>', {
                    src: url
                })
            )
        );
        
        $('body').addClass('video-playing');
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
            url = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=0';
        }
        else {
            return;
        }

        e.preventDefault();
        showVideo(url, $target);
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
        article: 'MediaWiki:Css/InlineVid.css'
    });
})();
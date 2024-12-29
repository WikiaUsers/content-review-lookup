// expands YouTubeModal to support Niconico and Bilibili
// based on YouTubeModal, authors: https://dev.fandom.com/wiki/MediaWiki:YouTubeModal/code.js?action=history

(function() {
    if (window.YouTubeModalLoaded) {
        return;
    }
    window.YouTubeModalLoaded = true;
    const videoPlatforms = [
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
        },
        {
            find: 'nicovideo.jp/watch',
            base: 'https://embed.nicovideo.jp/watch/',
            id: {
                prefix: 'watch/',
                suffix: '?'
            }
        },
        {
            find: 'bilibili.com/video',
            base: 'https://player.bilibili.com/player.html?isOutside=true&bvid=',
            id: {
                prefix: 'video/',
                suffix: '?'
            }
        }
    ];
    function isVideoLink(link) {
        return videoPlatforms.find((platform) => link.includes(platform.find));
    }
    function parseVideoURL(link) {
        const platform = isVideoLink(link);
        if (!platform) return null;
        try {
            const videoID = link.split(platform.id.prefix)[1].split(platform.id.suffix)[0];
            return `${platform.base}${videoID}`;
        } catch {
            return null;
        }
    }
    function closeModal() {
        document.querySelectorAll('.yt-cinema-greyout, .yt-cinema-container').forEach(el => el.remove());
        document.body.classList.remove('yt-cinema-playing');
    }
    function showModal(url) {
        const greyout = document.createElement('div');
        greyout.className = 'yt-cinema-greyout';
        greyout.addEventListener('click', closeModal);

        const closeButton = document.createElement('span');
        closeButton.className = 'yt-cinema-close';
        closeButton.textContent = '✕';

        const container = document.createElement('div');
        container.className = 'yt-cinema-container';

        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.title = 'Video Player';
        iframe.allow = 'autoplay; fullscreen';

        container.appendChild(iframe);
        greyout.appendChild(closeButton);
        document.body.prepend(greyout, container);
        document.body.classList.add('yt-cinema-playing');
    }
    document.body.addEventListener('click', (e) => {
        if (e.ctrlKey || e.shiftKey || e.metaKey) return;
        const link = e.target.closest('a')?.href;
        if (!link) return;

        const videoURL = parseVideoURL(link);
        if (videoURL) {
            e.preventDefault();
            showModal(videoURL);
        }
    });
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:YouTubeModal.css'
    });
})();
// Expands YouTubeModal to support Niconico and Bilibili
// Based on YouTubeModal, authors: https://dev.fandom.com/wiki/MediaWiki:YouTubeModal/code.js?action=history

(function() {
    if (window.YouTubeModalLoaded) {
        return;
    }
    window.YouTubeModalLoaded = true;

    const videoPlatforms = [
        {
            regex: /youtu\.be\/([^?&]+)/,
            base: 'https://www.youtube.com/embed/$1'
        },
        {
            regex: /youtube\.com\/watch\?v=([^?&]+)/,
            base: 'https://www.youtube.com/embed/$1'
        },
        {
            regex: /dai\.ly\/([^?&]+)/,
            base: 'https://www.dailymotion.com/embed/video/$1'
        },
        {
            regex: /dailymotion\.com\/video\/([^?&]+)/,
            base: 'https://www.dailymotion.com/embed/video/$1'
        },
        {
            regex: /vimeo\.com\/([^?&]+)/,
            base: 'https://player.vimeo.com/video/$1'
        },
        {
            regex: /nicovideo\.jp\/watch\/([^?&]+)/,
            base: 'https://embed.nicovideo.jp/watch/$1'
        },
        {
            regex: /bilibili\.com\/video\/([^?&]+)/,
            base: 'https://player.bilibili.com/player.html?isOutside=true&bvid=$1'
        }
    ];

    function isVideoLink(link) {
        return videoPlatforms.find((platform) => platform.regex.test(link));
    }

    function parseVideoURL(link) {
        const platform = isVideoLink(link);
        if (!platform) return null;

        try {
            const match = link.match(platform.regex);
            return match ? platform.base.replace('$1', match[1]) : null;
        } catch (error) {
            console.error('Error parsing video URL:', link, error);
            return null;
        }
    }

    function closeModal() {
        document.querySelectorAll('.yt-cinema-greyout, .yt-cinema-container').forEach(el => el.remove());
        document.body.classList.remove('yt-cinema-playing');
    }

    function showModal(url) {
        closeModal(); // Ensure only one modal is open

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
        iframe.frameBorder = '0';

        container.appendChild(iframe);
        greyout.appendChild(closeButton);
        greyout.appendChild(container);
        document.body.prepend(greyout);
        document.body.classList.add('yt-cinema-playing');
    }

    document.body.addEventListener('click', (e) => {
        if (e.ctrlKey || e.shiftKey || e.metaKey) return;

        const link = e.target.closest('a');
        if (!link || !link.href) return;

        const videoURL = parseVideoURL(link.href);
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
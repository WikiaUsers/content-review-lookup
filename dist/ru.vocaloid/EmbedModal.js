// Expands YouTubeModal to support Niconico and Bilibili
// Based on YouTubeModal, authors: https://dev.fandom.com/wiki/MediaWiki:YouTubeModal/code.js?action=history

(function() {
    if (window.YouTubeModalLoaded) {
        return;
    }
    window.YouTubeModalLoaded = true;

    var videoPlatforms = [
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
        return videoPlatforms.some(function(platform) {
            return platform.regex.test(link);
        });
    }

    function getMatchingPlatform(link) {
        return videoPlatforms.filter(function(platform) {
            return platform.regex.test(link);
        })[0];
    }

    function parseVideoURL(link) {
        var platform = getMatchingPlatform(link);
        if (!platform) return null;

        try {
            var match = link.match(platform.regex);
            return match ? platform.base.replace('$1', match[1]) : null;
        } catch (error) {
            console.error('Error parsing video URL:', link, error);
            return null;
        }
    }

    function closeModal() {
        var elements = document.querySelectorAll('.yt-cinema-greyout, .yt-cinema-container');
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
        document.body.classList.remove('yt-cinema-playing');
    }

    function showModal(url) {
        closeModal(); // Ensure only one modal is open

        var greyout = document.createElement('div');
        greyout.className = 'yt-cinema-greyout';
        greyout.addEventListener('click', closeModal);

        var closeButton = document.createElement('span');
        closeButton.className = 'yt-cinema-close';
        closeButton.textContent = '✕';

        var container = document.createElement('div');
        container.className = 'yt-cinema-container';

        var iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.title = 'Video Player';
        iframe.allow = 'autoplay; fullscreen';
        iframe.frameBorder = '0';

        container.appendChild(iframe);
        greyout.appendChild(closeButton);
        greyout.appendChild(container);
        document.body.insertBefore(greyout, document.body.firstChild);
        document.body.classList.add('yt-cinema-playing');
    }

    document.body.addEventListener('click', function(e) {
        if (e.ctrlKey || e.shiftKey || e.metaKey) return;

        var link = e.target;
        while (link && link.tagName !== 'A') {
            link = link.parentNode;
        }
        
        if (!link || !link.href) return;

        var videoURL = parseVideoURL(link.href);
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
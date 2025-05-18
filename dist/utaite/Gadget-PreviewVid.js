(function() {
    if (window.VideoPreviewLoaded) {
        return;
    }
    window.VideoPreviewLoaded = true;

    function createPreviewElement() {
        var preview = document.createElement('div');
        preview.className = 'video-preview-container';
        
        var iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '1');
        
        preview.appendChild(iframe);
        document.body.appendChild(preview);
        
        return {
            container: preview,
            iframe: iframe
        };
    }

    var previewElements = createPreviewElement();
    var hideTimeout;

    function getVideoDetails(href) {
        // YouTube detection
        var ytMatch = href.match(/(?:v=|be\/)([a-zA-Z0-9_-]+)/);
        if (ytMatch) {
            return {
                type: 'youtube',
                id: ytMatch[1],
                embedUrl: 'https://www.youtube.com/embed/' + ytMatch[1] + '?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0'
            };
        }

        // NicoNico detection
        var nndMatch = href.match(/(?:nicovideo\.jp\/watch\/)?(sm\d+)/);
        if (nndMatch) {
            return {
                type: 'niconico',
                id: nndMatch[1],
                embedUrl: 'https://embed.nicovideo.jp/watch/' + nndMatch[1] + '?autoplay=1&mute=1'
            };
        }

        return null;
    }

    function showPreview(event) {
        var target = event.target;
        var href = target.getAttribute('href');
        var videoDetails = getVideoDetails(href);
        
        if (!videoDetails) {
            return;
        }

        // Clear any existing hide timeout
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }

        // Position the preview
        var rect = target.getBoundingClientRect();
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        previewElements.container.style.top = (rect.bottom + scrollTop + 10) + 'px';
        previewElements.container.style.left = (rect.left + scrollLeft) + 'px';
        
        // Add appropriate class for styling
        previewElements.container.className = 'video-preview-container ' + videoDetails.type;
        
        // Set the iframe source
        previewElements.iframe.src = videoDetails.embedUrl;
        
        // Show the preview
        previewElements.container.style.display = 'block';
    }

    function hidePreview() {
        // Set a timeout to hide the preview
        hideTimeout = setTimeout(function() {
            previewElements.container.style.display = 'none';
            previewElements.iframe.src = '';
        }, 300);
    }

    function initVideoLinks() {
        // Select both YouTube and NicoNico links
        var links = document.querySelectorAll(
            'a[href*="youtube.com/watch"], ' + 
            'a[href*="youtu.be/"], ' + 
            'a[href*="nicovideo.jp/watch/"]'
        );
        
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (link.getAttribute('data-preview-initialized')) {
                continue;
            }
            
            var href = link.getAttribute('href');
            if (!getVideoDetails(href)) {
                continue;
            }
            
            link.setAttribute('data-preview-initialized', 'true');
            link.addEventListener('mouseenter', showPreview);
            link.addEventListener('mouseleave', hidePreview);
        }
        
        // Prevent preview from hiding when mouse is over it
        previewElements.container.addEventListener('mouseenter', function() {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
        });
        
        previewElements.container.addEventListener('mouseleave', hidePreview);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initYoutubeLinks);
    } else {
        initVideoLinks();
    }

    // Re-initialize when new content is loaded
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initVideoLinks();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
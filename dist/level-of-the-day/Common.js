/* Any JavaScript here will be loaded for all users on every page load. */
/**
 * Video & Audio Lightbox
 * Supports YouTube and SoundCloud*/

(function() {
    'use strict';
    
    var config = {
        overlayColor: 'rgba(0, 0, 0, 0.9)',
        maxWidth: 900,
        maxHeight: 506,
        soundCloudHeight: 166
    };
    
    function createLightbox(embedUrl, type) {
        var existing = document.getElementById('media-lightbox');
        if (existing) existing.remove();
        
        var overlay = document.createElement('div');
        overlay.id = 'media-lightbox';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = config.overlayColor;
        overlay.style.zIndex = '10000';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.padding = '20px';
        overlay.style.boxSizing = 'border-box';
        
        var container = document.createElement('div');
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.maxWidth = config.maxWidth + 'px';
        container.style.background = '#000';
        container.style.borderRadius = '8px';
        container.style.overflow = 'hidden';
        
        if (window.innerWidth <= 768) {
            container.style.maxWidth = '95%';
        }
        
        var closeBtn = document.createElement('button');
        closeBtn.textContent = '\u00D7';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '-50px';
        closeBtn.style.right = '0';
        closeBtn.style.width = '40px';
        closeBtn.style.height = '40px';
        closeBtn.style.background = 'transparent';
        closeBtn.style.border = '2px solid #fff';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.color = '#fff';
        closeBtn.style.fontSize = '28px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.zIndex = '10001';
        closeBtn.style.padding = '0';
        closeBtn.style.lineHeight = '40px';
        
        closeBtn.onmouseenter = function() {
            this.style.backgroundColor = '#fff';
            this.style.color = '#000';
        };
        closeBtn.onmouseleave = function() {
            this.style.backgroundColor = 'transparent';
            this.style.color = '#fff';
        };
        
        var iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        
        if (type === 'youtube') {
            iframe.height = '506';
            iframe.src = embedUrl + '?autoplay=1&rel=0';
            container.style.aspectRatio = '16/9';
        } else if (type === 'soundcloud') {
            iframe.height = config.soundCloudHeight + 'px';
            iframe.src = embedUrl;
            iframe.setAttribute('scrolling', 'no');
            container.style.maxWidth = '600px';
        }
        
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.style.display = 'block';
        
        container.appendChild(closeBtn);
        container.appendChild(iframe);
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        requestAnimationFrame(function() {
            overlay.style.opacity = '1';
        });
        
        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeLightbox();
        });
        
        document.addEventListener('keydown', handleKeydown);
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        var overlay = document.getElementById('media-lightbox');
        if (!overlay) return;
        
        overlay.style.opacity = '0';
        setTimeout(function() {
            overlay.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeydown);
        }, 300);
    }
    
    function handleKeydown(e) {
        if (e.key === 'Escape') closeLightbox();
    }
    
    function getYouTubeId(url) {
        var match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    }
    
    function getSoundCloudEmbedUrl(url) {
        // SoundCloud URLs need to be converted to embed format
        // https://soundcloud.com/artist/track -> https://w.soundcloud.com/player/?url=https://soundcloud.com/artist/track
        if (url.match(/soundcloud\.com/)) {
            return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) + '&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true';
        }
        return null;
    }
    
    function init() {
        // YouTube links
        var ytLinks = document.querySelectorAll('a[href*="youtube.com/watch"], a[href*="youtu.be/"]');
        ytLinks.forEach(function(link) {
            if (link.dataset.lightbox) return;
            link.dataset.lightbox = 'true';
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var videoId = getYouTubeId(this.href);
                if (videoId) {
                    createLightbox('https://www.youtube.com/embed/' + videoId, 'youtube');
                } else {
                    window.open(this.href, '_blank');
                }
            });
        });
        
        // SoundCloud links
        var scLinks = document.querySelectorAll('a[href*="soundcloud.com"]');
        scLinks.forEach(function(link) {
            if (link.dataset.lightbox) return;
            link.dataset.lightbox = 'true';
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var embedUrl = getSoundCloudEmbedUrl(this.href);
                if (embedUrl) {
                    createLightbox(embedUrl, 'soundcloud');
                } else {
                    window.open(this.href, '_blank');
                }
            });
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    var observer = new MutationObserver(function() {
        init();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
})();
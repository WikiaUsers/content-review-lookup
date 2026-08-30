/* Any JavaScript here will be loaded for all users on every page load */

/* Video Lightbox */

document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.video-lightbox-trigger');
    if (!trigger) return;
    e.preventDefault();

    var videoUrl = trigger.getAttribute('data-video');
    if (!videoUrl) return;

    var overlay = document.createElement('div');
    overlay.className = 'video-lightbox-overlay';
    overlay.innerHTML =
        '<div class="video-lightbox-box">' +
            '<span class="video-lightbox-close">&times;</span>' +
            '<video src="' + videoUrl + '" controls autoplay playsinline></video>' +
        '</div>';

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    function closeLightbox() {
        overlay.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', escHandler);
    }

    function escHandler(e) {
        if (e.key === 'Escape') closeLightbox();
    }

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target.classList.contains('video-lightbox-close')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', escHandler);
});
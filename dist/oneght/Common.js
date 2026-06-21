/* Any JavaScript here will be loaded for all users on every page load. */

document.querySelectorAll('.hover-video').forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});
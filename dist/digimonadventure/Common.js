/* ==========================================================
   Slideshow automatic transitions
   ========================================================== */
   
   console.log("Common.js test loaded");
$(function () {
    document.querySelectorAll('.wikia-slideshow').forEach(function (slideshow) {
        if (slideshow.dataset.autoSlideTimer) {
            return;
        }

        slideshow.dataset.autoSlideTimer = window.setInterval(function () {
            if (document.hidden || !slideshow.isConnected ||
                slideshow.matches(':hover')) {
                return;
            }

            var next = slideshow.querySelector('.wikia-slideshow-next');

            if (next) {
                next.click();
            }
        }, 5000);
    });
});

/* ==========================================================
   Special Move — Collapse TOC on initial page load
   ========================================================== */

if (mw.config.get('wgPageName') === 'Special_Move') {
    $(function () {
        var checkbox = document.getElementById('toctogglecheckbox');

        if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
}
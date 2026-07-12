/* Any JavaScript here will be loaded for all users on every page load. */

/* SFX Toggle */
(function() {
    function init() {
        document.addEventListener('click', function(e) {
            var btn = e.target.closest('.audio-toggle-btn');
            if (!btn) return;
            var controls = btn.closest('.audio-controls');
            if (!controls) return;
            var oggAudio = controls.querySelector('audio.OggPlayer-Audio');
            var mwAudio = controls.querySelector('audio.mw-file-element');
            var audioButton = controls.querySelector('.audio-button');
            var isSwapped = controls.classList.contains('audio-swapped');
            if (!controls.dataset.mwFile1Stored && oggAudio) {
                controls.dataset.mwFile1Stored = oggAudio.src;
            }
            var file1 = controls.dataset.mwFile1Stored;
            var file2 = btn.getAttribute('title');
            if (!file2) return;
            if (audioButton) audioButton.classList.remove('now-playing');
            [oggAudio, mwAudio].forEach(function(el) {
                if (el) { el.pause(); el.currentTime = 0; }
            });
            var newSrc = isSwapped ? file1 : file2;
            if (oggAudio) oggAudio.src = newSrc;
            if (mwAudio) mwAudio.src = newSrc;
            controls.classList.toggle('audio-swapped');
            btn.classList.toggle('active');
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
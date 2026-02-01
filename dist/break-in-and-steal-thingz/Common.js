(function() {
    if (mw.config.get('wgPageName') !== 'The_Adversary') return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;width:100vw;height:100vh;pointer-events:none;';
    document.body.appendChild(canvas);

    let w, h, columns;
    const fontSize = 16;
    const drops = [];
    const waveOffsets = []; 

    function init() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        columns = Math.floor(w / fontSize);
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
            waveOffsets[i] = Math.random() * 100;
        }
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = Math.floor(Math.random() * 10);
            const x = i * fontSize + Math.sin(drops[i] * 0.1 + waveOffsets[i]) * 10;
            const y = drops[i] * fontSize;

            ctx.fillText(text, x, y);

            if (y > h && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    window.addEventListener('resize', init);
    init();
    setInterval(draw, 33);
})();
window.AddRailModule = [{prepend: true}];

(function () {
'use strict'; 
function tryToPlay(audioEl) {
    if (!audioEl) return; 

    var maybePromise = audioEl.play();
    if (maybePromise && typeof maybePromise.catch === 'function') {
        maybePromise.catch(function (err) {
            if (err.name !== 'AbortError') {
                console.error('Audio play failed:', err);
            }
        });
    }
}

document.addEventListener('click', function (event) {
    var targetEl = event.target;
    var wrapper = targetEl.closest('.jumper-container');

    if (!wrapper) {
        return; 
    }

    var audioUrl = wrapper.getAttribute('data-audio-url');
    if (!audioUrl) return;

    if (!wrapper.audioTrack) {
        var audio = new Audio(audioUrl);
        wrapper.audioTrack = audio;

        audio.addEventListener('ended', function () {
            wrapper.classList.remove('is-jumping');
        });
    }

    wrapper.audioTrack.currentTime = 0;

    wrapper.classList.add('is-jumping');

    tryToPlay(wrapper.audioTrack);
});

document.addEventListener('dblclick', function (event) {
    var wrapper = event.target.closest('.jumper-container');

    if (!wrapper) return;
    if (!wrapper.audioTrack) return;

    wrapper.audioTrack.pause();
    wrapper.audioTrack.currentTime = 0;

    wrapper.classList.remove('is-jumping');
});
})();
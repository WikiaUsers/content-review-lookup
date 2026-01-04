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
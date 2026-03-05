// Daily Shop Timer

(function () {
    const els = () => document.querySelectorAll('.daily-shop');

    function pad(n) {
        return n.toString().padStart(2, '0');
    }

    function update() {
        const now = new Date();
        const next = Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
            0, 0, 0
        );

        let sec = Math.floor((next - now.getTime()) / 1000);
        if (sec <= 0) sec = 86400;

        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;

        const text = `${pad(h)}:${pad(m)}:${pad(s)}`;

        els().forEach(e => e.textContent = text);
    }

    update();
    setInterval(update, 1000);
})();
(function () {

    /* =========================
       COUNTDOWN TIMER SYSTEM
    ========================= */
    function initCountdown() {
        const elements = document.querySelectorAll(".countdown");

        elements.forEach(function (el) {
            const target = new Date(el.getAttribute("data-date")).getTime();

            function update() {
                const now = new Date().getTime();
                const diff = target - now;

                if (diff <= 0) {
                    el.textContent = "COUNTDOWN ENDED";
                    return;
                }

                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const m = Math.floor((diff / (1000 * 60)) % 60);
                const s = Math.floor((diff / 1000) % 60);

                el.textContent = d + "d " + h + "h " + m + "m " + s + "s";
            }

            update();
            setInterval(update, 1000);
        });
    }


    /* =========================
       TIME ELAPSED TIMER SYSTEM
    ========================= */
    function initElapsedTimers() {
        const elements = document.querySelectorAll(".elapsed");

        elements.forEach(function (el) {
            const start = new Date(el.getAttribute("data-start")).getTime();

            function update() {
                const now = new Date().getTime();
                const diff = now - start;

                if (diff < 0) {
                    el.textContent = "NOT STARTED";
                    return;
                }

                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const m = Math.floor((diff / (1000 * 60)) % 60);
                const s = Math.floor((diff / 1000) % 60);

                el.textContent = d + "d " + h + "h " + m + "m " + s + "s";
            }

            update();
            setInterval(update, 1000);
        });
    }


    /* =========================
       INITIALIZE EVERYTHING
    ========================= */
    function initAll() {
        initCountdown();
        initElapsedTimers();
    }

    document.addEventListener("DOMContentLoaded", initAll);

    mw.hook("wikipage.content").add(function () {
        initAll();
    });

})();
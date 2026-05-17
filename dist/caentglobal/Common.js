(function () {

    /* =========================
       COUNTDOWN TIMER SYSTEM
    ========================= */
    function initCountdown() {
        const elements = document.querySelectorAll(".countdown");

        elements.forEach(function (el) {

            if (el.dataset.initialized) return;
            el.dataset.initialized = "true";

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

                el.textContent =
                    d + "d " +
                    h + "h " +
                    m + "m " +
                    s + "s";
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

            if (el.dataset.initialized) return;
            el.dataset.initialized = "true";

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

                el.textContent =
                    d + "d " +
                    h + "h " +
                    m + "m " +
                    s + "s";
            }

            update();
            setInterval(update, 1000);

        });
    }


    /* =========================
       AUDIO AUTO-PAUSE SYSTEM
    ========================= */
    function initAudioPlayers() {
        const audios = document.querySelectorAll("audio");

        audios.forEach(function (audio) {

            if (audio.dataset.initialized) return;
            audio.dataset.initialized = "true";

            audio.addEventListener("play", function () {

                audios.forEach(function (otherAudio) {

                    if (otherAudio !== audio) {
                        otherAudio.pause();
                    }

                });

            });

        });
    }


    /* =========================
       INITIALIZE EVERYTHING
    ========================= */
    function initAll() {
        initCountdown();
        initElapsedTimers();
        initAudioPlayers();
    }

    document.addEventListener("DOMContentLoaded", initAll);

    mw.hook("wikipage.content").add(function () {
        initAll();
    });

})();
(function () {

    /* =========================
       COUNTDOWN TIMER SYSTEM
    ========================= */
    function initCountdown() {
        const elements = document.querySelectorAll(".countdown");

        elements.forEach(function (el) {

            if (el.dataset.initialized) return;
            el.dataset.initialized = "true";

            const dateString =
                el.getAttribute("data-date") ||
                el.getAttribute("data-target");

            const target = new Date(dateString).getTime();

            if (isNaN(target)) {
                el.textContent = "INVALID DATE";
                return;
            }

            function update() {
                const now = Date.now();
                const diff = target - now;

                if (diff <= 0) {
                    el.textContent = "COUNTDOWN ENDED";
                    clearInterval(interval);
                    return;
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                el.textContent =
                    days + "d " +
                    hours + "h " +
                    minutes + "m " +
                    seconds + "s";
            }

            update();
            const interval = setInterval(update, 1000);

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

            if (isNaN(start)) {
                el.textContent = "INVALID DATE";
                return;
            }

            function update() {
                const now = Date.now();
                const diff = now - start;

                if (diff < 0) {
                    el.textContent = "NOT STARTED";
                    return;
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                el.textContent =
                    days + "d " +
                    hours + "h " +
                    minutes + "m " +
                    seconds + "s";
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

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll();
    }

    if (typeof mw !== "undefined") {
        mw.hook("wikipage.content").add(function () {
            initAll();
        });
    }

})();
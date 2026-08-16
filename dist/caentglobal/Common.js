(function () {

    /* =========================================================
       COUNTDOWN TIMER SYSTEM

       Usage:
       <div class="countdown"
            data-date="2026-09-01T18:00:00+09:00">
            Loading...
       </div>

       Also supports:
       data-target="2026-09-01T18:00:00+09:00"
    ========================================================= */

    function initCountdown() {

        const elements = document.querySelectorAll(".countdown");

        elements.forEach(function (el) {

            if (el.dataset.initialized === "true") return;

            const dateString =
                el.getAttribute("data-date") ||
                el.getAttribute("data-target");

            if (!dateString) {
                el.textContent = "INVALID DATE";
                return;
            }

            const target = new Date(dateString).getTime();

            if (isNaN(target)) {
                el.textContent = "INVALID DATE";
                return;
            }

            el.dataset.initialized = "true";

            let interval = null;

            function update() {

                const diff = target - Date.now();

                if (diff <= 0) {

                    el.textContent = "COUNTDOWN ENDED";

                    if (interval !== null) {
                        clearInterval(interval);
                        interval = null;
                    }

                    return;
                }

                const days =
                    Math.floor(diff / (1000 * 60 * 60 * 24));

                const hours =
                    Math.floor(
                        (diff / (1000 * 60 * 60)) % 24
                    );

                const minutes =
                    Math.floor(
                        (diff / (1000 * 60)) % 60
                    );

                const seconds =
                    Math.floor(
                        (diff / 1000) % 60
                    );

                el.textContent =
                    days + "d " +
                    hours + "h " +
                    minutes + "m " +
                    seconds + "s";
            }

            update();

            interval = setInterval(update, 1000);
        });
    }


    /* =========================================================
       TIME ELAPSED TIMER SYSTEM

       Usage:
       <div class="elapsed"
            data-start="2025-05-09T18:00:00+09:00">
            Loading...
       </div>
    ========================================================= */

    function initElapsedTimers() {

        const elements = document.querySelectorAll(".elapsed");

        elements.forEach(function (el) {

            if (el.dataset.initialized === "true") return;

            const dateString =
                el.getAttribute("data-start");

            if (!dateString) {
                el.textContent = "INVALID DATE";
                return;
            }

            const start = new Date(dateString).getTime();

            if (isNaN(start)) {
                el.textContent = "INVALID DATE";
                return;
            }

            el.dataset.initialized = "true";

            function update() {

                const diff = Date.now() - start;

                if (diff < 0) {
                    el.textContent = "NOT STARTED";
                    return;
                }

                const days =
                    Math.floor(diff / (1000 * 60 * 60 * 24));

                const hours =
                    Math.floor(
                        (diff / (1000 * 60 * 60)) % 24
                    );

                const minutes =
                    Math.floor(
                        (diff / (1000 * 60)) % 60
                    );

                const seconds =
                    Math.floor(
                        (diff / 1000) % 60
                    );

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


    /* =========================================================
       SCHEDULED CONTENT VISIBILITY SYSTEM

       Usage:

       <div
           class="scheduled-content"
           data-release-date="2026-09-01T18:00:00+09:00"
           style="display:none;">

           YOUR CONTENT HERE

       </div>

       Before the specified date:
       → Content remains hidden.

       After the specified date:
       → Content becomes visible.

       IMPORTANT:
       This only controls visibility.

       It does NOT upload files or publish files to Fandom.
       The content must already exist on the page.
    ========================================================= */

    function initScheduledContent() {

        const elements =
            document.querySelectorAll(".scheduled-content");

        elements.forEach(function (el) {

            if (el.dataset.initialized === "true") return;

            const dateString =
                el.getAttribute("data-release-date");

            if (!dateString) {
                el.style.display = "none";
                return;
            }

            const releaseTime =
                new Date(dateString).getTime();

            if (isNaN(releaseTime)) {
                el.style.display = "none";
                return;
            }

            el.dataset.initialized = "true";

            let interval = null;

            function update() {

                if (Date.now() >= releaseTime) {

                    el.style.display = "";

                    if (interval !== null) {
                        clearInterval(interval);
                        interval = null;
                    }

                    return;
                }

                el.style.display = "none";
            }

            update();

            interval = setInterval(update, 1000);
        });
    }


    /* =========================================================
       AUDIO AUTO-PAUSE SYSTEM

       When one audio player starts playing,
       all other audio players on the page automatically pause.
    ========================================================= */

    function initAudioPlayers() {

        const audios =
            document.querySelectorAll("audio");

        audios.forEach(function (audio) {

            if (audio.dataset.initialized === "true") return;

            audio.dataset.initialized = "true";

            audio.addEventListener("play", function () {

                const allAudios =
                    document.querySelectorAll("audio");

                allAudios.forEach(function (otherAudio) {

                    if (otherAudio !== audio) {
                        otherAudio.pause();
                    }

                });
            });
        });
    }


    /* =========================================================
       INITIALIZE EVERYTHING

       Each system is protected separately.

       If one system encounters an error,
       the others can continue working.
    ========================================================= */

    function initAll() {

        try {
            initCountdown();
        } catch (error) {
            console.error(
                "Countdown Timer System Error:",
                error
            );
        }

        try {
            initElapsedTimers();
        } catch (error) {
            console.error(
                "Elapsed Timer System Error:",
                error
            );
        }

        try {
            initScheduledContent();
        } catch (error) {
            console.error(
                "Scheduled Content System Error:",
                error
            );
        }

        try {
            initAudioPlayers();
        } catch (error) {
            console.error(
                "Audio Player System Error:",
                error
            );
        }
    }


    /* =========================================================
       INITIAL PAGE LOAD
    ========================================================= */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initAll
        );

    } else {

        initAll();

    }


    /* =========================================================
       FANDOM / MEDIAWIKI DYNAMIC CONTENT SUPPORT

       Allows the systems to initialize again when Fandom
       dynamically loads or replaces page content.
    ========================================================= */

    if (
        typeof mw !== "undefined" &&
        typeof mw.hook === "function"
    ) {

        mw.hook("wikipage.content").add(function () {
            initAll();
        });
    }

})();
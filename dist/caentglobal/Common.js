(function () {
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

    // Run on initial load
    document.addEventListener("DOMContentLoaded", initCountdown);

    // Run again for Fandom mobile/AJAX navigation
    mw.hook("wikipage.content").add(function () {
        initCountdown();
    });
})();
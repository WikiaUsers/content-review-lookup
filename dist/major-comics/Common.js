window.AddRailModule = (window.AddRailModule || []).concat("Template:MC-Rail");

/* ==========================================================================
   🏛️ ───  [ M A J O R   C O M I C S ]  ─── 🏛️
   ■■■■■■■■■■■■■■■■■■■   11. SCROLLING CONTROLLER   ■■■■■■■■■■■■■■■■■■■
   ========================================================================== */

(function () {
    "use strict";

    function initializeMajorScrolling() {
        if (document.querySelector(".mc-backtop")) {
            return;
        }

        /* ─── ❖ BACK-TO-TOP CONTROL ❖ ─── */
        const backtop = document.createElement("button");

        backtop.type = "button";
        backtop.className = "mc-backtop";
        backtop.setAttribute("aria-label", "Back to top");
        backtop.setAttribute("aria-hidden", "true");
        backtop.tabIndex = -1;

        backtop.innerHTML =
            '<span class="mc-backtop__arrow" aria-hidden="true">↑</span>' +
            '<span class="mc-backtop__label" aria-hidden="true">TOP</span>';

        document.body.appendChild(backtop);

        /* ─── ❖ ARTICLE PROGRESS INDICATOR ❖ ─── */
        const article = document.querySelector(".page__main");
        const header = article && article.querySelector(".page-header");
        const content = article && article.querySelector(".page-content");

        let progress = null;
        let fill = null;

        if (article && header && content) {
            progress = document.createElement("div");
            progress.className = "mc-reading-progress";
            progress.setAttribute("role", "progressbar");
            progress.setAttribute("aria-label", "Article reading progress");
            progress.setAttribute("aria-valuemin", "0");
            progress.setAttribute("aria-valuemax", "100");
            progress.setAttribute("aria-valuenow", "0");

            fill = document.createElement("span");
            fill.className = "mc-reading-progress__fill";
            fill.setAttribute("aria-hidden", "true");

            progress.appendChild(fill);
            header.insertAdjacentElement("afterend", progress);
        }

        /* ─── ⚙️ SCROLL POSITION ─── */
        function updateScrolling() {
            const visible = window.scrollY > 450;

            backtop.classList.toggle("mc-backtop--visible", visible);
            backtop.setAttribute(
                "aria-hidden",
                visible ? "false" : "true"
            );

            backtop.tabIndex = visible ? 0 : -1;

            if (!progress || !fill || !content) {
                return;
            }

            const rect = content.getBoundingClientRect();
            const start = rect.top + window.scrollY;
            const length = Math.max(
                1,
                rect.height - window.innerHeight
            );

            const percentage = Math.max(
                0,
                Math.min(
                    100,
                    Math.round(
                        ((window.scrollY - start) / length) * 100
                    )
                )
            );

            fill.style.width = percentage + "%";
            progress.setAttribute(
                "aria-valuenow",
                String(percentage)
            );
        }

        /* ─── ⚡ FRAME-OPTIMIZED UPDATES ⚡ ─── */
        let scheduled = false;

        function requestUpdate() {
            if (scheduled) {
                return;
            }

            scheduled = true;

            window.requestAnimationFrame(function () {
                scheduled = false;
                updateScrolling();
            });
        }

        window.addEventListener(
            "scroll",
            requestUpdate,
            { passive: true }
        );

        window.addEventListener("resize", requestUpdate);

        /* ─── ❖ BACK-TO-TOP ACTION ❖ ─── */
        backtop.addEventListener("click", function () {
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "instant" : "smooth"
            });
        });

        updateScrolling();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeMajorScrolling,
            { once: true }
        );
    } else {
        initializeMajorScrolling();
    }
})();
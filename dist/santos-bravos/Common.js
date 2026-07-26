/* Any JavaScript here will be loaded for all users on every page load. */
(function () {
    const selector = ".fandom-sticky-header";

    function correctStickyHeader() {
        const header = document.querySelector(selector);

        if (!header) {
            return;
        }

        /*
         * The sticky header must never be visible while the page
         * is still at the top.
         */
        if (window.scrollY <= 5) {
            header.classList.remove("is-visible");
        }
    }

    function initializeStickyHeaderFix() {
        const header = document.querySelector(selector);

        if (!header) {
            return;
        }

        correctStickyHeader();

        /*
         * Fandom may add is-visible after the page finishes loading.
         * Watch the class and remove it again only while at the top.
         */
        const observer = new MutationObserver(function () {
            if (
                window.scrollY <= 5 &&
                header.classList.contains("is-visible")
            ) {
                header.classList.remove("is-visible");
            }
        });

        observer.observe(header, {
            attributes: true,
            attributeFilter: ["class"]
        });

        window.addEventListener("scroll", correctStickyHeader, {
            passive: true
        });

        window.addEventListener("pageshow", correctStickyHeader);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeStickyHeaderFix,
            { once: true }
        );
    } else {
        initializeStickyHeaderFix();
    }
})();
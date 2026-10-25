
/* ==========================================================
   FAZBEAR'S RESTOCKED — FAZ DRIVER IMAGE SELECTOR
   Five modes, two arrows, clickable card.
   No videos, popups, or progress bars.
   ========================================================== */

(function () {
    "use strict";

    var drivers = [
        {
            name: "Employee",
            image: "FR_FazDriver_Employee.png",
            page: "/wiki/Faz_Driver_Employee"
        },
        {
            name: "Security",
            image: "FR_FazDriver_Security.png",
            page: "/wiki/Faz_Driver_Security"
        },
        {
            name: "Repairman",
            image: "FR_FazDriver_Repairman.png",
            page: "/wiki/Faz_Driver_Repairman"
        },
        {
            name: "Manager",
            image: "FR_FazDriver_Manager.png",
            page: "/wiki/Faz_Driver_Manager"
        },
        {
            name: "Executive",
            image: "FR_FazDriver_Manager.png",
            page: "/wiki/Faz_Driver_Executive"
        }
    ];

    function initFazDriver() {
        var carousel = document.getElementById("fd-carousel");

        if (
            !carousel ||
            carousel.getAttribute("data-ready") === "true"
        ) {
            return;
        }

        var imageWrap = document.getElementById("fd-image-wrap");
        var backButton = document.getElementById("fd-back");
        var nextButton = document.getElementById("fd-next");

        if (!imageWrap || !backButton || !nextButton) {
            return;
        }

        carousel.setAttribute("data-ready", "true");

        var current = 0;

        /* Create the image dynamically instead of relying on
           HTML image markup in the wiki source. */

        var image = document.createElement("img");
        image.className = "fd-image";
        image.alt = "";
        image.loading = "eager";
        image.style.display = "none";

        var placeholder = document.createElement("div");

        placeholder.style.cssText =
            "display:flex;" +
            "align-items:center;" +
            "justify-content:center;" +
            "min-height:120px;" +
            "padding:20px;" +
            "text-align:center;" +
            "background:#100d12;" +
            "color:#c3b6c8;" +
            "font-size:13px;" +
            "line-height:1.6;";

        placeholder.textContent = "Loading image...";

        imageWrap.replaceChildren(image, placeholder);

        image.onload = function () {
            image.style.display = "block";
            placeholder.style.display = "none";
        };

        function showDriver(index) {
            current = (index + drivers.length) % drivers.length;

            var driver = drivers[current];

            /* Update the selected image. */

            image.style.display = "none";
            placeholder.style.display = "flex";
            placeholder.textContent = "Loading " + driver.name + "...";

            image.alt = driver.name + " mode";

            image.onerror = function () {
                image.style.display = "none";
                placeholder.style.display = "flex";

                placeholder.textContent =
                    "Image not found: " + driver.image;
            };

            image.src =
                "/wiki/Special:FilePath/" +
                encodeURIComponent(driver.image);

            /* Record which driver's page the card should open. */

            carousel.setAttribute("data-mode", driver.name);

            carousel.setAttribute(
                "aria-label",
                "Open Faz Driver: " + driver.name
            );
        }

        function previousImage(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            showDriver(current - 1);
        }

        function nextImage(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            showDriver(current + 1);
        }

        /* Mouse controls */

        backButton.addEventListener("click", previousImage);
        nextButton.addEventListener("click", nextImage);

        /* Keyboard controls for the arrows */

        backButton.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                previousImage(event);
            }
        });

        nextButton.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                nextImage(event);
            }
        });

        /* Clicking anywhere else on the card opens the
           currently selected driver's page. */

        carousel.addEventListener("click", function (event) {
            if (
                event.target.closest(".fd-arrow")
            ) {
                return;
            }

            window.location.href = drivers[current].page;
        });

        carousel.addEventListener("keydown", function (event) {
            if (
                event.target === carousel &&
                (event.key === "Enter" || event.key === " ")
            ) {
                event.preventDefault();

                window.location.href = drivers[current].page;
            }
        });

        /* Start with Employee selected. */

        showDriver(0);
    }

    /* Run when the page loads. */

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initFazDriver
        );
    } else {
        initFazDriver();
    }

    /* Support MediaWiki page-content updates. */

    if (window.mw && window.mw.hook) {
        window.mw.hook("wikipage.content").add(
            initFazDriver
        );
    }
})();
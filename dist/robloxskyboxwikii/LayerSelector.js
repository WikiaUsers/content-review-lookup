(function () {

    const layerInfo = {

        "Mercurialbox": {
            description:
                "A dangerous layer that manipulates you into running away from home.",
            danger: "HIGH"
        },

        "Cythereanbox": {
            description:
                "A layer resembling an alternate version of Earth.",
            danger: "UNKNOWN"
        },

        "Telluricbox": {
            description:
                "A strange layer where reality can be edited using game-like tools.",
            danger: "VARIABLE"
        },

        "Areanbox": {
            description:
                "A destroyed land locked in constant conflict.",
            danger: "EXTREME"
        },

        "Jovianbox": {
            description:
                "A mysterious layer whose true nature remains unclear.",
            danger: "UNKNOWN"
        }

    };


    function initLayerSelector() {

        document.querySelectorAll(".layer-selector").forEach(function (selector) {

            const links =
                selector.querySelectorAll(".layer-list a");

            const selected =
                selector.querySelector(".selected-layer");

            const description =
                selector.querySelector(".layer-description");

            const danger =
                selector.querySelector(".layer-danger");

            const enter =
                selector.querySelector(".enter-layer");


            links.forEach(function (link) {

                link.addEventListener("click", function (event) {

                    event.preventDefault();


                    /* Remove previous selection */

                    links.forEach(function (other) {

                        other.classList.remove("selected");

                    });


                    /* Select current layer */

                    link.classList.add("selected");


                    /* Get layer name */

                    let name =
                        link.textContent.trim();

                    name =
                        name.replace(/^\d+\s*/, "");


                    const info =
                        layerInfo[name];


                    if (!info) {
                        return;
                    }


                    /* Update information */

                    selected.textContent =
                        name;

                    description.textContent =
                        info.description;

                    danger.textContent =
                        "DANGER LEVEL: " +
                        info.danger;


                    /* Set ENTER button */

                    enter.href =
                        link.href;

                });

            });


            /* Prevent ENTER before a layer is selected */

            enter.addEventListener("click", function (event) {

                if (enter.getAttribute("href") === "#") {

                    event.preventDefault();

                }

            });

        });

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initLayerSelector
        );

    } else {

        initLayerSelector();

    }

})();
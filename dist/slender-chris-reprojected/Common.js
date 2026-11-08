/* CUSTOM BUTTON HOVER-AND-CLICK SOUNDS */

(function () {
    "use strict";

    const hoverSound = new Audio("/wiki/Special:FilePath/Hover.mp3");
    const clickSound = new Audio("/wiki/Special:FilePath/Click.mp3");

    hoverSound.preload = "auto";
    clickSound.preload = "auto";

    hoverSound.volume = 0.4;
    clickSound.volume = 0.6;

    function playSound(sound) {
        sound.currentTime = 0;

        const playback = sound.play();

        if (playback !== undefined) {
            playback.catch(function () {});
        }
    }

    document.addEventListener("mouseover", function (event) {
        const button = event.target.closest(".sc-main-nav-button");

        if (!button) return;

        if (button.contains(event.relatedTarget)) return;

        playSound(hoverSound);
    });

    document.addEventListener("click", function (event) {
        const button = event.target.closest(".sc-main-nav-button");

        if (!button) return;

        playSound(clickSound);
    });
})();

/* CUSTOM him page property */

(function () {

    // Only activate on Him's character page.
    if (mw.config.get("wgPageName") !== "Him") {
        return;
    }

    function initialiseHimGlitch() {

        const roots = [
            document.querySelector(".mw-parser-output"),
            document.querySelector(".page-header__title"),
            document.querySelector("#firstHeading")
        ].filter(Boolean);

        const letters = [];
        const originalNodes = new Map();

        const walkerFilter = {
            acceptNode: function (node) {

                const parent = node.parentElement;

                if (!parent || !/[a-zA-Z]/.test(node.nodeValue)) {
                    return NodeFilter.FILTER_REJECT;
                }

                if (parent.closest(
                    "script, style, textarea, input, select, button, svg, .mw-editsection, .no-glitch"
                )) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        };

        roots.forEach(function (root) {

            const walker = document.createTreeWalker(
                root,
                NodeFilter.SHOW_TEXT,
                walkerFilter
            );

            let node;

            while (node = walker.nextNode()) {

                const original = node.nodeValue;

                originalNodes.set(node, original);

                for (let i = 0; i < original.length; i++) {

                    if (/[a-zA-Z]/.test(original[i])) {

                        letters.push({
                            node: node,
                            index: i,
                            original: original[i]
                        });

                    }
                }
            }
        });

        if (letters.length === 0) {
            return;
        }

        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        function randomLetter(original) {

            let replacement;

            do {
                replacement = alphabet[
                    Math.floor(Math.random() * alphabet.length)
                ];
            } while (replacement === original.toUpperCase());

            return original === original.toLowerCase()
                ? replacement.toLowerCase()
                : replacement;
        }

        let modifiedNodes = new Set();

        function glitch() {

            // Restore previously modified text.
            modifiedNodes.forEach(function (node) {
                node.nodeValue = originalNodes.get(node);
            });

            modifiedNodes.clear();

            // Select random letters to corrupt.
            const amount = 3 + Math.floor(Math.random() * 7);
            const selected = new Set();

            for (let i = 0; i < amount; i++) {

                selected.add(
                    Math.floor(Math.random() * letters.length)
                );

            }

            const changes = new Map();

            selected.forEach(function (index) {

                const entry = letters[index];

                if (!changes.has(entry.node)) {
                    changes.set(
                        entry.node,
                        originalNodes.get(entry.node).split("")
                    );
                }

                changes.get(entry.node)[entry.index] =
                    randomLetter(entry.original);

            });

            // Apply the temporary corruption.
            changes.forEach(function (characters, node) {

                node.nodeValue = characters.join("");
                modifiedNodes.add(node);

            });
        }

        // Rapid corruption effect.
        setInterval(glitch, 55);

    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseHimGlitch
        );

    } else {

        initialiseHimGlitch();

    }

})();
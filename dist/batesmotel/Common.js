
(function () {
    'use strict';

    const HEADER_SELECTOR = '.page-header__title';
    const BLINK_CHANCE = 0.7;

    function applyBlinking(header) {
        if (!header || header.dataset.neonProcessed === '1') {
            return;
        }

        // Avoid interfering with titles containing complex markup.
        if (header.querySelector('span.blinking')) {
            header.dataset.neonProcessed = '1';
            return;
        }

        const walker = document.createTreeWalker(
            header,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];
        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(function (node) {
            const text = node.nodeValue;

            if (!/\p{L}/u.test(text)) {
                return;
            }

            const fragment = document.createDocumentFragment();
            const wordRegex = /\S+|\s+/gu;

            for (const match of text.matchAll(wordRegex)) {
                const word = match[0];

                if (
                    /^\s+$/u.test(word) ||
                    Math.random() >= BLINK_CHANCE
                ) {
                    fragment.appendChild(
                        document.createTextNode(word)
                    );
                    continue;
                }

                const letters = [...word.matchAll(/\p{L}/gu)];

                if (!letters.length) {
                    fragment.appendChild(
                        document.createTextNode(word)
                    );
                    continue;
                }

                const selected = letters[
                    Math.floor(Math.random() * letters.length)
                ];

                const index = selected.index;
                const letter = selected[0];

                fragment.appendChild(
                    document.createTextNode(word.slice(0, index))
                );

                const span = document.createElement('span');
                span.className = 'blinking';
                span.textContent = letter;
                fragment.appendChild(span);

                fragment.appendChild(
                    document.createTextNode(
                        word.slice(index + letter.length)
                    )
                );
            }

            node.replaceWith(fragment);
        });

        header.dataset.neonProcessed = '1';
    }

    function initializeNeonTitles() {
        document.querySelectorAll(HEADER_SELECTOR)
            .forEach(applyBlinking);
    }

    function start() {
        initializeNeonTitles();

        const observer = new MutationObserver(function () {
            initializeNeonTitles();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, {
            once: true
        });
    } else {
        start();
    }
})();
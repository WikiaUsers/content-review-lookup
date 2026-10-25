/**
 * Всплывающие подсказки для сносок (<ref>)
 */
(() => {
    'use strict';
    if (window.isRefTooltipsLoaded) return;
    window.isRefTooltipsLoaded = true;

    const cloneReferences = ($content) => {
        const root = ($content && $content[0]) || document;
        const refs = root.querySelectorAll('[id^="cite_ref"]:not([data-ref-cloned="true"])');
        if (!refs.length) return false;

        refs.forEach(ref => {
            const anchor = ref.querySelector('a[href*="#cite_note"]');
            if (!anchor || !anchor.hash) return;

            const targetId = decodeURIComponent(anchor.hash.substring(1));
            if (!targetId) return;

            const noteEl = document.getElementById(targetId);
            const targetElement = noteEl ? noteEl.querySelector('.reference-text') : null;
            if (targetElement) {
                ref.dataset.refCloned = 'true';
                ref.appendChild(targetElement.cloneNode(true));
            }
        });
        return true;
    };

    const init = () => {
        cloneReferences();
        if (window.mw && window.mw.hook) {
            window.mw.hook('wikipage.content').add(cloneReferences);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
/* Fandom Adapter: RoughNotation (ES2024) */
(async () => {
    'use strict';
    if (window.FandomRoughNotationMainLoaded) return;
    window.FandomRoughNotationMainLoaded = true;

    const CDN_URL = 'https://cdn.jsdelivr.net/npm/rough-notation@0.5.1/+esm';

    try {
        const { annotate, annotationGroup } = await import(CDN_URL);

        const viewObserver = new IntersectionObserver((entries, obs) => {
            for (const entry of entries) {
                if (entry.isIntersecting && entry.target._rnInstance) {
                    entry.target._rnInstance.show();
                    obs.unobserve(entry.target);
                }
            }
        }, { threshold: 0.25 });

        const mountAnnotations = () => {
            const elements = document.querySelectorAll('.rn-annotate:not([data-rn-mounted="true"])');
            if (!elements.length) return;

            const groups = new Map();

            for (const el of elements) {
                el.dataset.rnMounted = 'true';
                const d = el.dataset;

                const config = {
                    type: d.type || 'underline',
                    color: d.color || 'var(--s)',
                    strokeWidth: Number(d.strokeWidth) || 2,
                    padding: d.padding ? Number(d.padding) : 5,
                    multiline: d.multiline !== 'false',
                    iterations: Number(d.iterations) || 2,
                    animationDuration: Number(d.duration) || 800
                };

                if (d.brackets) {
                    config.brackets = d.brackets.split(',').map(s => s.trim());
                }

                const instance = annotate(el, config);
                if (d.group) {
                    if (!groups.has(d.group)) groups.set(d.group, []);
                    groups.get(d.group).push({ el, instance });
                } else {
                    el._rnInstance = instance;
                    viewObserver.observe(el);
                }
            }

            for (const items of groups.values()) {
                const ag = annotationGroup(items.map(i => i.instance));
                const firstEl = items[0].el;
                firstEl._rnInstance = ag;
                viewObserver.observe(firstEl);
            }
        };

        mountAnnotations();
        new MutationObserver(mutations => {
            if (mutations.some(m => m.addedNodes.length > 0)) mountAnnotations();
        }).observe(document.body, { childList: true, subtree: true });
    } catch (err) {
        console.error('[RoughNotation] Ошибка инициализации:', err);
    }
})();
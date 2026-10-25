/* Css-doodle Adapter (ES2024) */
(async () => {
    'use strict';
    if (window.isDoodleAdapterLoaded) return;
    window.isDoodleAdapterLoaded = true;

    const CONFIG = {
        doodleUrl: 'https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.51.0/css-doodle.min.js',
        wrapperSelector: '.doodle-wrapper:not(.doodle-loaded), .css-doodle-wrapper:not(.doodle-loaded)',
        registryPage: 'MediaWiki:Custom-DoodleRules',
        rawScript: mw.util.wikiScript()
    };

    window.FandomDoodleRules ??= null;

    // Валидация значений CSS-переменных (защита от инъекции внешних ресурсов и выхода из контекста свойства)
    const sanitizeCssValue = (val) => {
        const str = String(val ?? '').trim();
        if (!str || /(?:url\s*\(|expression\s*\(|@import|[;{}<>\\])/i.test(str)) {
            return '';
        }
        return str;
    };

    const loadDoodle = () => {
        if (window.CSSDoodle || customElements.get('css-doodle')) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.doodleUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load CSS-Doodle'));
            document.head.append(script);
        });
    };

    const fetchDoodleRules = async () => {
        if (window.FandomDoodleRules) return window.FandomDoodleRules;

        try {
            const params = new URLSearchParams({
                action: 'raw',
                title: CONFIG.registryPage,
                ctype: 'text/css'
            });

            const response = await fetch(`${CONFIG.rawScript}?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch doodle registry');

            const rawText = await response.text();
            const rules = {};

            // Ищем комментарии-маркеры: /* @doodle: stars */
            const regex = /\/\*\s*@doodle:\s*(.+?)\s*\*\//g;
            const chunks = rawText.split(regex);

            for (let i = 1; i < chunks.length; i += 2) {
                const name = chunks[i].trim();
                const code = chunks[i + 1]?.trim();
                if (name && code) rules[name] = code;
            }

            window.FandomDoodleRules = rules;
            return rules;
        } catch (error) {
            console.error('[Doodle Registry Error]', error);
            return {};
        }
    };

    const initDoodles = async (hookContent) => {
        const parent = hookContent?.[0] || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        if (!wrappers.length) return;

        try {
            const [, rules] = await Promise.all([loadDoodle(), fetchDoodleRules()]);

            for (const wrapper of wrappers) {
                const doodleName = (wrapper.dataset.doodle ?? '').trim();
                const safeRuleCode = Object.hasOwn(rules, doodleName) ? rules[doodleName] : null;

                if (!safeRuleCode) {
                    console.warn(`[Doodle Adapter] Пресет "${doodleName}" не найден.`);
                    continue;
                }

                const doodle = document.createElement('css-doodle');
                doodle.textContent = safeRuleCode;

                for (const attr of wrapper.attributes) {
                    if (attr.name.startsWith('data-') && attr.name !== 'data-doodle') {
                        const cssVarName = `--${attr.name.slice(5)}`;
                        const safeValue = sanitizeCssValue(attr.value);
                        if (safeValue) {
                            doodle.style.setProperty(cssVarName, safeValue);
                        }
                    }
                }

                doodle.addEventListener('click', () => doodle.update?.());
                doodle.classList.add('doodle-loaded');
                wrapper.replaceWith(doodle);
            }
        } catch (error) {
            console.error('[Doodle Adapter Error]', error);
        }
    };

    mw.hook('wikipage.content').add(initDoodles);
})();
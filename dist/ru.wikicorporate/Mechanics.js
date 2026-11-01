/* Загрузчик движка @-механик: проверяет наличие целевых селекторов на странице (ES6) */
(() => {
    'use strict';
    if (window.mechanicsLoaderLoaded) return;
    window.mechanicsLoaderLoaded = true;

    const SCRIPT_PAGE = 'MediaWiki:Mechanics/Main.js';
    const RULES_PAGE = 'MediaWiki:Custom-Mechanics';
    const VERSION = '1.1';
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';
    const CACHE_KEY = 'wiki_mechanics_rules_' + (mw.config.get('wgCityId') || 'global');

    let mainLoaded = false;
    let observer = null;

    const loadMainScript = () => {
        if (mainLoaded) return;
        mainLoaded = true;
        if (observer) observer.disconnect();

        const script = document.createElement('script');
        script.src = CENTRAL_API + '?title=' + encodeURIComponent(SCRIPT_PAGE) + '&action=raw&ctype=text/javascript&v=' + VERSION;
        document.head.appendChild(script);
    };

    const extractSelectors = (rawText) => {
        const selectors = [];
        const clean = rawText.replace(/\/\*[\s\S]*?\*\//g, '');
        const regex = /@[a-zA-Z0-9_-]+\s+([^{]+)\{/g;
        let match;
        while ((match = regex.exec(clean)) !== null) {
            const sel = match[1].trim();
            if (sel) selectors.push(sel);
        }
        return selectors;
    };

    const fetchRulesText = () => {
        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached !== null) return Promise.resolve(cached);
        } catch (e) {}

        const urls = [CENTRAL_API + '?title=' + encodeURIComponent(RULES_PAGE) + '&action=raw&ctype=text/plain'];
        const localServer = mw.config.get('wgServer') + mw.config.get('wgScript');
        if (localServer.indexOf('wikicorporate.fandom.com') === -1) {
            urls.push(localServer + '?title=' + encodeURIComponent(RULES_PAGE) + '&action=raw&ctype=text/plain');
        }

        const requests = urls.map((url) =>
            fetch(url)
                .then((r) => (r.ok ? r.text() : ''))
                .catch(() => '')
        );

        return Promise.all(requests).then((results) => {
            const combined = results.filter(Boolean).join('\n');
            try { sessionStorage.setItem(CACHE_KEY, combined); } catch (e) {}
            return combined;
        });
    };

    fetchRulesText().then((rawText) => {
        if (!rawText || !rawText.trim()) return;

        const selectors = extractSelectors(rawText);
        if (!selectors.length) return;

        window.__wikiMechanicsRules = rawText;

        const checkDOM = () => {
            for (let i = 0; i < selectors.length; i++) {
                try {
                    if (document.querySelector(selectors[i])) {
                        loadMainScript();
                        return;
                    }
                } catch (e) {}
            }
        };

        observer = new MutationObserver(checkDOM);
        const startWatching = () => {
            observer.observe(document.body, { childList: true, subtree: true });
            checkDOM();
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startWatching);
        } else {
            startWatching();
        }
    });
})();
/* Master CSS Runtime Adapter — Direct MediaWiki:Custom-*.json (ES2026) */
(async () => {
    'use strict';
    if (window.fandomMasterCssLoaded) return;
    window.fandomMasterCssLoaded = true;

    const CONFIG = {
        localJsonPage: 'MediaWiki:Custom-MasterCSS.json',
        centralJsonPage: 'MediaWiki:Custom-GlobalMasterCSS.json',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        cdnUrl: 'https://cdn.jsdelivr.net/npm/@master/css-runtime@2.0.0-rc.33/+esm',
        cacheKey: 'fandom_mastercss_config',
        cacheTimeKey: 'fandom_mastercss_time',
        cacheTTL: 60 * 60 * 1000 // 1 час
    };

    const mergeConfigs = (global, local) => {
        const result = { ...global };
        for (const [key, val] of Object.entries(local ?? {})) {
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
            if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                result[key] = mergeConfigs(result[key] ?? {}, val);
            } else {
                result[key] = val;
            }
        }
        return result;
    };

    const getCache = () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const wgAction = mw.config.get('wgAction');
            if (urlParams.has('clearcache') || wgAction === 'purge' || wgAction === 'edit') return null;

            const cachedConfig = localStorage.getItem(CONFIG.cacheKey);
            const cachedTime = localStorage.getItem(CONFIG.cacheTimeKey);
            if (cachedConfig && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CONFIG.cacheTTL)) {
                return JSON.parse(cachedConfig);
            }
        } catch {}
        return null;
    };

    const setCache = (configObj) => {
        try {
            localStorage.setItem(CONFIG.cacheKey, JSON.stringify(configObj));
            localStorage.setItem(CONFIG.cacheTimeKey, Date.now().toString());
        } catch {}
    };

    const fetchSource = async (jsonTitle, apiUrl = mw.util.wikiScript('api')) => {
        try {
            const params = new URLSearchParams({
                action: 'query',
                prop: 'revisions',
                titles: jsonTitle,
                rvprop: 'content',
                rvslots: 'main',
                format: 'json',
                formatversion: '2',
                origin: '*'
            });
            const response = await fetch(`${apiUrl}?${params.toString()}`);
            if (!response.ok) return {};
            const data = await response.json();
            const page = data.query?.pages?.[0];
            if (!page || page.missing) return {};
            const raw = page.revisions?.[0]?.slots?.main?.content;
            return raw ? JSON.parse(raw) : {};
        } catch {}
        return {};
    };

    const sanitizeClasses = (node) => {
        if (!node || node.nodeType !== 1) return;

        const cleanNode = (element) => {
            if (!element.hasAttribute('class')) return;
            const badClasses = element.classList.values()
                .filter(cls => {
                    const lower = cls.toLowerCase();
                    return (
                        lower.includes('url(') ||
                        lower.includes('expression(') ||
                        lower.includes('@import') ||
                        lower.includes('javascript:')
                    );
                })
                .toArray();

            if (badClasses.length > 0) {
                element.classList.remove(...badClasses);
                console.warn('[MasterCSS Security] Вырезан запрещённый класс:', badClasses);
            }
        };

        cleanNode(node);
        node.querySelectorAll('[class]').forEach(cleanNode);
    };

    const syncFandomDarkTheme = () => {
        document.documentElement.classList.toggle(
            'dark',
            document.body.classList.contains('theme-fandomdesktop-dark')
        );
    };

    const initMasterCSS = async () => {
        try {
            let finalConfig = getCache();
            if (!finalConfig) {
                const [globalConfig, localConfig] = await Promise.all([
                    fetchSource(CONFIG.centralJsonPage, CONFIG.centralApiUrl),
                    fetchSource(CONFIG.localJsonPage)
                ]);
                finalConfig = mergeConfigs(globalConfig, localConfig);
                setCache(finalConfig);
            }

            const { initCSSRuntime } = await import(CONFIG.cdnUrl);
            const rootElement = document.querySelector('.mw-parser-output');
            if (!rootElement) return;

            sanitizeClasses(rootElement);

            const securityObserver = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        sanitizeClasses(mutation.target);
                    } else if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(sanitizeClasses);
                    }
                }
            });
            securityObserver.observe(rootElement, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });

            initCSSRuntime({
                root: rootElement,
                config: finalConfig
            });

            syncFandomDarkTheme();
            new MutationObserver(syncFandomDarkTheme).observe(document.body, {
                attributes: true,
                attributeFilter: ['class']
            });
        } catch (error) {
            console.error('[MasterCSS Error]', error);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMasterCSS);
    } else {
        initMasterCSS();
    }
})();
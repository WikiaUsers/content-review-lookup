/* Less Preprocessor Adapter — Direct MediaWiki:Custom-*.less (ES2026) */
(() => {
    'use strict';

    if (window.isLessAdapterLoaded) return;
    window.isLessAdapterLoaded = true;

    const CONFIG = {
        localPage: 'MediaWiki:Custom-Local.less',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        centralPage: 'MediaWiki:Custom-Global.less',
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/4.2.0/less.min.js',
        styleId: 'fandom-compiled-less',
        cacheKey: 'fandom_custom_less_css',
        cacheTimeKey: 'fandom_custom_less_time',
        cacheTTL: 60 * 60 * 1000 // 1 час
    };

    if (!window.less?.render) {
        window.less = { env: 'production', async: true, fileAsync: true, logLevel: 0 };
    }

    const getCache = () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const wgAction = mw.config.get('wgAction');
            if (urlParams.has('clearcache') || wgAction === 'purge' || wgAction === 'edit') return null;

            const cachedCss = localStorage.getItem(CONFIG.cacheKey);
            const cachedTime = localStorage.getItem(CONFIG.cacheTimeKey);
            if (cachedCss && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CONFIG.cacheTTL)) {
                return cachedCss;
            }
        } catch {}
        return null;
    };

    const setCache = (css) => {
        try {
            localStorage.setItem(CONFIG.cacheKey, css);
            localStorage.setItem(CONFIG.cacheTimeKey, Date.now().toString());
        } catch {}
    };

    const applyCSS = (css) => {
        let styleNode = document.getElementById(CONFIG.styleId);
        if (!styleNode) {
            styleNode = document.createElement('style');
            styleNode.id = CONFIG.styleId;
            document.head.appendChild(styleNode);
        }
        styleNode.textContent = css;
    };

    const loadLessLibrary = () => {
        if (window.less?.render) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить less.js'));
            document.head.appendChild(script);
        });
    };

    const fetchSource = async (pageTitle, apiUrl = mw.util.wikiScript('api')) => {
        try {
            const params = new URLSearchParams({
                action: 'query',
                prop: 'revisions',
                titles: pageTitle,
                rvprop: 'content',
                rvslots: 'main',
                format: 'json',
                formatversion: '2',
                origin: '*'
            });

            const response = await fetch(`${apiUrl}?${params.toString()}`);
            if (!response.ok) return '';

            const data = await response.json();
            const page = data.query?.pages?.[0];
            if (!page || page.missing) return '';
            return page.revisions?.[0]?.slots?.main?.content ?? '';
        } catch {
            return '';
        }
    };

    const initCompiler = async () => {
        try {
            const cachedCSS = getCache();
            if (cachedCSS) {
                applyCSS(cachedCSS);
                return;
            }

            const [, globalCode, localCode] = await Promise.all([
                loadLessLibrary(),
                fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                fetchSource(CONFIG.localPage)
            ]);

            const combinedCode = `${globalCode}\n\n${localCode}`.trim();
            if (!combinedCode) return;

            const compiled = await window.less.render(combinedCode);
            if (compiled?.css) {
                applyCSS(compiled.css);
                setCache(compiled.css);
            }
        } catch (error) {
            console.error('[Less Adapter Error]', error);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompiler);
    } else {
        initCompiler();
    }
})();
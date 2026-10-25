/* Stylus Preprocessor Adapter — Direct MediaWiki:Custom-*.styl (ES2026) */
(() => {
    'use strict';

    if (window.isStylusAdapterLoaded) return;
    window.isStylusAdapterLoaded = true;

    const CONFIG = {
        localPage: 'MediaWiki:Custom-Local.styl',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        centralPage: 'MediaWiki:Custom-Global.styl',
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/stylus/0.54.8/stylus.min.js',
        styleId: 'fandom-compiled-stylus',
        cacheKey: 'fandom_custom_stylus_css',
        cacheTimeKey: 'fandom_custom_stylus_time',
        cacheTTL: 60 * 60 * 1000 // 1 час
    };

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
            document.head.append(styleNode);
        }
        styleNode.textContent = css;
    };

    const loadStylusLibrary = () => {
        if (window.stylus) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить stylus.min.js'));
            document.head.append(script);
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

    const compileStylus = (rawCode) => new Promise((resolve, reject) => {
        window.stylus.render(rawCode, (err, css) => {
            if (err) reject(err);
            else resolve(css);
        });
    });

    const initCompiler = async () => {
        try {
            const cachedCSS = getCache();
            if (cachedCSS) {
                applyCSS(cachedCSS);
                return;
            }

            const [, globalCode, localCode] = await Promise.all([
                loadStylusLibrary(),
                fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                fetchSource(CONFIG.localPage)
            ]);

            const combinedCode = `${globalCode}\n\n${localCode}`.trim();
            if (!combinedCode) return;

            const compiledCss = await compileStylus(combinedCode);
            if (compiledCss) {
                applyCSS(compiledCss);
                setCache(compiledCss);
            }
        } catch (error) {
            console.error('[Stylus Adapter Error]', error);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompiler);
    } else {
        initCompiler();
    }
})();
/* jshint esversion: 11 */
(async () => {
    'use strict';
    if (window.fandomMasterCssLoaded) return;
    window.fandomMasterCssLoaded = true;

    const CONFIG = {
        localPage: 'Модуль:MasterCSS',
        centralPage: 'Модуль:GlobalMasterCSS',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        cdnUrl: 'https://cdn.jsdelivr.net/npm/@master/css-runtime@2.0.0-rc.33/+esm', // Используем доверенный CDN
        cacheKey: 'fandom_mastercss_config',
        cacheTimeKey: 'fandom_mastercss_time',
        cacheTTL: 60 * 60 * 1000
    };

    const mergeConfigs = (global, local) => {
        const result = { ...global };
        for (const key in local) {
            if (typeof local[key] === 'object' && local[key] !== null && !Array.isArray(local[key])) {
                result[key] = mergeConfigs(result[key] || {}, local[key]);
            } else {
                result[key] = local[key];
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
        } catch { }
        return null;
    };

    const setCache = (configObj) => {
        try {
            localStorage.setItem(CONFIG.cacheKey, JSON.stringify(configObj));
            localStorage.setItem(CONFIG.cacheTimeKey, Date.now().toString());
        } catch {}
    };

    const fetchSource = async (pageTitle, apiUrl = mw.util.wikiScript('api')) => {
        try {
            const params = new URLSearchParams({
                action: 'query', prop: 'revisions', titles: pageTitle,
                rvprop: 'content', rvslots: 'main', format: 'json', formatversion: '2', origin: '*'
            });
            const response = await fetch(`${apiUrl}?${params.toString()}`);
            if (!response.ok) return {};
            const data = await response.json();
            const rawContent = data.query?.pages?.[0]?.revisions?.[0]?.slots?.main?.content;
            if (!rawContent) return {};
            const match = rawContent.match(/\[=\[\s*([\s\S]*?)\s*\]=\]/);
            return match ? JSON.parse(match[1]) : {};
        } catch (error) {
            return {};
        }
    };

    // 🛡️ БЕЗОПАСНОСТЬ: Санитайзер классов (Защита от CSS инъекций)
    const sanitizeClasses = (node) => {
        if (node.nodeType !== 1) return; // Только HTML элементы
        
        const cleanNode = (element) => {
            if (!element.hasAttribute('class')) return;
            const classList = Array.from(element.classList);
            const badClasses = classList.filter(cls => 
                cls.toLowerCase().includes('url(') || 
                cls.toLowerCase().includes('expression(') || 
                cls.toLowerCase().includes('@import') ||
                cls.toLowerCase().includes('javascript:')
            );
            if (badClasses.length > 0) {
                element.classList.remove(...badClasses);
                console.warn('[MasterCSS Security] Вырезан запрещенный класс:', badClasses);
            }
        };

        cleanNode(node);
        node.querySelectorAll('*').forEach(cleanNode);
    };

    const syncFandomDarkTheme = () => {
        if (document.body.classList.contains('theme-fandomdesktop-dark')) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const initMasterCSS = async () => {
        try {
            let finalConfig = getCache();
            if (!finalConfig) {
                const [globalConfig, localConfig] = await Promise.all([
                    fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                    fetchSource(CONFIG.localPage)
                ]);
                finalConfig = mergeConfigs(globalConfig, localConfig);
                setCache(finalConfig);
            }

            const { initCSSRuntime } = await import(CONFIG.cdnUrl);
            const rootElement = document.querySelector('.mw-parser-output');
            if (!rootElement) return;

            // Очищаем DOM до запуска
            sanitizeClasses(rootElement);

            // Вешаем отслеживание на новые классы
            const securityObserver = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        sanitizeClasses(mutation.target);
                    } else if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => sanitizeClasses(node));
                    }
                }
            });
            securityObserver.observe(rootElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

            // Изолируем движок строго в статье
            initCSSRuntime({
                root: rootElement,
                config: finalConfig
            });

            syncFandomDarkTheme();
            new MutationObserver(syncFandomDarkTheme).observe(document.body, { attributes: true, attributeFilter: ['class'] });
            
        } catch (error) {
            console.error('[MasterCSS Error]', error);
        }
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMasterCSS);
    else initMasterCSS();
})();
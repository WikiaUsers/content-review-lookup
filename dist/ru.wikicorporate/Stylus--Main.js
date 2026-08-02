/* jshint esversion: 11 */
(() => {
    'use strict';

    if (window.isStylusAdapterLoaded) return;
    window.isStylusAdapterLoaded = true;

    const CONFIG = {
        localPage: 'Модуль:Stylus',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        centralPage: 'Модуль:GlobalStylus',
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/stylus/0.54.8/stylus.min.js',
        styleId: 'fandom-compiled-stylus',
        cacheKey: 'fandom_custom_stylus_css',
        cacheTimeKey: 'fandom_custom_stylus_time',
        cacheTTL: 60 * 60 * 1000 // Время жизни кэша: 1 час
    };

    // Безопасное чтение из кэша
    const getCache = () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const wgAction = mw.config.get('wgAction');
            
            // Игнорируем кэш, если администратор форсирует обновление
            const forceReload = urlParams.has('clearcache') || wgAction === 'purge' || wgAction === 'edit';
            if (forceReload) return null;

            const cachedCss = localStorage.getItem(CONFIG.cacheKey);
            const cachedTime = localStorage.getItem(CONFIG.cacheTimeKey);
            
            // Если кэш существует и ему меньше часа — отдаем его
            if (cachedCss && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CONFIG.cacheTTL)) {
                return cachedCss;
            }
        } catch { 
            /* Игнорируем ошибки localStorage */ 
        }
        return null;
    };

    // Безопасная запись в кэш
    const setCache = (css) => {
        try {
            localStorage.setItem(CONFIG.cacheKey, css);
            localStorage.setItem(CONFIG.cacheTimeKey, Date.now().toString());
        } catch { 
            /* Игнорируем ошибки превышения квоты памяти */ 
        }
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
        return new Promise((resolve, reject) => {
            if (window.stylus) return resolve();
            
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
            const rawContent = data.query?.pages?.[0]?.revisions?.[0]?.slots?.main?.content;
            
            if (!rawContent) return '';

            const match = rawContent.match(/\[=\[\s*([\s\S]*?)\s*\]=\]/);
            return match ? match[1] : '';
        } catch {
            return '';
        }
    };

    // Обертка компилятора в Promise для использования с async/await
    const compileStylus = (rawCode) => {
        return new Promise((resolve, reject) => {
            window.stylus.render(rawCode, (err, css) => {
                if (err) reject(err);
                else resolve(css);
            });
        });
    };

    const initCompiler = async () => {
        try {
            // 1. Пробуем достать готовый CSS из кэша
            const cachedCSS = getCache();
            if (cachedCSS) {
                applyCSS(cachedCSS);
                return; // Мгновенный выход без лишних сетевых запросов и затрат CPU!
            }

            // 2. Если кэша нет, грузим библиотеку и модули параллельно
            const [, globalCode, localCode] = await Promise.all([
                loadStylusLibrary(),
                fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                fetchSource(CONFIG.localPage)
            ]);

            const combinedCode = `${globalCode}\n\n${localCode}`;
            if (!combinedCode.trim()) return;

            // 3. Компилируем свежий CSS
            const compiledCss = await compileStylus(combinedCode);

            // 4. Применяем на страницу и сохраняем в кэш
            applyCSS(compiledCss);
            setCache(compiledCss);

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
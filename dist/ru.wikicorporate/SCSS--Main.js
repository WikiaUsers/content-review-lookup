/* jshint esversion: 11 */
(() => {
    'use strict';

    if (window.isScssAdapterLoaded) return;
    window.isScssAdapterLoaded = true;

    const CONFIG = {
        localPage: 'Модуль:SCSS',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        centralPage: 'Модуль:GlobalSCSS',
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.sync.min.js',
        styleId: 'fandom-compiled-scss',
        cacheKey: 'fandom_custom_scss_css',
        cacheTimeKey: 'fandom_custom_scss_time',
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

    const loadScssLibrary = () => {
        return new Promise((resolve, reject) => {
            if (window.Sass) return resolve();
            
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить sass.sync.min.js'));
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
    const compileScss = (rawCode) => {
        return new Promise((resolve, reject) => {
            const sass = new window.Sass();
            sass.compile(rawCode, (result) => {
                if (result.status === 0) {
                    resolve(result.text);
                } else {
                    reject(new Error(`Строка ${result.line}, Колонка ${result.column}: ${result.message}`));
                }
            });
        });
    };

    const initCompiler = async () => {
        try {
            // 1. Пробуем достать готовый CSS из кэша
            const cachedCSS = getCache();
            if (cachedCSS) {
                applyCSS(cachedCSS);
                return; // Мгновенный выход, экономим 2.5 МБ трафика и API-запросы!
            }

            // 2. Если кэша нет, грузим библиотеку и модули параллельно
            const [, globalCode, localCode] = await Promise.all([
                loadScssLibrary(),
                fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                fetchSource(CONFIG.localPage)
            ]);

            const combinedCode = `${globalCode}\n\n${localCode}`;
            if (!combinedCode.trim()) return;

            // 3. Компилируем свежий CSS
            const compiledCss = await compileScss(combinedCode);

            // 4. Применяем на страницу и сохраняем в кэш
            applyCSS(compiledCss);
            setCache(compiledCss);

        } catch (error) {
            console.error('[SCSS Adapter Error]', error);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompiler);
    } else {
        initCompiler();
    }
})();
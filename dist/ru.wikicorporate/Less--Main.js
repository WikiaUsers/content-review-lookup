/* jshint esversion: 11 */
(() => {
    'use strict';

    const CONFIG = {
        localPage: 'Модуль:Less',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        centralPage: 'Модуль:GlobalLess',
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/4.2.0/less.min.js',
        styleId: 'fandom-compiled-less',
        cacheKey: 'fandom_custom_less_css',
        cacheTimeKey: 'fandom_custom_less_time',
        cacheTTL: 60 * 60 * 1000 // Время жизни кэша: 1 час (в миллисекундах)
    };

    window.less = { env: 'production', async: true, fileAsync: true, logLevel: 0 };

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
            /* Игнорируем ошибки, если браузер блокирует localStorage (например, в Инкогнито) */ 
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

    // Функция вставки стилей на страницу
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
        return new Promise((resolve, reject) => {
            if (window.less && window.less.render) return resolve(); // Защита на случай, если библиотека уже загружена
            
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
            const rawContent = data.query?.pages?.[0]?.revisions?.[0]?.slots?.main?.content;
            
            if (!rawContent) return '';

            const match = rawContent.match(/\[=\[\s*([\s\S]*?)\s*\]=\]/);
            return match ? match[1] : '';
        } catch {
            return ''; 
        }
    };

    const initCompiler = async () => {
        try {
            // 1. Пробуем достать готовый CSS из кэша
            const cachedCSS = getCache();
            if (cachedCSS) {
                applyCSS(cachedCSS);
                return; // Скрипт отработал за 1 мс, загрузка less.js отменена!
            }

            // 2. Если кэша нет или он устарел, грузим библиотеку и модули параллельно
            const [, globalCode, localCode] = await Promise.all([
                loadLessLibrary(),
                fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                fetchSource(CONFIG.localPage)
            ]);

            const combinedCode = `${globalCode}\n\n${localCode}`;
            if (!combinedCode.trim()) return;

            // 3. Компилируем свежий CSS
            const compiled = await less.render(combinedCode);

            // 4. Применяем на страницу и сохраняем в кэш для будущих переходов
            applyCSS(compiled.css);
            setCache(compiled.css);

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
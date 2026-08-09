/* jshint esversion: 11 */
(async () => {
    'use strict';

    if (window.fandomTwindLoaded) return;
    window.fandomTwindLoaded = true;

    const CONFIG = {
        localPage: 'Модуль:Twind/LocalConfig',
        centralPage: 'Модуль:Twind/GlobalConfig',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        cacheKey: 'fandom_twind_config',
        cacheTimeKey: 'fandom_twind_time',
        cacheTTL: 60 * 60 * 1000 // Кэш живет 1 час
    };

    // Глубокая склейка объектов (позволяет слить theme.extend.colors из двух модулей)
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

    // Чтение кэша с учетом сброса админами
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
        } catch { /* Игнорируем ошибки доступа к localStorage */ }
        return null;
    };

    const setCache = (configObj) => {
        try {
            localStorage.setItem(CONFIG.cacheKey, JSON.stringify(configObj));
            localStorage.setItem(CONFIG.cacheTimeKey, Date.now().toString());
        } catch {}
    };

    // Парсинг JSON из LUA-модулей
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
            if (!response.ok) return {};
            const data = await response.json();
            const rawContent = data.query?.pages?.[0]?.revisions?.[0]?.slots?.main?.content;
            
            if (!rawContent) return {};
            
            const match = rawContent.match(/\[=\[\s*([\s\S]*?)\s*\]=\]/);
            return match ? JSON.parse(match[1]) : {};
        } catch (error) {
            console.warn(`[Twind] Ошибка загрузки конфига ${pageTitle}:`, error);
            return {}; 
        }
    };

    const initTwind = async () => {
        try {
            let finalConfig = getCache();

            // Если кэш пуст, грузим конфиги через API
            if (!finalConfig) {
                const [globalConfig, localConfig] = await Promise.all([
                    fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                    fetchSource(CONFIG.localPage)
                ]);

                finalConfig = mergeConfigs(globalConfig, localConfig);
                setCache(finalConfig);
            }

            // Динамический импорт движка Twind
            const { install } = await import('https://cdn.jsdelivr.net/npm/@twind/core@1.1.3/+esm');
            const { default: presetTailwind } = await import('https://cdn.jsdelivr.net/npm/@twind/preset-tailwind@1.1.4/+esm');

            const rootElement = document.querySelector('.mw-parser-output');
            if (!rootElement) return;

            // Инициализация Twind
            install({
                // Сканируем только статьи, не трогаем интерфейс Фэндома
                target: rootElement, 
                presets: [
                    presetTailwind({
                        // Отключаем сброс базовых стилей (иначе сломаются списки и ссылки всей вики)
                        preflight: false 
                    })
                ],
                // Встраиваем наш склеенный конфиг из LUA
                ...finalConfig 
            });

            console.log('[Twind Loader] Успешно инициализирован с конфигом:', finalConfig);
            
        } catch (error) {
            console.error('[Twind Loader] Критическая ошибка:', error);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTwind);
    } else {
        initTwind();
    }
})();
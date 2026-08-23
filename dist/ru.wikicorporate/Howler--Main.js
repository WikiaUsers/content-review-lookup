/* Fandom Loader: Howler.js (ES2022) with Dual Lua Config */
(async () => {
    if (window.FandomHowlerLoaded) return;
    window.FandomHowlerLoaded = true;

    let Howl; 
    window.FandomHowlerPresets = window.FandomHowlerPresets || {};

    // Ссылка на центральную вики, где лежит глобальный модуль
    const CENTRAL_WIKI_API = 'https://wikicorporate.fandom.com/ru/api.php'; 

    // Функция загрузки и парсинга Lua -> JSON
    const fetchConfig = async (api, moduleName) => {
        try {
            const data = await api.get({
                action: 'expandtemplates',
                text: `{{#invoke:${moduleName}|toJSON}}`,
                prop: 'wikitext',
                formatversion: 2
            });
            return JSON.parse(data.expandtemplates.wikitext.trim() || '{}');
        } catch (e) {
            return {}; // Тихий фоллбек, если модуля нет на вики
        }
    };

    const initEngineAndPresets = async () => {
        // Подключаем необходимые API-библиотеки MediaWiki
        await mw.loader.using(['mediawiki.api', 'mediawiki.ForeignApi', 'mediawiki.util']);

        const localApi = new mw.Api();
        const foreignApi = new mw.ForeignApi(CENTRAL_WIKI_API, { anonymous: true });

        // Асинхронно параллельно качаем глобальный и локальный конфиги
        const [centralConfig, localConfig] = await Promise.all([
            fetchConfig(foreignApi, 'HowlerGlobal'), // Имя глобального модуля
            fetchConfig(localApi, 'HowlerLocal')     // Имя локального модуля
        ]);

        // Сливаем конфиги (Локальный имеет больший приоритет при совпадении ключей)
        const mergedConfig = { ...centralConfig, ...localConfig };

        // Загружаем сам движок Howler, если конфиги не пустые
        if (Object.keys(mergedConfig).length > 0 && !window.Howl) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js';
                script.onload = resolve;
                script.onerror = () => reject(new Error('Failed to load Howler.js'));
                document.head.append(script);
            });
        }
        
        Howl = window.Howl;
        if (!Howl) return;

        // Инициализируем пресеты из объединенного JSON
        for (const [presetName, config] of Object.entries(mergedConfig)) {
            const fileName = config.file || config.src;
            if (!fileName) continue;

            // Если передали полный URL (начинается с http), берем его, иначе генерируем локальный путь Фэндома
            const srcUrl = fileName.startsWith('http') 
                ? fileName 
                : mw.util.getUrl(`Special:FilePath/${fileName}`);

            window.FandomHowlerPresets[presetName] = new Howl({
                src: [srcUrl],
                volume: config.volume ?? 1.0,
                sprite: config.sprite || undefined,
                loop: config.loop || false
            });
        }
    };

    const processHowlerNodes = async (nodes) => {
        if (!Howl) {
            try {
                await initEngineAndPresets();
            } catch (error) {
                console.error('[Howler Adapter] Ошибка инициализации:', error);
                return;
            }
        }
        
        if (!Howl) return; // Если после инициализации движка всё равно нет

        nodes.forEach(node => {
            if (node.dataset.processedHowler) return;
            node.dataset.processedHowler = "true";

            const soundName = window.DOMPurify?.sanitize(node.dataset.sound) || node.dataset.sound;
            const preset = window.FandomHowlerPresets[soundName];
            
            if (!soundName || !preset) {
                console.warn(`[Howler] Звуковой пресет "${soundName}" не найден в реестрах.`);
                return;
            }

            const eventType = node.dataset.event || 'click';
            const spriteId = node.dataset.play;

            node.addEventListener(eventType, () => {
                if (spriteId) {
                    preset.play(spriteId);
                } else {
                    preset.play();
                }
            });

            if (eventType === 'click') {
                node.style.cursor = 'pointer';
            }
        });
    };

    const domObserver = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-howler:not([data-processed-howler])');
            if (nodes.length > 0) processHowlerNodes(nodes);
        }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });
    
    const initialNodes = document.querySelectorAll('.wiki-howler:not([data-processed-howler])');
    if (initialNodes.length > 0) processHowlerNodes(initialNodes);
})();
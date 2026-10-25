/* Fandom Loader: Howler.js with Direct JSON Config (ES2026) */
(() => {
    'use strict';
    if (window.FandomHowlerLoaded) return;
    window.FandomHowlerLoaded = true;

    let Howl = null;
    let initPromise = null;
    window.FandomHowlerPresets ??= {};

    const CENTRAL_WIKI_API = 'https://wikicorporate.fandom.com/ru/api.php';
    const ALLOWED_EVENTS = new Set(['click', 'mouseenter', 'mouseleave', 'focus', 'pointerdown']);

    const fetchJsonConfig = async (apiUrl, jsonPage) => {
        try {
            const params = new URLSearchParams({
                action: 'query',
                prop: 'revisions',
                titles: jsonPage,
                rvprop: 'content',
                rvslots: 'main',
                format: 'json',
                formatversion: '2',
                origin: '*'
            });
            const res = await fetch(`${apiUrl}?${params.toString()}`);
            if (!res.ok) return {};
            const data = await res.json();
            const page = data.query?.pages?.[0];
            if (page && !page.missing && page.revisions?.[0]?.slots?.main?.content) {
                return JSON.parse(page.revisions[0].slots.main.content);
            }
        } catch {}
        return {};
    };

    const initEngineAndPresets = () => {
        if (Howl) return Promise.resolve();
        initPromise ??= (async () => {
            await mw.loader.using(['mediawiki.util']);
            const localApiUrl = mw.util.wikiScript('api');

            const [centralConfig, localConfig] = await Promise.all([
                fetchJsonConfig(CENTRAL_WIKI_API, 'MediaWiki:Custom-HowlerGlobal.json'),
                fetchJsonConfig(localApiUrl, 'MediaWiki:Custom-HowlerLocal.json')
            ]);

            const mergedConfig = { ...centralConfig, ...localConfig };

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

            for (const [presetName, cfg] of Object.entries(mergedConfig)) {
                const fileName = cfg?.file || cfg?.src;
                if (!fileName || typeof fileName !== 'string') continue;

                const srcUrl = fileName.startsWith('https://')
                    ? fileName
                    : mw.util.getUrl(`Special:FilePath/${fileName.replace(/^(?:File|Файл):/i, '')}`);

                window.FandomHowlerPresets[presetName] = new Howl({
                    src: [srcUrl],
                    volume: cfg.volume ?? 1.0,
                    sprite: cfg.sprite || undefined,
                    loop: Boolean(cfg.loop)
                });
            }
        })();
        return initPromise;
    };

    const processHowlerNodes = async (nodes) => {
        try {
            await initEngineAndPresets();
        } catch (error) {
            console.error('[Howler Adapter] Ошибка инициализации:', error);
            return;
        }

        if (!Howl) return;

        for (const node of nodes) {
            if (node.dataset.processedHowler) continue;
            node.dataset.processedHowler = 'true';

            const soundName = (node.dataset.sound ?? '').trim();
            const preset = Object.hasOwn(window.FandomHowlerPresets, soundName)
                ? window.FandomHowlerPresets[soundName]
                : null;

            if (!soundName || !preset) {
                console.warn(`[Howler] Звуковой пресет "${soundName}" не найден в реестрах.`);
                continue;
            }

            const rawEvent = (node.dataset.event ?? 'click').trim();
            const eventType = ALLOWED_EVENTS.has(rawEvent) ? rawEvent : 'click';
            const spriteId = node.dataset.play;

            node.addEventListener(eventType, () => {
                if (spriteId) preset.play(spriteId);
                else preset.play();
            });

            if (eventType === 'click') {
                node.style.cursor = 'pointer';
            }
        }
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
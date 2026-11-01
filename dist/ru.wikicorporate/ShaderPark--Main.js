/* Fandom Adapter: Shader Park (ES2024) */
(async () => {
    'use strict';
    if (window.FandomShaderParkMainLoaded) return;
    window.FandomShaderParkMainLoaded = true;

    const CDN_URL = 'https://cdn.jsdelivr.net/npm/shader-park-core@0.2.5/dist/shader-park-core.esm.js';
    const SCENES_PAGE = 'MediaWiki:Custom-ShaderPark';
    const CENTRAL_INDEX = 'https://wikicorporate.fandom.com/ru/index.php';

    const fetchScenesRegistry = async () => {
        try {
            const res = await fetch(`${CENTRAL_INDEX}?title=${encodeURIComponent(SCENES_PAGE)}&action=raw&ctype=text/plain`);
            if (!res.ok) return {};
            const raw = await res.text();
            const map = {};
            const parts = raw.split(/\/\*\s*@scene:\s*([a-zA-Z0-9_-]+)\s*\*\//);
            for (let i = 1; i < parts.length; i += 2) {
                map[parts[i].trim()] = (parts[i + 1] || '').trim();
            }
            return map;
        } catch (e) {
            console.warn('[ShaderPark] Ошибка загрузки реестра сцен:', e);
            return {};
        }
    };

    try {
        const [{ sculptToMinimalRenderer }, scenesMap] = await Promise.all([
            import(CDN_URL),
            fetchScenesRegistry()
        ]);

        const mountScenes = () => {
            const wrappers = document.querySelectorAll('.sp-wrapper:not([data-sp-mounted="true"])');
            for (const el of wrappers) {
                el.dataset.spMounted = 'true';
                const sceneName = el.dataset.scene;
                const spCode = (sceneName && scenesMap[sceneName]) || el.textContent.trim();
                if (!spCode) continue;

                el.textContent = '';
                const canvas = document.createElement('canvas');
                canvas.style.cssText = 'width:100%;height:100%;display:block;border-radius:inherit;';
                el.appendChild(canvas);

                sculptToMinimalRenderer(canvas, spCode);
            }
        };

        mountScenes();
        new MutationObserver(mutations => {
            if (mutations.some(m => m.addedNodes.length > 0)) mountScenes();
        }).observe(document.body, { childList: true, subtree: true });
    } catch (err) {
        console.error('[ShaderPark] Ошибка инициализации:', err);
    }
})();
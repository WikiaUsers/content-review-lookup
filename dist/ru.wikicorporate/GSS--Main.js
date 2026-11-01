/* Fandom Loader: GPU Style Sheets / gss-lang (ES2024) */
(async () => {
    'use strict';
    if (window.FandomGSSMainLoaded) return;
    window.FandomGSSMainLoaded = true;

    const CDN_URL = 'https://cdn.jsdelivr.net/npm/gss-lang@0.0.6/lib/embed.js';
    const SCENES_PAGE = 'MediaWiki:Custom-GSSScenes';
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
            console.warn('[GSS] Ошибка загрузки реестра сцен:', e);
            return {};
        }
    };

    try {
        const [, scenesMap] = await Promise.all([
            import(CDN_URL),
            fetchScenesRegistry()
        ]);

        const mountScenes = () => {
            const wrappers = document.querySelectorAll('.gss-wrapper:not([data-gss-mounted="true"]), .wiki-gss:not([data-gss-mounted="true"])');
            for (const el of wrappers) {
                el.dataset.gssMounted = 'true';
                const sceneName = el.dataset.scene;
                const code = (sceneName && scenesMap[sceneName]) || el.textContent.trim();
                if (!code) continue;

                el.textContent = '';
                const gssEl = document.createElement('gss-scene');
                gssEl.setAttribute('controls', el.dataset.controls || 'none');
                gssEl.style.cssText = 'display:block;width:100%;height:100%;';

                const scriptEl = document.createElement('script');
                scriptEl.type = 'text/gss';
                scriptEl.textContent = code;

                gssEl.appendChild(scriptEl);
                el.appendChild(gssEl);
            }
        };

        mountScenes();
        new MutationObserver((mutations) => {
            if (mutations.some(m => m.addedNodes.length > 0)) mountScenes();
        }).observe(document.body, { childList: true, subtree: true });
    } catch (err) {
        console.error('[GSS] Ошибка инициализации:', err);
    }
})();
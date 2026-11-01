/* Fandom Adapter: SwissGL (ES2024) */
(async () => {
    'use strict';
    if (window.FandomSwissGLMainLoaded) return;
    window.FandomSwissGLMainLoaded = true;

    const CDN_URL = 'https://cdn.jsdelivr.net/gh/google/swissgl@main/swissgl.mjs';
    const SHADERS_PAGE = 'MediaWiki:Custom-Shaders';
    const CENTRAL_INDEX = 'https://wikicorporate.fandom.com/ru/index.php';

    const fetchShadersRegistry = async () => {
        try {
            const res = await fetch(`${CENTRAL_INDEX}?title=${encodeURIComponent(SHADERS_PAGE)}&action=raw&ctype=text/plain`);
            if (!res.ok) return {};
            const raw = await res.text();
            const map = {};
            const parts = raw.split(/\/\*\s*@shader:\s*([a-zA-Z0-9_-]+)\s*\*\//);
            for (let i = 1; i < parts.length; i += 2) {
                map[parts[i].trim()] = (parts[i + 1] || '').trim();
            }
            return map;
        } catch (e) {
            console.warn('[SwissGL] Ошибка загрузки реестра шейдеров:', e);
            return {};
        }
    };

    try {
        const [{ default: SwissGL }, shadersMap] = await Promise.all([
            import(CDN_URL),
            fetchShadersRegistry()
        ]);

        const activeInstances = new Set();

        const visibilityObserver = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.target._sglState) {
                    entry.target._sglState.visible = entry.isIntersecting;
                }
            }
        });

        const mountCanvases = () => {
            const wrappers = document.querySelectorAll('.swissgl-wrapper:not([data-sgl-mounted="true"])');
            for (const el of wrappers) {
                el.dataset.sglMounted = 'true';
                const shaderName = el.dataset.shader;
                const FP = (shaderName && shadersMap[shaderName]) || el.textContent.trim();
                if (!FP) continue;

                el.textContent = '';
                const canvas = document.createElement('canvas');
                canvas.style.cssText = 'width:100%;height:100%;display:block;border-radius:inherit;';
                el.appendChild(canvas);

                const glsl = SwissGL(canvas);
                const state = {
                    el,
                    canvas,
                    glsl,
                    FP,
                    visible: true,
                    mouse: [0.5, 0.5]
                };

                canvas.addEventListener('pointermove', e => {
                    const r = canvas.getBoundingClientRect();
                    state.mouse = [
                        (e.clientX - r.left) / r.width,
                        1.0 - (e.clientY - r.top) / r.height
                    ];
                }, { passive: true });

                el._sglState = state;
                visibilityObserver.observe(el);
                activeInstances.add(state);
            }
        };

        const renderLoop = (timeMs) => {
            const u_time = timeMs * 0.001;
            for (const inst of activeInstances) {
                if (!inst.visible) continue;
                inst.glsl.adjustCanvas(1);
                inst.glsl({
                    u_time,
                    u_mouse: inst.mouse,
                    FP: inst.FP
                });
            }
            requestAnimationFrame(renderLoop);
        };

        mountCanvases();
        requestAnimationFrame(renderLoop);

        new MutationObserver(mutations => {
            if (mutations.some(m => m.addedNodes.length > 0)) mountCanvases();
        }).observe(document.body, { childList: true, subtree: true });
    } catch (err) {
        console.error('[SwissGL] Ошибка инициализации:', err);
    }
})();
/* Fandom Loader: GSAP + ScrollTrigger (ES2024) */
(() => {
    'use strict';
    if (window.FandomGSAPLoaded) return;
    window.FandomGSAPLoaded = true;

    let gsapInstance = null;
    let enginePromise = null;

    window.FandomGSAPAnimations ??= {
        'fade-up': (node, props) => {
            gsapInstance.from(node, {
                opacity: 0,
                y: 40,
                duration: parseFloat(props.duration) || 0.8,
                delay: parseFloat(props.delay) || 0,
                ease: 'power2.out',
                scrollTrigger: props.scroll === 'true' ? node : null
            });
        },
        'zoom-in': (node, props) => {
            gsapInstance.from(node, {
                scale: 0.5,
                opacity: 0,
                duration: parseFloat(props.duration) || 1,
                ease: 'back.out(1.7)',
                scrollTrigger: props.scroll === 'true' ? node : null
            });
        }
    };

    const ensureGSAP = () => {
        if (gsapInstance) return Promise.resolve(gsapInstance);
        enginePromise ??= (async () => {
            const [gsapModule, stModule] = await Promise.all([
                import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js/+esm'),
                import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js/+esm')
            ]);
            gsapInstance = gsapModule.gsap;
            gsapInstance.registerPlugin(stModule.ScrollTrigger);
            window.FandomGSAP = gsapInstance;
            return gsapInstance;
        })();
        return enginePromise;
    };

    const initGSAPNodes = async (nodes) => {
        try {
            await ensureGSAP();
        } catch (error) {
            console.error('[GSAP Adapter] Ошибка загрузки библиотеки:', error);
            return;
        }

        for (const node of nodes) {
            if (node.dataset.processedGsap) continue;
            node.dataset.processedGsap = 'true';

            const animName = (node.dataset.animation ?? '').trim();
            if (!animName || !Object.hasOwn(window.FandomGSAPAnimations, animName)) {
                console.warn(`[GSAP] Пресет анимации "${animName}" не найден в реестре.`);
                continue;
            }

            const props = {};
            for (const [key, val] of Object.entries(node.dataset)) {
                if (key !== 'processedGsap' && key !== 'animation') {
                    props[key] = val;
                }
            }

            window.FandomGSAPAnimations[animName](node, props);
        }
    };

    const domObserver = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-gsap:not([data-processed-gsap])');
            if (nodes.length > 0) initGSAPNodes(nodes);
        }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });

    const initialNodes = document.querySelectorAll('.wiki-gsap:not([data-processed-gsap])');
    if (initialNodes.length > 0) initGSAPNodes(initialNodes);
})();
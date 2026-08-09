/* Fandom Loader: GSAP (ES2022) */
(() => {
    if (window.FandomGSAPLoaded) return;
    window.FandomGSAPLoaded = true;

    let gsap, ScrollTrigger;

    // 1. Глобальный реестр готовых пресетов анимации (как компоненты в Preact)
    window.FandomGSAPAnimations = window.FandomGSAPAnimations || {
        // Пример 1: Плавное появление снизу (отлично для карточек и текста)
        'fade-up': (node, props) => {
            gsap.from(node, {
                opacity: 0,
                y: 40,
                duration: parseFloat(props.duration) || 0.8,
                delay: parseFloat(props.delay) || 0,
                ease: "power2.out",
                // Если указан data-scroll="true", анимация запустится только когда до нее докрутят
                scrollTrigger: props.scroll === 'true' ? node : null 
            });
        },
        // Пример 2: Эффектный зум (например, для иконок или артов Оверлордов)
        'zoom-in': (node, props) => {
            gsap.from(node, {
                scale: 0.5,
                opacity: 0,
                duration: parseFloat(props.duration) || 1,
                ease: "back.out(1.7)",
                scrollTrigger: props.scroll === 'true' ? node : null
            });
        }
    };

    const initGSAPNodes = async (nodes) => {
        // 2. Инициализация GSAP при первом вызове
        if (!gsap) {
            try {
                // Динамический импорт ядра и ScrollTrigger через CDN
                const gsapModule = await import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js/+esm');
                const stModule = await import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js/+esm');
                
                gsap = gsapModule.gsap;
                ScrollTrigger = stModule.ScrollTrigger;
                
                // Регистрируем плагин
                gsap.registerPlugin(ScrollTrigger);
                
                // Экспортируем глобально, если захочешь писать сложную логику прямо в консоли или других скриптах
                window.FandomGSAP = gsap; 
            } catch (error) {
                console.error('[GSAP Adapter] Ошибка загрузки библиотеки:', error);
                return;
            }
        }

        // 3. Перебор и анимация найденных узлов
        nodes.forEach(node => {
            if (node.dataset.processedGsap) return;
            node.dataset.processedGsap = "true";

            // Читаем название пресета анимации из data-атрибута (с защитой DOMPurify, как в Preact-адаптере)
            const animName = window.DOMPurify?.sanitize(node.dataset.animation) || node.dataset.animation;
            
            if (!animName || !window.FandomGSAPAnimations[animName]) {
                console.warn(`[GSAP] Пресет анимации "${animName}" не найден в реестре.`);
                return;
            }

            // Динамически собираем ВСЕ оставшиеся дата-атрибуты, чтобы передать их в пресет
            const props = {};
            for (let key in node.dataset) {
                if (key !== 'processedGsap' && key !== 'animation') {
                    props[key] = window.DOMPurify?.sanitize(node.dataset[key]) ?? node.dataset[key];
                }
            }

            // 4. Запускаем нужную функцию из реестра, передавая ей узел и пропсы
            window.FandomGSAPAnimations[animName](node, props);
        });
    };

    // 5. Следим за динамически добавленными элементами (идеально для связки с Preact или AJAX)
    const domObserver = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-gsap:not([data-processed-gsap])');
            if (nodes.length > 0) initGSAPNodes(nodes);
        }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });
    
    // 6. Инициализация при старте
    const initialNodes = document.querySelectorAll('.wiki-gsap:not([data-processed-gsap])');
    if (initialNodes.length > 0) initGSAPNodes(initialNodes);
})();
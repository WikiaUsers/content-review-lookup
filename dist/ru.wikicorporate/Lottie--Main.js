/* jshint esversion: 11 */
(async () => {
    'use strict';
    // Защита от двойной загрузки
    if (window.isLottieAdapterLoaded) return;
    window.isLottieAdapterLoaded = true;

    const CONFIG = {
        lottieUrl: 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js',
        wrapperSelector: '.lottie-wrapper:not(.lottie-loaded)',
        registryPage: 'MediaWiki:Custom-LottieAnimations',
        rawScript: mw.util.wikiScript()
    };

    // Глобальный кэш анимаций
    window.FandomLottieAnimations = window.FandomLottieAnimations || null;

    // Асинхронная загрузка библиотеки
    const loadLottie = async () => {
        if (window.lottie) return;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.lottieUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Lottie library'));
            document.head.append(script);
        });
    };

    // Скачивание и парсинг реестра анимаций
    const fetchAnimations = async () => {
        if (window.FandomLottieAnimations) return window.FandomLottieAnimations;
        
        try {
            const params = new URLSearchParams({
                action: 'raw',
                title: CONFIG.registryPage,
                ctype: 'text/plain'
            });
            
            const response = await fetch(`${CONFIG.rawScript}?${params.toString()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const rawText = await response.text();
            const animations = {};
            
            // Разделитель: // @animation: имя_анимации
            const regex = /^\/\/\s*@animation:\s*(.+)$/gm;
            const chunks = rawText.split(regex);
            
            for (let i = 1; i < chunks.length; i += 2) {
                const name = chunks[i].trim();
                const code = chunks[i + 1].trim();
                if (name && code) {
                    try {
                        // Парсим текст в нативный JSON-объект
                        animations[name] = JSON.parse(code);
                    } catch (err) {
                        console.error(`[Lottie Adapter] Ошибка JSON в анимации "${name}":`, err);
                    }
                }
            }
            
            window.FandomLottieAnimations = animations;
            return animations;
        } catch (error) {
            console.error('[Lottie Adapter] Ошибка загрузки реестра анимаций:', error);
            return {};
        }
    };

    const initLottieElements = async (hookContent) => {
        const parent = (hookContent && hookContent[0]) || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (!wrappers.length) return;
        
        try {
            // Грузим параллельно
            const [_, animations] = await Promise.all([loadLottie(), fetchAnimations()]);
            
            for (const wrapper of wrappers) {
                const animName = mw.html.escape(wrapper.dataset.animation || '');
                const animData = animations[animName];
                
                if (!animData) {
                    console.warn(`[Lottie Adapter] Анимация "${animName}" не найдена в реестре.`);
                    continue;
                }
                
                try {
                    // Читаем пропсы юзера (по умолчанию зациклено и автовоспроизведение включено)
                    const loop = wrapper.dataset.loop !== 'false';
                    const autoplay = wrapper.dataset.autoplay !== 'false';
                    
                    // Рендер Lottie-вектора
                    lottie.loadAnimation({
                        container: wrapper,
                        renderer: 'svg',
                        loop: loop,
                        autoplay: autoplay,
                        animationData: animData // Передаем готовый JSON-объект
                    });
                    
                    wrapper.classList.add('lottie-loaded');
                } catch (error) {
                    console.error('[Lottie Render Error]', error);
                }
            }
        } catch (error) {
            console.error('[Lottie Adapter Error]', error);
        }
    };

    mw.hook('wikipage.content').add(initLottieElements);
})();
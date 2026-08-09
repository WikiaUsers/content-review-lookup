(() => {
    'use strict';
    
    if (window.gsapAdapterES6Loaded) return;
    window.gsapAdapterES6Loaded = true;

    // Ссылка на основную страницу с логикой GSAP
    const SCRIPT_PAGE = 'MediaWiki:GSAP/Main.js'; 
    const VERSION = '1.0'; 
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const loadScript = () => {
        const script = document.createElement('script');
        script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
        document.head.appendChild(script);
    };

    const checkDOM = () => {
        // Загружаем тяжелый GSAP только если на странице есть элементы для анимации
        if (document.querySelector('.wiki-gsap')) {
            loadScript();
            observer.disconnect(); // Скрипт загружен, наблюдение больше не нужно
        }
    };

    const observer = new MutationObserver(checkDOM);
    
    const init = () => {
        observer.observe(document.body, { childList: true, subtree: true });
        checkDOM();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
/* Загрузчик Twind (ES6) */
(() => {
    'use strict';
    if (window.fandomTwindObserver) return;
    window.fandomTwindObserver = true;

    const SCRIPT_PAGE = 'MediaWiki:Twind/Main.js';
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const loadScript = () => {
        const script = document.createElement('script');
        script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=1.0`;
        document.head.appendChild(script);
    };

    const checkDOM = () => {
        if (document.querySelector('.mw-parser-output .wiki-twind')) {
            loadScript();
            observer.disconnect(); 
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
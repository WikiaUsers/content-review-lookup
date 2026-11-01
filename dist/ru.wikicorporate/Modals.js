/* Загрузчик системы модальных окон (ES6) */
(() => {
    'use strict';
    if (window.modalsLoaderLoaded) return;
    window.modalsLoaderLoaded = true;

    const SCRIPT_PAGE = 'MediaWiki:Modals/Main.js';
    const VERSION = '1.0';
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    let loaded = false;
    const loadMain = () => {
        if (loaded) return;
        loaded = true;
        const script = document.createElement('script');
        script.src = CENTRAL_API + '?title=' + encodeURIComponent(SCRIPT_PAGE) + '&action=raw&ctype=text/javascript&v=' + VERSION;
        document.head.appendChild(script);
    };

    const checkDOM = () => {
        if (document.querySelector('[data-modal-open], .wiki-modal-source')) {
            loadMain();
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
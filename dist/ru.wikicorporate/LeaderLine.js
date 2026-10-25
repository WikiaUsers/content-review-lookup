/* Загрузчик: LeaderLine.js (ES6) */
(() => {
    'use strict';
    if (window.leaderLineAdapterES6Loaded) return;
    window.leaderLineAdapterES6Loaded = true;

    const SCRIPT_PAGE = 'MediaWiki:LeaderLine/Main.js';
    const VERSION = '1.1';
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const loadScript = () => {
        const script = document.createElement('script');
        script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
        document.head.appendChild(script);
    };

    const checkDOM = () => {
        if (document.querySelector('.wiki-leaderline')) {
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
/* Загрузчик кастомного аудиоплеера (ES6) */
(() => {
    'use strict';
    if (window.audioPlayerLoaderLoaded) return;
    window.audioPlayerLoaderLoaded = true;

    const SCRIPT_PAGE = 'MediaWiki:AudioPlayer/Main.js';
    const VERSION = '1.0';
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    let loaded = false;
    const loadMain = () => {
        if (loaded) return;
        loaded = true;
        const script = document.createElement('script');
        script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
        document.head.appendChild(script);
    };

    const SELECTOR = '.t-audio, .mediaContainer audio, .mw-tmh-player audio, .page-content audio';

    const checkDOM = () => {
        if (document.querySelector(SELECTOR)) {
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
/* Загрузчик Petite-Vue (ES6) */
(() => {
    'use strict';
    if (window.fandomPetiteVueObserver) return;
    window.fandomPetiteVueObserver = true;

    const SCRIPT_PAGE = 'MediaWiki:PetiteVue/Main.js';
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const loadScript = () => {
        const script = document.createElement('script');
        script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=1.0`;
        document.head.appendChild(script);
    };

    const checkDOM = () => {
        if (document.querySelector('.mw-parser-output [v-scope]')) {
            loadScript();
            observer.disconnect();
        }
    };

    const observer = new MutationObserver(checkDOM);
    const init = () => {
        observer.observe(document.body, { childList: true, subtree: true });
        checkDOM();
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
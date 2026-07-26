(() => {
    'use strict';

    // Защита от двойной загрузки
    if (window.CrossWikiActivityLoaded) return;
    window.CrossWikiActivityLoaded = true;

    // Страница с нашим основным ES2022 кодом
    const SCRIPT_PAGE = 'MediaWiki:CrossWikiActivity/Main.js';
    const VERSION = '1.8.5'; 

    const scriptUrl = mw.util.wikiScript() + 
        '?title=' + encodeURIComponent(SCRIPT_PAGE) + 
        '&action=raw' + 
        '&ctype=text/javascript' + 
        '&v=' + VERSION;

    const script = document.createElement('script');
    script.src = scriptUrl;
    document.head.appendChild(script);
    
    console.log('[CrossWikiActivity] Загрузчик инициализирован...');
})();
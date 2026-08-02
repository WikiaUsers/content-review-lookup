(() => {
    'use strict';
    // Загружаем скрипт только в режиме редактирования или создания страницы
    const action = mw.config.get('wgAction');
    if (action !== 'edit' && action !== 'submit') return;
    
    if (window.wikificatorES2022Loaded) return;
    window.wikificatorES2022Loaded = true;

    const SCRIPT_PAGE = 'MediaWiki:Wikificator/Main.js';
    const VERSION = '1.0'; 
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const script = document.createElement('script');
    script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
    document.head.appendChild(script);
})();
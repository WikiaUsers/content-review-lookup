(() => {
    'use strict';
    // Загружаем скрипт только в основном пространстве (статьи)
    if (mw.config.get('wgNamespaceNumber') !== 0) return;
    
    if (window.customPagePreviewsLoaded) return;
    window.customPagePreviewsLoaded = true;

    const SCRIPT_PAGE = 'MediaWiki:ArticlePreview/Main.js';
    const VERSION = '1.0'; 
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const script = document.createElement('script');
    script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
    document.head.appendChild(script);
})();
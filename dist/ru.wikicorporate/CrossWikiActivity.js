(() => {
    'use strict';
    if (window.CrossWikiActivityLoaded) return;
    window.CrossWikiActivityLoaded = true;

    const SCRIPT_PAGE = 'MediaWiki:CrossWikiActivity/Main.js';
    const VERSION = '1.0'; 
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const script = document.createElement('script');
    script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
    document.head.appendChild(script);
})();
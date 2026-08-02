(() => {
    'use strict';
    if (window.cssDoodleAdapterES2022Loaded) return;
    window.cssDoodleAdapterES2022Loaded = true;

    const SCRIPT_PAGE = 'MediaWiki:Css-doodle/Main.js'; 
    const VERSION = '1.0'; 
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const script = document.createElement('script');
    script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
    document.head.appendChild(script);
})();
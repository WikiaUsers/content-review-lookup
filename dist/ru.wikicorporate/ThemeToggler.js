(() => {
    'use strict';
    if (window.themeTogglerES2022Loaded) return;
    window.themeTogglerES2022Loaded = true;

    const SCRIPT_PAGE = 'MediaWiki:ThemeToggler/Main.js';
    const VERSION = '1.0'; 
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const script = document.createElement('script');
    script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
    document.head.appendChild(script);
})();
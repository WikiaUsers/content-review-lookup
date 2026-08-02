(() => {
    'use strict';
    // Строгая проверка: загружаем скрипт ТОЛЬКО там, где есть комментарии или стена обсуждения
    const config = mw.config.get(['articleHasCommentingEnabled', 'profileIsMessageWallPage']);
    if (!config.articleHasCommentingEnabled && !config.profileIsMessageWallPage) return;
    
    if (window.enhancedEditorES2022Loaded) return;
    window.enhancedEditorES2022Loaded = true;

    const SCRIPT_PAGE = 'MediaWiki:EnhancedEditor/Main.js';
    const VERSION = '1.0'; 
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const script = document.createElement('script');
    script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
    document.head.appendChild(script);
})();
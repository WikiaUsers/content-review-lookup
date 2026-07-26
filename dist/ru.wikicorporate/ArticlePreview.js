(() => {
    'use strict';

    // Защита от двойной загрузки
    if (window.customPagePreviewsLoaded) return;
    window.customPagePreviewsLoaded = true;

    // Имя страницы, где будет лежать твой основной код
    const SCRIPT_PAGE = 'MediaWiki:ArticlePreview/Main.js';
    
    // Версия скрипта (Меняем при каждом обновлении кода, например на 1.1, 1.2 и т.д.)
    const VERSION = '1.0'; 

    // Формируем URL для прямой загрузки кода как текста
    const scriptUrl = mw.util.wikiScript() + 
        '?title=' + encodeURIComponent(SCRIPT_PAGE) + 
        '&action=raw' + 
        '&ctype=text/javascript' + 
        '&v=' + VERSION;

    // Создаем тег и внедряем в голову документа
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.head.appendChild(script);
    
    console.log('[Loader] Инициализирован запрос на загрузку ArticlePreview...');
})();
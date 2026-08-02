/* Загрузчик: LeaderLine.js (Связи и стрелки) */
(() => {
    'use strict';
    
    // Защита от двойной загрузки
    if (window.leaderLineAdapterES6Loaded) return;
    window.leaderLineAdapterES6Loaded = true;

    // Настройки для кросс-вики импорта
    const SCRIPT_PAGE = 'MediaWiki:LeaderLine/Main.js'; 
    const VERSION = '1.0'; 
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    // Функция инъекции скрипта
    const loadScript = () => {
        const script = document.createElement('script');
        script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
        document.head.appendChild(script);
    };

    // Проверка наличия триггера на странице
    const checkDOM = () => {
        if (document.querySelector('.wiki-leaderline')) {
            loadScript();
            observer.disconnect(); // Убиваем обсервер, чтобы не засорять память
        }
    };

    // Наблюдатель за изменениями DOM (для динамического контента и скролла)
    const observer = new MutationObserver(checkDOM);
    
    const init = () => {
        // Запускаем слежение за всем body
        observer.observe(document.body, { childList: true, subtree: true });
        // Делаем первичную проверку
        checkDOM();
    };

    // Безопасный запуск с учетом состояния загрузки страницы (защита от ошибок Fandom)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
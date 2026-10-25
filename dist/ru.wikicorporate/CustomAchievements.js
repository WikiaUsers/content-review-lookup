/* Загрузчик системы кастомных достижений (ES6) */
(() => {
    'use strict';

    const ns = mw.config.get('wgNamespaceNumber');
    const special = mw.config.get('wgCanonicalSpecialPageName');

    // Запускаемся только в профилях участников (ns=2), таблице лидеров и на странице настройки значков
    if (ns !== 2 && special !== 'Leaderboard' && special !== 'AchievementsCustomize') {
        return;
    }

    if (window.customAchievementsES6Loaded) return;
    window.customAchievementsES6Loaded = true;

    const SCRIPT_PAGE = 'MediaWiki:CustomAchievements/Main.js';
    const VERSION = '1.0';
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';

    const loadScript = () => {
        const script = document.createElement('script');
        script.src = `${CENTRAL_API}?title=${encodeURIComponent(SCRIPT_PAGE)}&action=raw&ctype=text/javascript&v=${VERSION}`;
        document.head.appendChild(script);
    };

    const checkDOM = () => {
        if (
            special === 'AchievementsCustomize' ||
            document.querySelector('.AchievementsModule, #LeaderboardTable, .LeaderboardTable')
        ) {
            loadScript();
            return true;
        }
        return false;
    };

    const init = () => {
        if (checkDOM()) return;
        const observer = new MutationObserver((mutations, obs) => {
            if (checkDOM()) obs.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => observer.disconnect(), 10000);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
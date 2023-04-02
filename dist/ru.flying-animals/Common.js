/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Medals/code.js',
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js'
    ]
});

// Автообновление
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges",
    "Project:Главная",
    "Служебная:NewPages",
    "Служебная:NewFiles",
    "Служебная:Log",
    "Служебная:Исследования",
    "Шаблон:Заглавная:Приветствие"
]; 
window.AjaxRCRefreshText = 'Автообновление страницы';
window.AjaxRCRefreshHoverText = 'Эта функция позволяет данным этой страницы обновляться автоматически. Вам не придётся вручную перезагружать вкладку, чтобы увидеть новые данные, они будут появляться сами';
window.ajaxRefresh = 30000;
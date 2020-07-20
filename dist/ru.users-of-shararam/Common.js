importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
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
    "Служебная:Исследования"
]; 
window.AjaxRCRefreshText = 'Автообновление страницы';
window.AjaxRCRefreshHoverText = 'Эта функция позволяет данным этой страницы обновляться автоматически. Вам не придётся вручную перезагружать вкладку, чтобы увидеть новые данные, они будут появляться сами';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/users-of-shararam/images/4/4e/AJAX-loader.gif/revision/latest?cb=20191020185718&path-prefix=ru';
window.ajaxRefresh = 30000;
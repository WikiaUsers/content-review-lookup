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
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/frozen/images/e/e7/Ajax-loader-snowflake.gif/revision/latest?cb=20190527110017&path-prefix=ru';
window.ajaxRefresh = 30000;
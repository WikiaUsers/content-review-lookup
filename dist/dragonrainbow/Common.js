/* Anpassungen für AjaxRC */
ajaxPages = ['Special:RecentChanges','Special:WikiActivity'];
AjaxRCRefreshText = 'Auto-Aktualisierung';
AjaxRCRefreshHoverText = 'Automatische Aktualisierung der kompletten Seite';
 
importArticles({
    type: 'script',
    articles: [
//        'u:dev:AdvancedOasisUI/code.js',
          'u:dev:ExtendedNavigation/code.js',
          'u:dev:AjaxRC/code.js',
          'u:dev:PurgeButton/code.js'
    ]
});
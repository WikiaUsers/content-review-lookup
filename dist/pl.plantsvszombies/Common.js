/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Automatyczne odświeżanie */
ajaxPages = [
    "Specjalna:Aktywność_na_wiki",
    "Specjalna:Ostatnie_zmiany",
    "Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatyczne odświeżanie strony';

/* Import */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});
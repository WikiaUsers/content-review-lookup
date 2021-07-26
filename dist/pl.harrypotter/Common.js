/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Import skryptów */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiaNotification/code.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
        'u:dev:MediaWiki:AddRailModule/code.js'
    ]
});


/* Konfiguracja taga nieaktywnych użytkowników */
window.InactiveUsers = {
    text: {
        unknown: 'Nieaktywny',
        female: 'Nieaktywna'
    },
    months: 2
};

/* Second railmodule */
$(function() {
    $('<section>', {
        class: 'railModule2 rail-module',
        id: 'DiscordModule'
    })
    .appendTo( '#WikiaRail' )
    .load( mw.util.getUrl( 'Szablon:DiscordModule', { action: 'render' } ) );
});
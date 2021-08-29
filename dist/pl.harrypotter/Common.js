/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Import skryptów */
importArticles({
    type: 'script',
    articles: [
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

/* Drugi moduł */
$(function() {
    $('<section>', {
        class: 'railModule2 rail-module',
        id: 'DiscordModule'
    })
    .appendTo( '#WikiaRail' )
    .load( mw.util.getUrl( 'Szablon:DiscordModule', { action: 'render' } ) );
});

/**
 * Kliknięcie dowolnego punktu w boksie kategorii na stronie głównej
 * poskutkuje przeniesieniem użytkownika do strony kategorii zalinkowanej
 * w obrazie ilustrującym daną kategorię. (by Rail)
 */
;( function() {
    'use strict';

    const sgBoxes = document.querySelectorAll( '.sg-kategorie' );
    const isMainPage = mw.config.get( 'wgIsMainPage' );

    if ( isMainPage && !!sgBoxes ) {
        /**
         * querySelectorAll() zwraca dane jako iterableObject,
         * trzeba je przekonwertować na tablicę żeby użyć forEach()
         */
        Array.from( sgBoxes ).forEach( function( sgBox ) {
            const boxLink = sgBox.querySelector( 'a' );

            /**
             * Symulacja kliknięcia linku jest w tym przypadku lepsza,
             * ponieważ użycie funkcji location.replace() uniemożliwia
             * powrót do poprzedniej strony przy użyciu przycisku
             * nawigacyjnego w oknie przeglądarki.
             */
            const clickEvent = new MouseEvent( 'click', {
                view: window,
                bubbles: true,
                cancelable: false
            } );

            /**
             * Po kliknięciu boksu (w dowolnym miejscu) wykonane zostanie
             * udawane kliknięcie w link
             */
            sgBox.addEventListener( 'click', function() {
                boxLink.dispatchEvent( clickEvent );
            } );
        } );
    }
} )();
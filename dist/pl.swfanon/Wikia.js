/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
// MODUŁ FACEBOOKA by Wedkarski
$(function() {
  $('#WikiaRail .loading').after('<div class="FacebookWidgetModule module"><iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbiblioteka.arkanii&tabs&width=300&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="300" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div>');
});

// PRZENIESIENIE DISCORDA NA DÓŁ by KockaAdmiralac
$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').appendTo('#WikiaRail');
    });
});
// Dodaj zakładkę na profilu by Rail
( function( mw ) {
    'use strict';

    /**
     * Funkcja generująca nowe zakładki
     *
     * @param text
     * @param href
     * @param id
     */
    function addProfileTab( text, href, id ) {
        // Zawsze sprawdź obecność modułu `mediawiki.util`
        mw.loader.using( 'mediawiki.util', function() {
            // Przygotuj zmienną z listą zakładek i nie wykonuj funkcji, jeśli listy nie ma na stronie
            var tabsContainer = document.querySelector( '.tabs-container .tabs' );
            if ( !tabsContainer ) return;

            // Przygotuj elementy DOM do późniejszego użytku
            var tab = document.createElement( 'li' );
            var link = document.createElement( 'a' );

            // Przygotuj nick użytkownika, na którego profilu jesteśmy
            var user = document.querySelector( '#UserProfileMasthead h1[itemprop="name"]' ).innerText;

            // Ustal identyfikator – niestandardowy lub domyślny
            tab.setAttribute( 'data-id', ( id ? id : 'custom-tab' ) );

            /**
             * Ustal atrybuty linki takie jak jego tekst i miejsce, do którego ma kierować
             * Zastępuj `$1` w linku nickiem użytkownika
            */
            link.innerText = text;
            link.setAttribute( 'href', ( href ? mw.util.getUrl( href.replace( /\$1/g, user ) ) : '#' ) );

            // Dodaj link do zakładki, a zakładkę do listy
            tab.appendChild( link )
            tabsContainer.appendChild( tab )
        } );
    }

    /**
     * Użycie zmiennej `$1` w drugim ciągu znajków poskutkuje zamienieniem go na nick użytkownika, na którego profilu jesteś.
     * `addProfileTab( 'Licznik edycji', 'Specjalna:Licznik_edycji/$1', 'editcount' );`
     * Kod powyżej doda jak najbardziej działający link do licznika edycji
     */
    addProfileTab ( 'Brudnopis', 'Użytkownik:$1/Brudnopis' );
} )( mediaWiki );
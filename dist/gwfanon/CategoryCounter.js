/**
 * Dodaje na profilach użytkowników element informujący o ilości stron w ich kategorii
 * Liczba ta jest tożsama z ilością utworzonych przez nich artykułów kreatywnych
 */
;( function( mw, window, $ ) {
    'use strict';

    /**
     * Zweryfikuj, czy strona powinna mieć profil
     */
    function hasProfile() {
        return !!mw.config.get( 'profileUserName' );
    }

    /**
     * Przerwij działanie skryptu, jeśli jest już załadowany lub strona nie ma profilu
     */
    if ( !hasProfile() || window.categoryCounterLoaded ) {
        return;
    }
    window.categoryCounterLoaded = true;

    /**
     * Poczekaj na załadowanie profilu, po czym wykonaj dalsze instrukcje
     *
     * @param {Function} callback
     */
    function onProfileLoaded( callback ) {
        const interval = setInterval( function() {
            if ( $( '.user-identity-box__wrapper' ).length ) {
                clearInterval( interval );
                callback();
            }
        }, 500 );
    }

    /**
     * Stwórz element profilu na podstawie danych wejściowych
     *
     * @param {Object} inputData
     */
    function createProfileWrapper( inputData ) {
        /**
         * Liczba stron w kategorii, lub 0 jeśli kategoria nie istnieje
         */
        const pagesCount = ( inputData.categoryinfo.pages
            ? inputData.categoryinfo.pages
            : 0
        );

        /**
         * Formy liczby mnogiej słowa „Artykuł”
         */
        const labelForms = [
            'Artykuł',
            'Artykuły',
            'Artykułów'
        ];

        mw.loader.using( ['mediawiki.util', 'mediawiki.language'], function() {
            const $wrapper = $( '<li>', { id: 'category-counter' } ).append(
                $( '<a>', { href: mw.util.getUrl( inputData.title ) } ).append(
                    $( '<strong>', { text: pagesCount } ),
                    ' ' + mw.language.convertPlural( pagesCount, labelForms )
                )
            );

            $( '.user-identity-stats' ).append( $wrapper );
        } );
    }

    /**
     * Główna funkcja skryptu – pozyskaj dane o kategorii użytkownika
     */
    onProfileLoaded( function() {
        const queryParams = {
            action: 'query',
            prop: 'categoryinfo',
            titles: 'Category:' + mw.config.get( 'profileUserName' ),
            formatversion: 2
        };

        mw.loader.using( 'mediawiki.api', function() {
            new mw.Api().get( queryParams ).done( function( resp ) {
                /**
                 * Obsługa błędów API
                 */
                if ( resp.error ) {
                    return console.error(
                        'Wystąpił błąd API przy pobieraniu danych kategorii! „$1” – $2.'
                            .replace( '$1', resp.error.code )
                            .replace( '$2', resp.error.info )
                    );
                }

                /**
                 * Przygotuj dane i dodaj element profilu
                 */
                const data = resp.query.pages[0];
                createProfileWrapper( data );

            } ).fail( function() {
                /**
                 * Obsługa błędów AJAX
                 */
                return console.error( 'Przy pobierani udanych o kategorii wystąpił błąd AJAX!' );
            } );
        } );
    } );
} )( mediaWiki, window, jQuery );
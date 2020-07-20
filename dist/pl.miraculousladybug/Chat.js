// Umieszczony tutaj kod JavaScript wykonywany jest w przeglądarce każdego użytkownika czatu
// Kod autorstwa użytkownika Rail01
require( ['jquery', 'mw', 'wikia.window'], function( $, mw, window ) {
    // Zapobieganie wielokrotnemu ładowaniu
    if ( mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'Chat' || window.ChatJsLoaded ) return;
    window.ChatJsLoaded = true;
 
    /**
     * Importy skryptów zewnętrznych
     */
    importArticles( {
        type: 'script',
        articles: [
            'u:dev:MediaWiki:NewMessageCount.js',
            'u:dev:MediaWiki:ChatNotifications/code.js',
            'u:dev:MediaWiki:ChatOptions/code.js',
            'u:dev:MediaWiki:EmoticonsWindow/code.js',
            'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
            'u:dev:MediaWiki:IsTyping/code.js',
        ]
    } );
 
    /**
     * Temat czatu w nagłówku
     */
    mw.loader.using( 'mediawiki.util', function() {
        // Czytelniejsze tworzenie linków
        function createEl( target, label ) {
            if ( !target || !label ) return;
            return {
                href: mw.util.getUrl( target ),
                text: label,
                target: '_blank'
            };
        }
 
        $( '<div>', { class: 'chattopic' } ).append(
            $( '<a>', createEl( 'Project:Zasady', 'Regulamin' ) ),
            ' &bull; ',
            $( '<a>', createEl( 'Pomoc:Czat', 'Pomoc' ) )
        ).prependTo( '#ChatHeader .public.wordmark' );
    } );
} );
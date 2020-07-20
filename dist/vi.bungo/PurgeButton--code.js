/*jshint browser:true, jquery:true*/
/*global mediaWiki*/
 
( function ( $, mw ) {
 
    'use strict';
 
    var nsNr = mw.config.get( 'wgNamespaceNumber' ),
        translations = {
            be: 'Абнавіць',
            bg: 'Обновяване',
            de: 'Neu laden',
            el: 'Ανανέωση',
            en: 'Refresh',
            es: 'Actualizar',
            fr: 'Actualiser',
            hu: 'Frissítés',
            it: 'Aggiorna',
            ja: '再読込',
            ko: '새로고침',
            nl: 'Herladen',
            pl: 'Odśwież',
            pt: 'Actualizar',
            'pt-br': 'Atualizar',
            ru: 'Обновить',
            sr: 'Освежи',
            'sr-el': 'Osveži',
            tl: 'Muling i-sariwa',
            uk: 'Оновити',
            vi: 'Tải lại trang',
            zh: '重新整理',
            'zh-hans': '重新整理',
            'zh-Hant': '重新整理'
        },
        lang = mw.config.get('wgContentLanguage'),
        theText = (typeof window.PurgeButtonText === 'string' && window.PurgeButtonText) ||
            translations[lang] || translations[lang.split("-")[0]] || translations.en;
 
    if ( nsNr < 0 || window.PurgeButtonsLoaded || document.getElementById( 'control_purge' ) ) {
        return;
    }
 
    window.PurgeButtonsLoaded = true; // prevent duplicate running (but not dupe buttons from outside this code)
 
    $( addPurgeButton );
 
    function purgePage () {
        $.get( '?action=purge', function () {
            location.reload( true );
        } );
        $('html,body').css( {
            display: 'block',
            overflow: 'hidden'
        } );
        $( '<div style="background: url(\'/skins/common/images/ajax.gif\') no-repeat fixed center center white;height: 100%;left: 0;opacity: 0.25;position: absolute;top: 0;width: 100%;z-index: 1000000000;"></div>' ).appendTo( document.body );
    }
 
    function addOasisPurgeButton () {
        switch (nsNr) {
            case 500:
            case 502:
                // Blog namespaces
                $('.page-header__contribution-buttons').append(
                    '<a class="custom-purge-button wds-button wds-is-squished wds-is-secondary" href="javascript:void(0)" title="Purge page"></a>'
                );
                break;
            default:
                // .UserProfileActionButton is for root user pages (they don't use new page header yet)
                $( '.UserProfileActionButton .wikia-menu-button .WikiaMenuElement, .page-header__contribution-buttons .wds-list' ).append(
                    '<li><a class="custom-purge-button" href="javascript:void(0)" title="Purge page"></a></li>'
                );
        }
    }
 
    function addPurgeButton () {
        switch( mw.config.get( 'skin' ) ) {
 
            case 'uncyclopedia': /* monobook clone, pass to monobook */
            case 'wowwiki': /* monobook clone, pass to monobook */
            case 'lostbook': /* monobook clone, pass to monobook */
            case 'monobook':
                $('#p-cactions > .pBody > ul').append('<li id="ca-purge"><a class="custom-purge-button" href="javascript:void(0)" title="Purge page"></a></li>');
                break;
 
            case 'oasis':
            case 'wikia':
                addOasisPurgeButton();
                break;
        }
        $( '.custom-purge-button' ).text( theText ).click( purgePage );
    }
} ( jQuery, mediaWiki ) );
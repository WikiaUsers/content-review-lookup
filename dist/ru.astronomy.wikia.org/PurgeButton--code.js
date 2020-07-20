//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true, jquery:true*/
/*global mediaWiki*/
 
( function ( $, mw ) {
 
    'use strict';
 
    var nsNr = mw.config.get( 'wgNamespaceNumber' ),
        translations = {
            en: 'Refresh',
            es: 'Actualizar',
            de: 'Neu laden',
            hu: 'Frissítés',
            nl: 'Herladen',
            pl: 'Odśwież',
            ru: 'Обновить'
        },
        theText = (typeof window.PurgeButtonText === 'string' && window.PurgeButtonText) ||
            translations[mw.config.get('wgContentLanguage')] || translations.en;
 
    if ( nsNr < 0 || window.PurgeButtonsLoaded || document.getElementById( 'control_purge' ) ) {
        return;
    }
 
    window.PurgeButtonsLoaded = true; // prevent duplicate running (but not dupe buttons from outside this code)
 
    $( addPurgeButton );
 
    function purgePage () {
        var page = encodeURIComponent( mw.config.get( 'wgPageName' ) );
        $.get( '/index.php?title=' + page + '&action=purge', function () {
            location.reload( true );
        } );
        $('html,body').css( {
            display: 'block',
            overflow: 'hidden'
        } );
        $( '<div style="background: url(\'https://images.wikia.nocookie.net/__cb59990/common/skins/common/images/ajax.gif\') no-repeat fixed center center white;height: 100%;left: 0;opacity: 0.25;position: absolute;top: 0;width: 100%;z-index: 1000000000;"></div>' ).appendTo( document.body )
        .css( 'height', $( window ).height() );
    }
 
    function addOasisPurgeButton () {
        var selector;
        switch (nsNr) {
            case 500:
            case 502:
                selector = $( '#WikiaUserPagesHeader' );
                break;
            case 2:
            case 3:
                selector = $( '.UserProfileActionButton' );
                if ( selector.length ) break;
            default:
                selector = $( '#WikiaPageHeader' );
        }
        selector.find('.wikia-menu-button').first().find('ul')
        .append('<li><a id="purge" href="javascript:void(0)" title="Обновить страницу">'+ theText + '</a></li>');
    }
 
    function addPurgeButton () {
        switch( mw.config.get( 'skin' ) ) {
 
            case 'uncyclopedia': /* monobook clone, pass to monobook */
            case 'wowwiki': /* monobook clone, pass to monobook */
            case 'lostbook': /* monobook clone, pass to monobook */
            case 'monobook':
                $('#p-cactions > .pBody > ul').append('<li id="ca-purge"><a id="purge" href="javascript:void(0)" title="Обновить страницу">'+ theText + '</a></li>');
                break;
 
            case 'oasis':
            case 'wikia':
                addOasisPurgeButton();
                break;
        }
 
        $( '#purge' ).click( purgePage );
    }    
} ( jQuery, mediaWiki ) );
 
//</syntaxhighlight>
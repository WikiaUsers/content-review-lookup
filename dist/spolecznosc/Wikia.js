require( ['jquery', 'mw', 'wikia.window', 'BannerNotification'], function( $, mw, window, Banner ) {
    // Konfiguracja skryptu UserTags
    window.UserTagsJS = {
        modules: {
            inactive: 60,
            mwGroups: [
                'sysop',
                'chatmoderator',
                'projektant',
                'bot',
                'bot-global',
                'staff',
                'helper',
                'vstf',
                'vanguard'
            ],
            metafilter: {
                sysop: [
                    'bureaucrat',
                    'founder'
                ],
                bureaucrat: [
                    'founder'
                ]
            }
        },
        tags: {
            bot: { link: 'Pomoc:Boty' },
            staff: { link: 'w:Project:Staff' },
            helper: { link: 'Pomoc:Helperzy' },
            vstf: { link: 'Pomoc:VSTF' },
            vanguard: { link: 'Pomoc:Vanguard' },
            sysop: {
                link: 'Project:Administracja',
                order: 3
            },
            chatmoderator: { order: 4 },
            projektant: {
                u: 'Projektant',
                f: 'Projektantka',
                link: 'Projektowanie:Strona główna',
                order: 5
            }
        }
    };

    // Konfiguracja skryptu LockOldBlogs
    window.LockOldBlogs = {
        expiryDays: 30,
        expiryMessage: 'Ten blog nie był komentowany przez ponad <expiryDays> dni. Nie ma potrzeby dodawać nowych komentarzy.',
        nonexpiryCategory: 'Niewygasające blogi'
    };

    // Konfiguracja skryptu LockForums
    window.LockForums = {
        expiryDays: 30,
        expiryMessage: 'W tym wątku nie pojawił się żaden post od ponad <expiryDays> dni. Nie ma potrzeby dodawania nowych postów.',
        forumName: 'Forum'
    };

    // Załaduj moduł mw.Title()
    $( function() {
        var module = 'mediawiki.Title';
        if ( mw.loader.getState( module ) !== 'ready' ) {
            mw.loader.load( module );
        }
    } );

    // Przenosi interwiki do stopki na Specjalna:Forum
    $( function() {
        if ( mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'Forum' ) return;
        if ( $( '#forum-display' ).length ) {
            $( '#forum-display' ).insertBefore( '#WikiaFooter' );
        }
    } );

    // Pomoc:Zawartość - klikalne boksy
    $( function() {
        if ( mw.config.get( 'wgPageName' ) !== 'Pomoc:Zawartość' ) return;
        $( '.centralhelpbox' ).click( function() {
            location.href = $(this).find( 'a' ).get(0).href;
        } );
    } );

    /**
     * Poprawki dotyczące wyłączonego ViusalEditora
     * EN: Fixes for disabled VisualEditor (Please do not remove this code without messaging Polish IVT)
     */
    $( function() {
        // Wyświetl powiadomienie gdy użytkownik próbuje użyć VE
        if ( mw.util.getParamValue( 'veaction' ) ) {
            new Banner(
                '<a href="$1">VisualEditor</a> jest wyłączony na Centrum Społeczności. <a href="$2">Przejdź do edytora klasycznego</a>'
                    .replace( '$1', mw.util.getUrl( 'Pomoc:VisualEditor' ) )
                    .replace( '$2', location.href.replace( 'veaction', 'action' ) ),
                'warn'
            ).show(); 
        }

        // Zamień parametr `veaction` na `action` w przycisku edycji strony użytkownika
        if ( mw.config.get( 'wgNamespaceNumber' ) === 2 || $( '.UserProfileActionButton' ).length ) {
            var el = $( '.UserProfileActionButton #ca-ve-edit' );
            el.attr( 'href', el.attr( 'href' ).replace( 'veaction', 'action' ) );
        }
    } );

    // Przekierowanie z czatu
    $( function() {
        if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Chat' ) {
            location.href = mw.util.getUrl( 'Discord' );
        }
    } );
} );
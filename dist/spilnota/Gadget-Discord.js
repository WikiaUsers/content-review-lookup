// Модуль Discord на правій панелі вікі v1.0d
require( ['jquery', 'mw'], function( $, mw ) {
    // Do not charge twice and when the right panel is not displayed
    if ( $( '#discord-module' ).length || !$( '.WikiaRail' ).length ) return;

    // Завантажує вміст модуля із системних повідомлень
    new mw.Api().get( {
        action: 'query',
        meta: 'allmessages',
        ammessages: 'custom-discord-header|custom-discord-desc|custom-discord-more',
        amlang: mw.config.get( 'wgUserLanguage' )
    } ).done( function( data ) {
        // Обробка помилок
        if ( data.error ) {
            console.error(
                'Discord module script encountered error $1: $2'
                    .replace( '$1', data.error.code )
                    .replace( '$2', data.error.info )
            );
            return;
        }

        // Змінні зі змістом повідомлення та посиланням на сторінку
        var msg = data.query.allmessages;
        var page = mw.util.getUrl( 'Discord' );

        // Зміст модуля
        var $module = $( '<section>', {
            class: 'rail-module',
            id: 'discord-module'
        } ).append(
            $( '<h2>', { class: 'has-icon' } ).append(
                '<svg viewBox="0 0 28 20" height="18" width="18"><path d="m20.6644 20s-0.863-1.0238-1.5822-1.9286c3.1404-0.8809 4.339-2.8333 4.339-2.8333-0.9828 0.6429-1.9178 1.0953-2.7568 1.4048-1.1986 0.5-2.3493 0.8333-3.476 1.0238-2.3014 0.4286-4.411 0.3095-6.2089-0.0238-1.36649-0.2619-2.54114-0.6429-3.52402-1.0238-0.55137-0.2143-1.15069-0.4762-1.75-0.8095-0.07192-0.0477-0.14384-0.0715-0.21575-0.1191-0.04795-0.0238-0.07192-0.0476-0.09589-0.0714-0.43151-0.2381-0.67124-0.4048-0.67124-0.4048s1.15069 1.9048 4.19521 2.8095c-0.71918 0.9048-1.60617 1.9762-1.60617 1.9762-5.29794-0.1667-7.31164-3.619-7.31164-3.619 0-7.6666 3.45205-13.8808 3.45205-13.8808 3.45206-2.5714 6.73635-2.49997 6.73635-2.49997l0.2397 0.285711c-4.31509 1.23808-6.30481 3.11902-6.30481 3.11902s0.52739-0.28572 1.41438-0.69047c2.56507-1.11904 4.60273-1.42856 5.44183-1.49999 0.1438-0.02381 0.2637-0.04762 0.4075-0.04762 1.4623-0.190471 3.1164-0.23809 4.8425-0.04762 2.2773 0.26191 4.7226 0.92857 7.2157 2.2857 0 0-1.8938-1.7857-5.9692-3.02378l0.3356-0.380948s3.2843-0.0714279 6.7363 2.49997c0 0 3.4521 6.21423 3.4521 13.8808 0 0-2.0377 3.4523-7.3356 3.619zm-11.1473-11.1189c-1.36644 0-2.4452 1.19044-2.4452 2.64284s1.10274 2.6428 2.4452 2.6428c1.36648 0 2.44518-1.1904 2.44518-2.6428 0.024-1.4524-1.0787-2.64284-2.44518-2.64284zm8.74998 0c-1.3664 0-2.4452 1.19044-2.4452 2.64284s1.1028 2.6428 2.4452 2.6428c1.3665 0 2.4452-1.1904 2.4452-2.6428s-1.0787-2.64284-2.4452-2.64284z"></path></svg>',
                $( '<span>', { text: msg[0]['*'] } )
            ),
            $( '<div>', { class: 'module-content' } ).append(
                $( '<a>', { href: page } ).append(
                    $( '<img>', {
                        src: '//vignette.wikia.nocookie.net/plwikia/images/0/05/Discord.svg/revision/latest',
                        width: 225
                    } )
                ),
                $( '<p>', { text: msg[1]['*'] } ),
                $( '<a>', {
                    href: page,
                    class: 'wds-button',
                    id: 'discord-moreinfo-button',
                    text: msg[2]['*']
                } )
            )
        );

        // Додає модуль на праву панель
        $module.prependTo( '#WikiaRail' );
    } ).fail( function() {
        // Виникла помилка HTTP
        console.error( 'Discord module script encountered unknown AJAX error' );
        return;
    } );
} );
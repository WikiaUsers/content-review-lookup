( function () {
    'use strict';

    // Обновление одного таймера
    function updateCountdown( el ) {
        var day = parseInt( el.getAttribute( 'data-release-day' ), 10 );
        var month = parseInt( el.getAttribute( 'data-release-month' ), 10 );
        var year = parseInt( el.getAttribute( 'data-release-year' ), 10 );
        var offset = parseInt( el.getAttribute( 'data-release-offset' ), 10 ) || 0;
        var raw = el.getAttribute( 'data-release-raw' );

        if ( !day || !month || !year ) {
            return;
        }

        // Целевая дата
        var target = Date.UTC( year, month - 1, day, 0, 0, 0 ) + offset * 1000;
        var diff = target - Date.now();

        if ( diff > 0 ) {
            // Отсчёт
            var totalSeconds = Math.floor( diff / 1000 );
            var days = Math.floor( totalSeconds / 86400 );
            var hours = Math.floor( ( totalSeconds % 86400 ) / 3600 );

            el.classList.add( 'upcoming' );
            el.textContent = 'До выхода на рынок: ' + days + ' д. ' + hours + ' ч.';
        } else {
            // Дата наступила
            el.classList.remove( 'upcoming' );
            el.textContent = 'Дата выхода на рынок: ' + raw;
        }
    }

    // Обновление всех таймеров на странице
    function updateAllCountdowns() {
        var elements = document.querySelectorAll( '.item-release-date[data-release-day]' );
        for ( var i = 0; i < elements.length; i++ ) {
            updateCountdown( elements[ i ] );
        }
    }

    // Инициализация
    function init() {
        updateAllCountdowns();
        setInterval( updateAllCountdowns, 60 * 1000 );
    }

    // Запуск
    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }

    // Динамический контент
    if ( window.mw && mw.hook ) {
        mw.hook( 'wikipage.content' ).add( updateAllCountdowns );
    }
}() );
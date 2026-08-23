( function () {
    'use strict';

    function updateCountdown( el ) {
        var day = parseInt( el.getAttribute( 'data-release-day' ), 10 );
        var month = parseInt( el.getAttribute( 'data-release-month' ), 10 );
        var year = parseInt( el.getAttribute( 'data-release-year' ), 10 );
        var offset = parseInt( el.getAttribute( 'data-release-offset' ), 10 ) || 0;
        var raw = el.getAttribute( 'data-release-raw' );

        if ( !day || !month || !year ) {
            return;
        }

        var target = Date.UTC( year, month - 1, day, 0, 0, 0 ) + offset * 1000;
        var diff = target - Date.now();

        if ( diff > 0 ) {
            var totalSeconds = Math.floor( diff / 1000 );
            var days = Math.floor( totalSeconds / 86400 );
            var hours = Math.floor( ( totalSeconds % 86400 ) / 3600 );

            el.classList.add( 'upcoming' );
            if ( days > 0 ) {
                el.textContent = 'До выхода на рынок: ' + days + ' д. ' + hours + ' ч.';
            } else {
                el.textContent = 'До выхода на рынок: ' + hours + ' ч.';
            }
        } else {
            el.classList.remove( 'upcoming' );
            el.textContent = 'Дата выхода на рынок: ' + raw;
        }
    }

    function updateAllCountdowns() {
        var elements = document.querySelectorAll( '.item-release-date[data-release-day]' );
        for ( var i = 0; i < elements.length; i++ ) {
            updateCountdown( elements[ i ] );
        }
    }

    function init() {
        updateAllCountdowns();
        setInterval( updateAllCountdowns, 60 * 1000 );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }

    if ( window.mw && mw.hook ) {
        mw.hook( 'wikipage.content' ).add( updateAllCountdowns );
    }
}() );
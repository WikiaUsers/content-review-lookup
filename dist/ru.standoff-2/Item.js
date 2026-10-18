( function () {
    'use strict';

    function setUnit( el, unit, value ) {
        var nodes = el.querySelectorAll( '.item-release-' + unit );
        for ( var i = 0; i < nodes.length; i++ ) {
            nodes[ i ].textContent = value;
        }
    }

    function update( el ) {
        var target = parseInt( el.getAttribute( 'data-release' ), 10 );
        if ( !target ) {
            return;
        }

        var diff = target - Math.floor( Date.now() / 1000 );
        var cl = el.classList;

        if ( diff <= 0 ) {
            cl.remove( 'upcoming', 'upcoming-days', 'upcoming-hours' );
            return;
        }

        var days = Math.floor( diff / 86400 );

        setUnit( el, 'd', days );
        setUnit( el, 'h', Math.floor( ( diff % 86400 ) / 3600 ) );
        cl.add( 'upcoming' );
        cl.toggle( 'upcoming-days', days > 0 );
        cl.toggle( 'upcoming-hours', days === 0 );
    }

    function updateAll() {
        var elements = document.querySelectorAll( '.item-release-date[data-release]' );
        for ( var i = 0; i < elements.length; i++ ) {
            update( elements[ i ] );
        }
    }

    function fallbackCopy( text ) {
        var area = document.createElement( 'textarea' );
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild( area );
        area.select();
        try {
            document.execCommand( 'copy' );
        } catch ( e ) {}
        document.body.removeChild( area );
    }

    function copyText( text ) {
        if ( navigator.clipboard && navigator.clipboard.writeText ) {
            navigator.clipboard.writeText( text ).then( null, function () {
                fallbackCopy( text );
            } );
        } else {
            fallbackCopy( text );
        }
    }

    document.addEventListener( 'click', function ( e ) {
        var target = e.target.closest && e.target.closest( '.item-copy, .item-image a' );
        if ( !target ) {
            return;
        }

        if ( target.classList.contains( 'item-copy' ) ) {
            var box = target.closest( '.item-box' );
            var name = box && box.querySelector( '.item-name' );
            if ( name ) {
                copyText( name.getAttribute( 'title' ) || name.textContent );
            }
        } else {
            e.preventDefault();
            window.open( target.href, '_blank', 'noopener' );
        }
    } );

    function init() {
        updateAll();
        setInterval( updateAll, 60 * 1000 );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }

    if ( window.mw && mw.hook ) {
        mw.hook( 'wikipage.content' ).add( updateAll );
    }
}() );
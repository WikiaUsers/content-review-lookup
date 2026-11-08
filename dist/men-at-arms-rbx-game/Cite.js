/* What changed: replaced var with const and let */

/*
  Citation boxes for {{Cite}}. <redirected from Common.js to prevent bloating>
  
  - Click a superscript to open its citation; click it again to close.
  - Wide screens: the box floats next to the superscript.
    Narrow screens: the box is a bottom sheet (see Common.css).
  - Focus: the box takes focus when it opens, Tab stays inside it,
    and focus returns to the superscript when it closes.
  - Escape, the close link, or a click outside the box closes it.

  No network requests; it only moves and shows markup already on the page.
  Without JS, the CSS-only :target fallback still works.
 */
( function () {
    'use strict';

    // Keep in sync with the min-width media query in Common.css
    const DESKTOP_QUERY = '(min-width: 900px)';
    const GAP           = 8;

    let openBox     = null;
    let openTrigger = null;

    function isDesktop() {
        return !!window.matchMedia && window.matchMedia( DESKTOP_QUERY ).matches;
    }

    // Position the floating card under the superscript (or above if there is no room)
    function placeCard() {
        if ( !openBox || !openTrigger ) {
            return;
        }
        if ( !isDesktop() ) {
            openBox.style.top  = '';
            openBox.style.left = '';
            return;
        }

        const rect = openTrigger.getBoundingClientRect();
        // Superscript scrolled out of view: close instead of floating at the screen edge
        if ( rect.bottom < 0 || rect.top > window.innerHeight ) {
            closeCard( false );
            return;
        }

        const width  = openBox.offsetWidth;
        const height = openBox.offsetHeight;
        let left     = rect.left + rect.width / 2 - width / 2;
        left = Math.max( GAP, Math.min( left, window.innerWidth - width - GAP ) );

        const below = window.innerHeight - rect.bottom;
        let top     = ( below >= height + GAP || below >= rect.top )
            ? rect.bottom + GAP
            : rect.top - height - GAP;
        top = Math.max( GAP, top );

        openBox.style.left = left + 'px';
        openBox.style.top  = top + 'px';
    }

    function openCard( box, trigger ) {
        closeCard( false );
        openBox     = box;
        openTrigger = trigger;

        box.classList.add( 'av-open' );
        box.setAttribute( 'role', 'dialog' );
        box.setAttribute( 'tabindex', '-1' );
        trigger.setAttribute( 'aria-expanded', 'true' );
        trigger.setAttribute( 'aria-controls', box.id );

        placeCard();
        box.focus( { preventScroll: true } );
        $( window ).on( 'scroll.avCite resize.avCite', placeCard );
    }

    function closeCard( returnFocus ) {
        if ( !openBox ) {
            return;
        }
        const trigger = openTrigger;

        openBox.classList.remove( 'av-open' );
        openBox.style.top  = '';
        openBox.style.left = '';
        trigger.setAttribute( 'aria-expanded', 'false' );

        openBox     = null;
        openTrigger = null;
        $( window ).off( '.avCite' );

        if ( returnFocus ) {
            trigger.focus( { preventScroll: true } );
        }
    }

    // Keep Tab / Shift+Tab inside the open box
    function trapTab( event ) {
        const items = $( openBox )
            .find( 'a[href], button, input, [tabindex]:not([tabindex="-1"])' )
            .filter( ':visible' );
        if ( !items.length ) {
            event.preventDefault();
            return;
        }
        const first  = items[ 0 ];
        const last   = items[ items.length - 1 ];
        const active = document.activeElement;

        if ( event.shiftKey && ( active === first || active === openBox ) ) {
            event.preventDefault();
            last.focus();
        } else if ( !event.shiftKey && active === last ) {
            event.preventDefault();
            first.focus();
        }
    }

    // Superscript: toggle its box
    $( document ).on( 'click', '.av-ref a', function ( event ) {
        event.preventDefault();
        const box = document.getElementById( this.hash.slice( 1 ) );
        if ( !box ) {
            return;
        }
        if ( box === openBox ) {
            closeCard( true );
        } else {
            openCard( box, this );
        }
    } );

    // Close link inside the box
    $( document ).on( 'click', '.av-cite a[href="#cite-0"]', function ( event ) {
        event.preventDefault();
        closeCard( true );
    } );

    // Click outside the box
    $( document ).on( 'click', function ( event ) {
        if ( openBox && !$( event.target ).closest( '.av-cite, .av-ref' ).length ) {
            closeCard( false );
        }
    } );

    // Keyboard: Escape closes, Tab stays inside
    $( document ).on( 'keydown', function ( event ) {
        if ( !openBox ) {
            return;
        }
        if ( event.key === 'Escape' ) {
            closeCard( true );
        } else if ( event.key === 'Tab' ) {
            trapTab( event );
        }
    } );

    // Mark the page as JS-enabled (switches Common.css from the :target fallback)
    document.documentElement.className += ' av-cite-js';

    // Move boxes to the end of <body> so page containers with overflow:hidden can't clip them
    mw.hook( 'wikipage.content' ).add( function ( $content ) {
        $content.find( '.av-cite' ).each( function () {
            const id = this.id;
            // Drop a stale copy left by an earlier render (e.g. after a preview)
            $( 'body > .av-cite' ).filter( function () {
                return this.id === id;
            } ).remove();
            document.body.appendChild( this );
        } );
    } );
}() );
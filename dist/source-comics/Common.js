/* ============================================================ */
/*  MediaWiki:Common.js                                         */
/*  SOURCE COMICS WIKI                                          */
/*  Phase 6, Section 6.3: JavaScript Module                     */
/* ============================================================ */
/*                                                              */
/*  This file provides the dynamic behavior that complements    */
/*  the CSS in Phases 1-6. It runs after page load and wires    */
/*  up the interactive features that the static CSS hooks       */
/*  expect.                                                      */
/*                                                              */
/*  Modules:                                                     */
/*    1. Live clock for the local navigation                     */
/*    2. Header tools injection (search shortcut, theme toggle) */
/*    3. Back-to-top button visibility & smooth scroll           */
/*    4. Scroll progress ring update                             */
/*    5. On-this-page scrollspy                                  */
/*    6. Reading progress bar                                    */
/*    7. Collapsible infobox sections                            */
/*    8. Dynamic infobox status class application                */
/*    9. Spoiler reveal handling                                  */
/*   10. Stat counter animations on visibility                   */
/*   11. News ribbon auto-scroll                                  */
/*   12. Mobile menu toggle hooks                                 */
/* ============================================================ */

( function ( mw, $ ) {
    'use strict';

    /* -------------------------------------------------------- */
    /*  CONFIG                                                  */
    /* -------------------------------------------------------- */

    var SC = window.SC = window.SC || {};

    SC.config = {
        clockUpdateMs: 1000,
        backToTopThreshold: 600,
        readingProgressEnabled: true,
        scrollProgressEnabled: true,
        scrollspyOffset: 120,
        statCounterDuration: 1500,
        newsRibbonScrollSpeed: 30
    };


    /* -------------------------------------------------------- */
    /*  UTILITIES                                                */
    /* -------------------------------------------------------- */

    SC.util = {
        /**
         * Throttle a function to at most one call per N milliseconds.
         */
        throttle: function ( fn, wait ) {
            var lastCall = 0;
            var timeoutId = null;
            return function () {
                var now = Date.now();
                var args = arguments;
                var ctx = this;
                var remaining = wait - ( now - lastCall );
                if ( remaining <= 0 ) {
                    if ( timeoutId ) {
                        clearTimeout( timeoutId );
                        timeoutId = null;
                    }
                    lastCall = now;
                    fn.apply( ctx, args );
                } else if ( !timeoutId ) {
                    timeoutId = setTimeout( function () {
                        lastCall = Date.now();
                        timeoutId = null;
                        fn.apply( ctx, args );
                    }, remaining );
                }
            };
        },

        /**
         * Format a number with thousands separators.
         */
        formatNumber: function ( n ) {
            return String( n ).replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
        },

        /**
         * Easing function for animations (easeOutQuart).
         */
        easeOutQuart: function ( t ) {
            return 1 - Math.pow( 1 - t, 4 );
        },

        /**
         * Pad a number to two digits.
         */
        pad2: function ( n ) {
            return ( n < 10 ? '0' : '' ) + n;
        },

        /**
         * Check if user prefers reduced motion.
         */
        prefersReducedMotion: function () {
            return window.matchMedia &&
                window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 1: LIVE CLOCK                                    */
    /*  Updates .sc-localnav-clock every second. Hook expected   */
    /*  in DOM: <span class="sc-localnav-clock"></span>          */
    /* -------------------------------------------------------- */

    SC.clock = {
        intervalId: null,

        init: function () {
            var $clock = $( '.sc-localnav-clock' );
            if ( !$clock.length ) {
                return;
            }

            this.update();
            this.intervalId = setInterval(
                this.update.bind( this ),
                SC.config.clockUpdateMs
            );
        },

        update: function () {
            var $clock = $( '.sc-localnav-clock' );
            if ( !$clock.length ) {
                if ( this.intervalId ) {
                    clearInterval( this.intervalId );
                    this.intervalId = null;
                }
                return;
            }

            var now = new Date();
            var hours = now.getUTCHours();
            var mins = now.getUTCMinutes();
            var secs = now.getUTCSeconds();
            var stamp = SC.util.pad2( hours ) + ':' +
                SC.util.pad2( mins ) + ':' +
                SC.util.pad2( secs );

            $clock.text( stamp + ' UTC' );
            $clock.attr( 'title', 'Server time (UTC) — ' + now.toUTCString() );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 2: HEADER TOOLS INJECTION                        */
    /*  Adds a few extras to the local navigation: search        */
    /*  shortcut indicator and theme toggle hint.                */
    /* -------------------------------------------------------- */

    SC.headerTools = {
        init: function () {
            this.bindSearchShortcut();
        },

        bindSearchShortcut: function () {
            $( document ).on( 'keydown', function ( e ) {
                // Slash key, when not typing in an input
                if ( e.key === '/' &&
                    !$( e.target ).is( 'input, textarea, [contenteditable]' ) ) {
                    e.preventDefault();
                    var $search = $( '.global-navigation__search input,' +
                        ' input[name="search"],' +
                        ' .wds-global-navigation__search-input' ).first();
                    if ( $search.length ) {
                        $search.focus();
                    }
                }
            } );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 3: BACK-TO-TOP BUTTON                            */
    /*  Show/hide based on scroll position. Smooth scroll on    */
    /*  click. Adds .sc-bt-first-show class on first appearance.*/
    /* -------------------------------------------------------- */

    SC.backToTop = {
        $button: null,
        firstShown: false,

        init: function () {
            this.$button = $( '.sc-back-to-top' );
            if ( !this.$button.length ) {
                return;
            }

            this.bindEvents();
            this.update();
        },

        bindEvents: function () {
            var self = this;
            $( window ).on( 'scroll', SC.util.throttle( function () {
                self.update();
            }, 80 ) );

            this.$button.on( 'click', function ( e ) {
                e.preventDefault();
                self.scrollToTop();
            } );

            this.$button.on( 'keydown', function ( e ) {
                if ( e.key === 'Enter' || e.key === ' ' ) {
                    e.preventDefault();
                    self.scrollToTop();
                }
            } );
        },

        update: function () {
            var scrollY = window.scrollY ||
                document.documentElement.scrollTop;
            var threshold = SC.config.backToTopThreshold;

            if ( scrollY > threshold ) {
                if ( !this.$button.hasClass( 'is-visible' ) ) {
                    this.$button.addClass( 'is-visible' );
                    if ( !this.firstShown ) {
                        this.$button.addClass( 'sc-bt-first-show' );
                        this.firstShown = true;
                        // Remove animation class after it plays
                        setTimeout( function () {
                            $( '.sc-back-to-top' ).removeClass(
                                'sc-bt-first-show'
                            );
                        }, 700 );
                    }
                }
            } else {
                this.$button.removeClass( 'is-visible' );
            }
        },

        scrollToTop: function () {
            if ( SC.util.prefersReducedMotion() ) {
                window.scrollTo( 0, 0 );
                return;
            }
            window.scrollTo( {
                top: 0,
                behavior: 'smooth'
            } );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 4: SCROLL PROGRESS RING                          */
    /*  Updates --sc-scroll-progress CSS variable on the         */
    /*  back-to-top button so the conic-gradient ring fills.     */
    /* -------------------------------------------------------- */

    SC.scrollProgress = {
        init: function () {
            if ( !SC.config.scrollProgressEnabled ) {
                return;
            }

            var $ring = $( '.sc-back-to-top--ring' );
            if ( !$ring.length ) {
                return;
            }

            $( window ).on( 'scroll', SC.util.throttle( function () {
                SC.scrollProgress.update();
            }, 50 ) );

            this.update();
        },

        update: function () {
            var $ring = $( '.sc-back-to-top--ring' );
            if ( !$ring.length ) {
                return;
            }

            var scrollY = window.scrollY ||
                document.documentElement.scrollTop;
            var maxScroll = document.documentElement.scrollHeight -
                window.innerHeight;
            var progress = maxScroll > 0
                ? Math.min( 100, ( scrollY / maxScroll ) * 100 )
                : 0;

            $ring[ 0 ].style.setProperty(
                '--sc-scroll-progress',
                progress.toFixed( 1 )
            );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 5: ON-THIS-PAGE SCROLLSPY                        */
    /*  Highlights the active section in .sc-on-this-page rail. */
    /* -------------------------------------------------------- */

    SC.scrollspy = {
        $links: null,
        sections: [],

        init: function () {
            this.$links = $( '.sc-on-this-page a, .sc-otp a' );
            if ( !this.$links.length ) {
                return;
            }

            this.indexSections();
            $( window ).on( 'scroll', SC.util.throttle( function () {
                SC.scrollspy.update();
            }, 100 ) );
            this.update();
        },

        indexSections: function () {
            var self = this;
            this.sections = [];
            this.$links.each( function () {
                var href = $( this ).attr( 'href' );
                if ( !href || href.charAt( 0 ) !== '#' ) {
                    return;
                }
                var id = href.substring( 1 );
                var el = document.getElementById( id );
                if ( el ) {
                    self.sections.push( {
                        id: id,
                        el: el,
                        $link: $( this )
                    } );
                }
            } );
        },

        update: function () {
            if ( !this.sections.length ) {
                return;
            }

            var scrollY = window.scrollY ||
                document.documentElement.scrollTop;
            var offset = SC.config.scrollspyOffset;
            var activeIndex = -1;

            for ( var i = 0; i < this.sections.length; i++ ) {
                var top = this.sections[ i ].el.getBoundingClientRect().top +
                    scrollY;
                if ( top - offset <= scrollY ) {
                    activeIndex = i;
                } else {
                    break;
                }
            }

            this.$links.removeClass( 'is-active' );
            if ( activeIndex >= 0 ) {
                this.sections[ activeIndex ].$link.addClass( 'is-active' );
            }
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 6: READING PROGRESS BAR                          */
    /*  Updates the width of .sc-reading-progress as the user   */
    /*  scrolls through the article body.                        */
    /* -------------------------------------------------------- */

    SC.readingProgress = {
        $bar: null,
        $article: null,

        init: function () {
            if ( !SC.config.readingProgressEnabled ) {
                return;
            }

            this.$bar = $( '.sc-reading-progress' );
            this.$article = $( '.mw-parser-output' ).first();

            if ( !this.$bar.length || !this.$article.length ) {
                return;
            }

            $( window ).on( 'scroll resize', SC.util.throttle( function () {
                SC.readingProgress.update();
            }, 30 ) );
            this.update();
        },

        update: function () {
            if ( !this.$bar.length || !this.$article.length ) {
                return;
            }

            var rect = this.$article[ 0 ].getBoundingClientRect();
            var scrollY = window.scrollY ||
                document.documentElement.scrollTop;
            var articleTop = rect.top + scrollY;
            var articleHeight = rect.height;
            var viewportHeight = window.innerHeight;
            var scrollableDist = articleHeight - viewportHeight;

            if ( scrollableDist <= 0 ) {
                this.$bar.css( 'width', '0%' );
                return;
            }

            var scrolled = scrollY - articleTop;
            var progress = Math.max( 0,
                Math.min( 100, ( scrolled / scrollableDist ) * 100 )
            );

            this.$bar.css( 'width', progress.toFixed( 2 ) + '%' );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 7: COLLAPSIBLE INFOBOX SECTIONS                  */
    /*  Click a .sc-infobox-section-toggle to expand/collapse.  */
    /* -------------------------------------------------------- */

    SC.infoboxSections = {
        init: function () {
            $( document ).on(
                'click',
                '.sc-infobox-section-toggle, .pi-section-navigation .pi-section-tab',
                this.handleClick
            );
        },

        handleClick: function ( e ) {
            var $toggle = $( this );
            var $section = $toggle.closest( '.sc-infobox-section,' +
                ' .pi-section-content' );

            if ( !$section.length ) {
                $section = $toggle.next( '.sc-infobox-section-content' );
            }

            $section.toggleClass( 'is-collapsed' );
            $toggle.attr( 'aria-expanded',
                $section.hasClass( 'is-collapsed' ) ? 'false' : 'true'
            );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 8: DYNAMIC INFOBOX STATUS CLASSES                */
    /*  Reads data-status attributes on infoboxes and adds the   */
    /*  matching CSS class for color-coded styling.              */
    /* -------------------------------------------------------- */

    SC.infoboxStatus = {
        init: function () {
            $( '[data-status]' ).each( function () {
                var $el = $( this );
                var status = ( $el.data( 'status' ) || '' )
                    .toLowerCase()
                    .replace( /\s+/g, '-' );
                if ( status ) {
                    $el.addClass( 'sc-status-' + status );
                }
            } );

            $( '[data-classification]' ).each( function () {
                var $el = $( this );
                var classification = ( $el.data( 'classification' ) || '' )
                    .toLowerCase()
                    .replace( /\s+/g, '-' );
                if ( classification ) {
                    $el.addClass( 'sc-class-' + classification );
                }
            } );

            $( '[data-threat]' ).each( function () {
                var $el = $( this );
                var threat = ( $el.data( 'threat' ) || '' )
                    .toLowerCase()
                    .replace( /\s+/g, '-' );
                if ( threat ) {
                    $el.addClass( 'sc-threat-' + threat );
                }
            } );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 9: SPOILER REVEAL                                */
    /*  Toggles .sc-spoiler-revealed when user clicks/taps a    */
    /*  hidden spoiler block.                                    */
    /* -------------------------------------------------------- */

    SC.spoilers = {
        init: function () {
            $( document ).on(
                'click keydown',
                '.sc-notice--spoiler.sc-spoiler-hidden',
                this.handleClick
            );

            // Add tabindex for keyboard access
            $( '.sc-notice--spoiler.sc-spoiler-hidden' )
                .attr( 'tabindex', '0' )
                .attr( 'role', 'button' )
                .attr( 'aria-label', 'Reveal spoiler content' );
        },

        handleClick: function ( e ) {
            if ( e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ' ) {
                return;
            }
            if ( e.type === 'keydown' ) {
                e.preventDefault();
            }
            $( this )
                .removeClass( 'sc-spoiler-hidden' )
                .addClass( 'sc-spoiler-revealed' )
                .removeAttr( 'role' )
                .removeAttr( 'aria-label' )
                .removeAttr( 'tabindex' );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 10: STAT COUNTER ANIMATIONS                       */
    /*  Animate .sc-stats__number elements counting up from 0   */
    /*  when they scroll into view.                              */
    /* -------------------------------------------------------- */

    SC.statCounters = {
        init: function () {
            var $stats = $( '.sc-stats__number[data-target]' );
            if ( !$stats.length ) {
                return;
            }

            if ( SC.util.prefersReducedMotion() ) {
                $stats.each( function () {
                    var $el = $( this );
                    var target = parseInt( $el.data( 'target' ), 10 ) || 0;
                    $el.text( SC.util.formatNumber( target ) );
                } );
                return;
            }

            if ( typeof IntersectionObserver !== 'undefined' ) {
                var observer = new IntersectionObserver( function ( entries ) {
                    entries.forEach( function ( entry ) {
                        if ( entry.isIntersecting ) {
                            SC.statCounters.animate( $( entry.target ) );
                            observer.unobserve( entry.target );
                        }
                    } );
                }, { threshold: 0.4 } );

                $stats.each( function () {
                    observer.observe( this );
                } );
            } else {
                // Fallback: animate all at once
                $stats.each( function () {
                    SC.statCounters.animate( $( this ) );
                } );
            }
        },

        animate: function ( $el ) {
            var target = parseInt( $el.data( 'target' ), 10 ) || 0;
            var duration = SC.config.statCounterDuration;
            var start = performance.now();

            function step( now ) {
                var elapsed = now - start;
                var t = Math.min( 1, elapsed / duration );
                var eased = SC.util.easeOutQuart( t );
                var current = Math.floor( target * eased );

                $el.text( SC.util.formatNumber( current ) );

                if ( t < 1 ) {
                    requestAnimationFrame( step );
                } else {
                    $el.text( SC.util.formatNumber( target ) );
                }
            }

            requestAnimationFrame( step );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 11: NEWS RIBBON AUTO-SCROLL                       */
    /*  Animates the news ribbon content horizontally so users  */
    /*  see new items rotate into view.                          */
    /* -------------------------------------------------------- */

    SC.newsRibbon = {
        init: function () {
            var $ribbon = $( '.sc-news-ribbon__content' );
            if ( !$ribbon.length ) {
                return;
            }
            if ( SC.util.prefersReducedMotion() ) {
                return;
            }

            $ribbon.each( function () {
                var $content = $( this );
                var contentWidth = $content[ 0 ].scrollWidth;
                var visibleWidth = $content[ 0 ].offsetWidth;

                // Only animate if content overflows
                if ( contentWidth <= visibleWidth ) {
                    return;
                }

                var totalDist = contentWidth + visibleWidth;
                var duration = totalDist /
                    SC.config.newsRibbonScrollSpeed * 1000;

                $content.css( {
                    'animation-name': 'scNewsRibbonScroll',
                    'animation-duration': duration + 'ms',
                    'animation-iteration-count': 'infinite',
                    'animation-timing-function': 'linear'
                } );

                // Pause on hover for accessibility
                $content.on( 'mouseenter focus', function () {
                    $content.css( 'animation-play-state', 'paused' );
                } );
                $content.on( 'mouseleave blur', function () {
                    $content.css( 'animation-play-state', 'running' );
                } );
            } );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 12: MOBILE MENU TOGGLE                            */
    /*  Toggles .is-open on .sc-localnav when the burger button */
    /*  is clicked on mobile viewports.                          */
    /* -------------------------------------------------------- */

    SC.mobileMenu = {
        init: function () {
            $( document ).on(
                'click',
                '.sc-localnav-burger, .sc-mobile-menu-toggle',
                this.handleClick
            );

            // Close menu when a link inside is clicked
            $( document ).on(
                'click',
                '.sc-localnav.is-open a',
                function () {
                    $( '.sc-localnav' ).removeClass( 'is-open' );
                }
            );
        },

        handleClick: function ( e ) {
            e.preventDefault();
            var $nav = $( '.sc-localnav' );
            $nav.toggleClass( 'is-open' );
            $( this ).attr( 'aria-expanded',
                $nav.hasClass( 'is-open' ) ? 'true' : 'false'
            );
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 13: PAGE-SIDE-TOOLS DETECTION                    */
    /*  Adds body class so .sc-back-to-top can avoid overlap.   */
    /* -------------------------------------------------------- */

    SC.pageSideTools = {
        init: function () {
            if ( $( '.page-side-tools, .sc-page-side-tools' ).length ) {
                $( 'body' ).addClass( 'sc-has-page-side-tools' );
            }
        }
    };


    /* -------------------------------------------------------- */
    /*  MODULE 14: USER PREFERENCE TOGGLES                       */
    /*  Reads localStorage for user prefs and applies body       */
    /*  classes that the CSS responds to.                        */
    /* -------------------------------------------------------- */

    SC.userPrefs = {
        init: function () {
            try {
                var prefs = JSON.parse(
                    localStorage.getItem( 'sc-user-prefs' ) || '{}'
                );
                if ( prefs.noGrain ) {
                    $( 'body' ).addClass( 'sc-pref-no-grain' );
                }
                if ( prefs.noAnimations ) {
                    $( 'body' ).addClass( 'sc-pref-no-animations' );
                }
                if ( prefs.compact ) {
                    $( 'body' ).addClass( 'sc-pref-compact' );
                }
            } catch ( e ) {
                // localStorage unavailable — silently fail
            }
        },

        set: function ( key, value ) {
            try {
                var prefs = JSON.parse(
                    localStorage.getItem( 'sc-user-prefs' ) || '{}'
                );
                prefs[ key ] = value;
                localStorage.setItem(
                    'sc-user-prefs',
                    JSON.stringify( prefs )
                );
                this.init();
            } catch ( e ) {
                // localStorage unavailable
            }
        }
    };


    /* -------------------------------------------------------- */
    /*  KEYFRAMES INJECTION                                     */
    /*  News ribbon scroll keyframes added programmatically so  */
    /*  the duration can be calculated dynamically.              */
    /* -------------------------------------------------------- */

    SC.injectKeyframes = function () {
        if ( document.getElementById( 'sc-dynamic-keyframes' ) ) {
            return;
        }

        var style = document.createElement( 'style' );
        style.id = 'sc-dynamic-keyframes';
        style.textContent =
            '@keyframes scNewsRibbonScroll {' +
            '    from { transform: translateX(0); }' +
            '    to { transform: translateX(-100%); }' +
            '}';
        document.head.appendChild( style );
    };


    /* -------------------------------------------------------- */
    /*  BOOTSTRAP                                                */
    /* -------------------------------------------------------- */

    function init() {
        SC.injectKeyframes();
        SC.userPrefs.init();
        SC.pageSideTools.init();
        SC.clock.init();
        SC.headerTools.init();
        SC.backToTop.init();
        SC.scrollProgress.init();
        SC.scrollspy.init();
        SC.readingProgress.init();
        SC.infoboxSections.init();
        SC.infoboxStatus.init();
        SC.spoilers.init();
        SC.statCounters.init();
        SC.newsRibbon.init();
        SC.mobileMenu.init();
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        // DOM already ready
        init();
    }

    // Expose for templates / debugging
    window.SC = SC;

}( window.mw, window.jQuery ) );

/* ============================================================ */
/*  END OF MediaWiki:Common.js                                  */
/* ============================================================ */
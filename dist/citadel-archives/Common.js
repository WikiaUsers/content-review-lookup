/* - - - - - <Citadel Archives — Common.js> - - - - - */
/* Progressive desktop enhancements for the Citadel archive interface */

(function () {
    'use strict';

    /* - - - - - <Namespace / Configuration> - - - - - */
    var CA = window.CitadelArchives = window.CitadelArchives || {};

    CA.version = '1.0.0';

    /*
       Optional project assets.
       Leave blank until the final Fandom-hosted logo file URLs are locked.
       When supplied later:
       - moralityLogoSplit is used in the transition dial.
       - moralityLogoParagon / moralityLogoRenegade update authored
         <img data-ca-mode-logo> elements when Fandom changes theme.
    */
    CA.config = {
        moralityTransition: true,
        moralityLogoSplit: '',
        moralityLogoParagon: '',
        moralityLogoRenegade: '',
        clockTimeZone: ''
    };

    CA.reduceMotion = Boolean(
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    CA.qs = function (selector, root) {
        return (root || document).querySelector(selector);
    };

    CA.qsa = function (selector, root) {
        return Array.prototype.slice.call(
            (root || document).querySelectorAll(selector)
        );
    };

    CA.findAll = function (selector, root) {
        var scope = root || document;
        var matches = CA.qsa(selector, scope);

        if (
            scope !== document &&
            scope.nodeType === 1 &&
            scope.matches &&
            scope.matches(selector)
        ) {
            matches.unshift(scope);
        }

        return matches;
    };

    document.documentElement.classList.add('ca-js');


    /* - - - - - <Archive Clock> - - - - - */
    /*
       This is a LOCAL TERMINAL clock by default. Mass Effect canon defines
       Galactic Standard Time units, but does not provide a canonical live
       epoch/phase that can be mapped honestly onto the reader's present-day
       Earth clock. We therefore do not fabricate a GST absolute date here.

       Set clockTimeZone to an IANA zone such as "UTC" later if the project
       wants one fixed real-world reference zone for its terminal display.
    */
    CA.clock = {
        timer: null,
        visibilityBound: false,

        locale: function () {
            return document.documentElement.lang || navigator.language || 'en';
        },

        optionsWithZone: function (options) {
            var copy = {};
            var key;

            for (key in options) {
                if (Object.prototype.hasOwnProperty.call(options, key)) {
                    copy[key] = options[key];
                }
            }

            if (CA.config.clockTimeZone) {
                copy.timeZone = CA.config.clockTimeZone;
            }

            return copy;
        },

        formatTime: function (date) {
            try {
                return new Intl.DateTimeFormat(
                    CA.clock.locale(),
                    CA.clock.optionsWithZone({
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    })
                ).format(date);
            } catch (error) {
                return date.toLocaleTimeString();
            }
        },

        formatDate: function (date) {
            try {
                return new Intl.DateTimeFormat(
                    CA.clock.locale(),
                    CA.clock.optionsWithZone({
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    })
                ).format(date);
            } catch (error) {
                return date.toLocaleDateString();
            }
        },

        hasTargets: function () {
            return Boolean(
                CA.qs('#ca-archive-time, [data-ca-archive-time]') ||
                CA.qs('#ca-archive-date, [data-ca-archive-date]')
            );
        },

        update: function () {
            var now = new Date();
            var iso = now.toISOString();

            CA.qsa('#ca-archive-time, [data-ca-archive-time]').forEach(
                function (element) {
                    element.textContent = CA.clock.formatTime(now);

                    if (element.tagName.toLowerCase() === 'time') {
                        element.setAttribute('datetime', iso);
                    }
                }
            );

            CA.qsa('#ca-archive-date, [data-ca-archive-date]').forEach(
                function (element) {
                    element.textContent = CA.clock.formatDate(now);
                }
            );
        },

        schedule: function () {
            window.clearTimeout(CA.clock.timer);
            CA.clock.timer = null;

            if (document.hidden || !CA.clock.hasTargets()) {
                return;
            }

            CA.clock.update();

            CA.clock.timer = window.setTimeout(
                CA.clock.schedule,
                1000 - (Date.now() % 1000) + 24
            );
        },

        bindVisibility: function () {
            if (CA.clock.visibilityBound) {
                return;
            }

            CA.clock.visibilityBound = true;

            document.addEventListener('visibilitychange', function () {
                if (document.hidden) {
                    window.clearTimeout(CA.clock.timer);
                    CA.clock.timer = null;
                } else {
                    CA.clock.schedule();
                }
            });
        },

        init: function () {
            CA.clock.bindVisibility();

            if (CA.clock.hasTargets()) {
                CA.clock.schedule();
            }
        }
    };


    /* - - - - - <Main Page Metric Counters> - - - - - */
    CA.counters = {
        parse: function (text) {
            var cleaned = String(text)
                .replace(/,/g, '')
                .replace(/[^\d.-]/g, '');
            var number = Number(cleaned);

            return Number.isFinite(number) ? number : null;
        },

        format: function (number) {
            try {
                return new Intl.NumberFormat(CA.clock.locale()).format(number);
            } catch (error) {
                return String(number);
            }
        },

        animate: function (element) {
            var target = CA.counters.parse(element.textContent);

            if (
                target === null ||
                target < 0 ||
                Math.floor(target) !== target
            ) {
                return;
            }

            element.dataset.caCounterTarget = String(target);
            element.setAttribute('aria-label', CA.counters.format(target));

            if (
                CA.reduceMotion ||
                target === 0 ||
                !window.requestAnimationFrame
            ) {
                element.textContent = CA.counters.format(target);
                element.classList.add('ca-counter-ready');
                return;
            }

            var duration = 650;
            var start = null;

            function frame(timestamp) {
                if (start === null) {
                    start = timestamp;
                }

                var progress = Math.min((timestamp - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.round(target * eased);

                element.textContent = CA.counters.format(current);

                if (progress < 1) {
                    window.requestAnimationFrame(frame);
                } else {
                    element.textContent = CA.counters.format(target);
                    element.classList.add('ca-counter-ready');
                }
            }

            element.textContent = '0';
            window.requestAnimationFrame(frame);
        },

        init: function (root) {
            CA.findAll('.ca-main-metric__number', root).forEach(
                function (element) {
                    if (
                        element.dataset.caCounterInit === 'true' ||
                        element.getAttribute('data-ca-counter') === 'off'
                    ) {
                        return;
                    }

                    element.dataset.caCounterInit = 'true';
                    CA.counters.animate(element);
                }
            );
        }
    };


    /* - - - - - <Keyboard-safe Relationship Toggles> - - - - - */
    CA.relationships = {
        isNativeInteractive: function (element) {
            var tag = element.tagName.toLowerCase();

            return (
                tag === 'a' ||
                tag === 'button' ||
                tag === 'input' ||
                tag === 'select' ||
                tag === 'textarea' ||
                tag === 'summary'
            );
        },

        init: function (root) {
            CA.findAll('.ca-rel-toggle, .rc-rel-toggle', root).forEach(
                function (toggle) {
                    if (toggle.dataset.caKeyboardInit === 'true') {
                        return;
                    }

                    toggle.dataset.caKeyboardInit = 'true';

                    if (CA.relationships.isNativeInteractive(toggle)) {
                        return;
                    }

                    if (!toggle.hasAttribute('role')) {
                        toggle.setAttribute('role', 'button');
                    }

                    if (!toggle.hasAttribute('tabindex')) {
                        toggle.setAttribute('tabindex', '0');
                    }

                    toggle.addEventListener('keydown', function (event) {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            toggle.click();
                        }
                    });
                }
            );
        }
    };


    /* - - - - - <Revealable Classified Records> - - - - - */
    CA.classified = {
        init: function (root) {
            CA.findAll('.ca-classified--reveal', root).forEach(
                function (record) {
                    if (record.dataset.caClassifiedInit === 'true') {
                        return;
                    }

                    record.dataset.caClassifiedInit = 'true';

                    if (!record.hasAttribute('tabindex')) {
                        record.setAttribute('tabindex', '0');
                    }

                    if (!record.hasAttribute('role')) {
                        record.setAttribute('role', 'group');
                    }

                    if (!record.hasAttribute('aria-label')) {
                        var stamp = CA.qs('.ca-classified__stamp', record);
                        var label = stamp && stamp.textContent.trim() ?
                            stamp.textContent.trim() :
                            'Restricted archive record';

                        record.setAttribute('aria-label', label);
                    }
                }
            );
        }
    };


    /* - - - - - <Non-primary Image Hints> - - - - - */
    CA.images = {
        init: function (root) {
            var selector = [
                '.ca-card img',
                '.ca-main-portal img',
                '.ca-user-card img',
                '.ca-command-card img',
                '.ca-decoration img',
                '.ca-gallery img',
                '.wikia-gallery-item img',
                '.gallerybox img'
            ].join(',');

            CA.findAll(selector, root).forEach(function (image) {
                if (
                    image.getAttribute('data-ca-eager') !== 'true' &&
                    !image.hasAttribute('loading')
                ) {
                    image.setAttribute('loading', 'lazy');
                }

                if (!image.hasAttribute('decoding')) {
                    image.setAttribute('decoding', 'async');
                }
            });
        }
    };


    /* - - - - - <Paragon / Renegade Theme Observer> - - - - - */
    /*
       Fandom itself remains responsible for choosing and switching themes.
       We only observe its stable theme classes and react after they change.
       No click handlers are attached to Fandom's theme toggle.
    */
    CA.theme = {
        current: null,
        observer: null,
        syncTimer: null,
        leaveTimer: null,
        cleanupTimer: null,

        getMode: function () {
            var roots = [document.body, document.documentElement];
            var i;

            for (i = 0; i < roots.length; i += 1) {
                if (!roots[i]) {
                    continue;
                }

                if (roots[i].classList.contains('theme-fandomdesktop-dark')) {
                    return 'renegade';
                }

                if (roots[i].classList.contains('theme-fandomdesktop-light')) {
                    return 'paragon';
                }
            }

            return null;
        },

        cssReady: function () {
            try {
                return Boolean(
                    window.getComputedStyle(document.documentElement)
                        .getPropertyValue('--ca-paragon')
                        .trim()
                );
            } catch (error) {
                return false;
            }
        },

        updateModeClasses: function (mode) {
            var root = document.documentElement;

            root.classList.remove('ca-mode-paragon', 'ca-mode-renegade');

            if (mode === 'paragon') {
                root.classList.add('ca-mode-paragon');
            } else if (mode === 'renegade') {
                root.classList.add('ca-mode-renegade');
            }
        },

        updateModeLogos: function (mode, root) {
            if (mode !== 'paragon' && mode !== 'renegade') {
                return;
            }

            var src = mode === 'paragon' ?
                CA.config.moralityLogoParagon :
                CA.config.moralityLogoRenegade;

            if (!src) {
                return;
            }

            CA.findAll('img[data-ca-mode-logo]', root || document).forEach(
                function (image) {
                    if (image.getAttribute('src') !== src) {
                        image.setAttribute('src', src);
                    }
                }
            );
        },

        ensureOverlay: function () {
            var existing = document.getElementById('ca-morality-transition');

            if (existing) {
                return existing;
            }

            if (!document.body || !CA.theme.cssReady()) {
                return null;
            }

            var overlay = document.createElement('div');
            var dial = document.createElement('div');
            var core = document.createElement('div');
            var label = document.createElement('div');

            overlay.id = 'ca-morality-transition';
            overlay.setAttribute('aria-hidden', 'true');
            overlay.setAttribute('role', 'presentation');

            dial.className = 'ca-morality-transition__dial';
            core.className = 'ca-morality-transition__core';
            label.className = 'ca-morality-transition__label';

            if (CA.config.moralityLogoSplit) {
                var logo = document.createElement('img');
                logo.className = 'ca-morality-transition__logo';
                logo.src = CA.config.moralityLogoSplit;
                logo.alt = '';
                logo.decoding = 'async';
                core.classList.add('has-logo');
                core.appendChild(logo);
            }

            dial.appendChild(core);
            overlay.appendChild(dial);
            overlay.appendChild(label);
            document.body.appendChild(overlay);

            return overlay;
        },

        transition: function (mode) {
            if (
                !CA.config.moralityTransition ||
                CA.reduceMotion ||
                !CA.theme.cssReady()
            ) {
                return;
            }

            var overlay = CA.theme.ensureOverlay();

            if (!overlay) {
                return;
            }

            var dial = CA.qs('.ca-morality-transition__dial', overlay);
            var label = CA.qs('.ca-morality-transition__label', overlay);

            window.clearTimeout(CA.theme.leaveTimer);
            window.clearTimeout(CA.theme.cleanupTimer);

            overlay.classList.remove(
                'is-active',
                'is-entering',
                'is-leaving',
                'is-paragon',
                'is-renegade'
            );

            if (label) {
                label.textContent = mode === 'paragon' ? 'PARAGON' : 'RENEGADE';
            }

            /* Force a fresh animation when users switch themes rapidly. */
            if (dial) {
                void dial.offsetWidth;
            }

            overlay.classList.add(
                'is-entering',
                mode === 'paragon' ? 'is-paragon' : 'is-renegade'
            );

            window.requestAnimationFrame(function () {
                overlay.classList.remove('is-entering');
                overlay.classList.add('is-active');
            });

            CA.theme.leaveTimer = window.setTimeout(function () {
                overlay.classList.remove('is-active');
                overlay.classList.add('is-leaving');
            }, 690);

            CA.theme.cleanupTimer = window.setTimeout(function () {
                overlay.classList.remove(
                    'is-leaving',
                    'is-paragon',
                    'is-renegade'
                );
            }, 900);
        },

        sync: function (animate) {
            var next = CA.theme.getMode();

            if (!next) {
                return;
            }

            if (CA.theme.current === null) {
                CA.theme.current = next;
                CA.theme.updateModeClasses(next);
                CA.theme.updateModeLogos(next, document);
                return;
            }

            if (next === CA.theme.current) {
                return;
            }

            CA.theme.current = next;
            CA.theme.updateModeClasses(next);
            CA.theme.updateModeLogos(next, document);

            if (animate !== false) {
                CA.theme.transition(next);
            }
        },

        queueSync: function () {
            window.clearTimeout(CA.theme.syncTimer);
            CA.theme.syncTimer = window.setTimeout(function () {
                CA.theme.sync(true);
            }, 18);
        },

        init: function () {
            CA.theme.sync(false);

            if (!('MutationObserver' in window)) {
                return;
            }

            CA.theme.observer = new MutationObserver(function (mutations) {
                var relevant = mutations.some(function (mutation) {
                    return mutation.attributeName === 'class';
                });

                if (relevant) {
                    CA.theme.queueSync();
                }
            });

            if (document.body) {
                CA.theme.observer.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }

            CA.theme.observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    };


    /* - - - - - <Dynamic Content Initialization> - - - - - */
    CA.initContent = function (root) {
        root = root || document;

        CA.relationships.init(root);
        CA.classified.init(root);
        CA.images.init(root);
        CA.counters.init(root);
        CA.theme.updateModeLogos(CA.theme.current, root);
        CA.clock.init();
    };


    /* - - - - - <Initial Load> - - - - - */
    var initialized = false;

    function init() {
        if (initialized) {
            return;
        }

        initialized = true;

        CA.theme.init();
        CA.initContent(document);

        document.documentElement.classList.add('ca-js-ready');
    }

    /* Re-run content-safe helpers when MediaWiki injects article content. */
    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function ($content) {
            var root = $content && $content[0] ? $content[0] : document;

            CA.initContent(root);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
}());
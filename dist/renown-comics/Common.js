/* - - - - - <Renown Comics Wiki — Common.js> - - - - - */
/* Progressive interface enhancements for the Renown record system */

(function () {
    'use strict';

    /* - - - - - <Environment> - - - - - */
    /* Shared helpers */
    var RC = window.RenownWiki = window.RenownWiki || {};

    RC.reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    RC.qs = function (selector, root) {
        return (root || document).querySelector(selector);
    };

    RC.qsa = function (selector, root) {
        return Array.prototype.slice.call(
            (root || document).querySelectorAll(selector)
        );
    };

    /* - - - - - <JS Ready State> - - - - - */
    /* Allows future CSS to distinguish progressive enhancements */
    document.documentElement.classList.add('rc-js');

    /* - - - - - <System Clock> - - - - - */
    /* Local browser time displayed by Template:Clock */
    RC.clock = {
        timer: null,

        formatTime: function (date) {
            try {
                return new Intl.DateTimeFormat(
                    document.documentElement.lang || navigator.language,
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }
                ).format(date);
            } catch (error) {
                return date.toLocaleTimeString();
            }
        },

        formatDate: function (date) {
            try {
                return new Intl.DateTimeFormat(
                    document.documentElement.lang || navigator.language,
                    {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }
                ).format(date);
            } catch (error) {
                return date.toLocaleDateString();
            }
        },

        update: function () {
            var now = new Date();

            RC.qsa('#wiki-clock-time').forEach(function (element) {
                element.textContent = RC.clock.formatTime(now);

                if (element.tagName.toLowerCase() === 'time') {
                    element.setAttribute('datetime', now.toISOString());
                }
            });

            RC.qsa('#wiki-clock-date').forEach(function (element) {
                element.textContent = RC.clock.formatDate(now);
            });
        },

        schedule: function () {
            window.clearTimeout(RC.clock.timer);

            if (document.hidden) {
                return;
            }

            RC.clock.update();

            RC.clock.timer = window.setTimeout(
                RC.clock.schedule,
                1000 - (Date.now() % 1000) + 20
            );
        },

        init: function () {
            if (!RC.qs('#wiki-clock-time') &&
                !RC.qs('#wiki-clock-date')) {
                return;
            }

            RC.clock.schedule();

            document.addEventListener('visibilitychange', function () {
                if (document.hidden) {
                    window.clearTimeout(RC.clock.timer);
                } else {
                    RC.clock.schedule();
                }
            });
        }
    };

    /* - - - - - <Metric Counters> - - - - - */
    /* Animates category-derived record totals once on page load */
    RC.counters = {
        parse: function (text) {
            var cleaned = String(text)
                .replace(/,/g, '')
                .replace(/[^\d.-]/g, '');

            var number = Number(cleaned);

            return Number.isFinite(number) ? number : null;
        },

        format: function (number) {
            try {
                return new Intl.NumberFormat(
                    document.documentElement.lang || navigator.language
                ).format(number);
            } catch (error) {
                return String(number);
            }
        },

        animate: function (element) {
            var target = RC.counters.parse(element.textContent);

            if (target === null || target < 0) {
                return;
            }

            element.dataset.rcCounterTarget = String(target);

            if (RC.reduceMotion || target === 0) {
                element.textContent = RC.counters.format(target);
                return;
            }

            var duration = 650;
            var start = null;

            function frame(timestamp) {
                if (start === null) {
                    start = timestamp;
                }

                var progress = Math.min(
                    (timestamp - start) / duration,
                    1
                );

                /* Ease out cubic */
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.round(target * eased);

                element.textContent = RC.counters.format(current);

                if (progress < 1) {
                    window.requestAnimationFrame(frame);
                } else {
                    element.textContent = RC.counters.format(target);
                    element.classList.add('rc-counter-ready');
                }
            }

            element.textContent = '0';
            window.requestAnimationFrame(frame);
        },

        init: function () {
            RC.qsa('.rc-main-metric__number').forEach(function (element) {
                if (element.dataset.rcCounterInit === 'true') {
                    return;
                }

                element.dataset.rcCounterInit = 'true';
                RC.counters.animate(element);
            });
        }
    };

    /* - - - - - <Relationship Toggles> - - - - - */
    /* Adds keyboard activation to custom MediaWiki toggle controls */
    RC.relationships = {
        init: function (root) {
            RC.qsa('.rc-rel-toggle, .pu-rel-toggle', root).forEach(
                function (toggle) {
                    if (toggle.dataset.rcKeyboardInit === 'true') {
                        return;
                    }

                    toggle.dataset.rcKeyboardInit = 'true';

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

    /* - - - - - <Classified Records> - - - - - */
    /* Accessibility metadata for intentionally revealable records */
    RC.classified = {
        init: function (root) {
            RC.qsa('.rc-classified--reveal', root).forEach(
                function (record) {
                    if (record.dataset.rcClassifiedInit === 'true') {
                        return;
                    }

                    record.dataset.rcClassifiedInit = 'true';

                    if (!record.hasAttribute('tabindex')) {
                        record.setAttribute('tabindex', '0');
                    }

                    if (!record.hasAttribute('aria-label')) {
                        var stamp = RC.qs(
                            '.rc-classified__stamp',
                            record
                        );

                        record.setAttribute(
                            'aria-label',
                            stamp ?
                                stamp.textContent.trim() :
                                'Restricted record'
                        );
                    }
                }
            );
        }
    };

    /* - - - - - <Record Images> - - - - - */
    /* Browser-native loading hints for non-primary imagery */
    RC.images = {
        init: function (root) {
            var selector = [
                '.rc-card img',
                '.rc-feature-record img',
                '.wikia-gallery-item img',
                '.gallerybox img',
                '.rc-portal-card img'
            ].join(',');

            RC.qsa(selector, root).forEach(function (image) {
                if (!image.hasAttribute('loading')) {
                    image.setAttribute('loading', 'lazy');
                }

                if (!image.hasAttribute('decoding')) {
                    image.setAttribute('decoding', 'async');
                }
            });
        }
    };

    /* - - - - - <Optional Scroll Reveal> - - - - - */
    /* Runs only on elements explicitly given data-rc-reveal */
    RC.reveal = {
        observer: null,

        init: function (root) {
            var elements = RC.qsa('[data-rc-reveal]', root);

            if (!elements.length) {
                return;
            }

            if (RC.reduceMotion ||
                !('IntersectionObserver' in window)) {
                elements.forEach(function (element) {
                    element.classList.add('rc-revealed');
                });

                return;
            }

            if (!RC.reveal.observer) {
                RC.reveal.observer = new IntersectionObserver(
                    function (entries, observer) {
                        entries.forEach(function (entry) {
                            if (!entry.isIntersecting) {
                                return;
                            }

                            entry.target.classList.add('rc-revealed');
                            observer.unobserve(entry.target);
                        });
                    },
                    {
                        rootMargin: '0px 0px -8% 0px',
                        threshold: 0.08
                    }
                );
            }

            elements.forEach(function (element) {
                if (element.dataset.rcRevealInit === 'true') {
                    return;
                }

                element.dataset.rcRevealInit = 'true';
                RC.reveal.observer.observe(element);
            });
        }
    };

    /* - - - - - <Content Initialization> - - - - - */
    /* Supports both initial page load and MediaWiki-injected content */
    RC.initContent = function (root) {
        root = root || document;

        RC.relationships.init(root);
        RC.classified.init(root);
        RC.images.init(root);
        RC.reveal.init(root);
    };

    /* - - - - - <Initial Load> - - - - - */
    function init() {
        RC.initContent(document);
        RC.clock.init();
        RC.counters.init();

        document.documentElement.classList.add('rc-js-ready');
    }

    /* MediaWiki hook when available */
    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function ($content) {
            var root = $content && $content[0] ?
                $content[0] :
                document;

            RC.initContent(root);
            RC.counters.init();
        });
    }

    /* Standard DOM fallback */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, {
            once: true
        });
    } else {
        init();
    }
}());
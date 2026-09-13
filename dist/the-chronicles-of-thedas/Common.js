(function () {
    'use strict';

    /* - - - - - <01. CORE UTILITIES> - - - - - */

    function all(selector, root) {
        return Array.prototype.slice.call(
            (root || document).querySelectorAll(selector)
        );
    }

    function reducedMotion() {
        return !!(
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        );
    }

    function activateWithKeyboard(element, callback) {
        if (!element || element.dataset.cothKeyboardReady) {
            return;
        }

        element.dataset.cothKeyboardReady = '1';

        if (!element.hasAttribute('role')) {
            element.setAttribute('role', 'button');
        }

        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }

        element.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                callback();
            }
        });
    }


    /* - - - - - <02. CAST FILTERING> - - - - - */

    function castFilters(root) {
        all('.coth-selector[data-target]', root).forEach(function (selector) {
            if (selector.dataset.cothReady) {
                return;
            }

            var groupName = selector.getAttribute('data-target');
            var group = document.querySelector(
                '[data-group="' + groupName + '"]'
            );

            if (!group) {
                return;
            }

            selector.dataset.cothReady = '1';

            var controls = all('[data-filter]', selector);
            var items = all('[data-tags]', group);

            function applyFilter(filter) {
                filter = String(filter || 'all').toLowerCase();

                items.forEach(function (item) {
                    var tags = String(
                        item.getAttribute('data-tags') || ''
                    )
                        .toLowerCase()
                        .split(/\s+/);

                    var visible =
                        filter === 'all' ||
                        tags.indexOf(filter) !== -1;

                    item.classList.toggle('coth-hidden', !visible);
                    item.setAttribute(
                        'aria-hidden',
                        visible ? 'false' : 'true'
                    );
                });

                controls.forEach(function (control) {
                    var active =
                        String(
                            control.getAttribute('data-filter') || ''
                        ).toLowerCase() === filter;

                    control.classList.toggle('is-active', active);
                    control.classList.toggle(
                        'coth-selector__btn--active',
                        active
                    );

                    control.setAttribute(
                        'aria-pressed',
                        active ? 'true' : 'false'
                    );
                });
            }

            controls.forEach(function (control) {
                control.classList.add('coth-selector__btn');

                if (control.tagName !== 'BUTTON') {
                    control.setAttribute('role', 'button');

                    if (!control.hasAttribute('tabindex')) {
                        control.setAttribute('tabindex', '0');
                    }
                }

                function activate() {
                    applyFilter(
                        control.getAttribute('data-filter') || 'all'
                    );
                }

                control.addEventListener('click', activate);

                activateWithKeyboard(control, activate);
            });

            var initial =
                selector.querySelector('[data-filter].is-active') ||
                selector.querySelector('[data-filter="all"]') ||
                controls[0];

            if (initial) {
                applyFilter(
                    initial.getAttribute('data-filter') || 'all'
                );
            }
        });
    }


    /* - - - - - <03. CUSTOM TOGGLE ACCESSIBILITY> - - - - - */

    function customToggleAccessibility(root) {
        all(
            '.coth-seal-toggle, [class*="mw-customtoggle-"]',
            root
        ).forEach(function (toggle) {
            if (toggle.dataset.cothToggleReady) {
                return;
            }

            toggle.dataset.cothToggleReady = '1';

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
        });
    }


    /* - - - - - <04. THE RECKONING> - - - - - */

    function reckoningClock() {
        var timeElement =
            document.getElementById('coth-clock-time');

        var dateElement =
            document.getElementById('coth-clock-date');

        if (!timeElement && !dateElement) {
            return;
        }

        if (
            (timeElement && timeElement.dataset.cothClockReady) ||
            (dateElement && dateElement.dataset.cothClockReady)
        ) {
            return;
        }

        if (timeElement) {
            timeElement.dataset.cothClockReady = '1';
        }

        if (dateElement) {
            dateElement.dataset.cothClockReady = '1';
        }

        function pad(number) {
            return String(number).padStart(2, '0');
        }

        function update() {
            var now = new Date();

            if (timeElement) {
                timeElement.textContent =
                    pad(now.getHours()) +
                    ':' +
                    pad(now.getMinutes()) +
                    ':' +
                    pad(now.getSeconds());
            }

            if (dateElement) {
                dateElement.textContent =
                    now.toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
            }
        }

        update();
        window.setInterval(update, 1000);
    }


    /* - - - - - <05. BACK TO TOP> - - - - - */

    function backToTop() {
        if (
            document.getElementById('coth-back-to-top') ||
            document.querySelector('.coth-backtotop')
        ) {
            return;
        }

        var button = document.createElement('button');

        button.id = 'coth-back-to-top';
        button.className = 'coth-backtotop';
        button.type = 'button';
        button.setAttribute('aria-label', 'Back to top');
        button.setAttribute('title', 'Back to top');
        button.textContent = '\u2756';

        document.body.appendChild(button);

        button.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: reducedMotion() ? 'auto' : 'smooth'
            });
        });

        function update() {
            var visible =
                (window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    0) > 600;

            button.classList.toggle(
                'coth-backtotop--show',
                visible
            );

            button.classList.toggle(
                'is-visible',
                visible
            );
        }

        window.addEventListener('scroll', update, {
            passive: true
        });

        update();
    }


    /* - - - - - <06. NIGHT SKY PARALLAX> - - - - - */

    function nightSkyParallax() {
        if (document.querySelector('.coth-night-parallax')) {
            return;
        }

        var body = document.body;
        var html = document.documentElement;

        if (!body) {
            return;
        }

        var sky = document.createElement('div');
        sky.className = 'coth-night-parallax';
        sky.setAttribute('aria-hidden', 'true');

        var field = document.createElement('div');
        field.className = 'coth-night-parallax__field';

        var veil = document.createElement('div');
        veil.className = 'coth-night-parallax__veil';

        sky.appendChild(field);
        sky.appendChild(veil);

        /*
         * The layer is appended normally.
         * CSS owns its stacking order.
         */
        body.appendChild(sky);

        var motionQuery =
            window.matchMedia ?
            window.matchMedia('(prefers-reduced-motion: reduce)') :
            null;

        var ticking = false;

        function isDarkTheme() {
            return (
                body.classList.contains(
                    'theme-fandomdesktop-dark'
                ) ||
                html.classList.contains(
                    'theme-fandomdesktop-dark'
                )
            );
        }

        function motionDisabled() {
            return !!(
                motionQuery &&
                motionQuery.matches
            );
        }

        function updateSky() {
            ticking = false;

            if (!isDarkTheme()) {
                field.style.transform = '';
                return;
            }

            if (motionDisabled()) {
                field.style.transform =
                    'translate3d(0,0,0) scale(1.04)';
                return;
            }

            var scrollY =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                0;

            /*
             * Distant-sky movement:
             * 10% of page scroll, capped at 150px.
             */
            var movement =
                Math.min(scrollY * 0.10, 150);

            field.style.transform =
                'translate3d(0,' +
                movement.toFixed(2) +
                'px,0) scale(1.04)';
        }

        function requestUpdate() {
            if (ticking) {
                return;
            }

            ticking = true;
            window.requestAnimationFrame(updateSky);
        }

        window.addEventListener('scroll', requestUpdate, {
            passive: true
        });

        window.addEventListener('resize', requestUpdate, {
            passive: true
        });

        if (motionQuery) {
            if (motionQuery.addEventListener) {
                motionQuery.addEventListener(
                    'change',
                    requestUpdate
                );
            } else if (motionQuery.addListener) {
                motionQuery.addListener(requestUpdate);
            }
        }

        /*
         * Fandom may switch light/dark theme without
         * performing a full page reload.
         */
        if ('MutationObserver' in window) {
            var themeObserver =
                new MutationObserver(requestUpdate);

            themeObserver.observe(html, {
                attributes: true,
                attributeFilter: ['class']
            });

            themeObserver.observe(body, {
                attributes: true,
                attributeFilter: ['class']
            });
        }

        requestUpdate();
    }


    /* - - - - - <07. CONTENT INITIALIZATION> - - - - - */

    function initializeContent(root) {
        root = root || document;

        try {
            castFilters(root);
        } catch (error) {
            if (window.console) {
                console.warn(
                    'TCOT cast filters:',
                    error
                );
            }
        }

        try {
            customToggleAccessibility(root);
        } catch (error) {
            if (window.console) {
                console.warn(
                    'TCOT custom toggles:',
                    error
                );
            }
        }
    }


    /* - - - - - <08. PAGE INITIALIZATION> - - - - - */

    function initializePage() {
        try {
            reckoningClock();
        } catch (error) {
            if (window.console) {
                console.warn(
                    'TCOT clock:',
                    error
                );
            }
        }

        try {
            backToTop();
        } catch (error) {
            if (window.console) {
                console.warn(
                    'TCOT back to top:',
                    error
                );
            }
        }

        try {
            nightSkyParallax();
        } catch (error) {
            if (window.console) {
                console.warn(
                    'TCOT night sky:',
                    error
                );
            }
        }
    }


    /* - - - - - <09. MEDIAWIKI BOOT> - - - - - */

    if (
        window.mw &&
        mw.hook
    ) {
        mw.hook('wikipage.content').add(
            function ($content) {
                initializeContent(
                    $content && $content[0] ?
                    $content[0] :
                    document
                );
            }
        );
    } else if (
        document.readyState !== 'loading'
    ) {
        initializeContent(document);
    } else {
        document.addEventListener(
            'DOMContentLoaded',
            function () {
                initializeContent(document);
            }
        );
    }

    if (
        document.readyState !== 'loading'
    ) {
        initializePage();
    } else {
        document.addEventListener(
            'DOMContentLoaded',
            initializePage
        );
    }

})();
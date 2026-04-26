/* ============================================================ */
/*  MediaWiki:Common.js                                         */
/*  THE FOUNDRY WIKI                                            */
/*  JavaScript Components — Codename "FORGEFIRE"                */
/* ============================================================ */
/*  Loaded on every page for all users.                         */
/*  Keep it lightweight. All visual styling is handled by CSS.  */
/* ============================================================ */


/* ============================================================ */
/*  GLOBAL CONFIGURATION & UTILITIES                            */
/* ============================================================ */

(function() {
    'use strict';

    /* -------------------------------------------------------- */
    /*  CONFIGURATION                                           */
    /* -------------------------------------------------------- */

    window.FoundryWiki = window.FoundryWiki || {};

    window.FoundryWiki.config = {
        wikiName: 'The Foundry Wiki',
        projectName: 'The Foundry',
        currentYear: 2050,
        divergenceYear: 2025,
        theme: 'Industrial Forge',
        version: '1.0.0',
        debug: false
    };

    /* -------------------------------------------------------- */
    /*  UTILITY FUNCTIONS                                       */
    /* -------------------------------------------------------- */

    window.FoundryWiki.utils = {

        /**
         * Log messages to console (only in debug mode)
         */
        log: function(message, type) {
            if (window.FoundryWiki.config.debug) {
                type = type || 'log';
                console[type]('[Foundry] ' + message);
            }
        },

        /**
         * Check if an element exists in the DOM
         */
        elementExists: function(selector) {
            return document.querySelector(selector) !== null;
        },

        /**
         * Wait for an element to exist in the DOM
         */
        waitForElement: function(selector, timeout) {
            timeout = timeout || 5000;
            return new Promise(function(resolve, reject) {
                var element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                    return;
                }

                var observer = new MutationObserver(function() {
                    var el = document.querySelector(selector);
                    if (el) {
                        observer.disconnect();
                        resolve(el);
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });

                setTimeout(function() {
                    observer.disconnect();
                    reject(new Error('Element not found: ' + selector));
                }, timeout);
            });
        },

        /**
         * Create an element with attributes and content
         */
        createElement: function(tag, attributes, content) {
            var element = document.createElement(tag);

            if (attributes) {
                for (var key in attributes) {
                    if (attributes.hasOwnProperty(key)) {
                        if (key === 'className') {
                            element.className = attributes[key];
                        } else if (key === 'style' && typeof attributes[key] === 'object') {
                            for (var styleKey in attributes[key]) {
                                element.style[styleKey] = attributes[key][styleKey];
                            }
                        } else {
                            element.setAttribute(key, attributes[key]);
                        }
                    }
                }
            }

            if (content) {
                if (typeof content === 'string') {
                    element.innerHTML = content;
                } else {
                    element.appendChild(content);
                }
            }

            return element;
        },

        /**
         * Throttle function execution
         */
        throttle: function(func, limit) {
            var inThrottle;
            return function() {
                var args = arguments;
                var context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(function() {
                        inThrottle = false;
                    }, limit);
                }
            };
        },

        /**
         * Debounce function execution
         */
        debounce: function(func, wait) {
            var timeout;
            return function() {
                var context = this;
                var args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    func.apply(context, args);
                }, wait);
            };
        },

        /**
         * Get current theme (light or dark)
         */
        getCurrentTheme: function() {
            return document.body.classList.contains('theme-fandomdesktop-dark')
                ? 'dark' : 'light';
        },

        /**
         * Check if user is logged in
         */
        isLoggedIn: function() {
            return document.body.classList.contains('is-user-logged-in');
        },

        /**
         * Check if current page is main page
         */
        isMainPage: function() {
            return document.body.classList.contains('mainpage');
        },

        /**
         * Get current page name
         */
        getPageName: function() {
            var config = mw.config.get('wgPageName');
            return config ? config.replace(/_/g, ' ') : '';
        }
    };

    /* -------------------------------------------------------- */
    /*  INITIALIZATION                                          */
    /* -------------------------------------------------------- */

    function init() {
        window.FoundryWiki.utils.log('The Foundry Wiki initialized');
        window.FoundryWiki.utils.log('Theme: ' + window.FoundryWiki.utils.getCurrentTheme());
        window.FoundryWiki.utils.log('Page: ' + window.FoundryWiki.utils.getPageName());

        document.body.classList.add('foundry-initialized');

        var event = new CustomEvent('foundry:ready', {
            detail: { config: window.FoundryWiki.config }
        });
        document.dispatchEvent(event);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();


/* ============================================================ */
/*  LIVE CLOCK & DATE                                           */
/*  Injects a continuously updating clock into the community    */
/*  header. CSS styles via .fd-live-clock class.                */
/* ============================================================ */

(function() {
    'use strict';

    function padZero(n) {
        return n < 10 ? '0' + n : String(n);
    }

    function formatClockHTML(now) {
        var days = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'
        ];
        var months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        var dayName = days[now.getDay()];
        var monthName = months[now.getMonth()];
        var date = now.getDate();
        var year = now.getFullYear();

        var hours = now.getHours();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        if (hours === 0) hours = 12;

        var minutes = padZero(now.getMinutes());
        var seconds = padZero(now.getSeconds());

        return dayName + ', ' + monthName + ' ' + date + ', ' + year +
               ' <span class="fd-clock-separator">\u2014</span> ' +
               hours + '<span class="fd-clock-colon">:</span>' +
               minutes + '<span class="fd-clock-colon">:</span>' +
               seconds + ' ' + ampm;
    }

    function initClock() {
        var topContainer = document.querySelector(
            '.fandom-community-header__top-container'
        );
        if (!topContainer) return;

        /* Don't double-inject */
        if (document.querySelector('.fd-live-clock')) return;

        var clock = document.createElement('div');
        clock.className = 'fd-live-clock';
        clock.setAttribute('title', 'Current local time');

        clock.innerHTML = formatClockHTML(new Date());
        topContainer.appendChild(clock);

        setInterval(function() {
            clock.innerHTML = formatClockHTML(new Date());
        }, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initClock);
    } else {
        initClock();
    }
})();


/* ============================================================ */
/*  CUSTOM HEADER TOOL BUTTONS                                  */
/*  Injects New Page, Admin Dashboard, and Upload buttons       */
/*  into the community header. CSS styles via .fd-header-tool.  */
/* ============================================================ */

(function() {
    'use strict';

    var tools = [
        {
            href: '/wiki/Special:CreatePage',
            label: 'New Page',
            cssClass: 'fd-header-tool--new-page',
            title: 'Create a new wiki page'
        },
        {
            href: '/wiki/Special:AdminDashboard',
            label: 'Admin',
            cssClass: 'fd-header-tool--admin',
            title: 'Admin Dashboard'
        },
        {
            href: '/wiki/Special:Upload',
            label: 'Upload',
            cssClass: 'fd-header-tool--upload',
            title: 'Upload a file'
        }
    ];

    function createToolButton(config) {
        var link = document.createElement('a');
        link.href = config.href;
        link.className = 'fd-header-tool ' + config.cssClass;
        link.title = config.title;

        var icon = document.createElement('span');
        icon.className = 'fd-tool-icon';
        link.appendChild(icon);

        var labelText = document.createTextNode(config.label);
        link.appendChild(labelText);

        return link;
    }

    function initHeaderTools() {
        var wikiTools = document.querySelector('.wiki-tools.wds-button-group');
        if (!wikiTools) {
            wikiTools = document.querySelector(
                '.fandom-community-header__top-container'
            );
        }
        if (!wikiTools) return;

        /* Don't double-inject */
        if (document.querySelector('.fd-header-tools-wrapper')) return;

        var wrapper = document.createElement('div');
        wrapper.className = 'fd-header-tools-wrapper';

        for (var i = 0; i < tools.length; i++) {
            wrapper.appendChild(createToolButton(tools[i]));
        }

        if (wikiTools.nextSibling) {
            wikiTools.parentNode.insertBefore(wrapper, wikiTools.nextSibling);
        } else {
            wikiTools.parentNode.appendChild(wrapper);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderTools);
    } else {
        initHeaderTools();
    }
})();


/* ============================================================ */
/*  BACK TO TOP BUTTON                                          */
/*  Floating button that appears after scrolling down.          */
/*  CSS styles via #fd-back-to-top.                             */
/* ============================================================ */

(function() {
    'use strict';

    function initBackToTop() {
        if (document.getElementById('fd-back-to-top')) return;

        var btn = document.createElement('div');
        btn.id = 'fd-back-to-top';
        btn.title = 'Back to top';
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('aria-label', 'Scroll back to top of page');

        /* Arrow icon — Unicode chevron */
        btn.innerHTML = '&#9650;';

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });

        document.body.appendChild(btn);

        var scrollThreshold = 400;
        var ticking = false;

        function updateVisibility() {
            if (window.scrollY > scrollThreshold) {
                btn.classList.add('fd-btt-visible');
            } else {
                btn.classList.remove('fd-btt-visible');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateVisibility);
                ticking = true;
            }
        });

        updateVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
    } else {
        initBackToTop();
    }
})();


/* ============================================================ */
/*  COLLAPSIBLE INFOBOX SECTIONS                                */
/*  Makes .pi-group sections expandable/collapsible via click   */
/*  on .pi-header elements. Adds fd-collapsed class and ARIA    */
/*  attributes for accessibility.                               */
/* ============================================================ */

(function() {
    'use strict';

    if (window.fdInfoboxCollapsible) return;
    window.fdInfoboxCollapsible = true;

    function initCollapsibleInfobox() {
        var infoboxes = document.querySelectorAll('.portable-infobox');
        if (!infoboxes.length) return;

        infoboxes.forEach(function(infobox) {
            var groups = infobox.querySelectorAll('.pi-group');

            groups.forEach(function(group) {
                var header = group.querySelector('.pi-header');
                if (!header) return;

                header.setAttribute('data-fd-collapsible', 'true');
                header.setAttribute('title', 'Click to expand/collapse');
                header.setAttribute('role', 'button');
                header.setAttribute('tabindex', '0');
                header.setAttribute('aria-expanded', 'true');

                header.addEventListener('click', function() {
                    var isCollapsed = group.classList.contains('fd-collapsed');

                    if (isCollapsed) {
                        group.classList.remove('fd-collapsed');
                        header.setAttribute('aria-expanded', 'true');
                    } else {
                        group.classList.add('fd-collapsed');
                        header.setAttribute('aria-expanded', 'false');
                    }
                });

                header.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.click();
                    }
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCollapsibleInfobox);
    } else {
        initCollapsibleInfobox();
    }
})();


/* ============================================================ */
/*  DYNAMIC INFOBOX STATUS CLASSES                              */
/*  Reads text content of Status, Gender, and Orientation       */
/*  data values and adds corresponding CSS classes to the       */
/*  portable-infobox container for CSS icon activation.         */
/* ============================================================ */

(function() {
    'use strict';

    if (window.fdInfoboxStatusClasses) return;
    window.fdInfoboxStatusClasses = true;

    function normalizeValue(text) {
        return text.trim().toLowerCase()
            .replace(/[^a-z0-9-]/g, '')
            .replace(/\s+/g, '-');
    }

    function initStatusClasses() {
        var infoboxes = document.querySelectorAll('.portable-infobox');
        if (!infoboxes.length) return;

        infoboxes.forEach(function(infobox) {

            /* --- Status --- */
            var statusRow = infobox.querySelector(
                '.pi-data[data-source="status"]'
            );
            if (statusRow) {
                var statusVal = statusRow.querySelector('.pi-data-value');
                if (statusVal) {
                    var statusText = normalizeValue(statusVal.textContent);
                    var statusMap = {
                        'alive': 'status-alive',
                        'active': 'status-alive',
                        'deceased': 'status-deceased',
                        'dead': 'status-deceased',
                        'kia': 'status-deceased',
                        'unknown': 'status-unknown',
                        'missing': 'status-missing',
                        'mia': 'status-missing',
                        'detained': 'status-detained',
                        'incarcerated': 'status-detained',
                        'imprisoned': 'status-detained'
                    };
                    if (statusMap[statusText]) {
                        infobox.classList.add(statusMap[statusText]);
                        /* Normalize for data attribute */
                        var normalized = statusText;
                        if (statusText === 'active') normalized = 'alive';
                        if (statusText === 'dead' || statusText === 'kia') normalized = 'deceased';
                        if (statusText === 'mia') normalized = 'missing';
                        if (statusText === 'incarcerated' || statusText === 'imprisoned') normalized = 'detained';
                        statusVal.setAttribute('data-fd-status', normalized);
                    }
                }
            }

            /* --- Gender --- */
            var genderRow = infobox.querySelector(
                '.pi-data[data-source="gender"]'
            ) || infobox.querySelector(
                '.pi-data[data-source="sex"]'
            );
            if (genderRow) {
                var genderVal = genderRow.querySelector('.pi-data-value');
                if (genderVal) {
                    var genderText = normalizeValue(genderVal.textContent);
                    var genderMap = {
                        'male': 'gender-male',
                        'man': 'gender-male',
                        'female': 'gender-female',
                        'woman': 'gender-female',
                        'non-binary': 'gender-nonbinary',
                        'nonbinary': 'gender-nonbinary',
                        'nb': 'gender-nonbinary',
                        'genderfluid': 'gender-genderfluid',
                        'gender-fluid': 'gender-genderfluid'
                    };
                    if (genderMap[genderText]) {
                        infobox.classList.add(genderMap[genderText]);
                    }
                }
            }

            /* --- Orientation --- */
            var orientRow = infobox.querySelector(
                '.pi-data[data-source="orientation"]'
            );
            if (orientRow) {
                var orientVal = orientRow.querySelector('.pi-data-value');
                if (orientVal) {
                    var orientText = normalizeValue(orientVal.textContent);
                    var orientMap = {
                        'heterosexual': 'orientation-heterosexual',
                        'straight': 'orientation-heterosexual',
                        'homosexual': 'orientation-homosexual',
                        'gay': 'orientation-homosexual',
                        'lesbian': 'orientation-homosexual',
                        'bisexual': 'orientation-bisexual',
                        'bi': 'orientation-bisexual',
                        'asexual': 'orientation-asexual',
                        'ace': 'orientation-asexual',
                        'pansexual': 'orientation-pansexual',
                        'pan': 'orientation-pansexual'
                    };
                    if (orientMap[orientText]) {
                        infobox.classList.add(orientMap[orientText]);
                    }
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStatusClasses);
    } else {
        initStatusClasses();
    }
})();


/* ============================================================ */
/*  END OF MediaWiki:Common.js                                  */
/*  THE FOUNDRY WIKI — Codename FORGEFIRE                       */
/*  "In 4.7 seconds, the world was reforged."                   */
/* ============================================================ */
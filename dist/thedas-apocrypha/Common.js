/* ============================================================ */
/*  MediaWiki:Common.js                                         */
/*  THEDAS APOCRYPHA WIKI                                       */
/*  Master JavaScript — Codename "BLOOD SCRIPTURE"              */
/* ============================================================ */
/*  Loaded on every page for all users.                         */
/*  Contains: global utilities, live clock, header tools,       */
/*  back-to-top, collapsible infobox, dynamic status classes.   */
/*  Module imports at the bottom.                               */
/* ============================================================ */


/* ============================================================
   SECTION 1: GLOBAL CONFIG & UTILITIES
   ============================================================ */

(function() {
    'use strict';

    window.ThedasApocrypha = window.ThedasApocrypha || {};

    window.ThedasApocrypha.config = {
        wikiName: 'Thedas Apocrypha Wiki',
        projectName: 'Thedas Apocrypha',
        theme: 'Blood Scripture',
        version: '1.0.0',
        debug: false
    };

    window.ThedasApocrypha.utils = {

        log: function(message, type) {
            if (window.ThedasApocrypha.config.debug) {
                type = type || 'log';
                console[type]('[ThedasApocrypha] ' + message);
            }
        },

        elementExists: function(selector) {
            return document.querySelector(selector) !== null;
        },

        waitForElement: function(selector, timeout) {
            timeout = timeout || 5000;
            return new Promise(function(resolve, reject) {
                var el = document.querySelector(selector);
                if (el) { resolve(el); return; }

                var observer = new MutationObserver(function() {
                    var el = document.querySelector(selector);
                    if (el) { observer.disconnect(); resolve(el); }
                });
                observer.observe(document.body, { childList: true, subtree: true });

                setTimeout(function() {
                    observer.disconnect();
                    reject(new Error('Element not found: ' + selector));
                }, timeout);
            });
        },

        createElement: function(tag, attrs, content) {
            var el = document.createElement(tag);
            if (attrs) {
                for (var k in attrs) {
                    if (!attrs.hasOwnProperty(k)) continue;
                    if (k === 'className') { el.className = attrs[k]; }
                    else if (k === 'style' && typeof attrs[k] === 'object') {
                        for (var s in attrs[k]) el.style[s] = attrs[k][s];
                    } else { el.setAttribute(k, attrs[k]); }
                }
            }
            if (content) {
                if (typeof content === 'string') el.innerHTML = content;
                else el.appendChild(content);
            }
            return el;
        },

        throttle: function(fn, limit) {
            var waiting = false;
            return function() {
                if (!waiting) {
                    fn.apply(this, arguments);
                    waiting = true;
                    setTimeout(function() { waiting = false; }, limit);
                }
            };
        },

        debounce: function(fn, wait) {
            var timer;
            return function() {
                var ctx = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function() { fn.apply(ctx, args); }, wait);
            };
        },

        getCurrentTheme: function() {
            return document.body.classList.contains('theme-fandomdesktop-dark') ? 'dark' : 'light';
        },

        isLoggedIn: function() {
            return document.body.classList.contains('is-user-logged-in');
        },

        isMainPage: function() {
            return document.body.classList.contains('mainpage');
        },

        getPageName: function() {
            var name = mw.config.get('wgPageName');
            return name ? name.replace(/_/g, ' ') : '';
        }
    };

    /* Initialization */
    function init() {
        var u = window.ThedasApocrypha.utils;
        u.log('Thedas Apocrypha Wiki initialized');
        u.log('Theme: ' + u.getCurrentTheme());
        u.log('Page: ' + u.getPageName());
        document.body.classList.add('ta-initialized');
        document.dispatchEvent(new CustomEvent('thedasapocrypha:ready', {
            detail: { config: window.ThedasApocrypha.config }
        }));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


/* ============================================================
   SECTION 2: LIVE CLOCK & DATE
   Injects into the community header top container.
   Format: "Tuesday, Cloudreach 10, 9:41 — 3:47:22 PM"
   ============================================================ */

(function() {
    'use strict';

    function padZero(n) { return n < 10 ? '0' + n : String(n); }

    function formatClockHTML(now) {
        var days = [
            'Sunday','Monday','Tuesday','Wednesday',
            'Thursday','Friday','Saturday'
        ];
        var months = [
            'January','February','March','April','May','June',
            'July','August','September','October','November','December'
        ];

        var dayName   = days[now.getDay()];
        var monthName = months[now.getMonth()];
        var date      = now.getDate();
        var year      = now.getFullYear();
        var hours     = now.getHours();
        var ampm      = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        return dayName + ', ' + monthName + ' ' + date + ', ' + year +
               ' <span class="ta-clock-separator">\u2014</span> ' +
               hours +
               '<span class="ta-clock-colon">:</span>' + padZero(now.getMinutes()) +
               '<span class="ta-clock-colon">:</span>' + padZero(now.getSeconds()) +
               ' ' + ampm;
    }

    function initClock() {
        var container = document.querySelector('.fandom-community-header__top-container');
        if (!container || document.querySelector('.ta-live-clock')) return;

        var clock = document.createElement('div');
        clock.className = 'ta-live-clock';
        clock.title = 'Current local time';
        clock.innerHTML = formatClockHTML(new Date());
        container.appendChild(clock);

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


/* ============================================================
   SECTION 3: CUSTOM HEADER TOOL BUTTONS
   New Page, Admin Dashboard, Upload — injected into header.
   ============================================================ */

(function() {
    'use strict';

    var tools = [
        { href: '/wiki/Special:CreatePage', label: 'New Page',  cssClass: 'ta-header-tool--new-page', title: 'Create a new wiki page' },
        { href: '/wiki/Special:AdminDashboard', label: 'Admin', cssClass: 'ta-header-tool--admin',    title: 'Admin Dashboard' },
        { href: '/wiki/Special:Upload',     label: 'Upload',    cssClass: 'ta-header-tool--upload',   title: 'Upload a file' }
    ];

    function createToolButton(cfg) {
        var link = document.createElement('a');
        link.href = cfg.href;
        link.className = 'ta-header-tool ' + cfg.cssClass;
        link.title = cfg.title;

        var icon = document.createElement('span');
        icon.className = 'ta-tool-icon';
        link.appendChild(icon);
        link.appendChild(document.createTextNode(cfg.label));

        return link;
    }

    function initHeaderTools() {
        var wikiTools = document.querySelector('.wiki-tools.wds-button-group') ||
                        document.querySelector('.fandom-community-header__top-container');
        if (!wikiTools || document.querySelector('.ta-header-tools-wrapper')) return;

        var wrapper = document.createElement('div');
        wrapper.className = 'ta-header-tools-wrapper';
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


/* ============================================================
   SECTION 4: BACK TO TOP BUTTON
   Fixed bottom-right, appears after 400px scroll.
   ============================================================ */

(function() {
    'use strict';

    function initBackToTop() {
        if (document.getElementById('ta-back-to-top')) return;

        var btn = document.createElement('div');
        btn.id = 'ta-back-to-top';
        btn.title = 'Back to top';
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('aria-label', 'Scroll back to top of page');

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

        var threshold = 400;
        var ticking = false;

        function update() {
            if (window.scrollY > threshold) {
                btn.classList.add('ta-btt-visible');
            } else {
                btn.classList.remove('ta-btt-visible');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        });

        update();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
    } else {
        initBackToTop();
    }
})();


/* ============================================================
   SECTION 5: COLLAPSIBLE INFOBOX SECTIONS
   Click .pi-header to expand/collapse .pi-group.
   ============================================================ */

(function() {
    'use strict';
    if (window.taInfoboxCollapsible) return;
    window.taInfoboxCollapsible = true;

    function init() {
        var infoboxes = document.querySelectorAll('.portable-infobox');
        if (!infoboxes.length) return;

        infoboxes.forEach(function(infobox) {
            infobox.querySelectorAll('.pi-group').forEach(function(group) {
                var header = group.querySelector('.pi-header');
                if (!header) return;

                header.setAttribute('data-ta-collapsible', 'true');
                header.setAttribute('title', 'Click to expand/collapse');
                header.setAttribute('role', 'button');
                header.setAttribute('tabindex', '0');
                header.setAttribute('aria-expanded', 'true');

                header.addEventListener('click', function() {
                    var collapsed = group.classList.toggle('ta-collapsed');
                    header.setAttribute('aria-expanded', String(!collapsed));
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
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


/* ============================================================
   SECTION 6: DYNAMIC INFOBOX STATUS CLASSES
   Reads Status, Gender data-source values and adds CSS
   classes to the infobox container for icon activation.
   ============================================================ */

(function() {
    'use strict';
    if (window.taInfoboxStatusClasses) return;
    window.taInfoboxStatusClasses = true;

    function normalize(text) {
        return text.trim().toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/\s+/g, '-');
    }

    function init() {
        var infoboxes = document.querySelectorAll('.portable-infobox');
        if (!infoboxes.length) return;

        infoboxes.forEach(function(infobox) {

            /* --- Status --- */
            var statusRow = infobox.querySelector('.pi-data[data-source="status"]');
            if (statusRow) {
                var statusVal = statusRow.querySelector('.pi-data-value');
                if (statusVal) {
                    var st = normalize(statusVal.textContent);
                    var statusMap = {
                        'alive':      'status-alive',
                        'active':     'status-alive',
                        'deceased':   'status-deceased',
                        'dead':       'status-deceased',
                        'killed':     'status-deceased',
                        'unknown':    'status-unknown',
                        'missing':    'status-missing',
                        'tranquil':   'status-tranquil',
                        'possessed':  'status-possessed',
                        'imprisoned': 'status-detained',
                        'detained':   'status-detained',
                        'exiled':     'status-exiled'
                    };
                    if (statusMap[st]) {
                        infobox.classList.add(statusMap[st]);
                        statusVal.setAttribute('data-ta-status', st);
                    }
                }
            }

            /* --- Gender --- */
            var genderRow = infobox.querySelector('.pi-data[data-source="gender"]') ||
                            infobox.querySelector('.pi-data[data-source="sex"]');
            if (genderRow) {
                var genderVal = genderRow.querySelector('.pi-data-value');
                if (genderVal) {
                    var g = normalize(genderVal.textContent);
                    var genderMap = {
                        'male':        'gender-male',
                        'man':         'gender-male',
                        'female':      'gender-female',
                        'woman':       'gender-female',
                        'non-binary':  'gender-nonbinary',
                        'nonbinary':   'gender-nonbinary'
                    };
                    if (genderMap[g]) infobox.classList.add(genderMap[g]);
                }
            }

            /* --- Race (Dragon Age specific) --- */
            var raceRow = infobox.querySelector('.pi-data[data-source="race"]');
            if (raceRow) {
                var raceVal = raceRow.querySelector('.pi-data-value');
                if (raceVal) {
                    var r = normalize(raceVal.textContent);
                    var raceMap = {
                        'human':     'race-human',
                        'elf':       'race-elf',
                        'elven':     'race-elf',
                        'dwarf':     'race-dwarf',
                        'dwarven':   'race-dwarf',
                        'qunari':    'race-qunari',
                        'spirit':    'race-spirit',
                        'demon':     'race-demon',
                        'darkspawn': 'race-darkspawn'
                    };
                    if (raceMap[r]) infobox.classList.add(raceMap[r]);
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


/* ============================================================
   MODULE IMPORTS
   ============================================================ */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wiki-tools.js',
        'MediaWiki:Local-navigation.js'
    ]
});


/* ============================================================ */
/*  END OF MediaWiki:Common.js                                  */
/*  THEDAS APOCRYPHA WIKI — Blood Scripture Theme               */
/*                                                              */
/*  "In war, victory. In peace, vigilance.                      */
/*   In death, sacrifice."                                      */
/*       — The Grey Warden Oath                                 */
/* ============================================================ */
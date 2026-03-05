/* ============================================================ */
/*  MediaWiki:Common.js                                         */
/*  CAPES & CONSEQUENCES WIKI                                   */
/*  JavaScript Components — Art Deco / Retro Comic Book Theme   */
/* ============================================================ */
/*  This file is loaded on every page for all users.            */
/*  Keep it lightweight. All visual styling is handled by CSS.  */
/* ============================================================ */


/* ------------------------------------------------------------ */
/*  SECTION 2.1.5: LIVE CLOCK & DATE                            */
/*  Injects a continuously updating clock into the community    */
/*  header. Displays day, date, and time with pulsing colon.    */
/* ------------------------------------------------------------ */

(function() {
    'use strict';

    /**
     * Pads a number with a leading zero if needed.
     * @param {number} n - Number to pad
     * @returns {string} Zero-padded string
     */
    function padZero(n) {
        return n < 10 ? '0' + n : String(n);
    }

    /**
     * Formats a Date object into the display string.
     * Format: "Tuesday, February 10, 2026 — 3:47:22 PM"
     * @param {Date} now - Current date/time
     * @returns {string} Formatted HTML string
     */
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
               ' <span class="cc-clock-separator">\u2014</span> ' +
               hours + '<span class="cc-clock-colon">:</span>' +
               minutes + '<span class="cc-clock-colon">:</span>' +
               seconds + ' ' + ampm;
    }

    /**
     * Creates and injects the clock element into the header.
     */
    function initClock() {
        /* Find the top container */
        var topContainer = document.querySelector(
            '.fandom-community-header__top-container'
        );
        if (!topContainer) return;

        /* Don't double-inject if already present */
        if (document.querySelector('.cc-live-clock')) return;

        /* Create the clock element */
        var clock = document.createElement('div');
        clock.className = 'cc-live-clock';
        clock.setAttribute('title', 'Current local time');

        /* Initial render */
        clock.innerHTML = formatClockHTML(new Date());

        /* Append to the top container (will be pushed right via margin-left: auto in CSS) */
        topContainer.appendChild(clock);

        /* Update every second */
        setInterval(function() {
            clock.innerHTML = formatClockHTML(new Date());
        }, 1000);
    }

    /* Run when DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initClock);
    } else {
        initClock();
    }

})();


/* ------------------------------------------------------------ */
/*  SECTION 2.1.4: CUSTOM HEADER TOOL BUTTONS                   */
/*  Injects New Page, Admin Dashboard, and Upload buttons       */
/*  into the community header wiki tools area.                  */
/*  CSS handles all visual styling via .cc-header-tool classes.  */
/* ------------------------------------------------------------ */

(function() {
    'use strict';

    /**
     * Tool button definitions.
     * Each entry creates one button in the header.
     */
    var tools = [
        {
            href: '/wiki/Special:CreatePage',
            label: 'New Page',
            cssClass: 'cc-header-tool--new-page',
            title: 'Create a new wiki page'
        },
        {
            href: '/wiki/Special:AdminDashboard',
            label: 'Admin',
            cssClass: 'cc-header-tool--admin',
            title: 'Admin Dashboard'
        },
        {
            href: '/wiki/Special:Upload',
            label: 'Upload',
            cssClass: 'cc-header-tool--upload',
            title: 'Upload a file'
        }
    ];

    /**
     * Creates a single tool button element.
     * @param {Object} config - Tool configuration
     * @returns {HTMLAnchorElement} The button element
     */
    function createToolButton(config) {
        var link = document.createElement('a');
        link.href = config.href;
        link.className = 'cc-header-tool ' + config.cssClass;
        link.title = config.title;

        /* Icon span */
        var icon = document.createElement('span');
        icon.className = 'cc-tool-icon';
        link.appendChild(icon);

        /* Label text */
        var labelText = document.createTextNode(config.label);
        link.appendChild(labelText);

        return link;
    }

    /**
     * Injects all custom tool buttons into the header.
     */
    function initHeaderTools() {
        /* Find the wiki tools container */
        var wikiTools = document.querySelector('.wiki-tools.wds-button-group');
        if (!wikiTools) {
            /* Fallback: try the top container directly */
            wikiTools = document.querySelector(
                '.fandom-community-header__top-container'
            );
        }
        if (!wikiTools) return;

        /* Don't double-inject */
        if (document.querySelector('.cc-header-tools-wrapper')) return;

        /* Create wrapper for our custom tools */
        var wrapper = document.createElement('div');
        wrapper.className = 'cc-header-tools-wrapper';

        /* Create each tool button */
        for (var i = 0; i < tools.length; i++) {
            wrapper.appendChild(createToolButton(tools[i]));
        }

        /* Insert after the existing wiki tools */
        if (wikiTools.nextSibling) {
            wikiTools.parentNode.insertBefore(wrapper, wikiTools.nextSibling);
        } else {
            wikiTools.parentNode.appendChild(wrapper);
        }
    }

    /* Run when DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderTools);
    } else {
        initHeaderTools();
    }

})();

/* ------------------------------------------------------------ */
/*  SECTION 2.3.5: BACK TO TOP BUTTON                           */
/*  A floating "Back to Top" button that appears after the      */
/*  user scrolls down. Fixed position, bottom-right.            */
/*  CSS handles all visual styling via .cc-back-to-top class.   */
/* ------------------------------------------------------------ */

(function() {
    'use strict';

    function initBackToTop() {
        /* Don't double-inject */
        if (document.querySelector('.cc-back-to-top')) return;

        /* Create the button */
        var btn = document.createElement('a');
        btn.className = 'cc-back-to-top';
        btn.href = '#';
        btn.title = 'Back to top';
        btn.setAttribute('aria-label', 'Scroll back to top of page');

        /* Click handler — smooth scroll to top */
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        /* Append to body */
        document.body.appendChild(btn);

        /* Show/hide based on scroll position */
        var scrollThreshold = 400;
        var ticking = false;

        function updateVisibility() {
            if (window.scrollY > scrollThreshold) {
                btn.classList.add('cc-visible');
            } else {
                btn.classList.remove('cc-visible');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateVisibility);
                ticking = true;
            }
        });

        /* Initial check */
        updateVisibility();
    }

    /* Run when DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
    } else {
        initBackToTop();
    }

})();

/* ============================================================ */
/*  Common.js Addition — Phase 4.1                              */
/*  CAPES & CONSEQUENCES WIKI                                   */
/*  Collapsible Infobox Sections + Dynamic Status Classes       */
/*                                                              */
/*  ADD this code to MediaWiki:Common.js (append to existing).  */
/*  Do NOT replace the existing Common.js content.              */
/* ============================================================ */

/* --- MODULE: Collapsible Infobox Sections --- */
(function() {
    'use strict';

    if (window.ccInfoboxCollapsible) return;
    window.ccInfoboxCollapsible = true;

    function initCollapsibleInfobox() {
        var infoboxes = document.querySelectorAll('.portable-infobox');
        if (!infoboxes.length) return;

        infoboxes.forEach(function(infobox) {
            var groups = infobox.querySelectorAll('.pi-group');

            groups.forEach(function(group) {
                var header = group.querySelector('.pi-header');
                if (!header) return;

                /* Mark header as collapsible */
                header.setAttribute('data-cc-collapsible', 'true');
                header.setAttribute('title', 'Click to expand/collapse');
                header.setAttribute('role', 'button');
                header.setAttribute('tabindex', '0');
                header.setAttribute('aria-expanded', 'true');

                /* Click handler */
                header.addEventListener('click', function() {
                    var isCollapsed = group.classList.contains('cc-collapsed');
                    if (isCollapsed) {
                        group.classList.remove('cc-collapsed');
                        header.setAttribute('aria-expanded', 'true');
                    } else {
                        group.classList.add('cc-collapsed');
                        header.setAttribute('aria-expanded', 'false');
                    }
                });

                /* Keyboard: Enter or Space to toggle */
                header.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.click();
                    }
                });
            });
        });
    }

    /* Run on DOM ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCollapsibleInfobox);
    } else {
        initCollapsibleInfobox();
    }
})();


/* --- MODULE: Dynamic Infobox Status Classes --- */
/* Reads the text content of Status, Gender, and Orientation    */
/* data values and adds corresponding CSS classes to the        */
/* portable-infobox container so the CSS icons activate.         */
(function() {
    'use strict';

    if (window.ccInfoboxStatusClasses) return;
    window.ccInfoboxStatusClasses = true;

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
            var statusRow = infobox.querySelector('.pi-data[data-source="status"]');
            if (statusRow) {
                var statusVal = statusRow.querySelector('.pi-data-value');
                if (statusVal) {
                    var statusText = normalizeValue(statusVal.textContent);
                    var statusMap = {
                        'alive': 'status-alive',
                        'active': 'status-alive',
                        'deceased': 'status-deceased',
                        'dead': 'status-deceased',
                        'unknown': 'status-unknown',
                        'missing': 'status-missing',
                        'mia': 'status-missing'
                    };
                    if (statusMap[statusText]) {
                        infobox.classList.add(statusMap[statusText]);
                        statusVal.setAttribute('data-cc-status', statusText === 'active' ? 'alive' :
                            statusText === 'dead' ? 'deceased' :
                            statusText === 'mia' ? 'missing' : statusText);
                    }
                }
            }

            /* --- Gender --- */
            var genderRow = infobox.querySelector('.pi-data[data-source="gender"]') ||
                            infobox.querySelector('.pi-data[data-source="sex"]');
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
            var orientRow = infobox.querySelector('.pi-data[data-source="orientation"]');
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

    /* Run on DOM ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStatusClasses);
    } else {
        initStatusClasses();
    }
})();
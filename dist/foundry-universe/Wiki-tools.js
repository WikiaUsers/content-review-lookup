/* ============================================================ */
/*  MediaWiki:Wiki-tools.js                                     */
/*  THE FOUNDRY WIKI                                            */
/*  Custom Tool Buttons & Configurable Clock                    */
/*  Codename: FORGEFIRE                                         */
/*                                                              */
/*  This module handles:                                        */
/*    - Custom tool buttons (New Page, Admin, Upload)           */
/*    - Admin-only button visibility                            */
/*    - Login-required guards                                   */
/*    - Configurable live clock (format, seconds, date)         */
/*                                                              */
/*  NOTE: If Common.js already injects the clock and header     */
/*  tools, this module will detect them and skip re-injection.  */
/*  You can use EITHER Common.js's built-in versions OR this    */
/*  module — not both. To use this module instead, remove the   */
/*  clock and header-tools IIFEs from Common.js and add:        */
/*                                                              */
/*  importArticles({                                            */
/*      type: 'script',                                         */
/*      articles: ['MediaWiki:Wiki-tools.js']                   */
/*  });                                                         */
/*                                                              */
/*  Last Updated: April 2026                                    */
/* ============================================================ */

(function() {
    'use strict';

    /* -------------------------------------------------------- */
    /*  CONFIGURATION                                           */
    /* -------------------------------------------------------- */

    var config = {
        tools: [
            {
                id: 'fd-tool-create-page',
                href: '/wiki/Special:CreatePage',
                tooltip: 'Create New Page',
                icon: 'create',
                showText: false,
                adminOnly: false
            },
            {
                id: 'fd-tool-admin-dashboard',
                href: '/wiki/Special:AdminDashboard',
                tooltip: 'Admin Dashboard',
                icon: 'admin',
                showText: false,
                adminOnly: true
            },
            {
                id: 'fd-tool-upload',
                href: '/wiki/Special:Upload',
                tooltip: 'Upload File',
                icon: 'upload',
                showText: false,
                adminOnly: false
            }
        ],
        clock: {
            enabled: true,
            format24h: false,
            showSeconds: false,
            showDate: true
        }
    };

    /* -------------------------------------------------------- */
    /*  UTILITY FUNCTIONS                                       */
    /* -------------------------------------------------------- */

    /**
     * Check if user is an admin/staff
     */
    function isAdmin() {
        try {
            var userGroups = mw.config.get('wgUserGroups') || [];
            return userGroups.indexOf('sysop') !== -1 ||
                   userGroups.indexOf('bureaucrat') !== -1 ||
                   userGroups.indexOf('staff') !== -1 ||
                   userGroups.indexOf('wiki-manager') !== -1 ||
                   userGroups.indexOf('content-team-member') !== -1;
        } catch (e) {
            return false;
        }
    }

    /**
     * Check if user is logged in
     */
    function isLoggedIn() {
        try {
            return mw.config.get('wgUserId') !== null;
        } catch (e) {
            return false;
        }
    }

    /**
     * Pad single digits with leading zero
     */
    function padZero(n) {
        return n < 10 ? '0' + n : String(n);
    }

    /**
     * Log to console via FoundryWiki utils if available
     */
    function log(message) {
        if (window.FoundryWiki && window.FoundryWiki.utils) {
            window.FoundryWiki.utils.log(message);
        }
    }

    /* -------------------------------------------------------- */
    /*  TOOL BUTTON CREATION                                    */
    /* -------------------------------------------------------- */

    /**
     * Create an icon element for a tool button
     */
    function createIcon(iconType) {
        var icon = document.createElement('span');
        icon.className = 'fd-tool-icon fd-icon-' + iconType;
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }

    /**
     * Create a single tool button
     */
    function createToolButton(toolConfig) {
        var button = document.createElement('a');
        button.id = toolConfig.id;
        button.href = toolConfig.href;
        button.className = 'fd-tool-btn';
        button.setAttribute('data-tool', toolConfig.icon);

        if (toolConfig.tooltip) {
            button.setAttribute('data-tooltip', toolConfig.tooltip);
            button.setAttribute('title', toolConfig.tooltip);
            button.setAttribute('aria-label', toolConfig.tooltip);
        }

        /* Icon */
        button.appendChild(createIcon(toolConfig.icon));

        /* Optional text label */
        if (toolConfig.showText && toolConfig.text) {
            var textSpan = document.createElement('span');
            textSpan.className = 'fd-btn-text';
            textSpan.textContent = toolConfig.text;
            button.appendChild(textSpan);
        }

        return button;
    }

    /* -------------------------------------------------------- */
    /*  CLOCK FUNCTIONS                                         */
    /* -------------------------------------------------------- */

    /**
     * Format time string
     */
    function formatTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = '';

        if (!config.clock.format24h) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            if (hours === 0) hours = 12;
        }

        var timeStr = padZero(hours) +
                      '<span class="fd-clock-colon">:</span>' +
                      padZero(minutes);

        if (config.clock.showSeconds) {
            timeStr += '<span class="fd-clock-colon">:</span>' +
                       padZero(seconds);
        }

        return timeStr + ampm;
    }

    /**
     * Format date string
     */
    function formatDate(date) {
        var months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        var day = date.getDate();
        var month = months[date.getMonth()];
        var year = date.getFullYear();

        return month + ' ' + day + ', ' + year;
    }

    /**
     * Create clock container element
     */
    function createClockContainer() {
        var container = document.createElement('div');
        container.id = 'fd-clock';
        container.className = 'fd-clock-container';
        container.setAttribute('title', 'Current local time');

        var timeDisplay = document.createElement('span');
        timeDisplay.className = 'fd-clock-time';
        timeDisplay.id = 'fd-clock-time';
        container.appendChild(timeDisplay);

        if (config.clock.showDate) {
            var separator = document.createElement('span');
            separator.className = 'fd-clock-separator';
            separator.innerHTML = ' \u2014 ';
            container.appendChild(separator);

            var dateDisplay = document.createElement('span');
            dateDisplay.className = 'fd-clock-date';
            dateDisplay.id = 'fd-clock-date';
            container.appendChild(dateDisplay);
        }

        return container;
    }

    /**
     * Update clock display
     */
    function updateClock() {
        var now = new Date();

        var timeElement = document.getElementById('fd-clock-time');
        var dateElement = document.getElementById('fd-clock-date');

        if (timeElement) {
            timeElement.innerHTML = formatTime(now);
        }

        if (dateElement && config.clock.showDate) {
            dateElement.textContent = formatDate(now);
        }
    }

    /**
     * Start clock with 1-second interval
     */
    function startClock() {
        updateClock();
        setInterval(updateClock, 1000);
    }

    /* -------------------------------------------------------- */
    /*  INITIALIZATION                                          */
    /* -------------------------------------------------------- */

    function initWikiTools() {
        /* Find the wiki tools container */
        var wikiTools = document.querySelector('.wiki-tools');

        if (!wikiTools) {
            /* Retry once after a short delay */
            setTimeout(initWikiTools, 500);
            return;
        }

        /* ---- Tool Buttons ---- */

        /* Skip if Common.js already injected header tools */
        if (!document.querySelector('.fd-header-tools-wrapper') &&
            !document.getElementById('fd-custom-tools')) {

            var themeSwitch = wikiTools.querySelector(
                '.wiki-tools__theme-switch'
            );

            var customToolsContainer = document.createElement('div');
            customToolsContainer.id = 'fd-custom-tools';
            customToolsContainer.style.display = 'flex';
            customToolsContainer.style.alignItems = 'center';
            customToolsContainer.style.gap = '8px';

            config.tools.forEach(function(tool) {
                /* Admin-only check */
                if (tool.adminOnly && !isAdmin()) {
                    return;
                }

                /* Login-required check */
                if (!isLoggedIn()) {
                    return;
                }

                customToolsContainer.appendChild(createToolButton(tool));
            });

            /* Insert before theme switch if possible */
            if (themeSwitch && customToolsContainer.children.length > 0) {
                wikiTools.insertBefore(customToolsContainer, themeSwitch);
            } else if (customToolsContainer.children.length > 0) {
                wikiTools.appendChild(customToolsContainer);
            }
        }

        /* ---- Clock ---- */

        /* Skip if Common.js already injected the clock */
        if (config.clock.enabled &&
            !document.querySelector('.fd-live-clock') &&
            !document.getElementById('fd-clock')) {

            var clockContainer = createClockContainer();
            wikiTools.appendChild(clockContainer);
            startClock();
        }

        log('Wiki tools module initialized');
    }

    /* -------------------------------------------------------- */
    /*  RUN                                                     */
    /* -------------------------------------------------------- */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initWikiTools, 100);
        });
    } else {
        setTimeout(initWikiTools, 100);
    }

})();

/* ============================================================ */
/*  END OF MediaWiki:Wiki-tools.js                              */
/*  THE FOUNDRY WIKI — Codename FORGEFIRE                       */
/* ============================================================ */
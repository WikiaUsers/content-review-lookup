/* ============================================================
   THEDAS APOCRYPHA WIKI
   MediaWiki:Wiki-tools.js
   
   Custom tool buttons and live clock for the wiki tools bar.
   - Create Page button
   - Admin Dashboard button (admin-only)
   - Upload File button
   - Live clock with date display
   
   Codename: BLOOD SCRIPTURE
   ============================================================ */

(function() {
    'use strict';

    /* --------------------------------------------------------
       CONFIGURATION
       -------------------------------------------------------- */

    var config = {
        tools: [
            {
                id: 'ta-tool-create-page',
                href: '/wiki/Special:CreatePage',
                tooltip: 'Create New Page',
                icon: 'create',
                showText: false
            },
            {
                id: 'ta-tool-admin',
                href: '/wiki/Special:AdminDashboard',
                tooltip: 'Admin Dashboard',
                icon: 'admin',
                showText: false,
                adminOnly: true
            },
            {
                id: 'ta-tool-upload',
                href: '/wiki/Special:Upload',
                tooltip: 'Upload File',
                icon: 'upload',
                showText: false
            }
        ],
        clock: {
            enabled: true,
            format24h: false,
            showSeconds: false,
            showDate: true
        }
    };

    /* --------------------------------------------------------
       UTILITY FUNCTIONS
       -------------------------------------------------------- */

    function isAdmin() {
        try {
            var groups = mw.config.get('wgUserGroups') || [];
            return groups.indexOf('sysop') !== -1 ||
                   groups.indexOf('bureaucrat') !== -1 ||
                   groups.indexOf('staff') !== -1 ||
                   groups.indexOf('wiki-manager') !== -1 ||
                   groups.indexOf('content-team-member') !== -1;
        } catch (e) {
            return false;
        }
    }

    function isLoggedIn() {
        try {
            return mw.config.get('wgUserId') !== null;
        } catch (e) {
            return false;
        }
    }

    function createIcon(iconType) {
        var icon = document.createElement('span');
        icon.className = 'ta-tool-icon ta-tool-icon-' + iconType;
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }

    function createToolButton(toolCfg) {
        var btn = document.createElement('a');
        btn.id = toolCfg.id;
        btn.href = toolCfg.href;
        btn.className = 'ta-tool-btn';
        btn.setAttribute('data-tool', toolCfg.icon);

        if (toolCfg.tooltip) {
            btn.setAttribute('data-tooltip', toolCfg.tooltip);
            btn.setAttribute('title', toolCfg.tooltip);
            btn.setAttribute('aria-label', toolCfg.tooltip);
        }

        btn.appendChild(createIcon(toolCfg.icon));

        if (toolCfg.showText && toolCfg.text) {
            var txt = document.createElement('span');
            txt.className = 'ta-tool-btn-text';
            txt.textContent = toolCfg.text;
            btn.appendChild(txt);
        }

        return btn;
    }

    /* --------------------------------------------------------
       CLOCK
       -------------------------------------------------------- */

    function padZero(n) {
        return n < 10 ? '0' + n : String(n);
    }

    function formatTime(d) {
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var suffix = '';

        if (!config.clock.format24h) {
            suffix = h >= 12 ? ' PM' : ' AM';
            h = h % 12 || 12;
        }

        var str = padZero(h) + ':' + padZero(m);
        if (config.clock.showSeconds) {
            str += ':' + padZero(s);
        }
        return str + suffix;
    }

    function formatDate(d) {
        var months = [
            'JAN','FEB','MAR','APR','MAY','JUN',
            'JUL','AUG','SEP','OCT','NOV','DEC'
        ];
        return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    }

    function createClockContainer() {
        var container = document.createElement('div');
        container.id = 'ta-clock';
        container.className = 'ta-clock-container';

        var timeEl = document.createElement('div');
        timeEl.className = 'ta-clock-time';
        timeEl.id = 'ta-clock-time';
        container.appendChild(timeEl);

        if (config.clock.showDate) {
            var dateEl = document.createElement('div');
            dateEl.className = 'ta-clock-date';
            dateEl.id = 'ta-clock-date';
            container.appendChild(dateEl);
        }

        return container;
    }

    function updateClock() {
        var now = new Date();
        var timeEl = document.getElementById('ta-clock-time');
        var dateEl = document.getElementById('ta-clock-date');

        if (timeEl) timeEl.textContent = formatTime(now);
        if (dateEl && config.clock.showDate) dateEl.textContent = formatDate(now);
    }

    function startClock() {
        updateClock();
        setInterval(updateClock, 1000);
    }

    /* --------------------------------------------------------
       INITIALIZATION
       -------------------------------------------------------- */

    function init() {
        var wikiTools = document.querySelector('.wiki-tools');

        if (!wikiTools) {
            setTimeout(init, 500);
            return;
        }

        var themeSwitch = wikiTools.querySelector('.wiki-tools__theme-switch');

        // Container for custom buttons
        var container = document.createElement('div');
        container.id = 'ta-custom-tools';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.gap = '8px';

        config.tools.forEach(function(tool) {
            if (tool.adminOnly && !isAdmin()) return;
            if (!isLoggedIn()) return;
            container.appendChild(createToolButton(tool));
        });

        // Insert before theme switch or append
        if (themeSwitch && container.children.length > 0) {
            wikiTools.insertBefore(container, themeSwitch);
        } else if (container.children.length > 0) {
            wikiTools.appendChild(container);
        }

        // Clock
        if (config.clock.enabled) {
            wikiTools.appendChild(createClockContainer());
            startClock();
        }
    }

    /* --------------------------------------------------------
       RUN
       -------------------------------------------------------- */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(init, 100);
        });
    } else {
        setTimeout(init, 100);
    }

})();
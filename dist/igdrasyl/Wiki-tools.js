/* ============================================================
   IGDRASYL WIKI - WIKI TOOLS JAVASCRIPT
   MediaWiki:Wiki-tools.js
   
   Adds custom tool buttons and the live clock.
   Includes:
   - Create Page button
   - Admin Dashboard button
   - Upload button
   - Live Clock and Date display
   
   Project: Igdrasyl / Tamer Chronicles
   Last Updated: April 2026
   ============================================================ */

(function() {
    'use strict';
    
    /* --------------------------------------------------------
       CONFIGURATION
       -------------------------------------------------------- */
    
    var config = {
        tools: [
            {
                id: 'igdrasyl-create-page',
                href: '/wiki/Special:CreatePage',
                tooltip: 'Create New Page',
                icon: 'create',
                showText: false
            },
            {
                id: 'igdrasyl-admin-dashboard',
                href: '/wiki/Special:AdminDashboard',
                tooltip: 'Admin Dashboard',
                icon: 'admin',
                showText: false,
                adminOnly: true
            },
            {
                id: 'igdrasyl-upload',
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
        if (window.IgdrasylWiki && window.IgdrasylWiki.utils) {
            return window.IgdrasylWiki.utils.isAdmin();
        }
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
    
    function isLoggedIn() {
        if (window.IgdrasylWiki && window.IgdrasylWiki.utils) {
            return window.IgdrasylWiki.utils.isLoggedIn();
        }
        try {
            return mw.config.get('wgUserId') !== null;
        } catch (e) {
            return false;
        }
    }
    
    function log(message) {
        if (window.IgdrasylWiki && window.IgdrasylWiki.utils) {
            window.IgdrasylWiki.utils.log(message);
        }
    }
    
    /* --------------------------------------------------------
       ICON CREATION
       -------------------------------------------------------- */
    
    function createIcon(iconType) {
        var icon = document.createElement('span');
        icon.className = 'igdrasyl-icon igdrasyl-icon-' + iconType;
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }
    
    /* --------------------------------------------------------
       TOOL BUTTON CREATION
       -------------------------------------------------------- */
    
    function createToolButton(toolConfig) {
        var button = document.createElement('a');
        button.id = toolConfig.id;
        button.href = toolConfig.href;
        button.className = 'igdrasyl-tool-btn';
        button.setAttribute('data-tool', toolConfig.icon);
        
        if (toolConfig.tooltip) {
            button.setAttribute('data-tooltip', toolConfig.tooltip);
            button.setAttribute('title', toolConfig.tooltip);
            button.setAttribute('aria-label', toolConfig.tooltip);
        }
        
        button.appendChild(createIcon(toolConfig.icon));
        
        if (toolConfig.showText && toolConfig.text) {
            var textSpan = document.createElement('span');
            textSpan.className = 'igdrasyl-btn-text';
            textSpan.textContent = toolConfig.text;
            button.appendChild(textSpan);
        }
        
        return button;
    }
    
    /* --------------------------------------------------------
       CLOCK FUNCTIONS
       -------------------------------------------------------- */
    
    function padZero(num) {
        return num < 10 ? '0' + num : num.toString();
    }
    
    function formatTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = '';
        
        if (!config.clock.format24h) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
        }
        
        var timeStr = padZero(hours) + ':' + padZero(minutes);
        
        if (config.clock.showSeconds) {
            timeStr += ':' + padZero(seconds);
        }
        
        return timeStr + ampm;
    }
    
    function formatDate(date) {
        var months = [
            'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
            'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
        ];
        var day = date.getDate();
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        
        return month + ' ' + day + ', ' + year;
    }
    
    function createClockContainer() {
        var container = document.createElement('div');
        container.id = 'igdrasyl-clock';
        container.className = 'igdrasyl-clock-container';
        
        var timeDisplay = document.createElement('div');
        timeDisplay.className = 'igdrasyl-clock-time';
        timeDisplay.id = 'igdrasyl-clock-time';
        container.appendChild(timeDisplay);
        
        if (config.clock.showDate) {
            var dateDisplay = document.createElement('div');
            dateDisplay.className = 'igdrasyl-clock-date';
            dateDisplay.id = 'igdrasyl-clock-date';
            container.appendChild(dateDisplay);
        }
        
        return container;
    }
    
    function updateClock() {
        var now = new Date();
        
        var timeElement = document.getElementById('igdrasyl-clock-time');
        var dateElement = document.getElementById('igdrasyl-clock-date');
        
        if (timeElement) {
            timeElement.textContent = formatTime(now);
        }
        
        if (dateElement && config.clock.showDate) {
            dateElement.textContent = formatDate(now);
        }
    }
    
    function startClock() {
        updateClock();
        setInterval(updateClock, 1000);
    }
    
    /* --------------------------------------------------------
       INITIALIZATION
       -------------------------------------------------------- */
    
    function initWikiTools() {
        var wikiTools = document.querySelector('.wiki-tools');
        
        if (!wikiTools) {
            setTimeout(initWikiTools, 500);
            return;
        }
        
        var themeSwitch = wikiTools.querySelector('.wiki-tools__theme-switch');
        
        /* Create container for custom tools */
        var customToolsContainer = document.createElement('div');
        customToolsContainer.id = 'igdrasyl-custom-tools';
        customToolsContainer.style.display = 'flex';
        customToolsContainer.style.alignItems = 'center';
        customToolsContainer.style.gap = '8px';
        
        /* Add tool buttons */
        config.tools.forEach(function(tool) {
            if (tool.adminOnly && !isAdmin()) {
                return;
            }
            
            if (!isLoggedIn()) {
                return;
            }
            
            var button = createToolButton(tool);
            customToolsContainer.appendChild(button);
        });
        
        /* Insert custom tools before theme switch */
        if (themeSwitch && customToolsContainer.children.length > 0) {
            wikiTools.insertBefore(customToolsContainer, themeSwitch);
        } else if (customToolsContainer.children.length > 0) {
            wikiTools.appendChild(customToolsContainer);
        }
        
        /* Add clock if enabled */
        if (config.clock.enabled) {
            var clockContainer = createClockContainer();
            wikiTools.appendChild(clockContainer);
            startClock();
        }
        
        log('Wiki tools initialized');
    }
    
    /* --------------------------------------------------------
       RUN INITIALIZATION
       -------------------------------------------------------- */
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initWikiTools, 100);
        });
    } else {
        setTimeout(initWikiTools, 100);
    }
    
})();
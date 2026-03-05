/* ============================================================
   SOURCEVERSE WIKI - WIKI TOOLS JAVASCRIPT
   MediaWiki:Wiki-tools.js
   
   This file adds custom tool buttons and the live clock.
   Includes:
   - Create Page button
   - Admin Dashboard button
   - Upload button
   - Live Clock and Date display
   
   Last Updated: February 2026
   ============================================================ */

(function() {
    'use strict';
    
    /* --------------------------------------------------------
       CONFIGURATION
       -------------------------------------------------------- */
    
    var config = {
        // Tool buttons to add
        tools: [
            {
                id: 'sourceverse-create-page',
                href: '/wiki/Special:CreatePage',
                tooltip: 'Create New Page',
                icon: 'create',
                showText: false
            },
            {
                id: 'sourceverse-admin-dashboard',
                href: '/wiki/Special:AdminDashboard',
                tooltip: 'Admin Dashboard',
                icon: 'admin',
                showText: false,
                adminOnly: true
            },
            {
                id: 'sourceverse-upload',
                href: '/wiki/Special:Upload',
                tooltip: 'Upload File',
                icon: 'upload',
                showText: false
            }
        ],
        // Clock settings
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
    
    /**
     * Check if user is an admin
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
     * Create an icon element
     */
    function createIcon(iconType) {
        var icon = document.createElement('span');
        icon.className = 'sourceverse-icon sourceverse-icon-' + iconType;
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }
    
    /**
     * Create a tool button
     */
    function createToolButton(toolConfig) {
        var button = document.createElement('a');
        button.id = toolConfig.id;
        button.href = toolConfig.href;
        button.className = 'sourceverse-tool-btn';
        button.setAttribute('data-tool', toolConfig.icon);
        
        if (toolConfig.tooltip) {
            button.setAttribute('data-tooltip', toolConfig.tooltip);
            button.setAttribute('title', toolConfig.tooltip);
            button.setAttribute('aria-label', toolConfig.tooltip);
        }
        
        // Add icon
        button.appendChild(createIcon(toolConfig.icon));
        
        // Add text if needed
        if (toolConfig.showText && toolConfig.text) {
            var textSpan = document.createElement('span');
            textSpan.className = 'sourceverse-btn-text';
            textSpan.textContent = toolConfig.text;
            button.appendChild(textSpan);
        }
        
        return button;
    }
    
    /* --------------------------------------------------------
       CLOCK FUNCTIONS
       -------------------------------------------------------- */
    
    /**
     * Format time
     */
    function formatTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = '';
        
        if (!config.clock.format24h) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Handle midnight
        }
        
        var timeStr = padZero(hours) + ':' + padZero(minutes);
        
        if (config.clock.showSeconds) {
            timeStr += ':' + padZero(seconds);
        }
        
        return timeStr + ampm;
    }
    
    /**
     * Format date
     */
    function formatDate(date) {
        var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var day = date.getDate();
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        
        return month + ' ' + day + ', ' + year;
    }
    
    /**
     * Pad single digits with zero
     */
    function padZero(num) {
        return num < 10 ? '0' + num : num.toString();
    }
    
    /**
     * Create clock container
     */
    function createClockContainer() {
        var container = document.createElement('div');
        container.id = 'sourceverse-clock';
        container.className = 'sourceverse-clock-container';
        
        var timeDisplay = document.createElement('div');
        timeDisplay.className = 'sourceverse-clock-time';
        timeDisplay.id = 'sourceverse-clock-time';
        
        container.appendChild(timeDisplay);
        
        if (config.clock.showDate) {
            var dateDisplay = document.createElement('div');
            dateDisplay.className = 'sourceverse-clock-date';
            dateDisplay.id = 'sourceverse-clock-date';
            container.appendChild(dateDisplay);
        }
        
        return container;
    }
    
    /**
     * Update clock display
     */
    function updateClock() {
        var now = new Date();
        
        var timeElement = document.getElementById('sourceverse-clock-time');
        var dateElement = document.getElementById('sourceverse-clock-date');
        
        if (timeElement) {
            timeElement.textContent = formatTime(now);
        }
        
        if (dateElement && config.clock.showDate) {
            dateElement.textContent = formatDate(now);
        }
    }
    
    /**
     * Start clock
     */
    function startClock() {
        updateClock();
        setInterval(updateClock, 1000);
    }
    
    /* --------------------------------------------------------
       INITIALIZATION
       -------------------------------------------------------- */
    
    function initWikiTools() {
        // Find the wiki tools container
        var wikiTools = document.querySelector('.wiki-tools');
        
        if (!wikiTools) {
            // Try again after a short delay if not found
            setTimeout(initWikiTools, 500);
            return;
        }
        
        // Find the theme switch button (we'll insert before it)
        var themeSwitch = wikiTools.querySelector('.wiki-tools__theme-switch');
        
        // Create a container for our custom tools
        var customToolsContainer = document.createElement('div');
        customToolsContainer.id = 'sourceverse-custom-tools';
        customToolsContainer.style.display = 'flex';
        customToolsContainer.style.alignItems = 'center';
        customToolsContainer.style.gap = '8px';
        
        // Add tool buttons
        config.tools.forEach(function(tool) {
            // Check admin requirement
            if (tool.adminOnly && !isAdmin()) {
                return;
            }
            
            // Check login requirement (all tools require login by default)
            if (!isLoggedIn()) {
                return;
            }
            
            var button = createToolButton(tool);
            customToolsContainer.appendChild(button);
        });
        
        // Insert custom tools before theme switch
        if (themeSwitch && customToolsContainer.children.length > 0) {
            wikiTools.insertBefore(customToolsContainer, themeSwitch);
        } else if (customToolsContainer.children.length > 0) {
            wikiTools.appendChild(customToolsContainer);
        }
        
        // Add clock if enabled
        if (config.clock.enabled) {
            var clockContainer = createClockContainer();
            wikiTools.appendChild(clockContainer);
            startClock();
        }
        
        // Log success
        if (window.SourceVerseWiki && window.SourceVerseWiki.utils) {
            window.SourceVerseWiki.utils.log('Wiki tools initialized');
        }
    }
    
    /* --------------------------------------------------------
       RUN INITIALIZATION
       -------------------------------------------------------- */
    
    // Wait for DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Small delay to ensure Fandom's elements are loaded
            setTimeout(initWikiTools, 100);
        });
    } else {
        setTimeout(initWikiTools, 100);
    }
    
})();
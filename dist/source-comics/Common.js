/* ============================================================================
   SOURCE COMICS WIKI - COMMUNITYHEADER.JS
   Add to MediaWiki:Common.js
   ============================================================================
   JavaScript for Community Header Custom Elements
   - Live Clock
   - Page Counter
   - Custom Tool Icons
   Project: Source Comics / SourceVerse
   ============================================================================ */

(function() {
    'use strict';
    
    /* ========================================================================
       CONFIGURATION
       ======================================================================== */
    
    var config = {
        // Clock settings
        clockFormat: '24h', // '12h' or '24h'
        showSeconds: true,
        showDate: true,
        showTimezone: false,
        timezone: 'local', // 'local' or specific timezone like 'America/New_York'
        
        // In-universe year offset (2050 - current year)
        // Set to 0 to show real date, or calculate offset for in-universe time
        yearOffset: 0, // Change to show in-universe year (e.g., 24 for 2050 if current is 2026)
        
        // Tool links
        createPageUrl: '/wiki/Special:CreatePage',
        adminDashboardUrl: '/wiki/Special:AdminDashboard',
        uploadUrl: '/wiki/Special:Upload',
        
        // Selectors
        headerTopSelector: '.fandom-community-header__top',
        wikiToolsSelector: '.wiki-tools.wds-button-group'
    };
    
    /* ========================================================================
       UTILITY FUNCTIONS
       ======================================================================== */
    
    // Check if user is admin
    function isAdmin() {
        var body = document.body;
        return body.classList.contains('admin') ||
               body.className.indexOf('group-sysop') !== -1 ||
               body.className.indexOf('group-bureaucrat') !== -1 ||
               body.className.indexOf('group-content-moderator') !== -1;
    }
    
    // Pad number with leading zero
    function padZero(num) {
        return num < 10 ? '0' + num : num.toString();
    }
    
    // Format time
    function formatTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = '';
        
        if (config.clockFormat === '12h') {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
        }
        
        var timeStr = padZero(hours) + 
                      '<span class="clock-colon">:</span>' + 
                      padZero(minutes);
        
        if (config.showSeconds) {
            timeStr += '<span class="clock-colon">:</span>' + padZero(seconds);
        }
        
        timeStr += ampm;
        
        return timeStr;
    }
    
    // Format date
    function formatDate(date) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        var dayName = days[date.getDay()];
        var month = months[date.getMonth()];
        var day = date.getDate();
        var year = date.getFullYear() + config.yearOffset;
        
        return dayName + ', ' + month + ' ' + day + ', ' + year;
    }
    
    // Get timezone abbreviation
    function getTimezone(date) {
        var tzString = date.toLocaleTimeString('en-US', { timeZoneName: 'short' });
        var match = tzString.match(/[A-Z]{2,5}$/);
        return match ? match[0] : '';
    }
    
    /* ========================================================================
       CREATE CUSTOM TOOLS HTML
       ======================================================================== */
    
    function createToolsHTML() {
        var html = '<div class="source-wiki-tools">';
        
        // Page Counter
        html += '<div class="source-page-counter">';
        html += '<span class="source-page-counter__value" id="source-page-count">--</span>';
        html += '<span class="source-page-counter__label">Pages</span>';
        html += '</div>';
        
        // Separator
        html += '<div class="source-tools-separator"></div>';
        
        // Create Page Icon
        html += '<a href="' + config.createPageUrl + '" class="source-tool-icon source-tool-icon--create" data-tooltip="Create Page" title="Create New Page">';
        html += '<span class="source-sr-only">Create New Page</span>';
        html += '➕';
        html += '</a>';
        
        // Admin Dashboard Icon (only for admins)
        if (isAdmin()) {
            html += '<a href="' + config.adminDashboardUrl + '" class="source-tool-icon source-tool-icon--admin" data-tooltip="Admin Dashboard" title="Admin Dashboard">';
            html += '<span class="source-sr-only">Admin Dashboard</span>';
            html += '⚙️';
            html += '</a>';
        }
        
        // Upload Icon
        html += '<a href="' + config.uploadUrl + '" class="source-tool-icon source-tool-icon--upload" data-tooltip="Upload File" title="Upload File">';
        html += '<span class="source-sr-only">Upload File</span>';
        html += '📤';
        html += '</a>';
        
        // Separator
        html += '<div class="source-tools-separator"></div>';
        
        // Clock
        html += '<div class="source-wiki-clock">';
        html += '<span class="source-wiki-clock__time" id="source-clock-time">--:--:--</span>';
        if (config.showDate) {
            html += '<span class="source-wiki-clock__date" id="source-clock-date">Loading...</span>';
        }
        if (config.showTimezone) {
            html += '<span class="source-wiki-clock__timezone" id="source-clock-timezone"></span>';
        }
        html += '</div>';
        
        html += '</div>';
        
        return html;
    }
    
    /* ========================================================================
       CLOCK UPDATE FUNCTION
       ======================================================================== */
    
    function updateClock() {
        var now = new Date();
        
        // Update time
        var timeEl = document.getElementById('source-clock-time');
        if (timeEl) {
            timeEl.innerHTML = formatTime(now);
        }
        
        // Update date
        if (config.showDate) {
            var dateEl = document.getElementById('source-clock-date');
            if (dateEl) {
                dateEl.textContent = formatDate(now);
            }
        }
        
        // Update timezone
        if (config.showTimezone) {
            var tzEl = document.getElementById('source-clock-timezone');
            if (tzEl) {
                tzEl.textContent = getTimezone(now);
            }
        }
    }
    
    /* ========================================================================
       PAGE COUNT FETCHER
       ======================================================================== */
    
    function fetchPageCount() {
        // Method 1: Try to get from existing page counter if available
        var existingCounter = document.querySelector('.page-counter__value');
        if (existingCounter) {
            var count = existingCounter.textContent.trim();
            updatePageCount(count);
            return;
        }
        
        // Method 2: Try to fetch from API
        var apiUrl = '/api.php?action=query&meta=siteinfo&siprop=statistics&format=json';
        
        fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data && data.query && data.query.statistics) {
                    var articles = data.query.statistics.articles;
                    updatePageCount(articles);
                }
            })
            .catch(function(error) {
                console.log('Source Comics: Could not fetch page count', error);
                // Fallback - try to find it in the page
                var pageCountText = document.body.textContent.match(/(\d+)\s*pages?/i);
                if (pageCountText) {
                    updatePageCount(pageCountText[1]);
                }
            });
    }
    
    function updatePageCount(count) {
        var countEl = document.getElementById('source-page-count');
        if (countEl) {
            // Animate the number
            countEl.style.opacity = '0';
            setTimeout(function() {
                countEl.textContent = count;
                countEl.style.opacity = '1';
            }, 150);
        }
    }
    
    /* ========================================================================
       INITIALIZATION
       ======================================================================== */
    
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initTools);
        } else {
            initTools();
        }
    }
    
    function initTools() {
        // Find the header top section
        var headerTop = document.querySelector(config.headerTopSelector);
        
        if (!headerTop) {
            console.log('Source Comics: Header top section not found');
            return;
        }
        
        // Hide existing wiki tools
        var existingTools = document.querySelector(config.wikiToolsSelector);
        if (existingTools) {
            existingTools.style.display = 'none';
        }
        
        // Check if our tools already exist
        if (document.querySelector('.source-wiki-tools')) {
            console.log('Source Comics: Custom tools already exist');
            return;
        }
        
        // Create and insert custom tools
        var toolsContainer = document.createElement('div');
        toolsContainer.innerHTML = createToolsHTML();
        var toolsElement = toolsContainer.firstChild;
        
        // Insert at the end of header top
        headerTop.appendChild(toolsElement);
        
        // Initialize clock
        updateClock();
        setInterval(updateClock, 1000);
        
        // Fetch page count
        fetchPageCount();
        
        console.log('Source Comics: Custom header tools initialized');
    }
    
    // Start initialization
    init();
    
})();

/* ============================================================================
   ALTERNATIVE: SIMPLER CLOCK-ONLY VERSION
   ============================================================================
   If you only want the clock without replacing the entire tools area,
   uncomment and use this simpler version instead:
   ============================================================================

(function() {
    'use strict';
    
    function updateSimpleClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        
        var timeString = 
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;
        
        var clockEl = document.getElementById('source-clock-time');
        if (clockEl) {
            clockEl.textContent = timeString;
        }
    }
    
    // Initialize when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setInterval(updateSimpleClock, 1000);
            updateSimpleClock();
        });
    } else {
        setInterval(updateSimpleClock, 1000);
        updateSimpleClock();
    }
})();

============================================================================ */
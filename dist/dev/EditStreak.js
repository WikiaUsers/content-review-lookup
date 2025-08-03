/*
 * @title       EditStreak.js
 * @version     1.2
 * @description Tracks and displays user edit streaks on Fandom wikis
 * @author      Charata
 * @license     CC-BY-SA-3.0
 */

(function() {
    'use strict';

    // Configuration
    var config = {
        storageKey: 'editStreakData',
        streakThreshold: 1, // Minimum edits per day to count as a streak day
        maxDisplayStreak: 30, // Maximum streak days to show in the UI
        badgeColors: {
            active: '#2ecc71',
            inactive: '#e74c3c',
            current: '#3498db'
        },
        localStorageExpiry: 30 // Days to keep streak data in localStorage
    };

    // Main EditStreak function
    function initEditStreak() {
        if (window.EditStreakLoaded) return;
        window.EditStreakLoaded = true;

        // Only run for logged-in users
        if (mw.config.get('wgUserName') === null) return;

        // Wait for page load
        $(function() {
            // Load or initialize streak data
            var streakData = loadStreakData();
            var currentDate = getCurrentDate();

            // Check if user edited today
            if (isEditPage() || isRecentEdit()) {
                updateStreakData(streakData, currentDate);
            }

            // Display streak UI
            displayStreakUI(streakData, currentDate);
        });
    }

    // Load streak data from localStorage
    function loadStreakData() {
        var username = mw.config.get('wgUserName');
        var storageData = localStorage.getItem(config.storageKey + '_' + username);
        var defaultData = {
            currentStreak: 0,
            longestStreak: 0,
            lastEditDate: null,
            editDays: {},
            totalEdits: 0
        };

        if (storageData) {
            try {
                var parsedData = JSON.parse(storageData);
                
                // Validate data and clean old entries
                if (parsedData && parsedData.editDays) {
                    var cleanData = {
                        currentStreak: parseInt(parsedData.currentStreak) || 0,
                        longestStreak: parseInt(parsedData.longestStreak) || 0,
                        lastEditDate: parsedData.lastEditDate || null,
                        editDays: {},
                        totalEdits: parseInt(parsedData.totalEdits) || 0
                    };

                    var expiryDate = new Date();
                    expiryDate.setDate(expiryDate.getDate() - config.localStorageExpiry);

                    for (var date in parsedData.editDays) {
                        var editDate = new Date(date);
                        if (editDate >= expiryDate) {
                            cleanData.editDays[date] = parseInt(parsedData.editDays[date]) || 0;
                        }
                    }

                    return cleanData;
                }
            } catch (e) {
                console.error('EditStreak: Error parsing streak data', e);
            }
        }

        return defaultData;
    }

    // Save streak data to localStorage
    function saveStreakData(data) {
        var username = mw.config.get('wgUserName');
        try {
            localStorage.setItem(config.storageKey + '_' + username, JSON.stringify(data));
        } catch (e) {
            console.error('EditStreak: Error saving streak data', e);
        }
    }

    // Get current date in YYYY-MM-DD format
    function getCurrentDate() {
        var date = new Date();
        return date.toISOString().split('T')[0];
    }

    // Check if current page is an edit page
    function isEditPage() {
        return mw.config.get('wgAction') === 'edit' || 
               mw.config.get('wgAction') === 'submit';
    }

    // Check if user made a recent edit (within last 5 minutes)
    function isRecentEdit() {
        var lastEditTime = localStorage.getItem('editStreakLastEditTime');
        if (!lastEditTime) return false;

        var currentTime = new Date().getTime();
        return (currentTime - parseInt(lastEditTime)) < (5 * 60 * 1000);
    }

    // Update streak data based on current edit
    function updateStreakData(streakData, currentDate) {
        // Record edit time for recent edit detection
        localStorage.setItem('editStreakLastEditTime', new Date().getTime());

        // Initialize date entry if not exists
        if (!streakData.editDays[currentDate]) {
            streakData.editDays[currentDate] = 0;
        }

        // Increment edit count for today
        streakData.editDays[currentDate]++;
        streakData.totalEdits++;

        // Update last edit date
        var previousLastDate = streakData.lastEditDate;
        streakData.lastEditDate = currentDate;

        // If last edit was yesterday, increment current streak
        if (previousLastDate) {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            var yesterdayStr = yesterday.toISOString().split('T')[0];

            if (previousLastDate === yesterdayStr) {
                streakData.currentStreak++;
            } else if (previousLastDate !== currentDate) {
                // If not consecutive, reset current streak
                streakData.currentStreak = 1;
            }
        } else {
            // First recorded edit
            streakData.currentStreak = 1;
        }

        // Update longest streak if current is longer
        if (streakData.currentStreak > streakData.longestStreak) {
            streakData.longestStreak = streakData.currentStreak;
        }

        // Save updated data
        saveStreakData(streakData);
    }

    // Display streak UI in the personal toolbar
    function displayStreakUI(streakData, currentDate) {
        // Create streak container
        var $streakContainer = $('<div>')
            .attr('id', 'editStreakContainer')
            .css({
                'display': 'inline-block',
                'margin-left': '10px',
                'vertical-align': 'middle'
            });

        // Create streak element
        var $streakElement = $('<a>')
            .attr('href', 'javascript:void(0)')
            .attr('title', 'Your editing streak')
            .css({
                'display': 'inline-block',
                'padding': '3px 8px',
                'border-radius': '12px',
                'background-color': streakData.lastEditDate === currentDate ? config.badgeColors.active : config.badgeColors.inactive,
                'color': 'white',
                'font-weight': 'bold',
                'font-size': '12px',
                'text-decoration': 'none',
                'transition': 'background-color 0.3s'
            })
            .text('🔥 ' + streakData.currentStreak + ' days')
            .hover(
                function() { $(this).css('opacity', '0.8'); },
                function() { $(this).css('opacity', '1'); }
            );

        // Create popup panel
        var $streakPopup = $('<div>')
            .attr('id', 'editStreakPopup')
            .css({
                'display': 'none',
                'position': 'absolute',
                'right': '0',
                'top': '100%',
                'background-color': '#fff',
                'border': '1px solid #ccc',
                'border-radius': '4px',
                'padding': '10px',
                'width': '250px',
                'z-index': '1000',
                'box-shadow': '0 2px 10px rgba(0,0,0,0.1)'
            });

        // Build popup content
        var popupContent = buildPopupContent(streakData, currentDate);
        $streakPopup.append(popupContent);

        // Add click handler to toggle popup
        $streakElement.click(function(e) {
            e.stopPropagation();
            $('#editStreakPopup').toggle();
        });

        // Close popup when clicking elsewhere
        $(document).click(function() {
            $('#editStreakPopup').hide();
        });

        // Add elements to container
        $streakContainer.append($streakElement, $streakPopup);

        // Add to personal toolbar
        $('#personal-extra').append($streakContainer);
    }

    // Build detailed popup content
    function buildPopupContent(streakData, currentDate) {
        var $content = $('<div>');

        // Current streak info
        var $currentStreak = $('<div>')
            .css({
                'font-weight': 'bold',
                'font-size': '16px',
                'margin-bottom': '10px',
                'color': streakData.lastEditDate === currentDate ? config.badgeColors.active : config.badgeColors.inactive
            })
            .text('Current Streak: ' + streakData.currentStreak + ' days');
        $content.append($currentStreak);

        // Longest streak info
        var $longestStreak = $('<div>')
            .css({
                'margin-bottom': '10px',
                'color': '#7f8c8d'
            })
            .text('Longest Streak: ' + streakData.longestStreak + ' days');
        $content.append($longestStreak);

        // Total edits info
        var $totalEdits = $('<div>')
            .css({
                'margin-bottom': '15px',
                'color': '#7f8c8d'
            })
            .text('Total Tracked Edits: ' + streakData.totalEdits);
        $content.append($totalEdits);

        // Streak calendar
        var $calendarTitle = $('<div>')
            .css({
                'font-weight': 'bold',
                'margin-bottom': '5px',
                'border-bottom': '1px solid #eee',
                'padding-bottom': '5px'
            })
            .text('Recent Activity');
        $content.append($calendarTitle);

        var $calendar = $('<div>')
            .css({
                'display': 'flex',
                'flex-wrap': 'wrap',
                'gap': '3px',
                'margin-bottom': '10px'
            });

        // Create calendar days (last 30 days)
        var today = new Date(currentDate);
        for (var i = config.maxDisplayStreak - 1; i >= 0; i--) {
            var date = new Date(today);
            date.setDate(date.getDate() - i);
            var dateStr = date.toISOString().split('T')[0];
            var hasEdit = streakData.editDays[dateStr] >= config.streakThreshold;

            var $day = $('<div>')
                .attr('title', dateStr + (hasEdit ? ' (' + streakData.editDays[dateStr] + ' edits)' : ' (no edits)'))
                .css({
                    'width': '12px',
                    'height': '12px',
                    'border-radius': '2px',
                    'background-color': hasEdit ? 
                        (dateStr === currentDate ? config.badgeColors.current : 
                         (i === 0 ? config.badgeColors.active : '#27ae60')) : 
                        '#ecf0f1',
                    'border': '1px solid ' + (hasEdit ? 'transparent' : '#ddd')
                });

            $calendar.append($day);
        }

        $content.append($calendar);

        // Streak maintenance tips
        var $tips = $('<div>')
            .css({
                'font-size': '12px',
                'color': '#7f8c8d',
                'margin-top': '10px',
                'border-top': '1px solid #eee',
                'padding-top': '10px'
            })
            .html('<strong>Tip:</strong> Edit at least once every day to maintain your streak!');
        $content.append($tips);

        return $content;
    }

    // Initialize the EditStreak
    if (mw.loader.getState('jquery') === 'ready') {
        initEditStreak();
    } else {
        mw.loader.using('jquery').then(initEditStreak);
    }

})();
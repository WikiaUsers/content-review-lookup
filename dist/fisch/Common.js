/* Any JavaScript here will be loaded for all users on every page load. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 21;
window.lockOldComments.addNoteAbove = true;

/* Load HourChange module */
importScript('MediaWiki:HourChange.js');

/* Load CurrentSeason module */
importScript('MediaWiki:CurrentSeason.js');

 /* Simple click handler for Discord button
  * CSS: - MediaWiki:Main_Page.css */
$(document).ready(function() {
    $('#p-views').on('click', function() {
        window.location.href = 'https://discord.gg/7fFExCqCqC';
    });
});

mw.loader.load('jquery.makeCollapsible');
mw.loader.using('jquery.makeCollapsible', function () {
    $(function () {
        $('.mw-collapsible').makeCollapsible();
    });
});

mw.hook('wikipage.content').add(function () {
    var isCollapsed = false;
    var content = $('#mw-customcollapsible-rodsContent');
    var button = $('.mw-customtoggle-rodsContent');
    
    button.hover(
        function() {
            $(this).css('background-color', 'rgba(0, 0, 0, 0.2)');
        },
        function() {
            $(this).css('background-color', 'rgba(0, 0, 0, 0.1)');
        }
    );
    
    button.click(function() {
        if (isCollapsed) {
            content.slideDown();
            $(this).html('Collapse ▲');
        } else {
            content.slideUp();
            $(this).html('Expand ▼');
        }
        isCollapsed = !isCollapsed;
    });
});

/*
 * Weekly Top Contributors Module.
 * Inspired by and partially based on TopEditors script by Bobogoobo
 * Original code: https://dev.fandom.com/wiki/MediaWiki:TopEditors/code.js
 * 
 * This script creates a leaderboard showing the top contributors for the current week
 * It uses similar API handling methods as the original TopEditors script
 * while providing a modern interface focused on weekly statistics
 *
 * Key differences from the original:
 * - Focused specifically on weekly contributions
 * - Modern UI with Fandom's design system
 * - Automatic weekly date range calculation
 * - Simplified configuration (no additional parameters needed)
 * - Built-in hourly updates
 *
 * Uses only official MediaWiki API and follows Fandom's best practices
 * No external resources or dependencies except for built-in MediaWiki modules
 *
 * CSS: https://fisch.fandom.com/wiki/MediaWiki:TopWeekLeaderboard.css
 * TEMPLATE: https://fisch.fandom.com/wiki/Template:TopContributors
 */
mw.loader.using('mediawiki.util').then(function() {
    $(document).ready(function() {
        var WeeklyTopContributors = {
            // Initialize the module with container element
            init: function($container) {
                this.$container = $container;
                this.userList = {};
                this.loadData();
            },

            // Calculate start and end dates for the current week (Monday to Sunday)
            getWeekDates: function() {
                var now = new Date();
                var currentDay = now.getDay();
                if (currentDay === 0) currentDay = 7;
                
                var monday = new Date(now);
                monday.setDate(now.getDate() - (currentDay - 1));
                monday.setHours(0, 0, 0, 0);
                
                var sunday = new Date(monday);
                sunday.setDate(monday.getDate() + 6);
                sunday.setHours(23, 59, 59, 999);
                
                return {
                    start: monday.toJSON(),
                    end: sunday.toJSON()
                };
            },

            // Format date to "DD Month" format using standard Date object
            formatDate: function(dateString) {
                var date = new Date(dateString);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return date.getDate() + ' ' + months[date.getMonth()];
            },

            // Recursive function to handle API pagination
            // Based on the approach used in TopEditors script
            requestLoop: function(start, end, cont, callback) {
                var self = this;
                $.getJSON(mw.util.wikiScript('api'), {
                    action: 'query',
                    list: 'recentchanges',
                    rccontinue: cont,
                    rcstart: start,
                    rcend: end,
                    rctype: 'edit|new',      // Count only edits and new pages
                    rcshow: '!bot',          // Exclude bot edits
                    rcdir: 'newer',
                    rcprop: 'user',          // We only need usernames
                    rclimit: 'max',          // Use API's maximum limit for efficiency
                    format: 'json'
                }, function(data) {
                    // Check if we got valid data
                    if (!data.query || !data.query.recentchanges) {
                        callback();
                        return;
                    }

                    // Count edits for each user
                    data.query.recentchanges.forEach(function(change) {
                        var username = change.user;
                        if (self.userList[username] !== undefined) {
                            self.userList[username] += 1;
                        } else {
                            self.userList[username] = 1;
                        }
                    });

                    // Handle pagination using either old or new MediaWiki API format
                    if (data['query-continue']) {
                        self.requestLoop(data['query-continue'].recentchanges.rcstart, 
                                      end, undefined, callback);
                    } else if (data['continue']) {
                        self.requestLoop(start, end, data['continue'].rccontinue, 
                                      callback);
                    } else {
                        callback();
                    }
                });
            },

            // Main function to load and display data
            loadData: function() {
                var self = this;
                var dates = this.getWeekDates();
                
                // Show loading state
                this.$container.html('<div class="loading">Loading...</div>');

                // Start data collection
                this.requestLoop(dates.start, dates.end, undefined, function() {
                    // Convert user data to sortable array
                    var usersList = [];
                    for (var username in self.userList) {
                        usersList.push({
                            user: username,
                            count: self.userList[username]
                        });
                    }

                    // Sort by edit count (descending) and then by username
                    usersList.sort(function(a, b) {
                        return b.count - a.count || a.user.localeCompare(b.user);
                    });

                    // Get current user's rank if they're logged in
                    var currentUser = mw.config.get('wgUserName');
                    var userRank = usersList.findIndex(function(item) {
                        return item.user === currentUser;
                    }) + 1;
                    
                    // Build HTML structure
                    var html = '<div class="leaderboard-header">' +
                             '<div class="leaderboard-title">Weekly Top Contributors</div>' +
                             '<div class="leaderboard-date">' + 
                             self.formatDate(dates.start) + ' ─ ' + 
                             self.formatDate(dates.end) + '</div>' +
                             '<div class="leaderboard-rank">Rank ' + 
                             (userRank || '─') + ' / 10</div>' +
                             '</div>' +
                             '<div class="contributors-list">';
                             
                    // Add top 10 contributors
                    usersList.slice(0, 10).forEach(function(item, index) {
                        html += '<div class="contributor">' +
                               '<div class="contributor-info">' +
                               '<span class="position">' + (index + 1) + '.</span>' +
                               '<span class="name">' +
                               '<a href="' + mw.util.getUrl('User:' + item.user) + '">' + 
                               item.user + '</a></span></div>' +
                               '<div class="edits">' + item.count + ' edits</div>' +
                               '</div>';
                    });

                    html += '</div>';
                    self.$container.html(html);
                });
            }
        };

        // Initialize all instances on the page
        $('.weekly-leaderboard').each(function() {
            Object.create(WeeklyTopContributors).init($(this));
        });

        // Refresh data every hour to keep it current
        setInterval(function() {
            $('.weekly-leaderboard').each(function() {
                Object.create(WeeklyTopContributors).init($(this));
            });
        }, 3600000);
    });
});

/*
* CircleAvatar Template Handler
* Displays user avatars in a modern, circular style with customizable parameters
* Inspired by Fandom's avatar styling system
* 
* This script creates customizable circular avatars for wiki users
* It uses the Fandom API to fetch user avatars dynamically
* while providing a modern interface with hover effects
*
* Key features:
* - Circular avatars with size customization (16-150px)
* - Optional username display
* - Modern hover effects and transitions
* - Built-in caching system for API calls
* - Automatic error handling with fallbacks
*
* Uses only official MediaWiki API and follows Fandom's best practices
* No external resources or dependencies except for built-in MediaWiki modules
*
* TEMPLATE: https://fisch.fandom.com/wiki/Template:CircleAvatar
*/
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
   'use strict';

   var cache = {};

   // Avatar creation and styling function
    function addAvatar(element) {
        var $element = $(element);
        var username = $element.data('username').replace('@', '');
        var params = $element.data('params') ? $element.data('params').split('|') : [];
        
        // Parse parameters
        var size = 24;
        var showName = true;
        
        if (params.length > 0) {
            if (!isNaN(params[0])) {
                size = parseInt(params[0], 10);
                if (params[1] === 'false') {
                    showName = false;
                }
            } else {
                params.forEach(function(param) {
                    if (param.startsWith('size=')) {
                        size = parseInt(param.split('=')[1], 10);
                    } else if (param.startsWith('showname=')) {
                        showName = param.split('=')[1] !== 'false';
                    }
                });
            }
        }

        // Limit size
        size = Math.min(Math.max(size, 16), 150);

        var avatar = cache[username];
        if (!avatar) {
            console.error('[CircleAvatar] Cannot find avatar for', username);
            return;
        }

        // Adjust avatar size
        avatar = avatar.replace(
            /\/thumbnail\/width\/\d+\/height\/\d+/,
            '/thumbnail/width/' + size + '/height/' + size
        );

        // Create container
        var $container = $('<span>').css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'opacity 0.2s'
        });

        // Create avatar image
        var $avatar = $('<img>').attr({
            src: avatar,
            alt: username + "'s avatar",
            title: '@' + username
        }).css({
            borderRadius: '50%',
            width: size + 'px',
            height: size + 'px',
            objectFit: 'cover',
            verticalAlign: 'middle',
            border: '1px solid rgba(0,0,0,0.1)'
        });

        // Add username if showName is true
        if (showName) {
            var $name = $('<span>').text('@' + username).css({
                fontSize: Math.max(size * 0.7, 12) + 'px',
                verticalAlign: 'middle'
            });
            $container.append($avatar, $name);
        } else {
            $container.append($avatar);
        }

        // Create link wrapper
        var $link = $('<a>').attr({
            href: mw.util.getUrl('User:' + username)
        }).css({
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer'
        }).hover(
            function() { $(this).css('opacity', '0.8'); },
            function() { $(this).css('opacity', '1'); }
        );

        $link.append($container);
        $element.replaceWith($link);
    }

   // Get user IDs from usernames using MediaWiki API
    function getUserIds(users) {
        return new mw.Api().get({
            action: 'query',
            formatversion: 2,
            list: 'users',
            ususers: users
        }).then(function(data) {
            return data.query.users.map(function(user) {
                return user.userid;
            });
        });
    }

   // Fetch user avatars using Fandom API
    function getUserAvatars(userIds) {
        var scriptPath = mw.config.get('wgScriptPath');
        return $.getJSON(scriptPath + '/api/v1/User/Details', {
            ids: userIds.join(',')
        }).then(function(data) {
            return data.items;
        });
    }

   // Main processing function
    function processAvatars($content) {
        if (!$content) return;

        var users = $content
            .find('.circle-avatar-template')
            .map(function() {
                return $(this).data('username').replace('@', '');
            })
            .toArray()
            .filter(function(username) {
                return !cache[username];
            });

        if (users.length > 0) {
            getUserIds(users)
                .then(getUserAvatars)
                .then(function(users) {
                    users.forEach(function(user) {
                        cache[user.name] = user.avatar;
                    });
                    
                    $content.find('.circle-avatar-template').each(function() {
                        addAvatar(this);
                    });
                });
        }
    }

   // Initialize on page load
   mw.hook('wikipage.content').add(processAvatars);
});


/**
 * Enhanced Seasons Countdown Timer
 * @version 2.0
 * 
 * Dynamic season tracker and countdown timer for game seasons
 * Inspired by dev.fandom.com/wiki/MediaWiki:Countdown/code.js
 * 
 * Features:
 * - Real-time season tracking with automatic updates
 * - Visual indication of current season with glow effects
 * - Compact time format (e.g. 1d 5h 30m 15s)
 * - Dynamic countdown for season starts/ends
 * - Automatic DOM updates without page reload
 * - Support for MediaWiki dynamic content loading
 * 
 * Game season mechanics:
 * - Each season lasts 576 minutes (9.6 hours)
 * - Full cycle of 4 seasons = 2304 minutes (38.4 hours)
 * - Seasons rotate: Spring → Summer → Autumn → Winter
 * 
 * CSS: https://fisch.fandom.com/wiki/MediaWiki:Seasons.css
 * TEMPLATE: https://fisch.fandom.com/wiki/Template:Seasons
 */

/*jshint jquery:true, browser:true, esversion:5*/
/*global mediaWiki*/

;(function (window, mw, $) {
    'use strict';

    // Constants
    var CONFIG = {
        SEASON_LENGTH: 576 * 60,
        UPDATE_INTERVAL: 1000,
        ACTIVE_GLOW: '0 0 10px',
        SEASONS: [
            { name: 'Spring', color: '#90EE90' },
            { name: 'Summer', color: '#FFD700' },
            { name: 'Autumn', color: '#FFA500' },
            { name: 'Winter', color: '#87CEEB' }
        ]
    };

    // Utility functions
    var Utils = {
        getCurrentTime: function() {
            return Math.floor(Date.now() / 1000);
        },

        getCurrentSeason: function() {
            return Math.floor((this.getCurrentTime() % (CONFIG.SEASON_LENGTH * 4)) / CONFIG.SEASON_LENGTH);
        },

        getNextSeasonTime: function(seasonIndex) {
            var now = this.getCurrentTime();
            var cycleStart = Math.floor(now / (CONFIG.SEASON_LENGTH * 4)) * CONFIG.SEASON_LENGTH * 4;
            var targetStart = cycleStart + (seasonIndex * CONFIG.SEASON_LENGTH);
            
            return targetStart <= now ? targetStart + CONFIG.SEASON_LENGTH * 4 : targetStart;
        },

        formatTime: function(seconds) {
            if (seconds < 0) return '0s';

            var d = Math.floor(seconds / 86400);
            var h = Math.floor((seconds % 86400) / 3600);
            var m = Math.floor((seconds % 3600) / 60);
            var s = seconds % 60;
            
            var parts = [];
            
            if (d > 0) parts.push(d + 'd');
            if (h > 0) parts.push(h + 'h');
            if (m > 0) parts.push(m + 'm');
            if (s > 0 || parts.length === 0) parts.push(s + 's');
            
            return parts.join(' ');
        }
    };

    // UI Controller
    var UIController = {
        updateSeasonStyle: function(currentSeason) {
            $('.season-name').each(function(index) {
                var $season = $(this);
                if (index === currentSeason) {
                    $season.css('text-shadow', CONFIG.ACTIVE_GLOW + ' ' + CONFIG.SEASONS[index].color);
                    $season.css('font-weight', 'bold');
                } else {
                    $season.css('text-shadow', 'none');
                    $season.css('font-weight', 'normal');
                }
            });
        },

        updateTimers: function() {
            var currentSeason = Utils.getCurrentSeason();
            var currentTime = Utils.getCurrentTime();

            this.updateSeasonStyle(currentSeason);

            $('.season-timer').each(function() {
                var $timer = $(this);
                var seasonIndex = parseInt($timer.attr('data-season'), 10);
                var timeLeft;
                var prefix;

                if (seasonIndex === currentSeason) {
                    timeLeft = Utils.getNextSeasonTime((currentSeason + 1) % 4) - currentTime;
                    prefix = 'Ends:';
                } else {
                    timeLeft = Utils.getNextSeasonTime(seasonIndex) - currentTime;
                    prefix = 'Starts:';
                }

                $timer.text(prefix + ' ' + Utils.formatTime(timeLeft));
            });
        },

        startUpdates: function() {
            var self = this;
            this.updateTimers();
            window.setTimeout(function() {
                self.startUpdates();
            }, CONFIG.UPDATE_INTERVAL);
        }
    };

    // Initialization
    function init($content) {
        $content = $content || $(document);
        var $timers = $content.find('.season-timer:not(.initialized)');
        
        if (!$timers.length) return;

        $timers.addClass('initialized');
        UIController.startUpdates();
    }

    // Register handlers
    $(function() {
        init();
        mw.hook('wikipage.content').add(init);
    });

}(window, mediaWiki, jQuery));


  /* Custom Navigation Icons */
importScript('MediaWiki:CustomNavigationIcons.js');
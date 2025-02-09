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
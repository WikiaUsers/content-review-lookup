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
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
    $(document).ready(function() {
        var WeeklyTopContributors = {
            // Cache for storing avatar URLs
            avatarCache: {},

            // Initialize the module with container element
            init: function($container) {
                this.$container = $container;
                this.userList = {};
                this.loadData();
            },

            // Get user IDs from usernames using MediaWiki API
            getUserIds: function(users) {
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
            },

            // Fetch user avatars using Fandom API
            getUserAvatars: function(userIds) {
                var scriptPath = mw.config.get('wgScriptPath');
                return $.getJSON(scriptPath + '/api/v1/User/Details', {
                    ids: userIds.join(',')
                }).then(function(data) {
                    return data.items;
                });
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

            // Format date to "DD Month" format
            formatDate: function(dateString) {
                var date = new Date(dateString);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return date.getDate() + ' ' + months[date.getMonth()];
            },

            // Recursive function to handle API pagination
            requestLoop: function(start, end, cont, callback) {
                var self = this;
                $.getJSON(mw.util.wikiScript('api'), {
                    action: 'query',
                    list: 'recentchanges',
                    rccontinue: cont,
                    rcstart: start,
                    rcend: end,
                    rctype: 'edit|new',
                    rcshow: '!bot',
                    rcdir: 'newer',
                    rcprop: 'user',
                    rclimit: 'max',
                    format: 'json'
                }, function(data) {
                    if (!data.query || !data.query.recentchanges) {
                        callback();
                        return;
                    }

                    data.query.recentchanges.forEach(function(change) {
                        var username = change.user;
                        if (self.userList[username] !== undefined) {
                            self.userList[username] += 1;
                        } else {
                            self.userList[username] = 1;
                        }
                    });

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

            // Create avatar element
            createAvatarElement: function(username, avatarUrl) {
                return $('<img>')
                    .attr({
                        src: avatarUrl,
                        alt: username + "'s avatar",
                        title: username
                    })
                    .css({
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        marginRight: '1.5px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        objectFit: 'cover'
                    });
            },

            // Main function to load and display data
            loadData: function() {
                var self = this;
                var dates = this.getWeekDates();
                
                this.$container.html('<div class="loading">Loading...</div>');

                this.requestLoop(dates.start, dates.end, undefined, function() {
                    var usersList = [];
                    for (var username in self.userList) {
                        usersList.push({
                            user: username,
                            count: self.userList[username]
                        });
                    }

                    usersList.sort(function(a, b) {
                        return b.count - a.count || a.user.localeCompare(b.user);
                    });

                    var currentUser = mw.config.get('wgUserName');
                    var userRank = usersList.findIndex(function(item) {
                        return item.user === currentUser;
                    }) + 1;

                    // Get top 10 users for avatar fetching
                    var top10Users = usersList.slice(0, 10).map(function(item) {
                        return item.user;
                    });

                    // Fetch avatars for top 10 users
                    self.getUserIds(top10Users)
                        .then(function(userIds) {
                            return self.getUserAvatars(userIds);
                        })
                        .then(function(users) {
                            // Cache avatars
                            users.forEach(function(user) {
                                self.avatarCache[user.name] = user.avatar;
                            });

                            // Build HTML with avatars
                            var html = '<div class="leaderboard-header">' +
                                     '<div class="leaderboard-title">Weekly Top Contributors</div>' +
                                     '<div class="leaderboard-date">' + 
                                     self.formatDate(dates.start) + ' ─ ' + 
                                     self.formatDate(dates.end) + '</div>' +
                                     '<div class="leaderboard-rank">Rank ' + 
                                     (userRank || '─') + ' / 10</div>' +
                                     '</div>' +
                                     '<div class="contributors-list">';

                            usersList.slice(0, 10).forEach(function(item, index) {
                                var avatarUrl = self.avatarCache[item.user];
                                
                                // Динамическое уменьшение для длинных никнеймов
                                var usernameLength = item.user.length;
                                var fontSize = '14px';
                                
                                if (usernameLength > 15) {
                                    fontSize = '11px';
                                } else if (usernameLength > 12) {
                                    fontSize = '12px';
                                } else if (usernameLength > 10) {
                                    fontSize = '13px';
                                }
                                
                                html += '<div class="contributor">' +
                                       '<div class="contributor-info">' +
                                       '<span class="position">' + (index + 1) + '.</span>';

                                // Create temporary container for avatar
                                var tempContainer = $('<div>').append(
                                    self.createAvatarElement(item.user, avatarUrl)
                                );
                                
                                html += tempContainer.html() +
                                       '<span class="name">' +
                                       '<a href="' + mw.util.getUrl('User:' + item.user) + '" style="font-size: ' + fontSize + ';">' + 
                                       '<span class="username-text">' + item.user + '</span>' +
                                       '</a></span></div>' +
                                       '<div class="edits">' + item.count + ' edits</div>' +
                                       '</div>';
                            });

                            html += '</div>';
                            self.$container.html(html);
                        });
                });
            }
        };

        // Initialize all instances on the page
        $('.weekly-leaderboard').each(function() {
            Object.create(WeeklyTopContributors).init($(this));
        });

        // Refresh data every hour
        setInterval(function() {
            $('.weekly-leaderboard').each(function() {
                Object.create(WeeklyTopContributors).init($(this));
            });
        }, 3600000);
    });
});
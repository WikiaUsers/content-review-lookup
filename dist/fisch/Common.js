/* Any JavaScript here will be loaded for all users on every page load. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 21;
window.lockOldComments.addNoteAbove = true;
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


$(function() {
    function getWeekDates() {
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
            start: monday,
            end: sunday
        };
    }

    function loadTopContributors() {
        $('.top-contributors-container').each(function() {
            var $container = $(this);
            var $loader = $container.find('.contributors-loader');
            var $content = $container.find('.contributors-content');
            
            $loader.show();
            $content.hide();

            var api = new mw.Api();
            var dates = getWeekDates();
            var userEdits = {};

            function getUserContributions(user, ucstart, ucend) {
                var params = {
                    action: 'query',
                    list: 'usercontribs',
                    ucuser: user,
                    uclimit: 'max',
                    ucstart: ucstart,
                    ucend: ucend,
                    ucprop: 'timestamp',
                    formatversion: '2'
                };

                return api.get(params).then(function(data) {
                    if (data.query && data.query.usercontribs) {
                        return data.query.usercontribs.length;
                    }
                    return 0;
                });
            }
            
            api.get({
                action: 'query',
                list: 'recentchanges',
                rcprop: 'user|timestamp',
                rclimit: 'max',
                rcstart: dates.end.toISOString(),
                rcend: dates.start.toISOString(),
                rctype: 'edit|new',
                rcshow: '!bot',
                formatversion: '2'
            })
            .then(function(data) {
                if (!data.query || !data.query.recentchanges) {
                    throw new Error('Invalid API response structure');
                }

                var users = {};
                data.query.recentchanges.forEach(function(change) {
                    if (change.user) {
                        users[change.user] = true;
                    }
                });

                var promises = Object.keys(users).map(function(user) {
                    return getUserContributions(user, dates.end.toISOString(), dates.start.toISOString())
                        .then(function(count) {
                            return {
                                name: user,
                                editcount: count
                            };
                        });
                });

                return Promise.all(promises);
            })
            .then(function(contributors) {
                contributors.sort(function(a, b) {
                    return b.editcount - a.editcount;
                });

                var dateOptions = { month: 'short', day: 'numeric' };
                var startStr = dates.start.toLocaleDateString('en-US', dateOptions);
                var endStr = dates.end.toLocaleDateString('en-US', dateOptions);

                var html = '<div class="leaderboard-header">Weekly Top Contributors</div>' +
                          '<div class="leaderboard-subheader">' + startStr + ' - ' + endStr + '</div>';

                if (contributors.length === 0) {
                    html += '<div class="no-data">No edits this week</div>';
                } else {
                    html += '<div class="top-contributors">';
                    
                    var maxContributors = Math.min(contributors.length, 10);
                    for (var i = 0; i < maxContributors; i++) {
                        var contributor = contributors[i];
                        if (contributor.editcount > 0) {
                            html += '<div class="contributor-list-item">' +
                                   '<div class="contributor-details">' +
                                   '<span class="rank">' + (i + 1) + '.</span>' +
                                   '<a href="/wiki/User:' + encodeURIComponent(contributor.name) + '">' + contributor.name + '</a>' +
                                   '</div>' +
                                   '<div class="contributor-stats">' +
                                   '<span class="contributor-count">' + contributor.editcount + ' edits</span>' +
                                   '</div>' +
                                   '</div>';
                        }
                    }

                    html += '</div>';
                }

                $content.html(html);
            })
            .catch(function(error) {
                console.error('API Error:', error);
                $content.html(
                    '<div class="leaderboard-header">Weekly Top Contributors</div>' +
                    '<div class="error-message">' +
                    'Error loading data: ' + error.message + '<br>' +
                    'Please check console for more details' +
                    '</div>'
                );
            })
            .always(function() {
                $content.show();
                $loader.hide();
            });
        });
    }

    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
        console.log('MediaWiki dependencies loaded');
        loadTopContributors();
        setInterval(loadTopContributors, 300000);
    }).catch(function(error) {
        console.error('Failed to load MediaWiki dependencies:', error);
    });
});